function InfoBarco(){
    this.vivo = true;
    this.velocidad = 100;
}

InfoBarco.prototype.update = function(vivo, velocidad){
    this.vivo = vivo;
    this.velocidad = velocidad;
};
