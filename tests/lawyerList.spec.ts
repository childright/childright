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
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return (
      h4 &&
      h4.innerText ===
        "Jugendamt / Anwalt setzt ein Schreiben auf an Unterhaltspflichtigen, um zu zahlen."
    );
  });
  await expect(page).toHaveURL("http://localhost:3000/lawyerSchedule");
});
