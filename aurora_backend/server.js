const express = require("express");
const config = require("./src/config.json");
const app = express();
const cors = require("cors");
const SellAmount = require('./src/models/SellAmount.js');

const corsOptions = {
  origin: config.FRONTEND_DOMAIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
// console.log(corsOptions);

// app.use(cors());

app.use(express.static("."));
require("dotenv").config();
const session = require("express-session");
// const bodyParser = require("body-parser");
const passport = require("passport");
const discordStategy = require("./src/strategies/discordstrategy");
const db = require("./src/database/database");
const stripe = require("stripe")(`${process.env.STRIPE_SECRETTESTKEY}`); //!THIS MIGHT NOT WORK
const User = require("./src/models/DiscordUser");
const MongoStore = require('connect-mongo');

// Isps Admin Stats
const ObjectID = require('mongodb').ObjectID
const order = require("./src/models/Order");

// Resi
const ResiOrder = require("./src/models/ResiOrder");

db.then(() => console.log("Connected to MongoDB in server.js")).catch((err) =>
  console.log(err)
);

// Routes
const authRoute = require("./src/routes/auth");
const ispsRoute = require("./src/routes/isps");
const adminDashboardRoute = require("./src/routes/adminDashboard");
const dashboard_file = require("./src/routes/dashboard");
const dashboardRoute = dashboard_file.router;

// app.use(
//   session({
//     secret: "ABSKDMASLKDHQWOEWQDMLASMXABSUCA",
//     cookie: {
//       maxAge: 60000 * 60,
//     },
//     saveUninitialized: false,
//     name: "discord.ouath2",
//   })
// );

// // Passport
// app.use(passport.initialize());
// app.use(passport.session());

// app.configure(function () {
// app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(session({
  secret: "ABSKDMASLKDHQWOEWQDMLASMXABSUCA",
  cookie: {
    maxAge: 60000 * 60,
  },
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI }),
  ttl: 60 * 60,
}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session()); // Required for persistent login sessions (optional, but recommended)
// });

// Middleware Routes
app.use("/admindashboard", adminDashboardRoute);
app.use("/auth", authRoute);
app.use("/isps", ispsRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", (req, res) => {
  res.send("Login");
});

app.post("/create-checkout-session/:current_price", async (req, res) => {
  const current_price = parseInt(req.params.current_price);
  if (current_price >= 18 && current_price <= 900) {
    console.log("INSIDE CURRENT PRICE");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Borealis Residential Data",
              images: ["https://imgur.com/tD2pLVH.png"],
            },
            unit_amount: req.params.current_price + "00",
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      //allow_promotion_codes: true,
      success_url: `${process.env.DOMAIN}/dashboard/stripesuccess/${req.params.current_price}`,
      cancel_url: `${process.env.DOMAIN}/dashboard`,
    });

    res.json({ id: session.id });
  }
});

app.get("/access-mongo-user", async (req, res) => {
  if (!req.user) {
    res.status(403).json({ error: "No user logged in" });
    return res.end();
  }
  const user = await User.findById(req.user._id);
  // const user = await User.find({ discordId: req.user.discordId });
  res.json({ user: user });
  return res.end();
});

app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect(process.env.FRONTEND_DOMAIN);
});

app.get("/test", (req, res) => {
  res.send("made it to the back");
});

//? OUR OWN STRIPE PAYMENT FORM NO CHECKOUT SESH
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});



app.listen(process.env.PORT, () =>
  console.log("Running on port: " + process.env.PORT)
);

app.post('/access-mongo-users', async (req, res) => {
  let users = await User.find();
  res.json({users: users});
})

app.get('/get-data', async (req, res) => { 
  console.log(`inside get-data`)
  let data = await SellAmount.find({_id: ObjectID("...")});
  res.json({data: data[0].dataLeft});
  console.log(`inside get-data: ${data[0].dataLeft}`)
})

app.post('/updatedata/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
            dataLeft: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/updatelimit/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
            ISPSDataLimit: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/updateexpiry/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
            ISPSExpiryHours: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/updateprices/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
            ISPSPrices: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/updateserver/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
            ISPSServerName: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/updatetopupdata/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
          topupexpiryhours: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/updatetopupexpiry/:amount', async (req, res) => {
  console.log("Updating mongo data amount.");
  await SellAmount.findOneAndUpdate(
    {
        _id: ObjectID("..."),
    },
    {
        $set: {
          topupdatalimit: req.params.amount,
        },
    })
    res.json({amount: req.params.amount});
});

app.post('/access-wanted-user-data/:wantedUser', async (req, res) => {
  const user = await User.find({ discordId: req.params.wantedUser });
  res.json({ user: user });
  return res.end();
});
