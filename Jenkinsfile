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

                // 1. Usa el comando de shell 'md5sum' para obtener el hash del archivo.
                //    La opción returnStdout: true captura la salida del comando.
                def checksum = sh(script: 'md5sum package-lock.json', returnStdout: true).trim()

                // 2. Utiliza la variable 'checksum' como la clave para el caché.
                cache(path: 'node_modules', key: checksum) {
                    sh 'npm install'
                }
                // Instala los navegadores necesarios
                sh 'npx playwright install'
                // Instala dependencias adicionales si es necesario
                sh 'npx playwright install-deps'

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