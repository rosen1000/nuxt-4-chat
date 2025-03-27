import type { ChatMessage, Role } from '~/@types';

export default function useChat() {
	const chat = ref(MOCK_CHAT);
	const messages = computed(() => chat.value.messages);

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
