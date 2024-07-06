const amqp = require("amqplib");

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }
  async connect() {
    this.connection = await amqp.connect("amqp://admin:admin@localhost:5672");
    this.channel = await this.connection.createChannel();
  }

  async publish(exchange, message) {
    if (!this.connection) this.connect();
    await this.channel.assertExchange(exchange, "fanout", { durable: false });
    await this.channel.publish(
      exchange,
      "",
      Buffer.from(JSON.stringify(message))
    );
  }

  async consume(exchange, cb) {
    if (!this.connection) this.connect();
    await this.channel.assertExchange(exchange, "fanout", { durable: false });
    const q = await this.channel.assertQueue("", { exclusive: true });

    this.channel.bindQueue(q.queue, exchange, "");
    this.channel.consume(q.queue, (msg) => {
      console.log();

      cb(JSON.parse(msg.content.toString()));
    });
  }

  async closeConnection() {
    await this.connection.close();
  }
}

module.exports = RabbitMQService;
