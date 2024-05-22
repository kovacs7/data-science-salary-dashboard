import fs from "fs";
import csv from "csv-parser";
import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pRetry from "p-retry";

config();

const chatModel = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const outputParser = new StringOutputParser();

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation and the following documents: {documents}, provide a befitting feedback",
  ],
]);

const chatHistory = [
  new HumanMessage(
    "You are a Chat bot, using data provided answer user's query. In case of information requested by user is beyond the scope of data answer with - 'data limitation'"
  ),
  new AIMessage("Yes"),
];

const chain = historyAwarePrompt.pipe(chatModel).pipe(outputParser);

function retrieveDocuments(query) {
  return new Promise((resolve, reject) => {
    const documents = [];
    fs.createReadStream("salaries.csv")
      .pipe(csv())
      .on("data", (row) => {
        Object.keys(row).forEach((key) => {
          if (row[key] && row[key].includes(query)) {
            documents.push(JSON.stringify(row));
          }
        });
      })
      .on("end", () => {
        resolve(documents);
      })
      .on("error", reject);
  });
}

async function getFeedback(input) {
  try {
    // Retrieve relevant documents based on the input query
    const documentsArray = await retrieveDocuments(input);
    const documents = documentsArray.slice(0, 5).join("\n");

    // Limit the number of messages in chat history
    const limitedChatHistory = chatHistory.slice(0, 3);

    // Retry the chain invocation on failure due to rate limiting
    const result = await pRetry(
      async () => {
        return await chain.invoke({
          chat_history: limitedChatHistory,
          input: input,
          documents: documents,
        });
      },
      {
        onFailedAttempt: (error) => {
          console.warn(
            `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
          );
        },
        retries: 5, // Number of retries
      }
    );

    console.log(result);
    return (result)
  } catch (error) {
    console.error("Error invoking the chain:", error);
  }
}


getFeedback("Data Scientist");