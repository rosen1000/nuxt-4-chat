import type { ChatMessage, Role } from '~/@types';
import useChats from './useChats';

export default function useChat(chatId: string) {
	const { chats } = useChats();
	const chat = computed(() => chats.value.find((c) => c.id == chatId));
	const messages = computed(() => chat.value?.messages || []);

	function createMessage(message: string, role: Role) {
		const id = messages.value?.length.toString();
		return { id, role, content: message } as ChatMessage;
	}

	async function sendMessage(message: string) {
		messages.value?.push(createMessage(message, 'user'));

		const data = await $fetch('/api/ai', {
			method: 'post',
			body: { messages: messages.value },
		});

		messages.value.push(data);
	}

	return { chat, messages, sendMessage };
}
