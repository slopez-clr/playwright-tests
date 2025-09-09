
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { getEnvironment } from './environment-config';
import { languageConfig } from './language-config';

// Obtener la configuración del entorno
const environment = getEnvironment();

// Definir lenguajes soportados con sus locales
const supportedLanguages = {
  en: { locale: 'en-GB' },
  es: { locale: 'es-ES' },
  ca: { locale: 'ca-ES' },
  fr: { locale: 'fr-FR' },
  ko: { locale: 'ko-KR' }
};

// Definir navegadores
const browsers = {
  chrome: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox']
};

// Generar proyectos dinámicamente
const generateProjects = () => {
  const projects = [];

  // Obtener el entorno de la variable de entorno o usar el predeterminado
  const targetEnv = process.env.TEST_ENV?.toLowerCase() || 'qa';

  // Navegadores a usar
  const projectBrowsers = {
    qa: ['chrome', 'firefox'],       // En QA testeamos en Chrome y Firefox
    preproduction: ['chrome']        // En Preprod solo en Chrome para reducir tiempo
  };

  // Crear proyectos solo para el entorno específico
  const selectedBrowsers = projectBrowsers[targetEnv] || ['chrome'];

  // Para cada navegador configurado para este entorno
  selectedBrowsers.forEach(browser => {
    // Para cada idioma soportado
    Object.keys(languageConfig).forEach(lang => {
      // Solo añadir Firefox para inglés y español para reducir la matriz de pruebas
      if (browser === 'firefox' && !['en', 'es'].includes(lang)) return;

      projects.push({
        name: `${browser}-${lang}-${targetEnv}`,
        use: {
          ...browsers[browser],
          locale: supportedLanguages[lang].locale,
          baseURL: environment.baseURL,
          extraData: {
            ...languageConfig[lang],
            environment: targetEnv
          }
        }
      });
    });
  });

  return projects;
};

export default defineConfig({
  // Configuración global
  testDir: './',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  use: {
    baseURL: environment.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: generateProjects(),
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/junit-report.xml' }],
    ['html', { open: 'never' }],
  ]
});