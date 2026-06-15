import { Channel, Connection, connect } from "amqplib";
import config from "../config";
import Consumer from "./consumer";
import Producer from "./producer";

export default class RabbitMQClient {
  private producer: Producer;
  private consumer: Consumer;
  private connection;
  private producerChannel: Channel;
  private consumerChannel: Channel;

  async initialize() {
    try {
      this.connection = await connect(config.rabbitMQ.url);
      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();
      const { queue: replyQueue } = await this.consumerChannel.assertQueue("", {
        exclusive: true,
      });
      this.producer = new Producer(this.producerChannel, replyQueue);
      this.consumer = new Consumer(this.consumerChannel, replyQueue);

      await this.consumer.consumeMessages();
    } catch (error) {
      console.log("error initializing...", error);
    }
  }

  async produce(data: any) {
    return await this.producer.produceMessage(data);
  }
}
