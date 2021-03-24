pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        echo 'Clone'
        git(url: 'https://github.com/serchaofan/xiaolong-admin', branch: 'main')
      }
    }

    stage('Npm install') {
      steps {
        sh '''cd chaofan-admin &&
npm install'''
      }
    }

    stage('npm run') {
      steps {
        sh 'npm run dev'
      }
    }

  }
}