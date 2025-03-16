pipeline {
    agent {
        docker {
            image 'jenkins/jenkins:lts'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        // Docker registry credentials
        DOCKER_USERNAME = 'zury266'
        DOCKER_PASSWORD = '2661311ZEM'
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
                    // Log in to Docker Hub
                    sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    // Push production images (for example, web app)
                    sh 'docker compose push web-app'
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
