import jseslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin'; // Плагин для стилистических правил
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser'; // Парсер для TypeScript
import jsxA11y from 'eslint-plugin-jsx-a11y';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {

        files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        // Плагины
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'simple-import-sort': pluginSimpleImportSort,
            '@typescript-eslint': tseslintPlugin,
            'jsx-a11y': jsxA11y,
            react,
            promise,
            stylistic
        },

        extends: [
            jseslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.strict,
            stylistic.configs.customize({
                indent: 4,
                quotes: 'single',
                semi: true,
                jsx: true,
                commaDangle: 'only-multiline',
                arrowParens: true

            }),
            promise.configs['flat/recommended'],
            react.configs.flat.recommended,
            jsxA11y['flatConfigs/recommended']
        ],

        settings: {
            react: {
                version: 'detect'
            }
        },

        rules: {
            ...react.configs.recommended.rules,
            ...promise.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ],

            'simple-import-sort/imports': ['error', {
                groups: [
                    ['^\\u0000'],
                    ['^react', '^@?\\w'],
                    ['^@/'],
                    ['^\\.\\./', '^\\./.*\\.css$'],
                    ['^@styles/', '^@views/', '^@components/', '^@assets/', '^@icon/', '^@hooks/'],
                    ['^\\.']
                ]
            }],

            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'react/jsx-uses-vars': 'error',
            'react/no-unused-prop-types': 'warn',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/self-closing-comp': ['error', {
                component: true,
                html: true
            }],

            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/label-has-associated-control': 'error',

            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-interface': 'warn',

            'object-curly-spacing': ['error', 'always'],
            'object-curly-newline': ['error', {
                ObjectExpression: { multiline: true, consistent: true },
                ObjectPattern: { multiline: true, consistent: true }
            }],
            'prefer-destructuring': ['error', {
                array: true,
                object: true
            }, {
                enforceForRenamedProperties: false
            }],

            'lines-between-class-members': ['error', 'always', {
                exceptAfterSingleLine: true
            }],
            'no-mixed-operators': ['error', {
                groups: [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof']
                ],
                allowSamePrecedence: true
            }],

            'comma-dangle': ['error', {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }],
            'linebreak-style': ['error', 'windows'],
            'no-console': 'off',
            'no-debugger': 'error',
            'arrow-parens': ['error', 'always'],
            'no-unused-expressions': 'error',
            'no-param-reassign': 'off',
            'no-bitwise': ['error', { allow: ['~'] }],
            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'import/no-unresolved': 'off',
            'import/no-absolute-path': 'off',
            'no-undef': 'off'
        }
    }
);
