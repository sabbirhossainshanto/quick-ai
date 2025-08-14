import OpenAI from "openai";
import config from "../config";

export const AI = new OpenAI({
  apiKey: config.gemini_api_key,
  baseURL: config.gemini_api_base_url,
});
