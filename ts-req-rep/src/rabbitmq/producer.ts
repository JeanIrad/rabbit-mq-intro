import { Channel } from "amqplib";
import config from "../config";
import { randomUUID } from "crypto";

export default class Producer {
  constructor(
    private channel: Channel,
    private replyQueue: string,
  ) {}

  async produceMessage(data: any) {
    const uuid = randomUUID();
    console.log("correlationID>>", uuid);
    this.channel.sendToQueue(
      config.rabbitMQ.queues.rpcQueue,
      Buffer.from(JSON.stringify(data)),
      {
        replyTo: this.replyQueue,
        correlationId: uuid,
      },
    );
  }
}
