/// <reference path=".yarn/unplugged/cypress-npm-12.9.0-0c9e067ccc/node_modules/cypress/types/index.d.ts" />

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
});
