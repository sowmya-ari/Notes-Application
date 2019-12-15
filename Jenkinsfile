pipeline {
    agent {
        docker {
            image 'node:10' 
        }
    }
    stages {
        stage('Cloning Notes git repository') {
            steps {
              git 'https://github.com/sowmya-ari/Notes-Application.git'
            }
        }
        stage('Installing packages') {
            parallel {
                stage('backend'){
                  steps {
                    sh 'cd server && npm install'
                  }
                }
                stage('frontend'){
                  steps {
                    sh 'cd client && npm install'
                  }
                }
            }
        }
        stage('Test') {
            parallel{
                stage('Backend testing'){
                  steps {
                    sh 'cd server/test && npm test'
                  }
                }
                stage('Frontend testing'){
                  steps {
                    sh 'cd client/src/test && npm test'
                  }
                }
            }
        }
        stage('Building Docker image') {
            parallel{
                stage('server image'){
                  steps {
                    sh 'cd server && docker image build -t web .'
                    sh 'docker tag web sowmya1234/notes-web:latest'
                  }
                }
                stage('client image'){
                  steps {
                    sh 'cd client && docker image build -t client .'
                    sh 'docker tag client sowmya1234/notes-client:latest' 
                  }
                }
            }
        }        
        stage('Deploying docker images to dockerhub'){
            steps {
                withDockerRegistry([ credentialsId: "dockerhub", url: "" ]) {
                 sh 'docker push sowmya1234/notes-client:latest'
                 sh 'docker push sowmya1234/notes-web:latest'
                }
            }
        }
        stage('Ansible installation'){
            steps {
             sh 'apt-get update -qy && apt-get install -qy software-properties-common && apt-get install -qy ansible'
             sh 'which ansible'
            }
        }    
        stage('Deployment'){
            steps {
              withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'privatekey-ec2', keyFileVariable: 'SSH_KEY_FOR_ec2')]) 
              {
                sh 'ssh -i ${SSH_KEY_FOR_ec2} -o StrictHostKeyChecking=no ec2-user@54.173.156.84'
                sh 'cd ansible && ansible-playbook Notes.yml -i Inventory.txt --private-key=${SSH_KEY_FOR_ec2} -k -K'
              }     
            }
        }
    }
}    