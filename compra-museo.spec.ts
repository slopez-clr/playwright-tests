// tests/compra-museo.spec.ts

import { test, expect } from '@playwright/test';
import { getLanguageConfig } from './language-config'

const config = getLanguageConfig();

test.describe('Flujo de compra de entradas en el Museo Thyssen', () => {

    test('El usuario puede comprar una entrada de exposición temporal con éxito', async ({ page }) => {

        // Paso 1: Navegar a la página de inicio
        await test.step('Navegar a la página de inicio', async () => {
            await page.goto('/');
            await expect(page).toHaveTitle(/Buy tickets Museo Nacional Thyssen Bornemisza | Clorian/);
        });

        // Paso 2: Seleccionar una exposición y la entrada
        await test.step('Seleccionar la entrada para una exposición temporal', async () => {
            // Se asume que la primera entrada visible es la que queremos comprar
           // await page.locator('.btn-custom-buy').first().click();
            await page.getByRole('button', { name: config.buyButton }).first().click();

            // Elegir una fecha disponible. El test selecciona la primera fecha en el calendario.
            await page.locator('.availability').first().click();

           // await page.locator('.date').first().click();
        });

        // Paso 3: Elegir la cantidad de entradas y el horario
        await test.step('Seleccionar cantidad y horario', async () => {
            // Esperar y seleccionar el primer horario disponible
            // Seleccionar el primer botón con clase "event" (para cualquier horario)
            await page.locator('button.event').first().click();



            // Verificar si existe un input específico
            const inputExists = await page.getByRole('textbox', { name: 'quantity' }).isVisible();

            await page.getByRole('button', { name: '+' }).first().click();




            // Clic en el botón para continuar
            // await page.getByRole('button', { name: 'Continue', exact: true }).click();
            await page.locator('button.select-tickets').filter({ hasText: config.continueButton }).click();


            // Clic en el botón para continuar si hay productos adicionales
            await page.locator('button.btn-custom-addToCart').filter({ hasText: config.continueButton  }).click();

        });

        // Paso 4: Rellenar el formulario de información personal
        await test.step('Rellenar el formulario de datos personales', async () => {
            //await page.getByLabel('Name').fill('Playwright');
            await page.getByLabel(/Name\s*\*/).fill('Juan');
            await page.getByLabel(/Surname\s*\*/).fill('Tester');
            await page.getByLabel(/Telephone\s*\*/).fill('612345678');
            await page.getByLabel(/Email address\s*\*/).fill('tester@playwright.dev');
            await page.getByLabel(/Repeat your email address\s*\*/).fill('tester@playwright.dev');
            // Combinar varios atributos
            await page.locator('select#contact-country.form-control').selectOption('Spain');
            await page.getByLabel(/Postal Code\s*\*/).fill('08027');
        });

        //Paso 5 Seleccionar método de pago

        await test.step('Seleccionar método de pago con tarjeta', async () => {
            // Navegar a la página de pago (asumiendo que ya estás en esta página)

            // Seleccionar la opción de pago con tarjeta
            //await page.getByRole('radio', { name: 'Credit/debit card' }).check();

            // Verificar que está seleccionado
            await expect(page.locator('#pm-1')).toBeChecked();

            // También se puede verificar que aparecen elementos adicionales después de seleccionar este método
            // Por ejemplo, si aparece un formulario para los datos de la tarjeta
           // await expect(page.locator('.card-details-form')).toBeVisible();

            // Seleccionar el checkbox por su rol y texto asociado
            await page.getByRole('checkbox', { name: config.termsText }).click();


        });

        // Paso 6: Confirmación de la compra
        await test.step('Verificar redirección a pasarela de pago', async () => {


            // Clic en el botón para pagar
            await page.locator('button.btn-custom-addToCart').filter({ hasText: 'Pay' }).click();

            // Esperar a que la URL cambie a la pasarela de pago
            await expect(page).toHaveURL(/.*redsys.*\/sis\/realizarPago/, { timeout: 30000 });

            // Verificar que estamos en la página de Redsys usando el texto específico
            await expect(page.locator('p.powered')).toHaveText('Powered by Redsys');

            // Tomar una captura de pantalla como evidencia
            await page.screenshot({ path: 'redsys-redirect.png' });

            // No continuamos con el proceso de pago real


            // No continuamos con el proceso de pago real
        });


        // NOTA: Para completar la transacción, el siguiente paso sería simular un pago.
        // Sin embargo, esto requiere datos de tarjeta de prueba y un entorno de test de pasarela de pago.
        // Este test se detiene en la página de resumen, que es un paso crucial del flujo de compra.
    });
});