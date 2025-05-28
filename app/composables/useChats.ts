import type { Chat } from '~/@types';
import { MOCK_CHAT } from '#imports';

export default function useChats() {
	const chats = useState('chats', () => [MOCK_CHAT]);

	function createChat(options: { projectId?: string } = {}) {
		const id = (chats.value.length + 1).toString();
		const chat: Chat = {
			id,
			title: 'New Chat',
			messages: [],
			projectId: options.projectId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		chats.value.push(chat);
		return chat;
	}

	function chatsInProject(projectId: string) {
		return chats.value.filter((c) => c.projectId == projectId);
	}

	return { chats, createChat, chatsInProject };
}
