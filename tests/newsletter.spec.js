const { test, expect } = require('@playwright/test');

test('inscreve um e-mail na newsletter', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Seu e-mail').fill('ada@example.com');
  await page.getByRole('button', { name: 'Inscrever' }).click();
  await expect(page.getByText('Inscrição confirmada!', { exact: true })).toBeVisible();
});

test('disponibiliza cancelamento acessível após confirmar inscrição válida', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Seu e-mail', exact: true }).fill('ada@example.com');
  await page.getByRole('button', { name: 'Inscrever', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Inscrição confirmada!');

  await expect(page.getByRole('button', { name: 'Cancelar inscrição', exact: true })).toBeVisible();
});

async function inscrever(page) {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Seu e-mail', exact: true }).fill('ada@example.com');
  await page.getByRole('button', { name: 'Inscrever', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Inscrição confirmada!');
}

async function cancelar(page) {
  const botao = page.getByRole('button', { name: 'Cancelar inscrição', exact: true });
  await expect(botao).toBeVisible();
  await botao.click();
}

test('anuncia exatamente Inscrição cancelada! na região de status ao cancelar', async ({ page }) => {
  await inscrever(page);

  await cancelar(page);

  await expect(page.getByRole('status')).toBeVisible();
  await expect(page.getByRole('status')).toHaveText(/^Inscrição cancelada!$/);
});

test('volta a disponibilizar o formulário de inscrição ao cancelar', async ({ page }) => {
  await inscrever(page);

  await cancelar(page);

  await expect(page.getByRole('textbox', { name: 'Seu e-mail', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Inscrever', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancelar inscrição', exact: true })).toBeHidden();
});

test('permite nova inscrição e novo cancelamento depois de cancelar', async ({ page }) => {
  await inscrever(page);
  await cancelar(page);

  await page.getByRole('textbox', { name: 'Seu e-mail', exact: true }).fill('grace@example.com');
  await page.getByRole('button', { name: 'Inscrever', exact: true }).click();

  await expect(page.getByRole('status')).toHaveText('Inscrição confirmada!');
  await expect(page.getByRole('button', { name: 'Cancelar inscrição', exact: true })).toBeVisible();
});

for (const { caso, email, erro } of [
  { caso: 'vazio', email: '', erro: 'valueMissing' },
  { caso: 'inválido', email: 'email-invalido', erro: 'typeMismatch' }
]) {
  test(`preserva validação nativa e bloqueia inscrição com e-mail ${caso}`, async ({ page }) => {
    await page.goto('/');
    const campo = page.getByRole('textbox', { name: 'Seu e-mail', exact: true });
    await campo.fill(email);

    await page.getByRole('button', { name: 'Inscrever', exact: true }).click();

    expect(await campo.evaluate((input, motivo) => input.validity[motivo], erro)).toBe(true);
    await expect(campo).toBeVisible();
    await expect(page.getByRole('status')).toBeEmpty();
    await expect(page.getByRole('button', { name: 'Cancelar inscrição', exact: true })).toBeHidden();
  });
}

test('reinicia o formulário sem inscrição nem anúncio após reload', async ({ page }) => {
  await inscrever(page);

  await page.reload();

  await expect(page.getByRole('textbox', { name: 'Seu e-mail', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Inscrever', exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toBeEmpty();
  await expect(page.getByRole('button', { name: 'Cancelar inscrição', exact: true })).toBeHidden();
});
