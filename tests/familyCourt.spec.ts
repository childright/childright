import { test, expect } from "@playwright/test";

test("Application flow testing legalActions to familyCourt", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/legalActions");
  await page.getByRole("heading", {
    name: "Geld vorhanden für einen eigenen Anwalt - Unterhalt einklagen",
  });
  await page.waitForSelector("a[data-button='true'][href='/familyCourt']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForSelector("h1");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Vorbereitung der Klage (Ratgeber, Infos)";
  });
  await page.waitForURL("http://localhost:3000/familyCourt");
  await expect(page).toHaveURL("http://localhost:3000/familyCourt");
});
