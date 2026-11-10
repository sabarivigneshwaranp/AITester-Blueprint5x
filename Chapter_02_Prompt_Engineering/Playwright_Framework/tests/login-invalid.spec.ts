import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page.js';

test.describe('Wingify login - invalid input', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('rejects an invalid email format without submitting authentication', async ({
    page,
  }) => {
    try {
      await loginPage.emailInput.fill('not-an-email');
      await loginPage.submit();
      await expect.poll(() => loginPage.isEmailFormatInvalid()).toBe(true);
      await expect(page).toHaveURL(/#\/login/);
    } catch (error: unknown) {
      throw new Error('The invalid-email login test failed', {
        cause: error,
      });
    }
  });
});
