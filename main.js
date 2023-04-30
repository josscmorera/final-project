// Declarations
let apiKey = "your-api-key";
let apiUrl = "https://api.openai.com/v1/chat/completions";

// Functions
async function apiResponse(prompt, model) {
  let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  let data = {
    model: model,
    messages: [
      { role: "system", content: "You are a Jarvis a helpful assistant and you will answer ina very human cheerful way." },
      { role: "user", content: prompt },
    ],
    max_tokens: 300,
    n: 1,
    temperature: 0.8,
  };

  try {
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    let jsonResponse = await response.json();
    return jsonResponse.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return "Sorry, I couldn't process your message.";
  }
}

function addMessageToResponseList(message, messageType) {
    let responseList = document.querySelector("#response-list");
    let messageContainer = document.createElement("div");
    messageContainer.classList.add("response-container", messageType);
  
    let avatarImage = document.createElement("img");
    avatarImage.classList.add("avatar-image");
    avatarImage.src = messageType === "my-question" ? "img/me.png" : "img/chatgpt.png";
    avatarImage.alt = "avatar";
    messageContainer.appendChild(avatarImage);
  
    let promptContent = document.createElement("div");
    promptContent.classList.add("prompt-content");
    messageContainer.appendChild(promptContent);
    responseList.appendChild(messageContainer);
  
    if (messageType === "chatgpt-response") {
      let codeBlock = document.createElement("p");
      promptContent.appendChild(codeBlock);
  
      let i = 0;
      let intervalId = setInterval(() => {
        codeBlock.textContent += message.charAt(i);
        i++;
        if (i === message.length) {
          clearInterval(intervalId);
          responseList.scrollTop = responseList.scrollHeight;
        }
      }, 30);
    } else {
      promptContent.textContent = message;
      responseList.scrollTop = responseList.scrollHeight;
    }
  }
  

// Event listeners
document.querySelector("#submit-button").addEventListener("click", async (e) => {
  e.preventDefault();
  let promptInput = document.querySelector("#prompt-input");
  let userMessage = promptInput.textContent.trim();
  if (userMessage) {
    let modelSelect = document.querySelector("#model-select");
    let selectedModel = modelSelect.value;
    addMessageToResponseList(userMessage, "my-question");
    let chatbotResponse = await apiResponse(userMessage, selectedModel);
    addMessageToResponseList(chatbotResponse, "chatgpt-response");
    promptInput.textContent = "";
  }
});

let promptInput = document.querySelector("#prompt-input");
promptInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#submit-button").click();
    promptInput.textContent = "";
  }
});

document.querySelector("#export-chat").addEventListener("click", () => {
  let responseList = document.querySelector("#response-list");
  let chatText = responseList.innerText;
  let blob = new Blob([chatText], { type: "text/plain;charset=utf-8" });
  let a = document.createElement("a");
  let url = URL.createObjectURL(blob);
  a.href = url;
  a.download = "chat-export.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1);
});

// Modals
let modal = document.querySelector("#api-key-modal");
let loginIcon = document.querySelector("#login-icon");
let closeModal = document.querySelectorAll(".close-modal")[0];
let saveApiKeyButton = document.querySelector("#save-api-key");

loginIcon.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

saveApiKeyButton.addEventListener("click", () => {
  let apiKeyInput = document.querySelector("#api-key-input");
  let newApiKey = apiKeyInput.value.trim();
  if (newApiKey) {
    apiKey = newApiKey;
    localStorage.setItem("apiKey", apiKey);
    alert("API key saved.");
    modal.style.display = "none";
  } else {
    alert("Please enter a valid API key.");
  }
});

if (localStorage.getItem("apiKey")) {
  apiKey = localStorage.getItem("apiKey");
  let apiKeyInput = document.querySelector("#api-key-input");
  apiKeyInput.value = apiKey;
} else {
  modal.style.display = "block";
}

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Model selection
let modelSelect = document.querySelector("#model-select");
let currentModel = new URLSearchParams(window.location.search).get("model") || "gpt-3.5-turbo";
modelSelect.value = currentModel;
modelSelect.addEventListener("change", () => {
  let newModel = modelSelect.value;
  let newUrl = new URL(window.location.href);
  newUrl.searchParams.set("model", newModel);
  window.location.href = newUrl.toString();
});

