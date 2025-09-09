// language-config.ts
/**
 * Configuración de idiomas para las pruebas de Playwright
 */
export interface LanguageConfig {
  buyButton: string;
  continueButton: string;
  payButton: string;
  nameLabel: string;
  surnameLabel: string;
  termsText: string;
  emailLabel?: string;
  phoneLabel?: string;
  postalCodeLabel?: string;
}

/**
 * Configuraciones de texto para diferentes idiomas
 */
export const languageConfig: Record<string, LanguageConfig> = {
  en: {
    buyButton: 'Buy',
    continueButton: 'Continue',
    payButton: 'Pay',
    nameLabel: 'Name',
    surnameLabel: 'Surname',
    termsText: 'I have read and accept the conditions of service',
    emailLabel: 'Email address',
    phoneLabel: 'Telephone',
    postalCodeLabel: 'Postal Code'
  },
  es: {
    buyButton: 'Comprar',
    continueButton: 'Continuar',
    payButton: 'Pagar',
    nameLabel: 'Nombre',
    surnameLabel: 'Apellidos',
    termsText: 'He leído y acepto las condiciones de servicio',
    emailLabel: 'Correo electrónico',
    phoneLabel: 'Teléfono',
    postalCodeLabel: 'Código Postal'
  },
  ca: {
    buyButton: 'Comprar',
    continueButton: 'Continuar',
    payButton: 'Pagar',
    nameLabel: 'Nom',
    surnameLabel: 'Cognoms',
    termsText: 'He llegit i accepto les condicions del servei',
    emailLabel: 'Correu electrònic',
    phoneLabel: 'Telèfon',
    postalCodeLabel: 'Codi Postal'
  },
  fr: {
    buyButton: 'Acheter',
    continueButton: 'Continuer',
    payButton: 'Payer',
    nameLabel: 'Prénom',
    surnameLabel: 'Nom',
    termsText: 'J\'ai lu et j\'accepte les conditions de service',
    emailLabel: 'Adresse e-mail',
    phoneLabel: 'Téléphone',
    postalCodeLabel: 'Code Postal'
  },
  ko: {
    buyButton: '구매',
    continueButton: '계속',
    payButton: '결제',
    nameLabel: '이름',
    surnameLabel: '성',
    termsText: '서비스 약관을 읽고 동의합니다',
    emailLabel: '이메일 주소',
    phoneLabel: '전화번호',
    postalCodeLabel: '우편번호'
  }
};

/**
 * Obtener la configuración de idioma basada en variables de entorno
 * @returns La configuración del idioma seleccionado
 */
export function getLanguageConfig(): LanguageConfig {
  const lang = process.env.LANGUAGE?.toLowerCase() || 'en';
  return languageConfig[lang] || languageConfig.en;
}
