const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterSchema = require("./Schema.js");
const CitySchema = require("./SchemaCity.js");
const bcrypt = require("bcrypt");
const session = require("express-session");
// const sessionStore = require("express-session");
const MongoStore = require("connect-mongo"); // we need to store session in this mongodb
const passport = require("passport");
require("./passport.js");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://tummoc:tummoc@cluster0.khoyafp.mongodb.net/?retryWrites=true&w=majority",
      collectionName: "sessiondb",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //for one day
  })
);

mongoose
  .connect(
    "mongodb+srv://tummoc:tummoc@cluster0.khoyafp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello world!");
});

//Registering the users
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    let checkUser = await RegisterSchema.findOne({ email });

    if (checkUser) {
      res.status(400).send("User with given email alreay exist");
    }
    if (password !== confirmpassword) {
      res.status(402).send("password and confirmpassword should be same");
    }

    // Generate a hash of the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmhashedPassword = await bcrypt.hash(confirmpassword, 10);

    let newUser = new RegisterSchema({
      name,
      email,
      password: hashedPassword,
      confirmpassword: confirmhashedPassword,
    });
    await newUser.save();
    res.status(200).send("User Registered Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
});

//login using passport middleware
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ message: info.message });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      // // Set the user ID in the session
      // req.session.user_id = user._id.toString();
      // // Save the session to persist the custom field
      // await req.session.save();

      // console.log(req.session);
      return res.json(req.session);

      // return res.json(user);
    });
  })(req, res, next);
});

// createing cities to already registered Users
app.post("/city", async (req, res) => {
  try {
    const { user_id, city } = req.body;

    let checkUser = await CitySchema.findOne({ user_id });

    if (checkUser) {
      res.status(400).send("City already assinged to user");
    }

    let newUserCity = new CitySchema({
      user_id,
      city,
    });
    await newUserCity.save();
    res.status(200).send("City for the User Registered Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// Get cities with associated users-using aggregate and populate
app.get("/cities", async (req, res) => {
  try {
    const cities = await CitySchema.aggregate([
      {
        $lookup: {
          from: "registerDB",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          population: 1,
          user: {
            name: 1,
          },

          user_id: 1,
          city: 1,
        },
      },
    ]);

    res.status(200).json({ cities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve cities" });
  }
});

app.listen({ port: 5000 }, () => console.log("server running"));
