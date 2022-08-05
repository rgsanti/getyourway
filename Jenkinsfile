pipeline {
     agent any
     tools {
         nodejs "nodejs"
     }
     environment {
         REACT_APP_API_HOST_PORT = credentials('jenkins-react-api-host-port')
         REACT_APP_GOOGLE_MAPS_API_KEY = credentials('jenkins-react-google-maps-api-key')
     }
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