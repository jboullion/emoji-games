module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  parser: 'vue-eslint-parser',
};
