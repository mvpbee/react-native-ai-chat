require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { Request, Response } from "express";
import { ApiRequestBody } from "../../src/types";

const HARDCODED_PROMPT = `You are an expert in dota 2, please answer any questions or chat with the user.`;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/chat", async (req: Request, res: Response) => {
  const { chatId, message, messages } = req.body as ApiRequestBody;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  console.log("body", req.body);

  let chatMessages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: HARDCODED_PROMPT,
    },
  ];

  if (chatId) {
    /* Load/update messages saved in the backend against the chatId */
    // chatMessages = [...chatMessages, ...(await loadMessages(chatId))];
  } else if (messages) {
    chatMessages = [
      ...chatMessages,
      ...messages.map(
        (m) =>
          ({ role: "user", content: m.content } as ChatCompletionMessageParam)
      ),
    ];
  } else if (message) {
    chatMessages.push({ role: "user", content: message });
  } else {
    chatMessages.push({ role: "user", content: "Hello" });
  }

  console.log("chatMessages", chatMessages);

  try {
    const stream = await openai.chat.completions.create(
      {
        model: "gpt-3.5-turbo-1106",
        messages: chatMessages,
        stream: true,
      },
      {
        stream: true,
        headers: {
          responseType: "stream",
        },
      }
    );

    console.log("STREAM:");

    for await (const part of stream) {
      if (part.choices[0].finish_reason === "stop") {
        res.end();
        return;
      }

      process.stdout.write(part.choices[0]?.delta?.content || "");
      res.write(part.choices[0]?.delta?.content || "");
    }
    console.log("");
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.listen(5000, () => {
  console.log("examples/openai-express started on port 5000");
});
