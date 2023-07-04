var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const RegisterSchema = require("./Schema.js");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    RegisterSchema.findOne({ email })
      .then(async (user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect email " });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Password is incorrect." });
        }

        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  })
);

//persists the data inside session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// fetches sessiondetails using session id
passport.deserializeUser(function (id, done) {
  RegisterSchema.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
