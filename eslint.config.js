import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import sort from 'eslint-plugin-simple-import-sort'

export default ts.config(js.configs.recommended, ...ts.configs.recommended, ...pluginVue.configs['flat/recommended'], {
    files: ['**/*.vue', '**/*.ts'],
    rules: {
        'sort/imports': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'sort/exports': 'off', //  /前面和plugin的同名
        'no-unsafe-optional-chaining': 'off',
        'vue/order-in-components': 'off',
        'vue/require-default-prop': 'off',
        'no-debugger': 'off',
        'vue/html-self-closing': 'off'
    },
    languageOptions: {
        parserOptions: {
            parser: '@typescript-eslint/parser'
        }
    },
    plugins: {
        sort: sort
    }
})
