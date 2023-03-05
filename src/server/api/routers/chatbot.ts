import { OpenAI } from "langchain/llms";
import { ChatVectorDBQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings";

import { HNSWLib } from "langchain/vectorstores";

import { readFile } from "fs/promises";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

async function respond(question: string) {
  const model = new OpenAI({ temperature: 0 });
  /* Load in the file we want to do question answering over */
  const text = await readFile("./chatbotData.txt", "utf8");
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000 });
  const docs = await textSplitter.createDocuments([text]);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore);
  /* Ask it a question */

  try {
    const answer = await chain.call({ question, chat_history: [] });
    return answer.text as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("ERROR IN CHATBOT");
    console.error(e);
    console.error(e.response.data.error);
    throw e;
  }
}

export const chatbotRouter = createTRPCRouter({
  respond: protectedProcedure
    .input(
      z.object({
        question: z.string(),
      })
    )
    .query((req) => respond(req.input.question)),
});
