export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},

	css: ['./layers/base/app/assets/css/styles.css'],

	modules: ['@nuxt/ui', '@nuxtjs/mdc'],
	mdc: {
		highlight: {
			theme: 'material-theme-palenight',
		},
	},
});
