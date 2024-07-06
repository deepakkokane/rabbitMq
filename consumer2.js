const RabbitMQService = require("./rabbitmq");
async function userCreated() {
  const exchange = "user_exchange";

  const mq = new RabbitMQService();

  await mq.connect();

  await mq.consume(exchange, (message) => {
    console.log(message);
  });
}

userCreated();
