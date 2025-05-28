<template>
	<ChatWindow :chat :messages :typing @send-message="handleSendMessage" />
</template>

<script lang="ts" setup>
const route = useRoute();
console.log(route.params);

const { chat, messages, sendMessage } = useChat(route.params.id as string);
const appConfig = useAppConfig();
const title = computed(() => appConfig.title + (chat.value?.title ? ` - ${chat.value.title}` : ''));

const typing = ref(false);

async function handleSendMessage(message: string) {
	typing.value = true;
	await sendMessage(message);
	typing.value = false;
}

useHead({ title });
</script>
