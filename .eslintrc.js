module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  extends: ['airbnb'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.css']
      }
    }
  },
  globals: {
    window: true,
    document: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    fetch: true,
    alert: true
  },
  rules: {
    'react/jsx-filename-extension': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        css: 'never'
      }
    ],
    'import/no-unresolved': [2, { commonjs: true, caseSensitive: true }],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true
      }
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
        ignoreTemplateLiterals: true
      }
    ],
    'linebreak-style': 0
  }
}
