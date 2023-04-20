import { test, expect } from "@playwright/test";

test("Application flow testing resultTemplates to negativeReaction", async ({
  page,
}) => {
  await page.goto("/resultTemplates");
  await page.getByRole("heading", { name: "Vorlage 1:" });
  await page.getByRole("heading", {
    name: "Für das persönliche Gespräch mit deinen Eltern",
  });
  await page.waitForSelector("button[data-button='true']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("button", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForSelector(
    "a[data-button='true'][href='/negativeReaction']",
    {
      timeout: 3000,
    }
  );
  console.log("Clicking link...");
  await page.getByRole("link", { name: "Negative Reaktion" }).click();
  console.log("Link clicked");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Negative Reaktion";
  });
  await page.waitForURL("http://localhost:3000/negativeReaction");
  await expect(page).toHaveURL("http://localhost:3000/negativeReaction");
});
