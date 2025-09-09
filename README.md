# Pruebas Automatizadas para Museo Thyssen con Playwright

Este proyecto contiene pruebas automatizadas end-to-end para el flujo de compra de entradas del Museo Thyssen utilizando Playwright.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm (incluido con Node.js)
- Un editor de código como Visual Studio Code, WebStorm o IntelliJ IDEA

## Instalación

### Windows

1. Clonar el repositorio:
   ```cmd
   git clone <url-del-repositorio>
   cd playwright-tests
   ```

2. Instalar las dependencias:
   ```cmd
   npm install
   ```

3. Instalar los navegadores de Playwright:
   ```cmd
   npx playwright install
   ```

### Linux / macOS

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd playwright-tests
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Instalar los navegadores de Playwright:
   ```bash
   npx playwright install
   ```

4. En Linux, es posible que necesites instalar algunas dependencias adicionales para los navegadores. Puedes hacerlo con:
   ```bash
   sudo npx playwright install-deps
   ```

## Estructura del Proyecto

- `compra-museo.spec.ts` - Prueba principal para el flujo de compra
- `playwright.config.ts` - Configuración de Playwright
- `environment-config.ts` - Configuración de entornos (QA, preproducción)
- `language-config.ts` - Configuraciones de idiomas soportados
- `package.json` - Configuración del proyecto y scripts

# Ejecutar las Pruebas

## Ejecutar pruebas para un entorno específico

La configuración está diseñada para ejecutar pruebas solamente en el entorno que especifiques. Cada comando ejecutará las pruebas **exclusivamente** en el entorno indicado.

### Entorno de QA (pruebas)