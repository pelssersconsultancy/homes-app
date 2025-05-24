import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import stylisticTs from "@stylistic/eslint-plugin-ts";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    plugins: { "@stylistic/ts": stylisticTs },
    rules: {
      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/quotes": ["error", "single"],
      "@stylistic/ts/semi": ["error", "always"],
      "@stylistic/ts/no-unused-vars": "warn",
    },
  },
]);
