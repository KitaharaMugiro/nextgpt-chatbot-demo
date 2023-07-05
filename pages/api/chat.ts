import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
import { checkEmbeddings } from './check-embeddings';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { model, messages, key, prompt, temperature, user } =
      (await req.json()) as ChatBody;

    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    const prompt_tokens = encoding.encode(promptToSend);

    let tokenCount = prompt_tokens.length;
    let messagesToSend: Message[] = [];

    // check embeddings
    const lastMessage = messages[messages.length - 1];
    const checkResult = await checkEmbeddings(lastMessage.content, key ? key : process.env.OPENAI_API_KEY!)

    //この辺どうにかならないかなとは思う。
    const IsEmbeddingsOn = checkResult.check;
    const embeddingsSearchQuery = checkResult.query || lastMessage.content
    console.log({ IsEmbeddingsOn, embeddingsSearchQuery })
    const GroupName = "DEMO" //ここが完全一致してないと引っかからないの本当にやばい。気づくのが難しい。
    if (IsEmbeddingsOn) {
      //最新メッセージにEmbeddingsを追加する

      const modifiedLastMessage = {
        ...lastMessage,
        content: "[CONTEXT]\n{{EMBEDDINGS_CONTEXT}}\n[/CONTEXT]\n" + lastMessage.content
      }
      messages[messages.length - 1] = modifiedLastMessage;
    }

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    const stream = await OpenAIStream(
      model,
      promptToSend,
      temperatureToUse,
      key,
      messagesToSend,
      user,
      IsEmbeddingsOn,
      embeddingsSearchQuery,
      GroupName
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
