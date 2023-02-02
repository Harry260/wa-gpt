import "dotenv/config";

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
    return false;
  }
}

export default getResponse;
