import withNuxt from './.nuxt/eslint.config.mjs';

// Your custom configs here
export default withNuxt({
	rules: {
		'prefer-const': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
	},
});
