const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "5k1urs",
  e2e: {
    setupNodeEvents(on, config) {
      //baseUrl:'https://proxima.sisprevweb.com.br/tocantins/'
    },
  },
});
