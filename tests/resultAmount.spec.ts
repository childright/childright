import { test, expect } from "@playwright/test";

test("Application flow testing resultAmount to resultTemplates", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/resultAmount");
  await page.getByText("Dein exakter Unterhaltsanspruch:");
  await page.getByText("Annas exakter Unterhaltsanspruch:");
  await page.waitForSelector("a[data-button='true'][href='/resultTemplates']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForSelector("span:has-text('Weiter')", {
    timeout: 5000,
  });
  await expect(page).toHaveURL("http://localhost:3000/resultTemplates");
});
