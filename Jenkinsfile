pipeline {
  agent any
  options {
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }
  stages {
    stage('Verify Tools') {
      steps {
        parallel (
          node: {
            sh 'npm -v'
          },
          docker: {
            sh 'docker --version'
            sh 'which docker'
          }
        )
      }
    }
    stage('Build') {
      steps {
        sh 'npm prune'
        sh 'npm install'
        sh 'npm run production'
      }
    }
    // stage('Test') {
    //   steps {
    //     sh 'npm test'
    //   }
    // }
    stage('Deploy master') {
      when {
        branch 'master'
      }
      steps {
        sh 'docker build -t isaak-frontend .'
        sh 'docker rm -f isaak-frontend-prod || true'
        sh 'docker run -d -p 80:4200 --restart always --e TZ=Europe/Amsterdam --name isaak-frontend-prod isaak-frontend'
        sh 'docker image prune -f'
      }
    }

  }
  post {
    always {
      cleanWs()
    }
  }
}
