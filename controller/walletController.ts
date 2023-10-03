import { Response } from "express";
import {HTTP} from "../Error/mainError"
import { PrismaClient } from "@prisma/client";
import axios from "axios"
import { publishConnection } from "../utils/connection";

const prisma = new PrismaClient()

const URL:string ="https://crowded-auth.onrender.com"

export const payWithWallet = async (req : any, res : Response) =>{
    try {
        const {id} = req.user
        const {abegID} = req.params
        const { email, note, name, amount } = req.body

        const options={
            method:"GET",
            url:`${URL}/api/${id}/single-account`
        }
       

        const wallet:any =await axios.request(options).then((res) => {
            return res.data.data
        })

        console.log(wallet.profile.walletBalance)

        console.log("name",name)

        console.log("email",email)

        console.log(typeof amount)

           if (wallet.profile.walletBalance > amount) {
            const payment = await prisma.crowdCheckOut.create({
                data : {
                    email, note, name, amount:parseInt(amount), abegID, userID :id
                }
            })
            publishConnection("checkouted", payment)
            return res.status(HTTP.OK).json({
                message : "Payed Successfully",
                data : payment
            })
           } else {
            return res.status(HTTP.BAD_REQUEST).json({
                message : "insufficient funds",
            })
           }

    } catch (error : any) {
        return res.status(HTTP.BAD_REQUEST).json({
            message : "Error",
            data : error.message
        })
    }
}