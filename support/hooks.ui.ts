import { BeforeAll, AfterAll, After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, LaunchOptions } from '@playwright/test';

const options: LaunchOptions = {
  args: ['--start-maximized', '--remote-allow-origins=* '],
  headless: !!process.env.CI,
  slowMo: 50,
};

setDefaultTimeout(global.CUCUMBER_TIMEOUT);

BeforeAll(async () => {
  console.log('starting browser');
  switch (process.env.BROWSER) {
    case 'firefox':
      global.browser = await firefox.launch(options);
      break;
    case 'webkit':
      global.browser = await webkit.launch(options);
      break;
    default:
      global.browser = await chromium.launch(options);
  }
});

AfterAll(async () => {
  await global.browser.close();
});

Before('@ui', async () => {
  global.context = await global.browser.newContext({ ignoreHTTPSErrors: true, viewport: null });
  global.page = await global.context.newPage();
});

After('@ui', async function (scenario) {
  if (scenario.result!.status === Status.FAILED) {
    const buffer = await global.page.screenshot({
      path: `test-results/screenshots/${scenario.pickle.name}.png`,
      fullPage: true,
    });
    this.attach(buffer, 'image/png');
  }
  await global.page.close();
  await global.context.close();
});
