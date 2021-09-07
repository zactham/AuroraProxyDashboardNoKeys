import constants from "../../constants.js"
const router = require("express").Router();
const axios = require("axios");
let login_token = "";
const auth_header = `Basic ${process.env.OXY_LOGIN}`;
let user_traffic = 0;
let user_traffic_limit = 0;
let password = "";
let stripe_price = 0;
const db = require("../database/database");
db.then(() =>
  console.log("Connected to MongoDB in dashboard.js")
).catch((err) => console.log(err));
const User = require("../models/DiscordUser");
const config = require("../config.json");

const cors = require("cors");
const corsOptions = {
  origin: config.FRONTEND_DOMAIN,
  optionsSuccessStatus: 200,
  credentials: true,
};


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

// check network logs later to make sure no data leaking
async function login_oxy(request, result, next) {
  // login first
  const login_url = process.env.OXY_LOGIN_DOMAIN;
  console.log(auth_header);
  const config = {
    method: "post",
    url: login_url,
    headers: { Authorization: auth_header }, //the Basic value is this converted to Base 64
  };

  let res = await axios(config);
  // token is res.data.token
  login_token = res.data.token;
  console.log("TOKEN: " + login_token);
  next();
}

// try get user
async function get_users(request, result, next) {
  console.log("GET USERS");
  const username = request.user.oxyUsername;
  password = request.user.password;
  const get_users_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users`;
  const config = {
    method: "get",
    url: get_users_url,
    headers: { Authorization: `Bearer ${login_token}` },
  };

  let res = await axios(config);
  // console.log("STATUS: " + res.status);
  // console.log("RES: " + res.data);

  let user_in_oxy = user_exists(res.data, username);

  //User does not exist so they must be created
  if (!user_in_oxy) {
    await create_user(username, password);
  }

  //Display all the user info
  display_user(res.data, username);

  next();
}

function user_exists(usersList, username) {
  const users = Object.values(usersList).filter((user_object) =>
    user_object.username.includes(username)
  );
  if (users.length > 0) {
    console.log(users[0].id);
    console.log("user already exists in database");
    return users[0].id;
  } else {
    console.log("no user found w the id:" + username);
    return false;
  }
}

async function display_user(usersList, username) {
  // TODO if userList is undefined or []
  const users = Object.values(usersList).filter((user_object) =>
    user_object.username.includes(username)
  );
  //   TODO users could = [] so [0].traffic fails
  if (users.length > 0)
  {
    user_traffic = users[0].traffic;
    console.log("USER TRAFFIC: " + user_traffic);
    user_traffic_limit = users[0].traffic_limit;
    console.log("USER TRAFFIC LIMIT: " + user_traffic_limit);
  }

  //username_official = username;
  //password = req.user.password;

  // const get_user_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users/${1280663}?type=lifetime`;
  // const config = {
  //     method: 'get',
  //     url: get_user_url,
  //     headers: {'Authorization': `Bearer ${login_token}`}
  // }

  // let res = await axios(config);
  // console.log("STATUS: " + res.status);
  // console.log("RES: " + res.data.traffic);
  // console.log("RES: " + res);
}

async function create_user(username, password) {
  console.log("Creating new oxy user.");

  const create_user_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users`;

  const config = {
    method: "post",
    url: create_user_url,
    headers: { Authorization: `Bearer ${login_token}` },
    data: {
      username: username,
      password: password,
      traffic_limit: 0,
      lifetime: true,
      auto_disable: false,
    },
  };

  let res = await axios(config);
  // console.log(res.data) ALL USERS
}

async function update_data(request, result, next) {
  console.log("Update Data Stripe Price: ");
  console.log(request.params.stripe_price);
  const username = request.user.oxyUsername;
  const password = request.user.password;
  const get_users_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users`;
  let new_traffic = 0;

  let config = {
    method: "get",
    url: get_users_url,
    headers: { Authorization: `Bearer ${login_token}` },
  };

  let res = await axios(config);
  let user_in_oxy = user_exists(res.data, username);
  console.log(user_in_oxy);

  //User does not exist so they must be created
  if (user_in_oxy === false) {
    user_in_oxy = create_user(username, password);
  }

  if (parseInt(request.params.stripe_price) === constants[0]) {
    new_traffic = 1;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[1]) {
    new_traffic = 2;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[2]) {
    new_traffic = 3;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[3]) {
    new_traffic = 4;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[4]) {
    new_traffic = 5;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[5]) {
    new_traffic = 6;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[6]) {
    new_traffic = 7;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[7]) {
    new_traffic = 8;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[8]) {
    new_traffic = 9;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[9]) {
    new_traffic = 10;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[10]) {
    new_traffic = 20;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[11]) {
    new_traffic = 30;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[12]) {
    new_traffic = 40;
  } else if (parseInt(request.params.stripe_price) === constants.prices_proxy[13]) {
    new_traffic = 50;
  }

  let new_traffic_limit = parseInt(user_traffic_limit) + new_traffic;
  const update_user_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users/${user_in_oxy}`;
  config = {
    method: "patch",
    url: update_user_url,
    headers: { Authorization: `Bearer ${login_token}` },
    data: {
      password: password, //passwrd needs to be receievd from mongo
      traffic_limit: new_traffic_limit, //same traffic limit
      lifetime: true,
      status: "active",
      auto_disable: false,
    },
  };

  res = await axios(config);
  console.log("Right before update mongo.");
  var d = new Date();
  var endMonth = d.getMonth();
  endMonth++;
  var endYear = d.getFullYear();
  var endDay = d.getUTCDate();

  for (var i = 0; i < 60; i++) {
    if (endMonth == 2) {
      if (endYear % 4 == 0) {
        // Leap Year
        if (endDay == 29) {
          endDay = 1;
          endMonth = 3;
        } else {
          endDay++;
        }
      } else {
        if (endDay == 28) {
          endDay = 1;
          endMonth = 3;
        } else {
          endDay++;
        }
      }
    } else if (
      endMonth == 1 ||
      endMonth == 3 ||
      endMonth == 5 ||
      endMonth == 7 ||
      endMonth == 8 ||
      endMonth == 10 ||
      endMonth == 12
    ) {
      if (endDay == 31) {
        if (endMonth == 12) {
          // change year
          endYear++;
          endMonth = 1;
          endDay = 1;
        } else {
          endMonth++;
          endDay = 1;
        }
      } else {
        endDay++;
      }
    } else {
      if (endDay == 30) {
        if (endMonth == 12) {
          // change year
          endYear++;
          endMonth = 1;
          endDay = 1;
        } else {
          endMonth++;
          endDay = 1;
        }
      } else {
        endDay++;
      }
    }
  }

  await User.findOneAndUpdate(
    {
      oxyUsername: username,
    },
    {
      $push: {
        resiOrders: `${
          d.getMonth() + 1
        }/${d.getUTCDate()}/${d.getFullYear()}:${endMonth}/${endDay}/${endYear}:${new_traffic}:${d.getTime()}`,
      },
      $set: {
        traffic_limit: new_traffic_limit,
      },
    }
  );

  console.log("Right after update mongo.");
  next();
}

async function check_old_data(request, response, next) {
  console.log("CHECKING FOR EXPIRED DATA.");
  let user = await User.find({ discordId: request.user.discordId });
  var d = new Date();
  var month = d.getMonth();
  month++;
  var year = d.getFullYear();
  var day = d.getUTCDate();

  for (var i = 0; i < user[0].resiOrders.length; i++) {
    var split = user[0].resiOrders[i].split(":");

    if (!user[0].expiredOrders.includes(user[0].resiOrders[i])) {
      console.log("Potentially expired order.");
      var endDate = split[1].split("/");
      var endMonth = Number.parseInt(endDate[0], 10);
      var endDay = Number.parseInt(endDate[1], 10);
      var endYear = Number.parseInt(endDate[2], 10);

      console.log(endMonth);
      console.log(endDay);
      console.log(endYear);

      if (
        year > endYear ||
        (month == endMonth && day >= endDay && year == endYear) ||
        (year == endYear && month > endMonth)
      ) {
        console.log("An order has expired.");
        login_oxy();

        var new_traffic_limit = user[0].traffic_limit;
        new_traffic_limit = new_traffic_limit - Number.parseInt(split[2]);
        user_traffic_limit = new_traffic_limit;

        const get_users_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users`;

        let config = {
          method: "get",
          url: get_users_url,
          headers: { Authorization: `Bearer ${login_token}` },
        };

        let res = await axios(config);
        let user_in_oxy = user_exists(res.data, user[0].oxyUsername);
        console.log(user_in_oxy);

        //User does not exist so they must be created
        if (user_in_oxy === false) {
          console.log("deleting data from user that does not exist");
        }

        const update_user_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users/${user_in_oxy}`;
        config = {
          method: "patch",
          url: update_user_url,
          headers: { Authorization: `Bearer ${login_token}` },
          data: {
            password: user[0].password, //passwrd needs to be receievd from mongo
            traffic_limit: new_traffic_limit, //same traffic limit
            lifetime: true,
            status: "active",
            auto_disable: false,
          },
        };

        res = await axios(config);
        await User.findOneAndUpdate(
          {
            oxyUsername: user[0].oxyUsername,
          },
          {
            $push: {
              expiredOrders: user[0].resiOrders[i],
            },
            $set: {
              traffic_limit: new_traffic_limit,
            },
          }
        );
      }
    }
  }

  next();
}

router.post("/access-user-data", cors(corsOptions), async (req, res) => {
  console.log("\nInside of access user data \n\n");
  console.log(req.user);
  res.json({
    user_traffic: user_traffic,
    user_traffic_limit: user_traffic_limit,
    //username: req.user.oxyUsername,
    //password: req.user.password,
  });
});

router.get("/access-discord-info", cors(corsOptions), async (req, res) => {
  res.status(200).json({ user: req.user });
  return res.end();
});

router.get(
  "/stripesuccess/:stripe_price",
  isAuthorized,
  login_oxy,
  update_data,
  get_users,
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
  login_oxy,
  get_users,
  check_old_data,
  (req, res) => {
    const destination = config.FRONTEND_DOMAIN + config.ROUTES.dashboard;
    res.redirect(destination);
    return res.end();
  }
);

module.exports.router = router;