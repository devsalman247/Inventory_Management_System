import { Strategy } from "passport-local";
import User from "../models/User";

const myStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            errors: { message: "Email or Password is invalid" },
          });
        }
        return done(null, user);
      })
      .catch(done);
  }
);

export default myStrategy;
