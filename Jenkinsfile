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
        bat(script: 'jar -cvf ./dwr_test/web/dwr_test.war', encoding: 'utf-8')
      }
    }
  }
}