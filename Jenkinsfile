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

        stage('Install Docker') {
            steps {
                script {
                    // Check if Docker is installed, if not install it
                    sh '''
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        apt-get update
                        apt-get install -y docker.io
                    else
                        echo "Docker is already installed"
                    fi
                    '''
                }
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
                            sh 'docker push zury266/attendhub:employee-service-latest'
                            sh 'docker push zury266/attendhub:attendance-service-latest'
                            sh 'docker push zury266/attendhub:identity-svc-latest'
                            sh 'docker push zury266/attendhub:web-app-latest'
                            sh 'docker push zury266/attendhub:gateway-service-latest'
                            sh 'docker push zury266/attendhub:test-latest'
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
