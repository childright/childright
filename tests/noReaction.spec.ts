import { test, expect } from "@playwright/test";

test("Application flow testing noReaction to lawyerList", async ({ page }) => {
  await page.goto("http://localhost:3000/noReaction");
  await page.getByRole("heading", { name: "Keine Reaktion" });
  await page.getByRole("heading", { name: "Was kann ich jetzt tun?" });
  await page.waitForSelector("a[data-button='true'][href='/lawyerList']", {
    timeout: 3000,
  });
  await page.getByRole("link", { name: "Weiter" }).click();
  await page.waitForFunction(() => {
    const h3 = document.querySelector("h3");
    return (
      h3 &&
      h3.innerText === "Folgende Dokumente werden für den Termin benötigt:"
    );
  });
  await expect(page).toHaveURL("http://localhost:3000/lawyerList");
});
