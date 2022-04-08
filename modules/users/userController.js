import User from "./userModel.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    if (password != user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, admin } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ message: "User already exist." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const user = await User.create({
      email,
      password,
      name: `${firstName} ${lastName}`,
      admin,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
