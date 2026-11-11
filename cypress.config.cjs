const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: 0,
  video: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportPageTitle: 'Portfolio QA · Cypress',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true
  },
  e2e: {
    baseUrl: 'https://pablo-archivo-de-la-alianza.wintryapricot2.chatgpt.site',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});
