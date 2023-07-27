const { defineConfig } = require("cypress");
// import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
// import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
// import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  viewportHeight: 850,
  viewportWidth: 414,
  env: {
    transactions_uri: 'https://kelvin-build-ml42q3c3ya-as.a.run.app/transactions?user=*',
    face_auth_uri: 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/face',
    pin_auth_uri: 'https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/authenticate/pin',
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    // baseUrl: 'https://frontend-ml42q3c3ya-as.a.run.app',
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      return config;
    },
  },
});
