const eslintrc = {
  extends: ['eslint-config-standard'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: [
    'inferno',
    'babel',
  ],
  rules: {
    'func-names': 0,
    'arrow-body-style': 0,
    // inferno    
    'inferno/jsx-uses-vars': 2,
    'inferno/require-extension': 0,    
    'inferno/sort-comp': 0,
    'inferno/prop-types': 0,
    'inferno/jsx-first-prop-new-line': 0,
    'inferno/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.md'] }],
    'inferno/no-danger': 0,
    
    // plugin import
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,

    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'consistent-return': 0,
    'no-redeclare': 0,
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': 0,
    'object-curly-newline': 0,
    'no-restricted-globals': 0,
    'semi': ['error', 'never']
  },
};

module.exports = eslintrc;
