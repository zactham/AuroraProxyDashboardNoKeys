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
  console.log("Connected to MongoDB in adminDashboard.js")
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
    //res.redirect("/auth"); // if user not logged in should redirect to login page
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
    const user = await User.find({ discordId: request.params.wantedUser });
    console.log("GET USERS");
    const username = user[0].oxyUsername;
    const password = user[0].password;
    const get_users_url = `https://residential-api.oxylabs.io/v1/users/${process.env.OXY_ID}/sub-users`;
    const config = {
        method: "get",
        url: get_users_url,
        headers: { Authorization: `Bearer ${login_token}` },
    };

    let res = await axios(config);
    // console.log("STATUS: " + res.status);
    // console.log("RES: " + res.data);

    console.log("RIGHT HERE: ")
    
    

    //Display all the user info
    display_user(res.data, username);

    next();
}

async function display_user(usersList, username) {
  // TODO if userList is undefined or []
  const users = Object.values(usersList).filter((user_object) =>
    user_object.username.includes(username)
  );
  //   TODO users could = [] so [0].traffic fails
  

  user_traffic = users[0].traffic;
  console.log("USER TRAFFIC: " + user_traffic); // Will this work if many people using dashboard so user traffic might be changing? Or is the user traffic linked to the session?
  user_traffic_limit = users[0].traffic_limit;
  console.log("USER TRAFFIC LIMIT: " + user_traffic_limit);
}


router.post("/access-wanted-user-data/:wantedUser", async (req, res) => {
  console.log("\nInside of access wanted user data \n\n");
  const user = await User.find({ discordId: req.params.wantedUser });
  console.log("WANTED USER: ")
  console.log(user[0])

  res.json({
    user_traffic: user_traffic,
    user_traffic_limit: user_traffic_limit,
    username: user[0].oxyUsername,
    password: user[0].password,
    discordUsername: user[0].username,
  });
});

router.get(
  "/:wantedUser",
  isAuthorized,
  login_oxy,
  get_users,
  (req, res) => {
    const destination = config.FRONTEND_DOMAIN + `/admindashboard/${req.params.wantedUser}`;
    res.redirect(destination);
    return res.end();
  }
);

module.exports = router;