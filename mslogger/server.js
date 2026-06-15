const express = require("express");
const bodyParser = require("body-parser");
const Producer = require("./producer");

const producer = new Producer();

const app = express();
app.use(bodyParser.json("application/json"));

app.post("/send-log", async (req, res) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
});

app.listen(3000, () => {
  console.log(`Server started on PORT 3000`);
});
