import { test, expect } from "@playwright/test";

test("Application flow testing lawyerList to lawyerSchedule", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/lawyerList");
  await page.getByRole("heading", { name: "Jugendamt - Anwalt Checkliste" });
  await page.getByRole("heading", {
    name: "Folgende Dokumente werden für den Termin benötigt:",
  });
  await page.waitForSelector("a[data-button='true'][href='/lawyerSchedule']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Jugendamt - Anwalt Termin";
  });
  await page.waitForURL("http://localhost:3000/lawyerSchedule");
  await expect(page).toHaveURL("http://localhost:3000/lawyerSchedule");
});
