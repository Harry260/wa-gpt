import qrcode from "qrcode-terminal";
import WhatsApp from "whatsapp-web.js";
import discordLog from "./libs/discord-log.js";
import { getResponse } from "./libs/chatgpt.js";
import { setCID, getCID } from "./libs/conversationManager.js";

const { Client, LocalAuth } = WhatsApp;

const client = new Client({
  puppeteer: {
    headless: true,
  },
  authStrategy: new LocalAuth(),
});

client.initialize();
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("authenticated", () => {
  console.log("WhatsApp Authentication Successful!");
});
client.on("ready", () => {
  console.log("WhatsApp Bot Ready!");
});

client.on("message", (message) => {
  (async () => {
    const chat = await message.getChat();
    await chat.sendStateTyping();

    var messageSend = false;

    var convoId = getCID(message.from);

    console.log(convoId);
    getResponse(message.body, convoId).then(async (res) => {
      if (res) {
        console.log(res);
        setCID(message.from, res);

        await message.reply(res.response);
        discordLog(message.body, res.response, false, "From " + message.from);
      } else {
        await message.reply(
          "Due to high amount of requests flooding into the server, i'm unable to process the message. Please wait few minutes."
        );
      }

      messageSend = true;
    });

    setTimeout(async () => {
      if (!messageSend) {
        chat.sendMessage("ChatGPT is still thinking 🤔");
      }
    }, 26 * 1000);
  })();
});
