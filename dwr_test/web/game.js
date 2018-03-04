var game = new Phaser.Game(2048,
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

game.add.state('boot', bootState);
game.add.state('load', loadState);
game.add.state('menu', menuState);
game.add.state('play', playState);
game.add.state('win', winState);
game.add.state('loose', looseState);
