/* global game */

var bootState = {
    create: function(){
        console.log("create boot");
        console.log("pasando a load");
        game.state.start('load');
    }
};