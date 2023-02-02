import "dotenv/config";
import discordLog from "./discord-log.js";
import { ChatGPTAPI } from "chatgpt";

const OpenAIConfig = {
  apiKey: process.env.OPENAI_API_KEY,
};
const api = new ChatGPTAPI(OpenAIConfig);

async function getResponse(prompt, args) {
  console.log("\n[⇢] Prompt: ", prompt);
  try {
    const res = await api.sendMessage(prompt, args);
    console.log("[✔] Response: ", res.text);

    return res;
  } catch (e) {
    console.log("[✘] Error: ", e, "\n");
    discordLog("Error", prompt, e);
    return false;
  }
}

export default getResponse;
