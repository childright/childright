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
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return h4 && h4.innerText === "Option 2: Selbst Anwalt wählen";
  });
  await expect(page).toHaveURL(/legalProcess/);
});
