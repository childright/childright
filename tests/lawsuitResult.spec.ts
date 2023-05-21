import { test, expect } from "@playwright/test";

test("Application flow testing familyCourt to lawsuitResult", async ({
  page,
}) => {
  await page.goto("/familyCourt");
  await page.getByRole("heading", {
    name: "Vorbereitung der Klage (Ratgeber, Infos)",
  });
  await page.getByRole("heading", {
    name: "Ratgeber Infos: Was passiert vor dem Familiengericht (Weiterführende Links)",
  });
  await page.waitForSelector("a[data-button='true'][href='/lawsuitResult']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForSelector("h1");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Ergebnisse der Klage (Ratgeber, Infos)";
  });
  await page.waitForURL(/.*lawsuitResult.*/gm);
  await expect(page).toHaveURL(/.*lawsuitResult.*/gm);
});
