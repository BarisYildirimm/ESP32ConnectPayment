import systemUser from "../models/systemUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const data = await systemUser.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await systemUser.findOne({ email });
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
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ status: "UNSUCCES", message: "Something went Wrong!" });
  }
};

// export const signUp = async (req, res) => {
//   const { firstName, lastName, email, password, confirmPassword } = req.body;
//   try {
//     const existingUser = await systemUser.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ status: "UNSUCCES", message: "user already exist!" });
//     }
//     if (password !== confirmPassword) {
//       return res
//         .status(400)
//         .json({ status: "UNSUCCES", message: "Password Dont match!" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const result = await User.create({
//       email,
//       password: hashedPassword,
//       name: `${firstName} ${lastName}`,
//     });

//     const token = jwt.sign({ email: result.email, id: result._id }, "test", {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ result, token });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ status: "UNSUCCES", message: "something went wrong!" });
//   }
// };
