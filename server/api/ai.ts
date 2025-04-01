import type { Chat, ChatMessage } from '~/@types';
import { createModel, generateChatResponse } from '../services/ai-service';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { messages } = body as Chat;
	const id = messages.length.toString();

	const model = createModel();
	const msg = await generateChatResponse(model, messages);

	return {
		id,
		role: 'assistant',
		content: msg,
	} as ChatMessage;
});
