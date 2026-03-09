import { updateChat } from '../../../repository/chatRepository';
import { createModel, generateChatTitle } from '../../../services/ai-service';

export default defineEventHandler(async (event) => {
	const { id } = getRouterParams(event);
	const { message } = await readBody(event);

	const model = createModel();
	const title = await generateChatTitle(model, message);

	updateChat(id!, { title: title.output });
});
