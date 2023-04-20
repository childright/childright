import { test, expect } from "@playwright/test";

test("Application flow testing positiveReactionTemplate to longTermBinding", async ({
  page,
}) => {
  await page.goto("/positiveReactionTemplate");
  await page.getByRole("heading", { name: "Langzeit Bindung nach Erfolg" });
  await page.waitForSelector("a[data-button='true'][href='/longTermBinding']");
  console.log("Clicking button...");
  await page.getByRole("link", { name: "Weiter" }).click();
  console.log("Button clicked");
  await page.waitForFunction(() => {
    const h4 = document.querySelector("h4");
    return h4 && h4.innerText === "Düsseldorfer Tabelle Updates ";
  });
  await page.waitForURL("http://localhost:3000/longTermBinding");
  await expect(page).toHaveURL("http://localhost:3000/longTermBinding");
});
