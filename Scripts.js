var  context, controller, rectangle, coins, points = 0, loop, border;

context = document.querySelector("canvas").getContext("2d");


context.canvas.height = 400;
context.canvas.width = 560;

rectangle = {
    
    height: 32,
    jumping: true,
    width: 32,
    x: 280,
    x_velocity: 0,
    y: 0, 
    y_velocity: 0

};

coins = {

    x: Math.random()*11 + 200,
    y: Math.random()*11 + 300,
    colected: false,
    width: 16,
    height: 16
};

controller = {

    left: false,
    right: false,
    up: false,

    keyListener:function(event){
        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode){
            case 65:
                controller.left = key_state;
                console.log("left");
            break;
            case 68:
                controller.right = key_state;
                console.log("right");
            break;
            case 32:
                controller.up = key_state;
                console.log("up");
        }
    }
};

function colisionDetection(){
    document.getElementById("punkty").innerText = "Posiadasz: " + points + "pkt!";
    if((coins.x > rectangle.x && coins.x+coins.width < rectangle.x+rectangle.width) && coins.colected != true && (coins.y > rectangle.y && coins.height + coins.y < rectangle.height+rectangle.y)){
        coins.colected = true;
        coins.x = Math.floor(Math.random()*230) + 200;
        coins.y = Math.random()*10 + 300;
        points += 1;
        
        console.log("Pozycja kwadraciku: "+Math.floor(rectangle.x)+"/"+Math.floor(rectangle.y)+"Pozycja pieniaszka: "+Math.floor(coins.x)+"/"+(coins.y));
    }
    else{
        coins.colected = false;
    }
    
}

loop = function() {

    colisionDetection();

    if(controller.up && rectangle.jumping == false){
        rectangle.y_velocity -= 20;
        rectangle.jumping = true;
    }

    if(controller.left){
        rectangle.x_velocity -= 0.5;
    }

    if(controller.right){
        rectangle.x_velocity += 0.5;
    }

    

    rectangle.y_velocity += 1.5;
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9;
    rectangle.y_velocity *= 0.9;

    if(rectangle.y > 400 - 16 - rectangle.width){

        rectangle.jumping = false;
        rectangle.y = 400 - 16 - 32;
        rectangle.y_velocity = 0;
    }

    if(rectangle.x < -32){

        rectangle.x = 560;
    }
    else if(rectangle.x > 560){
        
        rectangle.x = -32;
    }

    context.fillStyle = "#202020";
    context.fillRect(0,0,560,400);
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.rect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
    context.fill();
    context.fillStyle = "#cccccc";
    context.beginPath();
    context.rect(coins.x, coins.y, coins.width, coins.height);
    context.fill();
    context.strokeStyle = "#202830"
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0,382);
    context.lineTo(560, 382);
    context.stroke();
    
    window.requestAnimationFrame(loop);
}
















window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);