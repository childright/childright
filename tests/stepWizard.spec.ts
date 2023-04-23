import { test, expect } from "@playwright/test";

// const prisma = new PrismaClient();

/* test("Testing root directory", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("heading", { name: "ChildRight" }).click();
  await page.getByRole("main").getByRole("button", { name: "Einloggen" });
}); */

/* test("Testing calculate page", async ({ page }) => {
  await page.goto("http://localhost:3000/calculate");
  await page.getByRole("heading", { name: "Unterhaltsrechner" }).click();
  await page.getByText("Ergebnis: 0").click();
  await expect(page).toHaveURL(/.*profile/);
}); */

test("Testing result amount page", async ({ page }) => {
  await page.goto("/resultAmount");
  await page.getByText("Dein exakter Unterhaltsanspruch:").click();
  await page.getByText("Annas exakter Unterhaltsanspruch:").click();
  await page.getByText("Majas exakter Unterhaltsanspruch:").click();
  await page.getByText("Thorges exakter Unterhaltsanspruch:").click();
  await page.getByText("Chris' exakter Unterhaltsanspruch:").click();
  await page.getByText("Weiter").click();
  await page.getByRole("link", { name: "Weiter" }).click();
  await expect(page).toHaveURL(/resultTemplates/);
});

test("Testing result template page", async ({ page }) => {
  await page.goto("/resultTemplates");
  await page.getByRole("heading", { name: "Vorlage 1:" });
  await page.getByRole("heading", {
    name: "Für das persönliche Gespräch mit deinen Eltern",
  });
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("link", { name: "Negative Reaktion" }).click();
  await expect(page).toHaveURL(/negativereaction/);
});
