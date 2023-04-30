# AI Chat Application

This web-based chat application enables real-time interaction with OpenAI's GPT model, simulating "Jarvis," a friendly AI assistant. Users enjoy a seamless, human-like conversational experience with the advanced AI technology.

## Features

- Real-time conversation with OpenAI's GPT model as "Jarvis"
- Cheerful and human-like AI responses
- Selectable GPT models
- Export chat history as a text file
- Responsive design for both desktop and mobile devices
- API key modal for easy management

## Getting Started

### Prerequisites

Before you get started, make sure you have the following:

- A modern web browser (e.g., Google Chrome, Mozilla Firefox)
- An API key from OpenAI (https://platform.openai.com/account/api-keys)

### Installation

1. Clone this repository to your local machine:

2. Open the `index.html` file in your web browser.

3. When prompted, enter your OpenAI API key.

4. Start chatting with Jarvis, your cheerful AI assistant!

## Usage

To use the chat application, simply type your message into the input field and press "Enter" or click the "Send" button. Jarvis, your cheerful AI assistant, will generate a response and display it in the chat window.

You can change the GPT model used for the conversation by selecting a different option from the "Model" dropdown menu.

To export your chat history as a text file, click the "Export" button. This will download a file called `chat-export.txt` containing the conversation.

```html
git clone https://github.com/josscmorera/gpt-chat-application.git
```

To change the context provided to the AI model edit:

```html
{ role: "system", content: "You are a Jarvis a helpful assistant and you will answer ina very human cheerful way." }
```

## Copyright and License

Copyright © 2023, All Rights Reserved.
