module.exports = {
  extends: ["./index.js"],
  plugins: ["testing-library"],
  env: {
    jest: true
  },
  rules: {
    // Testing Library rules
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "error",
    "testing-library/no-node-access": "error",
    "testing-library/no-promise-in-fire-event": "error",
    "testing-library/no-render-in-setup": "error",
    "testing-library/no-unnecessary-act": "error",
    "testing-library/no-wait-for-empty-callback": "error",
    "testing-library/no-wait-for-multiple-assertions": "error",
    "testing-library/no-wait-for-side-effects": "error",
    "testing-library/no-wait-for-snapshot": "error",
    "testing-library/prefer-find-by": "error",
    "testing-library/prefer-presence-queries": "error",
    "testing-library/prefer-query-by-disappearance": "error",
    "testing-library/prefer-screen-queries": "error",
    "testing-library/render-result-naming-convention": "error"
  }
};