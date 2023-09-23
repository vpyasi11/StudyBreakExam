const express = require("express");
const userRouter = express.Router();
const authorizationHeader = require("../middleware/authJWT");

const {
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
} = require("../controllers/user.controller");

userRouter.get("/", getAllUser);
userRouter.post("/register", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/byname/:name", authorizationHeader, getUserByName);
userRouter.get("/byid/:id", authorizationHeader, getUserById);
userRouter.get("/byrole/:role", authorizationHeader, getUserByRole);
userRouter.post("/resetPassword", authorizationHeader, resetPassword);
userRouter.post("/resetMail/:id", authorizationHeader, resetEmail);
userRouter.delete("/:id", authorizationHeader, deleteUser);
userRouter.post("/updateuserstatus", updateUserStatus);
userRouter.get("/getusercount", getActiveUSersCount);

module.exports = userRouter;
