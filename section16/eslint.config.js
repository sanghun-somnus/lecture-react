import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact, { rules } from "eslint-plugin-react";
import pluginHooks from "eslint-plugin-react-hooks";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginHooks.configs.recommended,
  {
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jex-scope": "off",
      "react/prop-types": "off",
    },
  },
];
