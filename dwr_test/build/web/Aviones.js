/*Class Aviones.js*/
function Aviones(nombre) {
    this.grupo = game.add.group();
    /*Permito el click en los hijos*/
    this.grupo.inputEnableChildren = true;

    if (nombre === null) {
        this.grupo.name = nombre;
    }
    
    this.aviones = new Array();
    
    /*Cuando le hago click*/
    this.grupo.onChildInputDown.add((sprite) => {
        for (let i = 0; i < this.aviones.length; i++) {
            /*Dejar como ==, no ===*/
            if (i == sprite.name) {
                this.aviones[i].setSeleccionado(true);
            } else {
                this.aviones[i].setSeleccionado(false);
            }
        }
    }, this);
};

/*Funciones del objeto*/
Aviones.prototype.agregarAvion = function (avion) {
    this.grupo.add(avion.sprite);
    this.aviones.push(avion);
};

Aviones.prototype.existeAvion = function (avion) {
    if (this.aviones.indexOf(avion) === -1) {
        return false;
    } else {
        return true;
    }
};

Aviones.prototype.eliminarAvion = function (avion) {
    this.grupo.remove(avion.sprite);
    this.aviones.splice(this.aviones.indexOf(avion), 1);
};

Aviones.prototype.obtenerAvion = function (index) {
    return this.aviones[index];
};

Aviones.prototype.largo = function () {
    return this.aviones.length;
};

Aviones.prototype.obtenerPosicionesAviones = function () {
    let ret = new Array();
    for (let i = 0; i < this.aviones.length; i++) {
        ret.push(this.aviones[i].obtenerXYRot());
    }
    return ret;
};

Aviones.prototype.actualizarPosicionesAviones = function (posiciones) {
    for (let i = 0; i < this.aviones.length; i++) {
        if (posiciones[i] == null) {
            if(this.aviones[i].isVivo()){
                this.destruirAvion(i);
            }
        } else {
            this.aviones[i].sprite.x = posiciones[i].x;
            this.aviones[i].sprite.y = posiciones[i].y;
            this.aviones[i].sprite.rotation = posiciones[i].rot;
        }
    }
};

Aviones.prototype.actualizarPosicionesAviones2 = function (x, y, r) {
    for (let i = 0; i < this.aviones.length; i++) {
        this.aviones[i].sprite.x = x[i];
        this.aviones[i].sprite.y = y[i];
        this.aviones[i].sprite.rotation = r[i];
    }
};


Aviones.prototype.destruirAvion = function(i){
    try{
       let indiceEnGrupo = this.grupo.getChildIndex(this.aviones[i].sprite);
        if(indiceEnGrupo >= 0){
            this.grupo.removeChildAt(indiceEnGrupo);
        }
    } catch( e ){
        /*No hago nada en caso de error*/
    }
    this.aviones[i].destruir();
};

Aviones.prototype.disminuirCombustible = function(){
    for(let i = 0; i < this.aviones.length; i++){
        if((!this.aviones[i].aterrizado) && this.aviones[i].vivo){
            this.aviones[i].disminuirCombustible();
            if(this.aviones[i].sinCombustible()){
                this.destruirAvion(i);
            }
        }
    }
};

Aviones.prototype.obtenerCombustibles = function(){
    let ret = Array();
    for(let i = 0; i < this.aviones.length; i++){
        ret.push(this.aviones[i].obtenerCombustible());
    }
    return ret;
};

Aviones.prototype.updateAvionesVivos = function(arrBooleano){
  /*TODO terminar funcion*/
  for(let i = 0; i < this.aviones.length; i++){
      if(! arrBooleano[i]){
          this.destruirAvion(i);
      }
  }
};

Aviones.prototype.updateArmas = function(armas){
    for(let i = 0; i < this.aviones.length; i++){
        this.aviones[i].cambiarMunicion(armas[i]);
    }
};

Aviones.prototype.aterrizarAviones = function(arr){
    for(let i = 0; i < this.aviones.length; i++){
        if(arr[i]){
            this.aviones[i].aterrizado = true;
            this.aviones[i].sprite.visible = false;
            this.aviones[i].sprite.body.enable = false;
        }
        else{
            this.aviones[i].aterrizado = false;
            this.aviones[i].sprite.visible = true;
            this.aviones[i].sprite.body.enable = true;
        }
    }
};

Aviones.prototype.esconderAviones = function(arr){
    for(let i = 0; i < this.aviones.length; i++){
        if(arr[i]){
            this.aviones[i].sprite.visible = false;
            this.aviones[i].sprite.body.enable = false;
        }
        else{
            this.aviones[i].sprite.visible = true;
            this.aviones[i].sprite.body.enable = true;
        }
    }
};

Aviones.prototype.updateAlturasAviones = function(alturas){
    for(let i = 0; i < this.aviones.length; i++){
        this.aviones[i].setAltura(alturas[i]);
    }
};

Aviones.prototype.updateCombustibles = function(combustibles){
    for(let i = 0; i < this.aviones.length; i++){
        this.aviones[i].setCombustible(combustibles[i]);
    }
};

Aviones.prototype.obtenerBalasRestantes = function(){
    let ret = new Array(this.aviones.length);
    for(let i = 0; i < this.aviones.length; i++){
        ret[i] = this.aviones[i].arma.municion;
    }
    return ret;
};