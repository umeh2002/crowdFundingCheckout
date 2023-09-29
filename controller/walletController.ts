import { Response } from "express";
import {HTTP} from "../Error/mainError"
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient()

export const payWithWallet = async (req : any, res : Response) =>{
    try {
        // const {id} = req.user
        // const {abegID} = req.params
        const { email, note, name, amount } = req.body

            const payment = await prisma.crowdCheckOut.create({
                data : {
                    email, note, name, amount, abegID : "", userID : ""
                }
            })
    
            return res.status(HTTP.OK).json({
                message : "Payed Successfully",
                data : payment
            })

    } catch (error : any) {
        return res.status(HTTP.BAD_REQUEST).json({
            message : "Error",
            data : error.message
        })
    }
}