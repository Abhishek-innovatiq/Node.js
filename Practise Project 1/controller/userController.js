const user = require("../model/User.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const emailSender = require("../utils/emailSender.js");
const imageUpload = require("../utils/uploadImage.js");
require("dotenv").config()

exports.createUser = async (req, res) => {
  try {
    const { Name, Email, Age, Confirm_Password, Password } = req.body;

    if (!Name || !Email || !Age || !Confirm_Password || !Password) {
      return res.status(400).json({
        success: false,
        message: "please fill all field data can not be empty",
      });
    }

    const emailIsExist = await user.findOne({ Email });
    if (emailIsExist) {
      return res.status(400).json({
        success: false,
        message: "this email is already exist",
      });
    }

    if (Confirm_Password !== Password) {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }

    let imageUrl = ""; 
    if (req.files && req.files.image) {
      const image = req.files.image;
      const uploaded = await imageUpload(image.tempFilePath);
      imageUrl = uploaded.secure_url;
    }

    const newUser = await user.create({
      Name,
      Email,
      Age,
      Confirm_Password,
      Password,
      image: imageUrl,
    });

    await emailSender(Name, Email);

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: newUser,
    });

  } catch (error) {
    console.log("getting error in createUser controller", error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};


exports.getUSer = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const isExist = await user.findById(id);
    if (!isExist) {
      return res.status(400).json({
        sucess: false,
        messsage: "this user is not in your db",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user data fetched Successfully",
      data: isExist,
    });
  } catch (error) {
    console.log("getting error in getUser controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error ",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, Name, Email, Age, Confirm_Password, Password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const isExist = await user.findById(id);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "this user is not in your db",
      });
    }

    const updateUser = await user.findByIdAndUpdate(
      id,
      {
        Name,
        Email,
        Age,
        Confirm_Password,
        Password,
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "user is updated",
      data: updateUser,
    });
  } catch (error) {
    console.log("getting error in updateUser controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error ",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "please check the id this id is not in your db",
      });
    }

    await user.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "user deleted succesfully",
    });
  } catch (error) {
    console.log("getting error in deleteUser controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error ",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        sucess: false,
        message: "please write a valid email or password",
      });
    }

    const isExist = await user.findOne({ Email });
    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "this user not in our db",
      });
    }
    if (Password !== isExist.Password) {
      return res.status(400).json({
        success: false,
        message: "please enter a valid password",
      });
    }

    const payload = {
      id : isExist._id,
      Email : isExist.Email
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET)
    res.cookie('token',token);

    return res.status(201).json({
      success: true,
      message: "user login succesfull",
    });
  } catch (error) {
    console.log("getting error in login controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error ",
    });
  }
};

exports.logout = (req, res) => {
  try {
   
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful, cookie cleared ✅",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while logging out",
    });
  }
};
