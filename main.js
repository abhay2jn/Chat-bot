const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to AI Chatbot");
});

const ai = new GoogleGenAI({ apiKey: process.env.APi_KEY });

async function chatBot(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}

app.get("/chatbot/", async (req, res) => {
  const data = req.body.text;
  const result = await chatBot(data);
  res.send({
    Answer: result,
  });
});

app.listen(4444, () => {
  console.log("SERVER IS RUNNNING ON PORT: 4444");
});
