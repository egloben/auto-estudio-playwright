import { expect, test } from "@playwright/test";

test.describe("Test suit 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test.skip("the first test", async ({ page }) => {
    //by tag name
    await page.locator("input").first().click();

    //by id
    page.locator("#inputEmail1");

    //by class
    page.locator(".shape-rectangle");

    //by attribute
    page.locator('[placeholder="Email"]');

    //by class value (full)
    page.locator(
      '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
    );

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]');

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1]');

    //by partial text match
    page.locator(':text("Using")');

    //by exact text math
    page.locator(':text("Using the Grid")');
  });

  test("User facing localtors", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign in" }).first().click();

    await page.getByLabel("Email").first().click();
    await page.getByPlaceholder("Jane Doe").click();

    await page.getByText("Using the Grid").click();

    //await page.getByTestId("SignIn").click();
    await page.getByTitle("IoT Dashboard").click();
  });

  test("locating child elements", async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page
      .locator("nb-card")
      .locator("nb-radio")
      .locator(':text-is("Option 2")')
      .click();

    await page
      .locator("nb-card")
      .getByRole("button", { name: "Sign in" })
      .first()
      .click();

    await page.locator("nb-card").nth(3).getByRole("button").click();
  });

  test("locating parent elements", async ({ page }) => {
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" })
      .click();
    await page
      .locator("nb-card", { has: page.locator("#inputEmail") })
      .getByRole("textbox", { name: "Email" })
      .click();
    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" })
      .click();
    await page
      .locator("nb-card")
      .filter({ has: page.locator(".status-danger") })
      .getByRole("textbox", { name: "Password" })
      .click();

    await page
      .locator("nb-card")
      .filter({ has: page.locator("nb-checkbox") })
      .filter({ hasText: "Sign in" })
      .getByRole("textbox", { name: "Password" })
      .click();
    await page
      .locator(':text-is("Using the Grid")')
      .locator("..")
      .getByRole("textbox", { name: "Email" })
      .click();
  });

  test("Reusing locators", async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    await basicForm
      .getByRole("textbox", { name: "Email" })
      .fill("test@test.com");
    await basicForm
      .getByRole("textbox", { name: "Password" })
      .fill("test@test.com");
    await basicForm.getByRole("button").click();
  });

  test("extrating values", async ({ page }) => {
    //single text value
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const buttonText = await basicForm.locator("button").textContent();
    expect(buttonText).toEqual("Submit");

    //all text values
    const allRadioButtonsLabels = await page
      .locator("nb-radio")
      .allTextContents();
    expect(allRadioButtonsLabels).toContain("Option 1");

    //input value
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    await emailField.fill("correo@test");
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual("correo@test");

    const placeholderValue = await emailField.getAttribute("placeholder");
    expect(placeholderValue).toEqual("Email");
  });

  test("assertions", async ({ page }) => {
    const basicFormButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("button");

    //General assertions
    const value = 5;
    expect(value).toEqual(5);

    const text = await basicFormButton.textContent();
    expect(text).toEqual("Submit");

    //Locator assertions
    await expect(basicFormButton).toHaveText("Submit");

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText("Submit5");
    await basicFormButton.click();
  });
});
