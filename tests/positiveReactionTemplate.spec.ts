import { test, expect } from "@playwright/test";

test("Application flow testing positiveReaction positiveReactionTemplate", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/positiveReaction");
  await page.getByRole("heading", { name: "Auskunft Positiv" });
  await page.getByRole("heading", {
    name: "Schritt 1 Entnahme des Haushaltsnettoeinkommen:",
  });
  await page.waitForSelector(
    "a[data-button='true'][href='/positiveReactionTemplate']",
    {
      timeout: 3000,
    }
  );
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForSelector("span:has-text('Weiter')", {
    timeout: 5000,
  });
  await expect(page).toHaveURL(
    "http://localhost:3000/positiveReactionTemplate"
  );
});
