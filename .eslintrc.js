module.exports = {
  parser: '@typescript-eslint/parser', // Define o parser do TypeScript
  extends: [
    'eslint:recommended', // Regras recomendadas do ESLint
    'plugin:@typescript-eslint/recommended', // Regras recomendadas do @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Regras recomendadas do eslint-plugin-react
    'plugin:react-hooks/recommended', // Regras recomendadas para hooks do React
    'plugin:jsx-a11y/recommended', // Regras recomendadas de acessibilidade do eslint-plugin-jsx-a11y
    'plugin:prettier/recommended', // Deve ser a última para desativar regras que conflitam com o Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020, // Permite a análise de recursos modernos do ECMAScript
    sourceType: 'module', // Permite o uso de imports
    ecmaFeatures: {
      jsx: true, // Permite a análise de JSX
    },
  },
  rules: {
    // Aqui você pode adicionar ou sobrescrever regras específicas
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Configuração do Prettier
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React
    },
  },
  env: {
    browser: true, // Define o ambiente para browser
    node: true, // Define o ambiente para Node.js
    es2021: true, // Permite recursos modernos do ECMAScript
  },
};
