import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  //await successButton.click();
  //const text = await successButton.textContent();
  /*await successButton.waitFor({ state: "attached" });
  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");*/
  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  //___wait for element
  //await page.waitForSelector(".bg-success");

  //___ wait for particular response
  //await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  //____ wait for network calls to be completed ('NOT RECOMENDED')
  await page.waitForLoadState("networkidle");

  //await page.waitForTimeout(5000);

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
  //test.slow();
  const successButton = page.locator(".bg-success");

  await successButton.click({ timeout: 16000 });
});
