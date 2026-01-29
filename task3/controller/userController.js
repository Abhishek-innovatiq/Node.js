let users = [
  { id: 1, name: "Rahul", email: "rahul@gmail.com" },
  { id: 2, name: "Amit", email: "amit@gmail.com" },
  { id: 3, name: "Abhishek", email: "ab@gmail.com" },
  { id: 4, name: "Aashish", email: "as@gmail.com" }
];

exports.getUSer = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "user data fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.log("getting error in getUser controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error ",
    });
  }
};

exports.addUSer = async (req, res) => {
      try{
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  return res.status(201).json({
      success: true,
      message: "user Successfully added",
      data: newUser,
  });
}
catch (error) {
    console.log("getting error in addUser controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error in addUser controller",
    });
  };
};


exports.updateUser = async (req, res) => {
      try{
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  user.name = name;
  user.email = email;

 return res.status(201).json({
      success: true,
      message: "user Successfully updated",
      data: user,
  });
}
catch (error) {
    console.log("getting error in updateUser controller", error);
    return res.status(500).json({
      success: false,
      messsage: "getting error in updateUser controller",
    });
  };
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const deletedUser = users.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser[0]
    });

  } catch (error) {
    console.log("getting error in deleteUser controller", error);
    return res.status(500).json({
      success: false,
      message: "getting error in deleteUser controller"
    });
  }
};
