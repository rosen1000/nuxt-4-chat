import { createOllama } from 'ollama-ai-provider';
import { generateText } from 'ai';
import type { LanguageModelV1, Message } from 'ai';

export const createModel = () => {
	const ollama = createOllama();
	const model = useRuntimeConfig().aiModel;
	return ollama(model);
};

export async function generateChatResponse(model: LanguageModelV1, messages: Message[]) {
	try {
		const resp = await generateText({ model, messages });
		return resp.text;
	} catch (e) {
		return (e as Error).message;
	}
}
