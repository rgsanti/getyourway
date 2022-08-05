pipeline {
     agent any
     tools {nodejs "nodejs"}
     stages {
        stage("Install dependencies") {
             steps {
                 sh "npm install"
             }
        }
        stage("Build") {
            steps {
                sh "npm run build"
            }
        }
        stage("Test") {
            steps {
                sh "npm test"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/jenkins-react-app"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/jenkins-react-app/"
            }
        }
    }
}