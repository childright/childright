import { test, expect } from "@playwright/test";

test("Application flow testing resultAmount to resultTemplates", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/resultAmount");
  await page.getByText("Dein exakter Unterhaltsanspruch:").click();
  await page.getByText("Annas exakter Unterhaltsanspruch:").click();
  await page.getByText("Majas exakter Unterhaltsanspruch:").click();
  await page.getByText("Thorges exakter Unterhaltsanspruch:").click();
  await page.getByText("Chris' exakter Unterhaltsanspruch:").click();
  await page.getByText("Weiter").click();
  await page.getByRole("link", { name: "Weiter" }).click();
  await expect(page).toHaveURL("http://localhost:3000/resultTemplates");
});

test("Application flow testing resultTemplates to negativeReaction", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/resultTemplates");
  await page.getByRole("heading", { name: "Vorlage 1:" });
  await page.getByRole("heading", {
    name: "Für das persönliche Gespräch mit deinen Eltern",
  });
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("link", { name: "Negative Reaktion" }).click();
  await expect(page).toHaveURL("http://localhost:3000/negativereaction");
});

test("Application flow testing positiveReactionTemplate to longTermBinding", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/positivereactiontemplate");
  await page.getByRole("heading", { name: "Vorlage 1:" });
  await page.getByText("Nutze diese Vorlage als Hilfe!");
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("link", { name: "Weiter" }).click();
  await expect(page).toHaveURL("http://localhost:3000/longtermbinding");
});
