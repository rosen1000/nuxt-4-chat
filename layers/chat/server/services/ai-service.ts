import { createOllama } from 'ollama-ai-provider-v2';
import { generateText } from 'ai';
import type { LanguageModel, ModelMessage } from 'ai';

export const createModel = (): LanguageModel => {
	const ollama = createOllama();
	const model = useRuntimeConfig().aiModel;
	return ollama(model);
};

export async function generateChatResponse(model: LanguageModel, messages: ModelMessage[]) {
	try {
		const resp = await generateText({ model, messages });
		return resp.text;
	} catch (e) {
		console.log(e);
		return (e as Error).message;
	}
}
