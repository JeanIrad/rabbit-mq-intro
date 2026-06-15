import express from "express";
import RabbitMQClient from "./rabbitmq/client";

const app = express();

app.use(express.json());
const client = new RabbitMQClient();

app.post("/operate", async (req, res) => {
  await client.produce(req.body);
  res.send();
});

app.listen(4000, () => {
  console.log("App running on port: 4000");
  client.initialize();
});
