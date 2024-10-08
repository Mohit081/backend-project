import { User } from "../models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJwt = asyncHandler(async (req , _ , next) => {
    try {
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","") 
       
       if(!token){
        throw new ApiError(401,"unauthorized request")
       }

       const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
       
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
       
       if(!user){
        throw new ApiError(401,"Invalid Access token")
       }

       req.user = user ;
       console.log("user login hai")
       next ()


    } catch (error) {
        throw new ApiError(401,"Invalid access token")
    }
})