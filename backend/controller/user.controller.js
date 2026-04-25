import User from "../models/user.model.js";
import { asyncHandler } from "../utility/asyncHandler.utility.js";
import { ErrorHandler } from "../utility/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ username });
  if (user) {
    return next(new ErrorHandler("user already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = `https://api.dicebear.com/9.x/lorelei/svg`;

  const newUser = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar,
  });

  const tokenData = {
    _id: newUser?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 7,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      newUser,
      token,
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("username or password is missing", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new ErrorHandler("please enter a vlid username or password", 400),
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(
      new ErrorHandler("please enter a vlid username or password", 400),
    );
  }

  const tokenData = {
    _id: user?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 7,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      login: true,
      user,
      token,
    });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const profile = await User.findById(userId);

  res.status(200).json({ success: true, profile });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      logout: true,
    });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });
  res.status(200).json({
    success: true,
    otherUsers,
  });
});
