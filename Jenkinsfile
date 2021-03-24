pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git(url: 'https://hub.fastgit.org/serchaofan/xiaolong-admin', branch: 'main')
      }
    }

    stage('Npm install') {
      steps {
        sh ''' pwd && ls '''
        sh '''npm install'''
      }
    }

    stage('npm run') {
      steps {
        sh 'npm run dev'
      }
    }

  }
}