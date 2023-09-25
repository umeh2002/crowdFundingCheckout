import amqp from "amqplib"

const amqpServer ="amqp://localhost:5672"
export const publishConnection =async(queue:string, data:any)=>{
    try {
        const connect =await amqp.connect(amqpServer)
        const channel =await connect.createChannel()

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    } catch (error:any) {
        console.log(error)
    }
}