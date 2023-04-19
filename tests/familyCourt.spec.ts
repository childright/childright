import { test, expect } from "@playwright/test";

test("Application flow testing familyCourt to lawsuitResult", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/familyCourt");
  await page.getByRole("heading", {
    name: "Vorbereitung der Klage (Ratgeber, Infos)",
  });
  await page.getByRole("heading", {
    name: "Ratgeber Infos: Was passiert vor dem Familiengericht (Weiterführende Links)",
  });
  await page.waitForSelector("a[data-button='true'][href='/lawsuitResult']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await expect(page).toHaveURL("http://localhost:3000/lawsuitResult");
});
