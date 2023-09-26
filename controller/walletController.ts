import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {HTTP} from "../Error/mainError"

const prisma = new PrismaClient()

export const payWithWallet = async (req : Request, res : Response) =>{
    try {
        const {id} = req.users
        const {abegID} = req.params
        const { email, note, name, amount } = req.body

        const payment = await prisma.checkOut.create({
            data : {
                email, note, name, amount, abegID, userID : ""
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