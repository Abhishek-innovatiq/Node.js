const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const userExist = await User.findOne({ Email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    await User.create({
      Name,
      Email,
      Password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};