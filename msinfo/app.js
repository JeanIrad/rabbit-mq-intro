const amqp = require("amqplib");

async function consumeMessage() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange("logExchange", "direct");

  const queue = await channel.assertQueue("infoQueue");
  await channel.bindQueue(queue.queue, "logExchange", "Info");

  channel.consume(queue.queue, (message) => {
    const data = JSON.parse(message.content);
    console.log("received>>>> ", data);
    channel.ack(message);
  });
}

consumeMessage();
