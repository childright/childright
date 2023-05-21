import { test, expect } from "@playwright/test";

test("Application flow testing lawyerSchedule to legalProcess", async ({
  page,
}) => {
  await page.goto("/lawyerSchedule");
  await page.getByRole("heading", { name: "Jugendamt - Anwalt Termin" });
  await page.getByRole("heading", {
    name: "Jugendamt / Anwalt setzt ein Schreiben auf an Unterhaltspflichtigen, um zu zahlen.",
  });
  await page.waitForSelector("a[data-button='true'][href='/legalProcess']", {
    timeout: 3000,
  });
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForSelector("h1");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.innerText === "Rechtsweg - Unterhalt einklagen";
  });
  await page.waitForURL(/.*legalProcess.*/gm);
  await expect(page).toHaveURL(/.*legalProcess.*/gm);
});
