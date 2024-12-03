import JsonWebToken from "jsonwebtoken";
import {ApiError} from "../Utils/apiError.js" ;
import dotenv from "dotenv" ;
dotenv.config({path : 'config/config.env'})

//export const verifyToken = (req , res , next)=>{
 //   const token = req.cookies.accessToken;
   /// if (!token) {
    //  return next(new ApiError(401, "You are not authenticated!"));
   // }
   // JsonWebToken.verify(token, process.env.JWT, (err, user) => {
    //  if (err) return next(new ApiError( "You are not authorized!" ,403));
     // req.user = user;
     // next();

   // });
 // };
  
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];  // أخذ الـ token من الهيدر

    if (!token) {
        return res.status(401).json({ message: "You Are not User " });
    }

    // إزالة كلمة "Bearer " من الـ token
    const tokenWithoutBearer = token.split(' ')[1];

    JsonWebToken.verify(tokenWithoutBearer, process.env.JWT, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid or expired" });
        }
        req.user = user;  // إضافة معلومات المستخدم إلى الطلب
        next();  // المتابعة إلى الدالة التالية
    });
};
  export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id) {
        next();
      } else {
        return next(new ApiError( "You are not authorized!" ,403));
      }
    });
  };
  export const verifyUserAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(new ApiError( "You are not authorized!" ,403));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(new ApiError( "You are not authorized!" ,403));
      }
    });
  };
