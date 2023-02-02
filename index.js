import qrcode from "qrcode-terminal";
import WhatsApp from "whatsapp-web.js";
import getResponse from "./libs/chatgpt.js";
import { setCID, getCID } from "./libs/conversationManager.js";
import discordLog from "./discord-log.js";

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

    getResponse(message.body, convoId).then(async (res) => {
      if (res) {
        setCID(message.from, {
          conversationId: res.conversationId,
          parentMessageId: res.id,
        });

        await message.reply(res.text);
        discordLog(message.body.res.text, false, "From " + message.from);
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
