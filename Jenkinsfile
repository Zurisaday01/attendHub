pipeline {
    agent any

    environment {
        IMAGE_NAME = 'zury266/attendhub'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Zurisaday01/attendHub'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the necessary images (e.g., web app)
                    sh 'docker compose -f docker-compose.yml build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests for the web app or backend service as needed
                    sh 'docker compose run --rm test'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: '3656edb9-541f-480f-a4f1-876a86b3c969', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry('https://index.docker.io/v1/', DOCKER_USERNAME) {
                            // Push the production image (e.g., web app)
                            sh 'docker compose push web-app'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
