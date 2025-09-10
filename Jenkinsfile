pipeline {
    agent {
        docker {
            image 'node:22'
            args '-u root'
        }
    }

// --- Definición de los parámetros con valores por defecto ---
    parameters {
            choice(
                name: 'TARGET_ENV',
                choices: ['qa', 'preprod'],
                description: 'Select the test environment'
            )
            choice(
                name: 'TARGET_LANG',
                choices: ['es', 'en', 'fr','ca', 'ko'],
                description: 'Select the language for the tests'
            )
        }

    stages {
        stage('Checkout') {
            steps {
                // Clona tu repositorio de Git
                git branch: 'master', url: 'https://github.com/slopez-clr/playwright-tests.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Revisa si el directorio node_modules existe.
                    if (fileExists('node_modules')) {
                        echo "node_modules directory already exists. Skipping npm install."
                    } else {
                        echo "node_modules directory not found. Installing dependencies."
                        sh 'npm install'
                    }

                    // Revisa si los navegadores de Playwright ya están instalados.
                    // La ubicación del caché es común en entornos Docker/Linux.
                    if (fileExists('/root/.cache/ms-playwright/')) {
                        echo "Playwright browsers already exist. Skipping playwright install."
                    } else {
                        echo "Playwright browsers not found. Installing browsers."
                        sh 'npx playwright install'
                        // Instala dependencias adicionales si es necesario (ej. para Linux)
                        sh 'npx playwright install-deps'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                                    def targetEnv = params.TARGET_ENV ?: 'qa'
                                    def targetLang = params.TARGET_LANG ?: 'en'
                                    sh "npm run test:${targetEnv}:${targetLang} --reporter=junit"
                         }
            }
        }
    }

    post {
        always {
            // Publica los reportes para su visualización en Jenkins
            junit 'test-results/junit-report.xml'
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            echo "Playwright Report archived. Check 'Build Artifacts' for the full report."
        }
        failure {
            // Acciones adicionales si las pruebas fallan, como enviar notificaciones
            echo 'Tests failed! Check the report for details.'
        }
    }
}