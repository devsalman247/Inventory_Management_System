import { Router } from "express";
import passport from "passport";
import auth from "../auth";
import strategy from "../../config/passport";
import User from "../../controllers/User";
import {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} from "express-http-response";

const router = Router();

passport.use(strategy);

router.post("/signup", (req, res, next) => {
  const { name, email, password, about } = req.body;
  if (!email || !password || !name || !about) {
    return next(
      new BadRequestResponse({ message: "Please provide all input fields!" })
    );
  }
  const user = new User({
    name,
    email,
    about,
    requests: [],
    friends: [],
    groups: [],
    blocked: [],
    archivedChats: [],
  });
  user.hash = password;
  user.setPassword();
  user
    .save()
    .then((data) => {
      if (!data) {
        next(
          new BadRequestResponse({ message: "Signed up failed.Try again!" })
        );
      }
      next(new OkResponse(user.toAuthJSON()));
    })
    .catch((err) => {
      next(new BadRequestResponse(err.message));
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(
      new BadRequestResponse({
        message: "Email and password field must be provided to login.",
      })
    );
  } else {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        next(new BadRequestResponse(err.message));
      }
      if (user) {
        next(new OkResponse({ user: user.toAuthJSON() }));
      } else {
        next(new UnauthorizedResponse(info));
      }
    })(req, res, next);
  }
});

router.get("/profile", auth.verifyToken);

router.post("/search", auth.verifyToken);

export default router;
