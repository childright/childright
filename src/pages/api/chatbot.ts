import { OpenAI } from "langchain/llms";
import { ChatVectorDBQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "langchain/embeddings";

import { HNSWLib } from "langchain/vectorstores";

import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = req.query.q;

  const model = new OpenAI();
  /* Load in the file we want to do question answering over */
  const text = await readFile("./chatbotData.txt", "utf8");
  /* Split the text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  /* Create the chain */
  const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore);
  /* Ask it a question */

  try {
    const answer = await chain.call({ question: input, chat_history: [] });
    res.status(200).json({ answer });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.response.data.error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
