class CannonBall{
    constructor (x,y){
        this.r = 20;
        this.trajectory = [];
        var options = {
            isStatic: true
            }
        this.body = Bodies.circle(x,y,this.r,options)
        World.add(world,this.body)
        this.image = loadImage("./assets/cannonball.png");
    }

    display(){
        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.r,this.r);
        pop();
        if(this.body.velocity.x > 0 && this.body.position.x > 200){
            var positions = [pos.x,pos.y];
            this.trajectory.push(positions);
        }
        for(var i = 0; i < this.trajectory.length; i++){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1], 5,5)
        }
    }

    shoot(){
        var newAngle = cannon.angle - 25;
        newAngle = newAngle*(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body,{
            x:velocity.x*(180/3.14),
            y:velocity.y*(180/3.14)
        })
    }
    remove(index){
        Body.setVelocity(this.body,{x: 0, y: 0})
        setTimeout(()=>{
            World.remove(world,this.body);
            balls.splice(index,1);
        },500)
    }
}