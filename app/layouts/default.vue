<template>
	<div>
		<AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
		<AppSidebar :is-open="isSidebarOpen" />
		<main class="h-full transition-all duration-300 ease-in-out" :class="{ 'ml-64': isSidebarOpen }">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(false);
</script>
