require("dotenv").config();
const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/adam-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
// Help Command

app.command("/adam-help", async ({ command, ack, respond }) => {
  await ack();
  await respond({text: "Hello this bot provides commands that you can type in for an output. For example type in /adam-catfact for a free catfact"
  });
});

app.command("/adam-catfact", async ({ command, ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/adam-joke", async ({ command, ack, respond }) => {
  await ack();

  try {
    const responded = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${responded.data.setup}

${responded.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});
app.command("/adam-color", async ({ command, ack, respond }) => {
  await ack();
  await respond({text: "Adam's favorite color is blue"
  });
});
app.command("/adam-sport", async ({ command, ack, respond }) => {
  await ack();
  await respond({text: "Adam's favorite sport is track & field specifically discus"
  });
});