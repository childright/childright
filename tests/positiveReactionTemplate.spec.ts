import { test, expect } from "@playwright/test";

test("Application flow testing positiveReaction positiveReactionTemplate", async ({
  page,
}) => {
  await page.goto("/positiveReaction");
  await page.getByRole("heading", { name: "Auskunft Positiv" });
  await page.getByRole("heading", {
    name: "Schritt 1 Entnahme des Haushaltsnettoeinkommen:",
  });
  await page.waitForSelector(
    "a[data-button='true'][href='/positiveReactionTemplate']"
  );
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    return (
      h1 &&
      h1.innerText === "Nutze diese Vorlage um deinen Anspruch einzufordern!"
    );
  });
  await page.waitForURL("http://localhost:3000/positiveReactionTemplate");
  await expect(page).toHaveURL(
    "http://localhost:3000/positiveReactionTemplate"
  );
});
