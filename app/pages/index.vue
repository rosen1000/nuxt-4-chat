<template>
	<UContainer class="flex flex-col items-center justify-center gap-4 h-lvh">
		<h1 class="text-4xl font-bold">{{ title }}</h1>
		<UButton @click="handleCreateChat"> Start Chat </UButton>
	</UContainer>
</template>

<script lang="ts" setup>
const { title } = useAppConfig();

const { createChat } = useChats();
function handleCreateChat() {
	createChat();
}
</script>
