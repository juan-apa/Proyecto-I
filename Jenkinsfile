pipeline {
  agent any
  stages {
    stage('init') {
      steps {
        echo 'Hello from jenkins'
      }
    }
    stage('copiar libs') {
      steps {
        bat(script: 'copiarLibs.bat', returnStatus: true, encoding: 'utf-8')
      }
    }
  }
}