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
                    sh '''
                    export DEBIAN_FRONTEND=noninteractive
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        apt-get update
                        apt-get install -y apt-utils
                        apt-get install -y docker.io
                        docker --version
                        curl -L https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
                        chmod +x /usr/local/bin/docker-compose
                        docker-compose --version
                    else
                        echo "Docker is already installed"
                        docker --version
                    fi
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the necessary images (e.g., web app)
                    sh '''
                        docker-compose up -d

                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests for the web app or backend service as needed
                    sh 'docker-compose run --rm test'
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
