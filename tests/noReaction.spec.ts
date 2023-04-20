import { test, expect } from "@playwright/test";

test("Application flow testing resultTemplates to noReaction", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/resultTemplates");
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
  await page.waitForSelector("a[data-button='true'][href='/noReaction']", {
    timeout: 3000,
  });
  console.log("Clicking link...");
  await page.getByRole("link", { name: "Keine Reaktion" }).click();
  console.log("Link clicked");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Keine Reaktion";
  });
  await page.waitForURL("http://localhost:3000/noReaction");
  await expect(page).toHaveURL("http://localhost:3000/noReaction");
});
