import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const API_KEY = "AIzaSyDJQtgbPPRU7k4jtVGpstg_1EFh0GbMwnI";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender){
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    if(sender == "bot"){
        div.innerHTML = marked.parse(text)
    }
    else{
    div.textContent = text;
    }
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";
  
  try {
    const result = await model.generateContent(text);
    const response = result.response.text();
    addMessage(response, "bot"); // Markdown will render here
  } catch (err) {
    console.error(err);
    addMessage("⚠️ Error: " + err.message, "bot");
  }
});


userInput.addEventListener("keypress", (e) => {
    if(e.key == "Enter") sendBtn.click();
});