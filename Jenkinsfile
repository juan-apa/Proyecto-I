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
        bat(script: 'jar -cvf .\\dwr_test.war .\\dwr_test\\web\\*', encoding: 'utf-8')
      }
    }
  }
}