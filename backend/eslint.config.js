import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            sourceType: 'module',
            ecmaVersion: 2022,
        },

        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: importPlugin,
        },

        rules: {
            // 🔹 General
            'no-console': 'warn',
            'no-unused-vars': 'off',

            // 🔹 TypeScript
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/no-explicit-any': 'warn',

            // 🔹 Import rules
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal'],
                    'newlines-between': 'always',
                },
            ],
            'import/no-unresolved': 'off',

            // 🔹 Your custom rule (arrow callbacks)
            'prefer-arrow-callback': [
                'error',
                {
                    allowNamedFunctions: false,
                    allowUnboundThis: false,
                },
            ],

            'func-names': ['error', 'never'],
        },
    },
];
