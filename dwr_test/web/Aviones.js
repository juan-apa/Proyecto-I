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
}
;

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
        this.aviones[i].sprite.x = posiciones[i].x;
        this.aviones[i].sprite.y = posiciones[i].y;
        this.aviones[i].sprite.rotation = posiciones[i].rot;
    }
};


