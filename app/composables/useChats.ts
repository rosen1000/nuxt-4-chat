import type { Chat } from '~/@types';
import { MOCK_CHAT } from '#imports';

export default function useChats() {
	const chats = useState('chats', () => [MOCK_CHAT]);

	function createChat() {
		const id = (chats.value.length + 1).toString();
		const chat: Chat = { id, title: 'New Chat', messages: [] };
		chats.value.push(chat);
		return chat;
	}

	return { chats, createChat };
}
