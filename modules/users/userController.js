import jwt from "jsonwebtoken";

import User from "./userModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    registrationPlates,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ message: "User already exist." });
    }

    var validatePassRegex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );

    if (!validatePassRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPass,
      registrationPlates,
    });

    await newUser.save();

    const user = { firstName, lastName, email, registrationPlates };

    const token = jwt.sign(user, process.env.TOKEN_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { firstName, lastName, registrationPlates } = existingUser;
    const user = { firstName, lastName, email, registrationPlates };

    const token = jwt.sign(user, process.env.TOKEN_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
