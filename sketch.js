var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
              
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
 
  survivalTime = 0;
  score = 0;
}


function draw() {
background(255);
  
 
  if(gameState === PLAY){

  var survivalTime = 0;     
  stroke("black");
  textSize(10);
  fill("black");
 text("Score: "+ score,300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/20);
  text("Survival Time: "+survivalTime,100,50);
    
    food();
  spawnObstacles();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+1;
    }
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space") && monkey.y>=200){
    monkey.velocityY = -12;
  }
   
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
    
    if(obstacleGroup.isTouching(monkey)){
     gameState = END;
    }
  }
  
  if (gameState === END) {
    ground.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
    
    monkey.collide(ground);
    
  }
  
  

drawSprites();
}


function food(){
  if (frameCount % 80 === 0){
   var banana = createSprite(400,200,20,20);
   banana.velocityX = -6;
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    bananaGroup.add(banana);

  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,325,20,20);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.15;
   obstacleGroup.add(obstacle);
 }
}