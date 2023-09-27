import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
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


