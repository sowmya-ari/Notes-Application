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
                stage('Backend'){
                  steps {
                    sh 'cd server && npm install'
                  }
                }
                stage('Frontend'){
                  steps {
                    sh 'cd client && npm install'
                  }
                }
            }
        }
        stage('Test') {
                steps {
                    sh 'cd server/test && npm test'
                }
        }
        stage('Building Docker image') {
            parallel{
                stage('Backend image'){
                  steps {
                    sh 'cd server && docker image build -t web .'
                    sh 'docker tag web sowmya1234/notes-web:latest'
                  }
                }
                stage('Frontend image'){
                  steps {
                    sh 'cd client && docker image build -t client ELB.Dockerfile .'
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
                sh 'ssh -i ${SSH_KEY_FOR_ec2} -o StrictHostKeyChecking=no ec2-user@3.230.150.182'
                sh 'ssh -i ${SSH_KEY_FOR_ec2} -o StrictHostKeyChecking=no ec2-user@34.237.1.95'
                sh 'ssh -i ${SSH_KEY_FOR_ec2} -o StrictHostKeyChecking=no ec2-user@3.232.129.26'
                sh 'ssh -i ${SSH_KEY_FOR_ec2} -o StrictHostKeyChecking=no ec2-user@3.224.114.200'
                sh 'cd ansible && ansible-playbook Notes.yml -i Inventory.txt --private-key=${SSH_KEY_FOR_ec2} -k -K'
              }     
            }
        }
    }
}    