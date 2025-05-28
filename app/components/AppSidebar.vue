<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { Chat, Project } from '~/@types';
import { filterChatsByDate } from '~/utils/dateUtils';

defineProps<{
	isOpen: boolean;
}>();
const route = useRoute();
const { projects, createProject } = useProjects();
const { chats, chatsInProject, createChatAndNavigate } = useChats();

const isCurrentProject = (projectId: string) => route.params.projectId == projectId;
const chatsInCurrentProject = computed(() => chatsInProject(route.params.projectId as string));

function formatProjectChatItem(project: Project, chat: Chat): NavigationMenuItem {
	return {
		label: chat.title,
		to: `/project/${project.id}/chat/${chat.id}`,
		active: route.params.id == chat.id,
	};
}

function formatProjectItem(project: Project) {
	const isCurrent = isCurrentProject(project.id);
	const baseItem: NavigationMenuItem = {
		label: project.name,
		to: `/project/${project.id}`,
		active: isCurrent,
		defaultOpen: isCurrent,
	};

	if (!isCurrent) return baseItem;
	return {
		...baseItem,
		children: chatsInCurrentProject.value.map((chat) => formatProjectChatItem(project, chat)),
	};
}

function formatChatItem(chat: Chat): NavigationMenuItem {
	return {
		label: chat.title,
		to: `/chat/${chat.id}`,
		active: route.params.id == chat.id,
	};
}

const projectItems = computed(() => projects.value.map(formatProjectItem) || []);
const chatsWithoutProj = computed(() => chats.value.filter((c) => c.projectId == undefined));

function filterChats(startDays: number, endDays?: number) {
	return computed(() => filterChatsByDate(chatsWithoutProj.value, startDays, endDays).map(formatChatItem));
}

const todayChats = filterChats(-1, 1);
const weekChats = filterChats(1, 7);
const monthChats = filterChats(7, 30);
const olderChats = filterChats(30);

//#region Create and navigate
function handleCreateChat() {
	createChatAndNavigate();
}

async function handleCreateProject() {
	const { id: projectId } = createProject();
	await createChatAndNavigate({ projectId });
}
//#endregion
</script>

<template>
	<aside
		class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-(--ui-bg-muted) border-r-(--ui-border) border-r"
		:class="{ '-translate-x-full': !isOpen }"
	>
		<div v-if="projectItems.length > 0" class="mb-4 overflow-auto p-4 border-b border-(--ui-border)">
			<div class="flex justify-between items-center mb-2">
				<h2 class="text-sm font-semibold text-(--ui-text-muted)">Projects</h2>
			</div>
			<UNavigationMenu orientation="vertical" :items="projectItems" />
			<UButton size="sm" color="neutral" variant="soft" icon="i-heroicons-plus-small" @click="handleCreateProject">
				New Project
			</UButton>
		</div>
		<div class="overflow-y-auto p-4">
			<div class="mb-4">
				<template v-if="todayChats.length > 0">
					<div class="flex justify-between items-center mb-2">
						<h2 class="text-sm font-semibold text-(--ui-text-muted)">Today</h2>
					</div>
					<UNavigationMenu orientation="vertical" :items="todayChats" />
				</template>
				<template v-if="weekChats.length > 0">
					<div class="flex justify-between items-center mb-2">
						<h2 class="text-sm font-semibold text-(--ui-text-muted)">Last week</h2>
					</div>
					<UNavigationMenu orientation="vertical" :items="weekChats" />
				</template>
				<template v-if="monthChats.length > 0">
					<div class="flex justify-between items-center mb-2">
						<h2 class="text-sm font-semibold text-(--ui-text-muted)">Last Month</h2>
					</div>
					<UNavigationMenu orientation="vertical" :items="monthChats" />
				</template>
				<template v-if="olderChats.length > 0">
					<div class="flex justify-between items-center mb-2">
						<h2 class="text-sm font-semibold text-(--ui-text-muted)">Older</h2>
					</div>
					<UNavigationMenu orientation="vertical" :items="olderChats" />
				</template>
			</div>
			<div v-if="chatsWithoutProj.length == 0" class="flex flex-col gap-2">
				<UAlert title="No chats" description="Create a new chat to get started." color="neutral" variant="soft" />
				<UButton size="sm" color="neutral" variant="soft" icon="i-heroicons-plus-small" @click="handleCreateChat">
					New Chat
				</UButton>
			</div>
		</div>
	</aside>
</template>
