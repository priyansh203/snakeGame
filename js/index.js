//Constants and variable 

let inputDir={x:0,y:0};
let foodSound=new Audio('music/food.mp3');
let gameOverSound=new Audio('music/gameover.mp3');
let moveSound=new Audio('music/move.mp3');
let musicSound=new Audio('music/music.mp3');
let speed=15;
let lastPaintTime=0;
let snakeArr=[
    {x:13 , y: 15}
];
let food={x:10,y:5};
let score=0;


//Game Functions
function main(ctime){ //ctime=current_time
    //we will use window.requestAnimationFrame instead of setIntervals
    window.requestAnimationFrame(main); // calling main multiple time it is now GAMELOOP
    
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}

function isCollide(snake){
    //if you bump into yourself
    for(i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }

    //if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //Part1: updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over!! Press any key to play again");
        snakeArr=[{x:13 , y: 15}];
        musicSound.play();
        score=0;

    }

    //If you have eaten the food, increament the score and regenrate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        score.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    //Moving the snake
    for(let i = snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    //Part2: Display the snake and food
    
    //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{   //e=element 
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    })


    //Display the Food
    
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    

}




//Main Login

window.requestAnimationFrame(main);  //we will use window.requestAnimationFrame instead of setIntervals
musicSound.play();
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //start the game
    moveSound.play();
    switch (e.key){
        case "w":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "s":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "a":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "d":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});