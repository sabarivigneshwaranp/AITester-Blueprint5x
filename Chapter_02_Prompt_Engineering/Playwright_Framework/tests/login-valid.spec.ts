import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page.js';

test.describe('Wingify login - valid credentials', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('signs in with a configured test account and remembers the session', async ({
    page,
  }) => {
    const email = process.env.VWO_TEST_EMAIL;
    const password = process.env.VWO_TEST_PASSWORD;

    if (!email || !password) {
      test.skip(
        true,
        'Set VWO_TEST_EMAIL and VWO_TEST_PASSWORD for the authorized test account.',
      );
      return;
    }

    try {
      await loginPage.signIn(email, password, true);
      await expect(page).not.toHaveURL(/#\/login/);
    } catch (error: unknown) {
      throw new Error('The configured-user login test failed', {
        cause: error,
      });
    }
  });
});
