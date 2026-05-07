import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        fetch: "readonly",
        requestAnimationFrame: "readonly",
        localStorage: "readonly",
        HTMLElement: "readonly",
        MutationObserver: "readonly",
        matchMedia: "readonly",
        navigator: "readonly",
        alert: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": "off"
    }
  },
  {
    ignores: ["node_modules/", "*.min.js"]
  }
];
