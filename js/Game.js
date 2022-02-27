class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  updateState(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
    
    car1=createSprite(width/2-50,height-100);
    car1.addImage("car1",car1_img);
    
    car2=createSprite(width/2+50,height-100);
    car2.addImage("car2",car2_img);
    
    cars= [car1,car2]
  }

  // function definition
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    // function call
    this.handleElements();
    
    // calling static function with class name
    // getting allPlayers information 
    Player.getPlayersInfo();

    if(allPlayers !== undefined){
      image(track,0, -height *5, width, height *6);

      // index of the array
      var index = 0;
      for (var plr in allPlayers) {
        index=index+1;

        // use the data from database to display the x and y axis of the cars
        var x = allPlayers[plr].positionX ;
        var y = height-allPlayers[plr].positionY ;
        
        cars[index-1].position.x = x;
        cars[index-1].position.y = y;
        
        if(index === player.index){
          // adding the circle behind the cars
          stroke(10);
          fill("red");
          ellipse(x,y,70,70);

          // changing the camera position
            camera.position.x = cars[index-1].position.x          
            camera.position.y = cars[index-1].position.y
        }
      }

    }

  }
}
