import { test, expect } from "@playwright/test";

test("Application flow testing lawsuitResult to dashboard", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/lawsuitResult");
  await page.getByRole("heading", {
    name: "Ergebnisse der Klage (Ratgeber, Infos)",
  });
  await page.waitForSelector("a[data-button='true'][href='/dashboard']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForSelector("h1");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Dashboard";
  });
  await page.waitForURL("http://localhost:3000/dashboard");
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
});
