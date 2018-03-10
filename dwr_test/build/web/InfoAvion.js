function InfoAvion(){
    this.vivo = true;
    this.cantBalas = 0;
    this.tipoArma = METRALLETA;
    this.aterrizado = false;
    this.bloqueado = false;
}

InfoAvion.prototype.update = function(vivo, cantBalas, tipoArma, aterrizado){
    this.vivo = vivo;
    this.cantBalas = cantBalas;
    this.tipoArma = tipoArma;
    this.aterrizado = aterrizado;
};

InfoAvion.prototype.desbloquear = function(){
    this.bloqueado = false;
};

InfoAvion.prototype.bloquear = function(){
    this.bloqueado = true;
};