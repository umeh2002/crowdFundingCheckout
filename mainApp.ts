import express, { Application,Request, Response } from 'express';
import cors from "cors"
import checkout from "./router/checkoutRouter" 

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

app.use("/api/checkout", checkout)
}