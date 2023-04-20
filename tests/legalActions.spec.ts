import { test, expect } from "@playwright/test";

test("Application flow testing legalProcess to legalActions", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/legalProcess");
  await page.getByRole("heading", {
    name: "Rechtsweg - Unterhalt einklagen",
  });
  await page.waitForSelector("a[data-button='true'][href='/legalActions']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForSelector("h4");
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return h4 && h4.innerText === "Option 1: Jugentamt stellt Anwalt";
  });
  await page.waitForURL("http://localhost:3000/legalActions");
  await expect(page).toHaveURL("http://localhost:3000/legalActions");
});
