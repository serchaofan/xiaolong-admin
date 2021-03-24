pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git(url: 'https://github.com/serchaofan/xiaolong-admin', branch: 'main')
      }
    }

    stage('Npm install') {
      steps {
        sh ''' pwd && ls '''
        // sh '''cd xiaolong-admin && npm install'''
      }
    }

    // stage('npm run') {
    //   steps {
    //     sh 'npm run dev'
    //   }
    // }

  }
}