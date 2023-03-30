import { test, expect } from "@playwright/test";

test("should navigate to mother page", async ({ page }) => {
  await page.goto("/http://localhost:3000/mother");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ChildRight/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000/mother");

  // Click the get started link.
  await page.getByText;

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
