<template>
	<div>
		<AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
		<AppSidebar :is-open="isSidebarOpen" />
		<UMain class="transition-all duration-300 ease-in-out" :class="{ 'ml-64': isSidebarOpen }">
			<slot />
		</UMain>
	</div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(false);
</script>
