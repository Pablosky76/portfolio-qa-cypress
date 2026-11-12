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
      const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
      const { rmSync } = require('node:fs');
      const { join } = require('node:path');
      on('before:run', async (details) => {
        // Evita mezclar barreras de accesibilidad de ejecuciones anteriores.
        rmSync(join(config.projectRoot, 'cypress/reports/axe'), { recursive: true, force: true });
        await beforeRunHook(details);
      });
      on('after:run', afterRunHook);
      return config;
    }
  }
});
