import express, { Request, Response } from "express";
import https from "https";
import { HTTP } from "../Error/mainError";
import { PrismaClient } from "@prisma/client/edge";
import { publishConnection } from "../utils/connection";
import { checkOut } from "../utils/CheckVerify";

const prisma = new PrismaClient()

export const checkOutWithPayStack = async (req: Request, res: Response) => {
  try {
    const {email,amount} = req.body;
    const {abegID} = req.params

    const params = JSON.stringify({
      email,
      amount: parseInt(amount),
      abegID
    });
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const ask = https
      .request(options, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(HTTP.OK).json({
            message: "Payment successful",
            data: JSON.parse(data),
          });
        });
      })
      .on("error", (error) => {
        console.error(error);
      });

    ask.write(params);
    ask.end();
    publishConnection("checkouted", params)
  } catch (error:any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error making Payment",
      data:error.message
    });
  }
};

