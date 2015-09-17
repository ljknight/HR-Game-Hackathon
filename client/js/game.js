var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameContainer');

var cursors;
var mainState = {
  preload: function () {
    game.stage.backgroundColor = '#00CBFF';
    game.load.image('player', 'assets/llama.png'); 
    // game.load.image('pizza', 'assets/pizza.png'); 
    game.load.spritesheet('pizza', 'assets/pizza.png', 0, 0);
    // game.load.image('ground', 'assets/ground.png');
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.game.add.sprite(100, 245, 'player');
    game.physics.arcade.enable(this.player);
    // this.player.body.gravity.y = 1000; 
    // this.player.body.bounce.y = 0.5;
    this.player.body.collideWorldBounds = true;

    // this.pizza = this.game.add.sprite(10, 10, 'pizza');
    // game.physics.arcade.enable(this.pizza);
    // this.pizza.body.gravity.y = 1000; 
    // this.pizza.body.bounce.y = 0.5;
    // this.pizza.body.collideWorldBounds = true;

    group = game.add.group();
    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;


    for (var i = 0; i < 40; i++) {
      var c = group.create(game.rnd.integerInRange(0, 900), game.rnd.integerInRange(0, 500), 'pizza', 17);
      c.name = 'pizza' + i;
      c.body.immovable = true;
    }
    
    // this.ground = [];
    // for (var i = 0; i < game.world.width; i+=70) {
    //   this.ground.push(this.platforms.create(i, game.world.height - 70, 'ground'));
    // }
    // for (var j = 0; j < this.ground.length; j++) {
    //   this.ground[j].body.immovable = true; 
    // }
    cursors = game.input.keyboard.createCursorKeys();

    
  },

  update: function () {
    // for (var i = 0; i < this.ground.length; i++) {
    //   game.physics.arcade.collide(this.player, this.ground[i]); 
    // }
    game.physics.arcade.overlap(this.player, group, collisionHandler, null, this);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;
    }
  }
};

function collisionHandler (player, pizza) {
    //  If the player collides with the pizza then they get eaten
    //  The pizza frame ID is 17

    if (pizza.frame == 17)
    {
        pizza.kill();
    }

}

game.state.add('main', mainState);
game.state.start('main');
