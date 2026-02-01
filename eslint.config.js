import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'dist/',
			'node_modules/',
			'coverage/',
			'**/*.d.ts',
			'*.config.js',
			'*.config.ts'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			...svelte.configs.recommended.rules,
			'svelte/no-at-html-tags': 'error',
			'svelte/no-target-blank': 'error',
			'svelte/valid-compile': 'error',
			'svelte/html-closing-bracket-spacing': 'error',
			'svelte/html-self-closing': 'error',
			'svelte/no-extra-reactive-curlies': 'error',
			'svelte/valid-each-key': 'error',
			'svelte/no-dynamic-slot-name': 'error',
			'svelte/no-shorthand-style-property-overrides': 'error',
			'svelte/prefer-class-directive': 'error',
			'svelte/prefer-style-directive': 'error',
			'svelte/no-inline-styles': 'warn',
			'svelte/no-at-debug-tags': 'warn',
			'svelte/require-optimized-style-attribute': 'warn',
			'svelte/require-store-callbacks-use-set-param': 'warn',
			'svelte/require-store-reactive-access': 'warn',
			'svelte/no-dom-manipulating': 'warn',
			'svelte/no-inner-declarations': 'warn',
			'svelte/no-trailing-spaces': 'error',
			'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
			'svelte/no-immutable-reactive-statements': 'error',
			'svelte/no-inspect': 'error',
			'svelte/no-reactive-literals': 'error',
			'svelte/no-unknown-style-directive-property': 'error',
			'svelte/prefer-destructured-store-props': 'warn',
			'svelte/require-event-dispatcher-types': 'warn',
			'svelte/require-each-key': 'error'
		}
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'no-unused-vars': 'error',
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-alert': 'error',
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-new-func': 'error',
			'no-script-url': 'error',
			'no-void': 'error',
			'no-with': 'error',
			'no-delete-var': 'error',
			'no-label-var': 'error',
			'no-restricted-globals': 'error',
			'no-shadow': 'error',
			'no-shadow-restricted-names': 'error',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'no-unreachable': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-useless-call': 'error',
			'no-useless-concat': 'error',
			'no-useless-escape': 'error',
			'no-useless-return': 'error',
			'prefer-const': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'quote-props': ['error', 'as-needed'],
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			'template-curly-spacing': 'error',
			'unicode-bom': ['error', 'never'],
			'valid-typeof': 'error'
		}
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn'
		}
	}
];
