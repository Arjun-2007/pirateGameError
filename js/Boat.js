class Boat {
    constructor(x,y,w,h,boatPosition){
        var options = {
            friction: 1,
            density: 1,
            restitution: 0.2
        }
        this.ship = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.ship);
        this.width = w;
        this.height = h;
        this.boatPosition = boatPosition;
        this.image = loadImage("assets/boat.png");
    }
     display(){
         var pos = this.ship.position;
         push();
         translate(pos.x,pos.y);
         imageMode(CENTER);
         image(this.image,0, this.boatPosition,this.width,this.height);
        pop();
     }
     remove(index){
         setTimeout(()=>{
            World.remove(world,this.ship);
            boats.splice(index,1);
         },500)
     }
}
