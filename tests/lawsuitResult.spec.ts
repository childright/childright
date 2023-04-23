import { test, expect } from "@playwright/test";

test("Application flow testing lawsuitResult to dashboard", async ({
  page,
}) => {
  await page.goto("lawsuitResult");
  await page.getByRole("heading", {
    name: "Ergebnisse der Klage (Ratgeber, Infos)",
  });
  await page.waitForSelector("a[data-button='true'][href='/dashboard']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await expect(page).toHaveURL(/dashboard/);
});
