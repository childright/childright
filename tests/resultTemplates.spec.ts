import { test, expect } from "@playwright/test";

test("Application flow testing resultAmount to resultTemplates", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/resultAmount");
  await page.getByRole("heading", { name: "Deine Ergebnisse sind da!" });
  await page.waitForSelector("a[data-button='true'][href='/resultTemplates']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Deine Ergebnisse sind da!";
  });
  await page.waitForURL("http://localhost:3000/resultTemplates");
  await expect(page).toHaveURL("http://localhost:3000/resultTemplates");
});
