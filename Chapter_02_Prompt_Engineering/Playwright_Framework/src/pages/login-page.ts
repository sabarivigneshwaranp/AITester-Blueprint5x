import { expect, Locator, Page } from '@playwright/test';

const LOGIN_FORM_XPATH =
  '//form[.//input[@placeholder="Enter password"] and .//button[@type="submit" and normalize-space(.)="Sign in"]]';

export class LoginPage {
  private readonly loginForm: Locator;
  readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.loginForm = page.locator(`xpath=${LOGIN_FORM_XPATH}`);
    this.emailInput = this.loginForm.locator(
      'xpath=.//input[@placeholder="Enter email ID"]',
    );
    this.passwordInput = this.loginForm.locator(
      'xpath=.//input[@placeholder="Enter password"]',
    );
    this.rememberMeCheckbox = this.loginForm.locator(
      'xpath=.//input[@type="checkbox"]',
    );
    this.signInButton = this.loginForm.locator(
      'xpath=.//button[@type="submit" and normalize-space(.)="Sign in"]',
    );
  }

  async open(): Promise<void> {
    try {
      await this.page.goto('/#/login', { waitUntil: 'domcontentloaded' });
      await expect(this.emailInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
    } catch (error: unknown) {
      throw new Error('Unable to open the Wingify login page', {
        cause: error,
      });
    }
  }

  async signIn(
    email: string,
    password: string,
    rememberMe = false,
  ): Promise<void> {
    try {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      if (rememberMe) {
        await this.rememberMeCheckbox.setChecked(true);
        await expect(this.rememberMeCheckbox).toBeChecked();
      }
      await this.signInButton.click();
    } catch (error: unknown) {
      throw new Error('Unable to submit the Wingify login form', {
        cause: error,
      });
    }
  }

  async submit(): Promise<void> {
    try {
      await this.signInButton.click();
    } catch (error: unknown) {
      throw new Error('Unable to submit the Wingify login form', {
        cause: error,
      });
    }
  }

  async isEmailFormatInvalid(): Promise<boolean> {
    try {
      return await this.emailInput.evaluate((element) => {
        if (!(element instanceof HTMLInputElement)) {
          throw new TypeError('The email locator is not an input element');
        }
        return element.validity.typeMismatch;
      });
    } catch (error: unknown) {
      throw new Error('Unable to inspect email format validation', {
        cause: error,
      });
    }
  }
}
