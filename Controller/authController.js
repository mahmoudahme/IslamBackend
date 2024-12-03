import bcrypt from "bcrypt";
import { ApiError } from "../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import User from "../Model/User.js";
import dotenv from "dotenv";
// import OTP from "../Model/OTP.js";
// import { mailSender } from "../Utils/mailSender.js";
dotenv.config({ path: "config/config.env" });
// import Randomstring from "randomstring";
// function generateOTP() {
//   return Randomstring.generate({
//     length: 4,
//     charset: "numeric",
//   });
// }
///////////////////////////// Authentication SYSTEM ////////////////////////////////////////
// export const verifyOTP = async (req, res, next) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email: email });
//     const userOtp = await OTP.findOne({ email: email });
//     if(userOtp){
//       if(userOtp.otp == otp){
//         await User.findByIdAndUpdate(user.id, {otp : otp , recieved: otp }, { new: true });
//         await OTP.findOneAndDelete({email : email}) ;
//         res
//           .status(200)
//           .json({ success: true, message: "OTP verification successful" });
//       }else{
//         res.status(400).json({ success: false, error: "Invalid OTP" });
//       }
//     }else{
//       if (user.otp == otp) {
//         await User.findByIdAndUpdate(user.id, { recieved: otp }, { new: true });
//         res
//           .status(200)
//           .json({ success: true, message: "OTP verification successful" });
//       } else {
//         res.status(400).json({ success: false, error: "Invalid OTP" });
//       }
//     }
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };
export const register = async (req, res, next) => {
  try {
    //generate new password
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      // const otp = generateOTP();
      // await mailSender({
      //   to: email,
      //   subject: "Verification Email",
      //   message: `<h1>Please confirm your OTP</h1>
      //          <p>Here is your OTP code: ${otp}</p>`,
      // });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create new user
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        // otp: otp,
        isAdmin: req.body.isAdmin,
      });
      await newUser.save();
      res.status(200).json({ message: "New User Created", userdata: newUser });
    } else if (user) {
      if (user.apprived) {
        res.status(400).json({
          success: false,
          message: "Sorry this Email is used before ",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "wait until admin approve your account",
        });
      }
    }
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, 404));
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError("User not found!", 401));
    } else {
      if (user.apprived) {
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect) {
          return next(new ApiError("password isn't correct", 401));
        }

        const token = JsonWebToken.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("accessToken", token, { httpOnly: true, secure: false , sameSite: "lax" })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin, token: token });
      } else {
        res.status(400).json({
          success: false,
          message: "wait until admin approve your account",
        });
      }
    }
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, 500));
  }
};
export const logout = async (req, res, next) => {
  try {
    // Clear the token from the cookies
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
// export const forgetPassword = async (req, res, next) => {
//   try{
//     const {email} = req.body ;
//     const otp = generateOTP() ;
//     const user = await User.findOne({email}) ;
//     if(!user) {
//       return next(new ApiError(`There is no user with this email`, 404)) ;
//     }else{
//       await mailSender({
//         to: email,
//         subject: "Verification Email",
//         message: `<h1>Please confirm your OTP</h1>
//                <p>Here is your OTP code: ${otp}</p>`,
//       });
//       const newOtp = new OTP({email : email , otp : otp });
//       await newOtp.save() ;
//       res.status(200).json({message : "OTP sent to your email"}) ;
//     }
//   }catch(error){
//     return next(new ApiError(`System Error ${error}`, 404));
//   }
// };
export const changePassword = async(req , res , next) => {
  try{
    const {email , newPassword} = req.body ;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne({email}, {password : hashedPassword}) ;
    res.status(200).json({message : "Password changed successfully"}) ;
  }catch(error){
    return next(new ApiError(`System Error ${error}`, 404));
  }
};
