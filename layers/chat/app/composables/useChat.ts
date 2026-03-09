export default function useChat(chatId: string) {
	const { chats } = useChats();
	const chat = computed(() => chats.value.find((c) => c.id == chatId));
	const messages = computed(() => chat.value?.messages || []);

	const { data, execute, status } = useFetch<ChatMessage[]>(`/api/chats/${chatId}/messages`, {
		default: () => [],
		immediate: false,
	});

	async function fetchMessages() {
		if (status.value != 'idle' || !chat.value) return;
		await execute();
		chat.value.messages = data.value;
	}

	async function generateChatTitle(message: string) {
		if (!chat.value) return;

		const updatedChat = await $fetch<Chat>(`/api/chats/${chatId}/title`, {
			method: 'POST',
			body: { message },
		});
		chat.value.title = updatedChat.title;
	}

	async function sendMessage(content: string) {
		if (!chat.value) return;

		if (messages.value.length == 0) generateChatTitle(content);

		const message = await $fetch<ChatMessage>(`/api/chats/${chatId}/messages`, {
			method: 'POST',
			body: { content, role: 'user' },
		});

		messages.value.push(message);

		const response = await $fetch<ChatMessage>(`/api/chats/${chatId}/messages/generate`, { method: 'POST' });

		chat.value.updatedAt = new Date();
		messages.value.push(response);
	}

	return { fetchMessages, chat, messages, sendMessage };
}
