pipeline {
  agent any
  stages {
    stage('copiar libs') {
      steps {
        bat(script: 'copiarLibs.bat', returnStatus: true, encoding: 'utf-8')
      }
    }
    stage('generar war') {
      steps {
        bat(script: 'cd C:\\Program Files\\Java\\jdk1.8.0_181\\bin && .\\jar -cvf .\\dwr_test.war .\\dwr_test\\web\\*', encoding: 'utf-8')
      }
    }
  }
}