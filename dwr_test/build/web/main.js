/* global Fachada, dwr, parametros, Phaser, mask, b, a, Aviones, aviones_rojo */

//var game = new Phaser.Game(2048,
//        900,
//        Phaser.CANVAS,
//        'phaser-example',
//        {
//            preload: preload,
//            create: create,
//            update: update,
//            render: render
//        }
//);

/*Precarga del juego*/
//function preload() {
//
//}

/*Creacion del juego*/
//function create() {
//   
//}

//function move(pointer, x, y) {
//    mask.x = x - 100;
//    mask.y = y - 100;
//}
//
//function clickedSprite(sprite) {
//    mover = 1;
//}
//
//function clickedSprite2(sprite) {
//    mover = 2;
//}
//
//function clickedSprite3(sprite) {
//    mover = 3;
//}
//
//function clickedSprite4(sprite) {
//    mover = 4;
//}
//
//function disminuirCombustible(){
//    aviones_azules.disminuirCombustible();
//    aviones_rojos.disminuirCombustible();
//    Fachada.updateCombustibleAzul(aviones_azules.obtenerCombustibles(), function(){});
//    Fachada.updateCombustibleRojo(aviones_rojos.obtenerCombustibles(), function(){});
//}

//function update() {
//}


//function checkOverlap(spriteA, spriteB) {
//
//    var boundsA = spriteA.getBounds();
//    var boundsB = spriteB.getBounds();
//
//    return Phaser.Rectangle.intersects(boundsA, boundsB);
//
//};
//
//function collisionHandler2(a, b) {
//    a.kill();
//    if (barco_azul.getCantidadAviones() === 0) {
//        console.log('entre acaaaaaaaaaaa');
//        barco_azul.setearSprite(1);
//    }
//    if (barco_azul.getCantidadAviones() === 1) {
//        barco_azul.setearSprite(2);
//    }
//    if (barco_azul.getCantidadAviones() === 2) {
//        barco_azul.setearSprite(3);
//    }
//    if (barco_azul.getCantidadAviones() === 3) {
//        barco_azul.setearSprite(4);
//    }
//    barco_azul.agregarCantidadAviones();
//    console.log('cantidad de aviones: ' + barco_azul.getCantidadAviones());
//
//};
//
//function collisionHandler(a, b) {
//    b.kill();
//    a.kill();
//};
//
//
//
//function numeroRandom(min, max) {
//    return Math.round(Math.random() * (max - min) + min);
//}
//
//
//function checkOverlap(spriteA, spriteB) {
//    var boundsA = spriteA.getBounds();
//    var boundsB = spriteB.getBounds();
//    return Phaser.Rectangle.intersects(boundsA, boundsB);
//}
//
//
//function fire(spriteq) {
//    if (game.time.now > nextFire && weapon.countDead() > 0)
//    {
//        nextFire = game.time.now + fireRate;
//
//        var bullet = weapon.getFirstDead();
//
//        bullet.reset(spriteq.x - 8, spriteq.y - 8); // de donde sale la bala
//
//        bullet.lifespan = 200;		//distancia de la bala
//
//        bullet.trackrotation = true;
//
//        game.physics.arcade.moveToPointer(bullet, 2000);	//velocidad de la bala
//
//    }
//}


//function render() {
//    //game.debug.text("Caca" + parametros.MAX_BALAS + "VIDA:" + parametros.VIDA_MAX_AVION, 32, 32);
//}





