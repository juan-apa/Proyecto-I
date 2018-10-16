pipeline {
  agent any
  stages {
    stage('copiar libs') {
      steps {
        bat(script: 'copiarLibs.bat', returnStatus: true, encoding: 'utf-8')
      }
    }
  }
}