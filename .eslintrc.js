module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  plugins: ['flowtype'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.css'],
      },
      // webpack: {
      //   config: './webpack/client.prod.js',
      // },
      'babel-module': {},
    },
  },
  globals: {
    navigator: true,
    Image: true,
    window: true,
    document: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    fetch: true,
    alert: true,
  },
  rules: {
    'react/jsx-filename-extension': [0],
    'no-nested-ternary': [0],
    'react/sort-comp': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'import/prefer-default-export': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'no-unused-expressions': [0],
    'global-require': [0],
    'one-var': [0],
    'no-useless-return': [0],
    'no-debugger': [0],
    'react/prefer-stateless-function': [0],
    'no-underscore-dangle': [0],
    'flowtype/no-weak-types': 1,
    'flowtype/semi': [2, 'never'],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-unresolved': [2, { commonjs: true, caseSensitive: true }],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'linebreak-style': 0,
  },
};
