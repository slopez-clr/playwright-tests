// environment-config.ts

/**
 * Configuración de entornos para las pruebas de Playwright
 */
export interface Environment {
  name: string;
  baseURL: string;
  apiURL?: string;
  credentials?: {
    username: string;
    password: string;
  };
  features?: {
    [key: string]: boolean;
  };
}

/**
 * Configuración del entorno de QA (pruebas)
 */
export const qaEnvironment: Environment = {
  name: 'qa',
  baseURL: 'https://museothyssen-qa.clorian.com',
  apiURL: 'https://api-museothyssen-qa.clorian.com',
  credentials: {
    username: 'test-user',
    password: 'test-password'
  },
  features: {
    paymentSimulation: true,
    newCheckout: true
  }
};

/**
 * Configuración del entorno de preproducción
 */
export const preproductionEnvironment: Environment = {
  name: 'preproduction',
  baseURL: 'https://museothyssen-preprod.clorian.com',
  apiURL: 'https://api-museothyssen-preprod.clorian.com',
  credentials: {
    username: 'preprod-user',
    password: 'preprod-password'
  },
  features: {
    paymentSimulation: true,
    newCheckout: true
  }
};

/**
 * Obtener el entorno configurado basado en variables de entorno
 * @returns La configuración del entorno seleccionado
 */
export function getEnvironment(): Environment {
  const envName = process.env.TEST_ENV?.toLowerCase() || 'qa';

  switch (envName) {
    case 'preprod':
    case 'preproduction':
      return preproductionEnvironment;
    case 'qa':
    default:
      return qaEnvironment;
  }
}
