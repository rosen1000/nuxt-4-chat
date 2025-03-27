import type { ChatMessage, Role } from '~/@types';

export default function useChat() {
	const chat = ref(MOCK_CHAT);
	const messages = computed(() => chat.value.messages);

	function createMessage(message: string, role: Role) {
		const id = messages.value?.length.toString();
		return { id, role, content: message } as ChatMessage;
	}

	function sendMessage(message: string) {
		messages.value?.push(createMessage(message, 'user'));

		setTimeout(() => {
			createMessage(`You said:  ${message}`, 'assistant');
		}, 200);
	}

	return [chat, messages, sendMessage];
}
