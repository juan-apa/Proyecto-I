function Hud(){
    this.cantAviones = 4;
    this.aviones = new Array(this.cantAviones);
    
    this.estiloLetra = {
        font: (factorEscaladoHud * 20).toString() + "px Arial", 
        fill: "#fffff", 
        align: "center" 
    };
    
    this.textos = new Array(this.cantAviones);
    this.armas = new Array(this.cantAviones);
    this.balas = new Array(this.cantAviones);
    this.combustibles = new Array(this.cantAviones);
    
    this.spritesAviones = game.add.group();
    this.spritesAviones.fixedToCamera = true;    
    for(let i = 0; i < this.cantAviones; i++){
        this.aviones[i] = this.spritesAviones.create(0, i*100 * factorEscaladoHud, 'hudAvion');
        this.aviones[i].scale.set(1 * factorEscaladoHud);
        this.textos[i] = game.add.text(3 * factorEscaladoHud, 1 * factorEscaladoHud, (i+1).toString(), this.estiloLetra);
        this.armas[i] = game.add.sprite(3, 70 , BOMBA.toString());
        this.armas[i].scale.set(0.34 * factorEscaladoHud);
        this.balas[i] = game.add.text(70, 70, 0, this.estiloLetra);
        this.combustibles[i] = game.make.graphics();
        this.aviones[i].addChild(this.combustibles[i]);
//        this.combustibles[i].lineStyle(2, 0xffffff, 1);
        this.combustibles[i].beginFill(0xffffff, 1);
        this.combustibles[i].drawRect(85, 3, 12, 12);
        this.combustibles[i].endFill();
        
        this.aviones[i].addChild(this.textos[i]);
        this.aviones[i].addChild(this.armas[i]);
        this.aviones[i].addChild(this.balas[i]);
        
        this.aviones[i].tint = 0x68ff86;
    }
    
    this.barco = game.add.sprite(0, 500 * factorEscaladoHud, 'hudBarco');
    this.velocidadBarco = game.add.text(60, 70, 0, this.estiloLetra);
    this.barco.addChild(this.velocidadBarco);
    
}

Hud.prototype.updateInfoAviones = function(vivo, tipoArma, combustibles, bloqueado){
    console.log(combustibles)
    for(let i = 0; i < this.cantAviones; i++){
        if(vivo[i]){
            this.aviones[i].tint = 0x68ff86;
        }
        else{
            this.aviones[i].tint = 0xff3535;
        }
        
        this.armas[i].loadTexture(tipoArma[i].toString());
        
        if(combustibles[i] > 60){
            this.combustibles[i].tint = 0x59ff00;
        }
        else if(combustibles[i] > 30){
            this.combustibles[i].tint = 0x68ff86;
        }
        else{
            this.combustibles[i].tint = 0xff1500;
        }
    }
};

Hud.prototype.updateBalas = function(cantBalas){
    for(let i = 0; i < this.cantAviones; i++){
        this.balas[i].setText(cantBalas[i].toString());
    }
};

Hud.prototype.updateInfoBarco = function(vivo, velocidad){
    if(vivo){
        this.barco.tint = 0x68ff86;
    }
    else{
        this.barco.tint = 0xff3535;
    }
    
    this.velocidadBarco.setText(velocidad.toString());
};