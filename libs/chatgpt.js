import "dotenv/config";
import discordLog from "./discord-log.js";
import { oraPromise } from "ora";
import { ChatGPTAPIBrowser } from "chatgpt";

const OpenAIConfig = {
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
  debug: false,
  minimize: true,
};

const api = new ChatGPTAPIBrowser(OpenAIConfig);
await api.initSession();

async function getResponse(prompt, args = {}) {
  console.log("\n[⇢] Prompt: ", prompt);
  try {
    const res = await oraPromise(api.sendMessage(prompt, args), {
      text: prompt,
    });

    return res;
  } catch (e) {
    console.log("[✘] Error: ", e, "\n");
    discordLog(prompt, e, true);
    return false;
  }
}

export default getResponse;
