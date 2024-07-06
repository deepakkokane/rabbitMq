const RabbitMQService = require("./rabbitmq");

async function userCreated() {
  const message = {
    to: "normalUser@gmail.com",
    from: "harish@gmail.com",
    subject: "Thank you!!",
    body: "Hello ABC!!",
  };

  const mq = new RabbitMQService();
  await mq.connect();

  await mq.publish("user_exchange", message);

  setTimeout(async () => {
    await mq.closeConnection();
  }, 500);
}

userCreated();
