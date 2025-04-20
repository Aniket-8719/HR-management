const { validate } = require("email-validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (e) => validate(e),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["librarian", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
