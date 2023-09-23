const userModel = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN;

// apis
// registration
const createUser = async (req, res) => {
  const { username, password, email, role } = req.body;
  const encodePass = await bcrypt.hash(password, 10);
  // console.log(encodePass)

  const userObj = {
    username: username,
    password: encodePass,
    email: email,
    role: role,
  };
  try {
    const emailChecking = await userModel.find({ email });
    //console.log(emailChecking[0].email, email);
    if (emailChecking[0]?.email === email) {
      return res.status(200).json({
        msg: `${email} already exist`,
      });
    } else {
      let data = await userModel(userObj).save();
      // console.log(userObj);
      return res.status(200).json({
        msg: `${email} is registerd successfully`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: `${error}`,
    });
  }
};

// getAllUser
const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find({});
    return res.status(200).json({ allUser });
  } catch (error) {
    return res.status(400).json({ msg: `${error}` });
  }
};

// login
// const setUser = (payload) => {
//   return jwt.sign({ payload }, secret, { expiresIn: "12h" });
// };

// const getUser = (token) => {
//   return jwt.verify(token, secret);
// };

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // const userpass = { password }
  try {
    const data = await userModel.findOne({ email });
    // console.log(data)

    if (data) {
      if (await bcrypt.compare(password, data.password)) {
        // const token = setUser(data);
        const token = jwt.sign({ data }, process.env.JWT_TOKEN, {
          expiresIn: "12h",
        });
        // res.cookie("uid",token)
        // res.setHeader("JWT", token);
        // console.log(getUser(token))

        return res.json({
          message: `${data.username} logged in successfully`,
          token: token,
          username: data.username,
          role: data.role,
        });
      }
      return res.json({
        message: `Incorrect password`,
      });
    }
    return res.json({
      message: "User doesn't exist or Incorrect email",
    });
  } catch (error) {
    console.log(error);
    return res.send("SOMETHING WENT WRONG !");
  }
};

// getSingleuser- by username/email
const getUserByName = async (req, res) => {
  const username = req.params.name;

  try {
    const user = await userModel.findOne({ username });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ msg: `${error}` });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findOne({ _id: id });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ msg: `${error}` });
  }
};

// getUserByRole
const getUserByRole = async (req, res) => {
  const role = req.params.role;

  try {
    const user = await userModel.find({ role });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ msg: `${error}` });
  }
};

// forgotPassword
const resetPassword = async (req, res) => {
  const email = req.body.email;
  const newPass = req.body.newPassword;
  //confirm password

  try {
    const data = await userModel.findOne({ email });
    if (data) {
      encodePass = await bcrypt.hash(newPass, 10);
      await userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: encodePass } }
      );
      return res.json({
        message: `Password Updated Sucessfully`,
      });
    }
    return res.json({
      message: "User doesn't exist or Incorrect email",
    });
  } catch (error) {
    return res.status(400).json({ msg: `${error}` });
  }
};

// reset Email
const resetEmail = async (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email;
  // const password = req.body.password

  try {
    const data = await userModel.findOne({ _id: id });
    if (data) {
      await userModel.findOneAndUpdate(
        { _id: id },
        { $set: { email: newEmail } }
      );
      return res.json({
        message: `${newEmail} Updated Sucessfully`,
      });
    }
    return res.json({
      message: "User doesn't exist or Incorrect ID",
    });
  } catch (error) {
    return res.status(400).json({ msg: `${error}` });
  }
};

// deleteUser
// editUser-    cp
// deleteUser
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOneAndDelete({ _id: id });
    // console.log(`User with id ${id} is deleted`);
    res.status(200).json({ msg: `${id} deleted` });

    if (!user) {
      return res.status(404).json({
        msg: `No user found ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUserStatus = async (req, res) => {
  let id = req.body.id;
  let userStatus = req.body.status;
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await userModel.updateOne({ _id: id }, { $set: { status: userStatus } });
    });
    session.endSession();

    res.status(201).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getActiveUSersCount = async (req, res) => {
  try {
    const userCount = await userModel.aggregate([
      { $match: { status: true } },
      { $count: "active_users" },
    ]);
    res.send(userCount);
  } catch (error) {
    console.log("Error:", error);
    // console.log(error);
    res.status(400).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  getAllUser,
  userLogin,
  getUserByName,
  getUserByRole,
  getUserById,
  resetPassword,
  resetEmail,
  deleteUser,
  updateUserStatus,
  getActiveUSersCount,
};
