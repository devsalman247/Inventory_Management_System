import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secret } from "../config/env";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is required."],
    },
    email: {
      type: String,
      required: [true, "is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    hash: {
      type: String,
      required: [true, "is required"],
    },
    requests: [
      {
        requestId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        status: {
          type: Number,
          enum: [
            0, //requested
            1, //pending
          ],
        },
      },
    ],
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.setPassword = function () {
  this.salt = bcrypt.genSaltSync();
  this.hash = bcrypt.hashSync(this.hash, this.salt);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
    },
    secret,
    { expiresIn: "4h" }
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    name: this.name,
    email: this.email,
    token: this.generateJWT(),
  };
};

export default mongoose.model("User", UserSchema);
