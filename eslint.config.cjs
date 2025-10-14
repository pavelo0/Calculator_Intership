const js = require('@eslint/js');

module.exports = [
    // Ignore build artifacts
    { ignores: ['dist/**', 'node_modules/**'] },
    // Base recommended rules from @eslint/js
    js.configs.recommended,
    // Project-specific rules
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                window: 'readonly',
                document: 'readonly',
                Element: 'readonly',
                localStorage: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                require: 'readonly',
            },
        },
        rules: {
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
];
