import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react,
      "react-hooks": reactHooks
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      // React core
      "react/react-in-jsx-scope": "off",

      // Hooks rules (مهم جداً)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // تنظيف الكود
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // تخفيف الإزعاج
      "no-console": "off"
    }
  }
];