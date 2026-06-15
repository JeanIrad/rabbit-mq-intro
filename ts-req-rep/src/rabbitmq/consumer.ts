import { Channel, ConsumeMessage } from "amqplib";

export default class Consumer {
  constructor(
    private channel: Channel,
    private replyQueue: string,
  ) {}

  async consumeMessages() {
    console.log("Ready to consume messages...");
    await this.channel.consume(
      this.replyQueue,
      function (message: ConsumeMessage) {
        console.log(
          `The message is: ${JSON.parse(message.content.toString())}`,
        );
      },
    );
  }
}
