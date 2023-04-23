import { test, expect } from "@playwright/test";

test("Application flow testing legalActions to familyCourt", async ({
  page,
}) => {
  await page.goto("/legalActions");
  await page.getByRole("heading", {
    name: "Geld vorhanden für einen eigenen Anwalt - Unterhalt einklagen",
  });
  await page.getByRole("heading", {
    name: "Option 1: Jugentamt stellt Anwalt",
  });
  await page.waitForSelector("a[data-button='true'][href='/familyCourt']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await expect(page).toHaveURL(/familyCourt/);
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return (
      h4 &&
      h4.innerText ===
        "Ratgeber Infos: Was passiert vor dem Familiengericht (Weiterführende Links)"
    );
  });
});
