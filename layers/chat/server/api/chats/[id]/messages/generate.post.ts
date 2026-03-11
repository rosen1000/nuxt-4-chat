import { createMessageForChat, getMessagesByChatId } from '~~/layers/chat/server/repository/chatRepository';
import { createModel, generateChatResponse } from '~~/layers/chat/server/services/ai-service';

export default defineEventHandler(async (event) => {
	const { id } = getRouterParams(event);

	const history = await getMessagesByChatId(id!);

	const model = createModel();
	const reply = await generateChatResponse(model, history);

	return createMessageForChat({
		chatId: id!,
		content: reply,
		role: 'assistant',
	});
});
