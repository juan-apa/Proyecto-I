var game = new Phaser.Game  (   2048, 
                                900, 
                                Phaser.CANVAS, 
                                'phaser-example', 
                                {
                                    preload: preload, 
                                    create: create, 
                                    update: update, 
                                    render: render
                                }
                            );
/*Cargo el avion aca, porque sino carga asincrónicamente y demora mas en cargar
 * la clase Avion que el main.js.*/
/*Class Avion.js*/
function Avion(nombreAvion, x, y, combustible){
    this.maxBalas = 200;
    this.maxVida = 400;
    this.combustible = combustible;
    this.seleccionado = false;
    
    this.sprite = game.add.sprite(x, y, 'block');
    this.sprite.anchor.set(0.5);
    this.sprite.name = nombreAvion;
    this.sprite.inputEnabled = true;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    /*Uso una función flecha para obtener el 'this' del avion construido.*/
    this.sprite.events.onInputDown.add(() => {
        this.seleccionado = true;
//        console.log(this.getSeleccionado());
    }, this);
    
    this.deseleccionar = function() {
        this.seleccionado = false;
    };
    this.getSeleccionado = function() {
        return this.seleccionado;
    };
}

/*Funciones del objeto*/
Avion.prototype.disparar = function(){
    this.maxBalas--; 
};

Avion.prototype.recargar = function(){
    this.maxBalas = parametros.MAX_BALAS;
};

Avion.prototype.moverAMouse = function(){
    if (game.input.mousePointer.isDown){
        game.physics.arcade.moveToPointer(this.sprite, 500);
        this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite) - 300;
        if (Phaser.Rectangle.contains(this.sprite.body, game.input.x, game.input.y))
        {
            this.sprite.body.velocity.setTo(0, 0);
        }
        game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1);
    }
    else {
        this.sprite.body.velocity.setTo(0, 0);
    }
};



var text = '';
var sprite;
var sprite2;
var weapon;
var fireRate = 100;
var nextFire = 0;
var cropRect;
var w;
var h;
var av1;
var av2;
var mover = 0;
var aviones_azules;
var aviones_rojos;

/*Precarga del juego*/
function preload() {
    game.load.image('block', 'avionn.png');
    game.load.image("fondoOceano", "oceano2.jpg");
    game.load.image("balas","balas2.png")
    game.load.image("barco","barcoo.png")
}

/*Creacion del juego*/
function create() {
    mapa = game.add.tileSprite(0, 0, 1600, 1200, 'fondoOceano');
    mapa.fixedToCamara = true;
    game.stage.backgroundColor = "#4488AA";
    game.world.setBounds(0, 0, 1600, 1200);
    
    //creo los grupos
    grupoTop = game.add.group();
    grupoLow = game.add.group();
    
    /*Aviones Azules*/
    aviones_azules = new Array();
    
    for(var i = 0; i < 4; i++){
        aviones_azules.push(new Avion("Azul_" + i, 100, i * 100, 30));
    }
    
    /*Avioens Rojos*/
    aviones_rojos = new Array();
    for(var i = 0; i < 4; i++){
        aviones_rojos.push(new Avion("Rojo_" + i, 400, i * 100, 30));
    }
    

    //Avion A1
    sprite = game.add.sprite(64 + (64 * 1), 200 + (1 * 4), 'block');
    sprite.anchor.set(0.5);
    sprite.name = 'Avion_A1';
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(clickedSprite, this);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    grupoTop.add(sprite);
    sprite.body.collideWorldBounds = true;
    
    game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1);
    
    //Avion A2
    sprite2 = game.add.sprite(64 + (64 * 1)+800, 200 + (1*4), 'block');
    sprite2.name = 'Avion_A2';
    sprite2.anchor.set(0.5);
    sprite2.inputEnabled = true;
    sprite2.events.onInputDown.add(clickedSprite2, this);
    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    grupoTop.add(sprite2);
    
    
    sprite3 = game.add.sprite(64 + (64 * 1)+800, 200 + (1*4)+300, 'barco');
    sprite3.name = 'B2';
    sprite3.width = 450;
    sprite3.height = 128;
    sprite3.anchor.set(0.5);
    sprite3.inputEnabled = true;
    sprite3.events.onInputDown.add(clickedSprite4, this);
    game.physics.enable(sprite3, Phaser.Physics.ARCADE);
    grupoLow.add(sprite3);

    sprite4 = game.add.sprite(64 + (64 * 1)+400, 200 + (1*4)+200, 'block');
    sprite4.name = 'Avion_Bomba';
    sprite4.anchor.set(0.5);
    sprite4.inputEnabled = true;
    sprite4.events.onInputDown.add(clickedSprite3, this);
    game.physics.enable(sprite4, Phaser.Physics.ARCADE);
    grupoTop.add(sprite4);
    
    sprite.kill();
    sprite2.kill();
    sprite4.kill();



    weapon = game.add.group();
    weapon.enableBody = true;
    weapon.physicsBodyType = Phaser.Physics.ARCADE;

    weapon.createMultiple(50, "balas");
    weapon.setAll('checkWorldBounds', true);
    weapon.setAll('outOfBoundsKill', true);
    sprite.body.allowRotation = false;
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');

}


function move(pointer, x, y) {
    mask.x = x - 100;
    mask.y = y - 100;
}

function clickedSprite (sprite) {    
    mover = 1;
}

function clickedSprite2 (sprite) {
    mover = 2;
}

function clickedSprite3 (sprite) {
    mover = 3;
}

function clickedSprite4 (sprite) {
    mover = 4;
}

var llamar = 0;
var x = 0;
var y = 0;
var azul = false;
var rojo = false;

function update() {
    llamar = llamar + 1;
    if(llamar === 0){
        if(azul == true){
//            console.log("entra azul");
            Fachada.updatePosRojo( aviones_azules[0].sprite.x, aviones_azules[0].sprite.y, aviones_azules[0].sprite.rotation,    {
                                            callback:function() {},
                                            timeout:5000,
                                            errorHandler:function(message) { console.log("error updatePos"); }
                                        });
            Fachada.getPosAzul( {
                                    callback: function(pos){ 
                                        aviones_rojos[0].sprite.x = pos[0];
                                        aviones_rojos[0].sprite.y = pos[1];
                                        aviones_rojos[0].sprite.rotation = pos[2];
                                    },
                                    timeout: 5000 ,
                                    errorHandler:function(message) { 
                                        console.log("error getPos");
                                    }
                                });
        }
        if(rojo == true){
//            console.log("entra rojo");
            Fachada.updatePosAzul( aviones_rojos[0].sprite.x, aviones_rojos[0].sprite.y, aviones_rojos[0].sprite.rotation,   {
                                            callback:function() {},
                                            timeout:5000,
                                            errorHandler:function(message) { console.log("error updatePos"); }
                                        });
            Fachada.getPosRojo( {
                                    callback: function(pos){ 
                                        aviones_azules[0].sprite.x = pos[0];
                                        aviones_azules[0].sprite.y = pos[1]; 
                                        aviones_azules[0].sprite.rotation = pos[2];
                                    },
                                    timeout: 5000 ,
                                    errorHandler:function(message) { 
                                        console.log("error getPos");
                                    }
                                });
        }
    }
    else{
        if(llamar > 0){ llamar = -1; }
    }
    
      
      
    
    game.world.bringToTop(grupoTop);
    
    if (fireButton.isDown && parametros.MAX_BALAS > 0)
    {
        if (mover == 1) {
            parametros.MAX_BALAS--;
            if (parametros.MAX_BALAS > 0) {
                fire(sprite);
            }
        }
        if (mover == 2) {
            parametros.MAX_BALAS--;
            if (parametros.MAX_BALAS > 0) {
                fire(sprite2);
            }
        }

        if (mover == 3) {
            caeBomba();
        }
    }
    
    mapa.tilePosition.x = -game.camera.x;
    mapa.tilePosition.y = -game.camera.y;

    if (mover == 1) {
        game.physics.arcade.overlap(weapon, sprite2, collisionHandler, null, this);
        var explosion = explosions.getFirstExists(false);
        explosion.play('kaboom', 30, false, true);
    }
    if (mover == 2) {
        game.physics.arcade.overlap(weapon, sprite, collisionHandler, null, this);
        var explosion = explosions.getFirstExists(false);
        explosion.play('kaboom', 30, false, true);
    }

    game.physics.arcade.collide(sprite2, sprite, test);
    game.physics.arcade.collide(sprite, sprite2, test);

    if (mover == 1) {
        //  only move when you click
        if (game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(sprite, 500);
            sprite.rotation = game.physics.arcade.angleToPointer(sprite) - 300;
            if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
            {
                sprite.body.velocity.setTo(0, 0);
            }
        } else {
            sprite.body.velocity.setTo(0, 0);
        }
    }

    if (mover==2){
        if (game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(sprite2, 500);

            sprite2.rotation = game.physics.arcade.angleToPointer(sprite2) - 300;
            if (Phaser.Rectangle.contains(sprite2.body, game.input.x, game.input.y))
            {
                sprite2.body.velocity.setTo(0, 0);
            }
        }
        else
        {
            sprite2.body.velocity.setTo(0, 0);
        }
    }

    if (mover==3){		
        if (game.input.mousePointer.isDown)
        {

            game.physics.arcade.moveToPointer(sprite4, 500);
            sprite4.rotation = game.physics.arcade.angleToPointer(sprite4) - 300;
            if (Phaser.Rectangle.contains(sprite4.body, game.input.x, game.input.y))
            {
                sprite4.body.velocity.setTo(0, 0);
            }
        }
        else
        {
            sprite4.body.velocity.setTo(0, 0);
        }
    }

    if (mover==4){
        if (game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(sprite3, 50);
            sprite3.rotation = game.physics.arcade.angleToPointer(sprite3);
            if (Phaser.Rectangle.contains(sprite3.body, game.input.x, game.input.y))
            {
                sprite3.body.velocity.setTo(0, 0);
            }
        }
        else
        {
            sprite3.body.velocity.setTo(0, 0);
        }
    }
    
    
    if(rojo == true){
        for(i = 0; i < 4; i++){
            if(aviones_rojos[i].getSeleccionado()){
                aviones_rojos[i].moverAMouse();
            }
            else{
                aviones_rojos[i].deseleccionar();
            }
            console.log(aviones_rojos[i].getSeleccionado());
        }
    }
    if(azul == true){
        for(i = 0; i < 4; i++){
            if(aviones_azules[i].getSeleccionado()){
                aviones_azules[i].moverAMouse();
            }
            else{
                aviones_azules[i].deseleccionar();
            }
        }
    }
    
}
function test(sprite, sprite2) {
    sprite.kill();
    sprite2.kill();
}

function caeBomba() {
    if (checkOverlap(sprite4, sprite3)) {
        sprite3.kill();
    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}


function fire(spriteq) {
    if (game.time.now > nextFire && weapon.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = weapon.getFirstDead();

        bullet.reset(spriteq.x - 8, spriteq.y - 8); // de donde sale la bala
		
		bullet.lifespan = 200;		//distancia de la bala

		bullet.trackrotation = true;
		
        game.physics.arcade.moveToPointer(bullet, 2000);	//velocidad de la bala
		
    }
}

function collisionHandler(weapon, sprite2) {
    sprite2.kill();
    weapon.kill();
}

function render() {
    game.debug.text("Click the Spritesssss" + parametros.MAX_BALAS + "VIDA:" + parametros.VIDA_MAX_AVION, 32, 32);
}





