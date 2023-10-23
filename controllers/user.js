import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as AWSMethod from "./aws.js"
import mongoose from "mongoose";
import url from "url"

export const getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "UNSUCCES", message: "user dosen't exist." });
    }

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ status: "UNSUCCES", message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token: `Bearer ${token}` });
  } catch (error) {
    res
      .status(500)
      .json({ status: "UNSUCCES", message: "Something went Wrong!" });
  }
};

// multer version hatası nediyle eklemiyordu v2.10.0 ' a geçince sorun çözüldü.
export const signUp = async (req, res) => {
  try {
    AWSMethod.uploadSingle(req, res, async (err) => {
      if (err) {
        res.status(409).json({ message: err })
      }
      else {
        const { firstName, lastName, phone, email, password, confirmPassword } =
          req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ status: "UNSUCCES", message: "user already exist!" });
        }
        if (password !== confirmPassword) {
          return res
            .status(400)
            .json({ status: "UNSUCCES", message: "Password Dont match!" });
        }
        console.log("File:---->", req.file)
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          password: hashedPassword,
          selectedFile: req.file.location,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, "test", {
          expiresIn: "1h",
        });
        res.status(200).json({ result, token });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "UNSUCCES", message: "something went wrong!" });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const imageUrl = await User.find({ _id: mongoose.Types.ObjectId(id) }, {
    selectedFile: 1, _id: 0
  })
  console.log("IMAGEEE :", imageUrl)
  const imageParse = url.parse(imageUrl[0].selectedFile).pathname.slice(1);
  console.log("IMAGEPARSE :", imageParse)

  AWSMethod.deleteImageToAws(imageParse)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("User ID Not Found");

  // await User.findByIdAndDelete(id);
  res.json({ status: "SUCCES", message: "User Deleted!" })
}