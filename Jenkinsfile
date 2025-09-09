pipeline {
    agent any

    tools {
        // Usa el nombre que le diste a la instalación de NodeJS en la configuración global
        nodejs 'NodeJS 22'
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
                sh 'npm install'
                // Instala los navegadores necesarios
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            environment {
                        // Aquí definimos la variable de entorno que el script va a leer,
                        // usando el valor del parámetro de Jenkins
                        TEST_ENV = "${params.TARGET_ENV}"
                    }
            steps {
                // Ejecuta las pruebas. Puedes pasar argumentos adicionales
                sh 'npx playwright test --reporter=junit'
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