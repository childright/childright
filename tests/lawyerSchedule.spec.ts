import { test, expect } from "@playwright/test";

/*
 * Verifies presence of specific elements to be present.
 * Clicks on link and asserts if url matches the expeted url.
 * Ensures that navigation between pages funcitons as intended.
 * Early bug detection during navigation process.
 * Faster feedback on correctness of application flow.
 * Time and cost saving compared to manual testing.
 * Reliable test results by interacting with real browser (user perspective).
 */

test("Application flow testing lawyerList to lawyerSchedule", async ({
  page,
}) => {
  await page.goto("/lawyerList");
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
  await page.waitForURL(/.*lawyerSchedule.*/gm);
  await expect(page).toHaveURL(/.*lawyerSchedule.*/gm);
});
