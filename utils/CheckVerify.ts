// import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// export const checkOut = async(req:Request,res:Response,next:NextFunction)=>{
//     try {
//         const Check = req.headers.authorization
//         if(Check){
//             const realCheck = Check.split("")[1]
//             if(realCheck){
// jwt.verify(realCheck,"secret", async(err,payload:any)=>{
//     if(err){
//         return res.status(404).json({
//             message: "jwt payload error"
//         });
//     } else{
//         const user = await prisma.authModel.findunique({
//             where: {id: payload}
//         });
//         if(user?.role == "Check"){
//             next();
//         }else{
//             return res.status(404).json({
//                 message: "You're not Authorized to handle this Page If you are not Authorized"
//             });
//         };
//     };
// });
//      }else{
//                 return res.status(404).json({
//                     message: "Authorized gotten not correct"
//                 });
//             };
//         }else{
//             return res.status(404).json({
//                 message: "invalid Check"
//             });
//         };
//     } catch (error) {
//         return res.status(404).json({
//             message: "Error Found"
//         });
//     };

// };

export const checkOut = async(req:any,res:Response,next:NextFunction)=>{
   try {
    const check =req.headers.authorization;

    if(check){
        jwt.verify(check, "secret",(error:any, payload:any)=>{
            if(error){
                return res.status(401).json({message:"checkOut is not vaid"});
            }else{
                req.user = payload;
                next()
            }
        });
    }else{
return res.status(404).json({
    message: "Error with checkOut",
})
    }
   } catch (error) {
    return res.status(404).json({
        message:"Big Error"
    })
   }
};

