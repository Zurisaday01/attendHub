pipeline {
    agent {
        docker {
            image 'jenkins/jenkins:lts'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        // Reference the Docker registry credentials stored in Jenkins
        DOCKER_CREDENTIALS = credentials('3656edb9-541f-480f-a4f1-876a86b3c969') 
        IMAGE_NAME = 'zury266/attendhub'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Zurisaday01/attendHub'
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
                    // Log in to Docker Hub using the credentials stored in Jenkins
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                        // Push the production image (e.g., web app)
                        sh 'docker compose push web-app'
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
