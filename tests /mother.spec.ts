import { test, expect } from "@playwright/test";

test("should navigate to mother page", async ({ page }) => {
  await page.goto("/mother");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ChildRight/);
});

test("get started link", async ({ page }) => {
  await page.goto("/mother");

  // Click the get started link.
  await page.getByText;

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
