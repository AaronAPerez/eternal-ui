import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
    "@typescript-eslint/no-unused-vars",
    "@typescript-eslint/no-explicit-any",
    "react/no-unescaped-entities",
    "jsx-a11y/alt-text",
    "react-hooks/exhaustive-deps",
  ];


export default eslintConfig;
