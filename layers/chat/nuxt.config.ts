export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},

	runtimeConfig: {
		aiModel: 'llama3.1:8b',
	},
});
