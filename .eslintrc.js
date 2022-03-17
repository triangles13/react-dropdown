module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
  ],
  rules: {
    'default-case': 0,
    'no-useless-return': 0,
    'import/no-extraneous-dependencies': [
      'error', { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
    'react/jsx-no-bind': ['error', {
      ignoreDOMComponents: true,
      ignoreRefs: false,
      allowArrowFunctions: true,
      allowFunctions: true,
      allowBind: false,
    }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/button-has-type': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'react/destructuring-assignment': 0,
    'no-alert': 0,
    'no-bitwise': 0,
    'react/jsx-filename-extension': [ 1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] } ],
    '@typescript-eslint/no-use-before-define': 0
  }
};
