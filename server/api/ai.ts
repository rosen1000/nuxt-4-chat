import type { Chat, ChatMessage } from '~/@types';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { messages } = body as Chat;
	const id = messages.length.toString();
	const lastMessage = messages[messages.length - 1];

	return {
		id,
		role: 'assistant',
		content: `(server) You said: ${lastMessage.content}`,
	} as ChatMessage;
});
