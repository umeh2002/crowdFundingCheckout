import express, { Application,Request, Response, NextFunction } from 'express';
import cors from "cors"
import checkout from "./router/checkoutRouter" 
import { HTTP, mainError } from './Error/mainError';
import {HandleError} from "./Error/HandleError"

export const mainApp =(app:Application)=>{
app.use(express.json())
app.use(cors())

app.get("/", (req:Request, res:Response)=>{
try {
    return res.status(200).json({
        message:"Success",
    })
} catch (error:any) {
    return res.status(404).json({
        message:"Error",
        data:error.message
    })
}
})

app.all("*", (req : Request, res : Response, next : NextFunction)=>{
    next(
        new mainError({
            name : "Router Error",
            message : "this router path is not correct",
            status : HTTP.BAD_REQUEST,
            success : false,
        })
    )
})

app.use(HandleError)

app.use("/api", checkout)
}