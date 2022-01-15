const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var balls = [];
var boats = [];
var canvas, angle, tower, ground, cannon;
var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
}



function draw() {

  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
  for( var i=0; i < balls.length; i++){
    showBall(balls[i],i);
    checkCollision(balls[i],i);
  }
  cannon.display();
  showBoats();
}
function keyPressed() {
  if(keyCode === DOWN_ARROW){
    ball = new CannonBall(cannon.x,cannon.y);
    balls.push(ball);
  }
}
function keyReleased() {
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}
function showBall(ball,i) {
  if(ball){
    var ballPos = ball.body.position;
    ball.display();
    if(ballPos.x > width || ballPos.y > height - 50){
      balls.splice(i,1);
    }
  }
}
function showBoats(){
  if(boats.length > 0){
    if(boats[boats.length-1] === undefined || 
      boats[boats.length - 1].ship.position.x < width/2){
        var positions = [-40,-30,-20];
        var position = random(positions);
        var boat = new Boat(width - 100,height-40,150,150,position);
        boats.push(boat);
    }
    for(var i = 0;i < boats.length;i++){
      if(boats[i]){
        Body.setVelocity(boats[i].ship, {x: -0.9, y: 0});
        boats[i].display();
      }
    }
  }else{
    var boat = new Boat(width - 100,height-40,150,150,-40);
    boats.push(boat);
  }
}
function checkCollision(ball,ballIndex){
  for(var i = 0; i < boats.length; i++){
    if(ball !== undefined && boats[i] !== undefined){
      var collision = Matter.SAT.collides(ball.body,boats[i].ship);
      if(collision.collided){
        boats[i].remove(i);
        ball.remove(ballIndex);
      }
    }
  }
}