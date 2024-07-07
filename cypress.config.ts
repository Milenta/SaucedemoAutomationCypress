import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    env: {
      viewportWidth: 1920,
      viewportHeight: 1080,
    },
  },
});
