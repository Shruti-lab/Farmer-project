import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);
const genModel = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = genModel.startChat({ generationConfig: { maxOutputTokens: 1000 } });

const chatHistory = document.getElementById("chat-history");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

const converter = new showdown.Converter();

sendButton.addEventListener("click", async () => {
  const message = messageInput.value;
  messageInput.value = "";

  chatHistory.innerHTML += `<div class="user-message">${message}</div>`;

  try {
    const response = await chat.sendMessage(message);
    const text = await response.response.text();
    const html = converter.makeHtml(text);
    chatHistory.innerHTML += `<div class="bot-message">${html}</div>`;
  } catch (error) {
    console.error("Error:", error);
    chatHistory.innerHTML += `<div class="error-message">Error: ${error.message}</div>`;
  }

  chatHistory.scrollTop = chatHistory.scrollHeight;
});
