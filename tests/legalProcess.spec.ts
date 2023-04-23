import { test, expect } from "@playwright/test";

test("Application flow testing legalProcess to legalActions", async ({
  page,
}) => {
  await page.goto("/legalProcess");
  await page.getByRole("heading", {
    name: "Rechtsweg - Unterhalt einklagen",
  });
  await page.getByRole("heading", {
    name: "Option 1: Jugentamt stellt Anwalt",
  });
  await page.waitForSelector("a[data-button='true'][href='/legalActions']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return h4 && h4.innerText === "Option 1: Jugentamt stellt Anwalt";
  });

  await expect(page).toHaveURL(/legalActions/);
});
