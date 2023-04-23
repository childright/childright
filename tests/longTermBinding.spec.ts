import { test, expect } from "@playwright/test";

test("Application flow testing positiveReactionTemplate to longTermBinding", async ({
  page,
}) => {
  await page.goto("/positiveReactionTemplate");
  await page.getByRole("heading", { name: "Langzeit Bindung nach Erfolg" });
  await page.waitForSelector("a[data-button='true'][href='/longTermBinding']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForSelector("button:has-text('Send Email')", {
    timeout: 5000,
  });
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return h4 && h4.innerText === "Düsseldorfer Tabelle Updates ";
  });
  await expect(page).toHaveURL(/longTermBinding/);
});
