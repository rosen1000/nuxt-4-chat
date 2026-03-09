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

export async function generateChatTitle(model: LanguageModel, firstMessage: string) {
	const response = await generateText({
		model,
		messages: [
			{
				role: 'system',
				content: `You are a helpful assistant that generates concise, descriptive titles for chat conversations. Generate a title that captures the essence of the first message in 3 short words or less.'`,
			},
			{
				role: 'user',
				content: firstMessage,
			},
		],
	});
	return response;
}
