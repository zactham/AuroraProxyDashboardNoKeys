const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const User = require("../models/DiscordUser");
const config = require("../config.json");

passport.serializeUser((user, done) => {
  console.log("Serializing User");
  done(null, user.id);
  //done(null, user._id);
  
});

passport.deserializeUser(async (id, done) => {
  //console.log("Deserializing User");
  // console.log("got here");
  const user = await User.findById(id);
  console.log(id);
  console.log(user);
  // console.log("should be getting user at some point \n\n\n", );
  if (user) {
    done(null, user);
  } else {
    console.log("NO USER FOUND \n\n");
  }
});

passport.use( 
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Try of passport.use")
        const user = await User.findOne({ discordId: profile.id });
        if (user) {
          console.log("Should be setting user: ", user);
          done(null, user); // uses passport serializer function and attaches users session into request object
          return;
        }
        const username = usernameGenerator();
        const password = passwordGenerator();
        let newUser;
        if (profile.avatar) {
          newUser = await User.create({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
            email: profile.email,
            oxyUsername: username,
            password: password,
            resiOrders: [],
            order: [],
            expiredOrders: [],
            traffic_limit: 0,
          });
        } else {
          newUser = await User.create({
            discordId: profile.id,
            username: profile.username,
            avatar: "0",
            email: profile.email,
            oxyUsername: username,
            password: password,
            resiOrders: [],
            order: [],
            expiredOrders: [],
            traffic_limit: 0,
          });
        }
        console.log("Saving new user.")
        const savedUser = await newUser.save(); // saves a new user
        done(null, savedUser);
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);

function usernameGenerator() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function passwordGenerator() {
  var length = 15,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}