<template>
	<ChatWindow :chat :messages @send-message="sendMessage" />
</template>

<script lang="ts" setup>
const { chat, messages, sendMessage } = useChat();
const appConfig = useAppConfig();
const title = computed(() => appConfig.title + (chat.value.title ? ` - ${chat.value.title}` : ''));

useHead({ title });
</script>
