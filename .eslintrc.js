module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		project: './tsconfig.json',
	  ecmaVersion: 'latest',
	  sourceType: 'module',
	  parser: {
			js: 'espree', // Script parser for <script>
			ts: '@typescript-eslint/parser', // Script parser for <script lang="ts">
	  },
	},
	extends: [
	  'eslint:recommended',
	  'plugin:vue/vue3-recommended',
	  '@vue/eslint-config-typescript',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:@typescript-eslint/recommended-requiring-type-checking',
	  'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint'],
	settings: {
	  'import/resolver': {
			typescript: true,
			node: true,
	  },
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unsafe-member-access':'off',
	},
};