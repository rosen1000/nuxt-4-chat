export default function useChats() {
	// Setup function - can't appear in follow-up function
	// const {
	// 	data: chats,
	// 	execute,
	// 	status,
	// } = useAsyncData('chats', () => $fetch<Chat[]>('/api/chats'), {
	// 	immediate: false, // So we don't spam requests
	// 	default: () => [],
	// });
	const chats = useState<Chat[]>('chats', () => []);
	const { data, execute, status } = useFetch<Chat[]>('/api/chats', { immediate: false, default: () => [] });

	async function fetchChats() {
		// Only when not fetching
		if (status.value != 'idle') return;
		await execute();
		chats.value = data.value;
	}

	function createChat(options: { projectId?: string } = {}) {
		const id = (chats.value.length + 1).toString();
		const chat: Chat = {
			id,
			title: `Chat ${id}`,
			messages: [],
			projectId: options.projectId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		chats.value.push(chat);
		return chat;
	}

	async function createChatAndNavigate(options: { projectId?: string } = {}) {
		const chat = createChat(options);
		if (chat.projectId != undefined) {
			await navigateTo(`/project/${chat.projectId}/chat/${chat.id}`);
		} else {
			return await navigateTo(`/chat/${chat.id}`);
		}
	}

	function chatsInProject(projectId: string) {
		return chats.value.filter((c) => c.projectId == projectId);
	}

	return { fetchChats, chats, createChat, createChatAndNavigate, chatsInProject };
}
