const User = require("../model/userModel");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: users,
    });

  } catch (error) {
    console.log("Error in getUser controller", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching users",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = await User.create({
      name,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "User added successfully",
      data: newUser,
    });

  } catch (error) {
    console.log("Error in addUser controller", error);
    return res.status(500).json({
      success: false,
      message: "Error while adding user",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.log("Error in updateUser controller", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });

  } catch (error) {
    console.log("Error in deleteUser controller", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting user",
    });
  }
};