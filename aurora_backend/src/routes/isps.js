const router = require("express").Router();
const axios = require("axios");
const db = require("../database/database");
db.then(() =>
  console.log("Connected to MongoDB in isps.js")
).catch((err) => console.log(err));
const User = require("../models/DiscordUser");
const ISPOrder = require("../models/Order");
const config = require("../config.json");
const ResiOrder = require("../models/ResiOrder");

function isAuthorized(req, res, next) {
  if (req.user) {
    // if session exists then the user is logged in
    console.log("User is logged in.");
    console.log(req.user);
    console.log(req.user.discordId);
    next(); // goes to next function which is request handler
  } else {
    console.log("User is not logged in.");
    res.redirect("/auth"); // if user not logged in should redirect to login page
  }
}

async function generate_isps(req, res, next) {
  let data = await SellAmount.find({_id: ObjectID("...")});

  const token = tokenGenerator();
  console.log(data[0]);

  const dataRaw = { "authtoken": `${token}`, "servername": `${data[0].ISPSServerName}`, "authtype":"ip", 
                    "srcips":[`${req.params.ip}`], "expiryhours": `${data[0].ISPSExpiryHours}`, 
                    "datalimitmb": `${data[0].ISPSDataLimit}`, "nproxies": req.params.amount, "email": `${req.user.email}`, 
                    "orderid": `${data[0].orderId}`, "custname": `${req.user.username}`}

  console.log(dataRaw);
  const login_url = 'http://mpmtestdc.voidstarer.com/cgi-bin/api/commit';
  const config = {
    method: "post",
    url: login_url,
    headers: { 'Content-Type': 'application/json' },
    data: dataRaw,
    params: dataRaw,
    auth: {
      username: '...',
      password: '...',
    }
  }

  let result = await axios(config);
  console.log(result)
  console.log(result.proxies)


  await User.findOneAndUpdate(
    {
      username: req.user.username,
    },
    {
      $push: { // date:amount:price:token:proxies
        order: `["${req.params.ip}"]:${d.getMonth() + 1}/${d.getUTCDate()}/${d.getFullYear()}:${req.params.amount}:${req.params.price}:${token}:${result.proxies}:`,
      },
    }
  );

  await SellAmount.findOneAndUpdate(
    {
      _id: ObjectID("..."),
    },
    {
      $inc: { 
        orderId: 1,
      },
    }
  );

    next();
}


router.post("/addIP/:token/:newip", async (req, res) => {
  let data_response = await fetch(`/access-mongo-user`, {
    method: "POST",
  });

  const data_session = await data_response.json();
  //console.log("MONGO DATA: ")
  //console.log(data_session.user[0].orders)

  let ips = "";
  for (var i = 0; i < user[0].order.length; i++) {
    var split = user[0].order[i].split(":");

    if ( split[3] === req.params.token ) { // if correct order based on token 
      ips = `["${req.params.newip}",` + split[0].substring(1); // insert new ip at beginning, take out [
    }
  }

  const dataRaw = { "authtoken": `${req.params.token}`, "authtype":"ip", "srcips":`${ips}`};

  console.log(dataRaw);
  const login_url = 'http://mpmtestdc.voidstarer.com/cgi-bin/api/change';
  const config = {
      method: "post",
      url: login_url,
      headers: { 'Content-Type': 'application/json' },
      data: dataRaw,
      params: dataRaw,
      auth: {
          username: '...',
          password: '...',
      }
  }

  let result = await axios(config);
});

router.post("/topup/:token", async (req, res) => {

  let data_response = await fetch(`${config.BACKEND_DOMAIN}/get-data`, {
    method: "POST",
  });

  const data_session = await data_response.json();
  //console.log("MONGO DATA: ")
  //console.log(data_session.user[0].orders)

  const dataRaw = { "authtoken": `${req.params.token}`, "topupdatalimitmb" : data_session.data[0].topupdatalimit, "topupexpiryhours" : data_session.data[0].topupexpiryhours};

  console.log(dataRaw);
  const login_url = 'http://mpmtestdc.voidstarer.com/cgi-bin/api/topup';
  const config = {
      method: "post",
      url: login_url,
      headers: { 'Content-Type': 'application/json' },
      data: dataRaw,
      params: dataRaw,
      auth: {
          username: '...',
          password: '...',
      }
  }

});

async function generateExistingISPS (token) {
  const dataRaw = { "authtoken": `${token}` }

  console.log(dataRaw);
  const login_url = 'http://mpmtestdc.voidstarer.com/cgi-bin/api/list';
  const config = {
      method: "get",
      url: login_url,
      headers: { 'Content-Type': 'application/json' },
      data: dataRaw,
      params: dataRaw,
      auth: {
          username: '...',
          password: '...',
      }
  }

  let result = await axios(config);
  console.log(result)
  console.log(result.proxies)
  return result.proxies;
}

router.get(
  "/stripesuccess/:stripe_price/:amount/:ip",
  isAuthorized,
  generate_isps,
  async (req, res) => {
    console.log("Successful stripe payment.");
    console.log(req);
    stripe_price = req.params.stripe_price;
    console.log("INSIDE STRIPE SUCCESS: " + stripe_price);
    res.redirect("/dashboard");
  }
);

router.get( 
  "/",
  isAuthorized,
  (req, res) => {
    const destination = config.FRONTEND_DOMAIN + config.ROUTES.dashboard;
    res.redirect(destination);
    return res.end();
  }
);


function tokenGenerator() {
  var length = 20,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
} 


module.exports = router;