var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let scoreElement = document.getElementById("score");
let inetrvalId;
function fill(color,x,y){    
    ctx.fillStyle = color;
    ctx.fillRect(30*x,30*y,30,30);
}
function Clear(){
    for(let x = 0; x<31; x++){
        coord[x]=[];
        for(let y = 0; y<31; y++){
            coord[x][y] = 0;
            fill('gray',x,y);
        }
    }
}
function reset(){
    Clear();
    fill('green',14,14);
    head = [14,14];
    score = 3;
    scoreElement.textContent = "Score: " + score;
    direction = null;
    spawnApple();
    clearInterval(inetrvalId);
    inetrvalId = setInterval(tick,400);
    coord[14][14]=3;

}

let direction = null; 
let olddirection = null;
document.addEventListener('keydown', (event) => {
    if (event.key == "ArrowLeft" ) { //left
        if(direction != 2 && olddirection != 2){
            direction = 1;
        }
    }
    if (event.key == "ArrowRight") { //right
        if(direction != 1 && olddirection != 1){
            direction = 2;
        }    
    }
    if (event.key == "ArrowUp") { //up
        if(direction != 4 && olddirection != 4){
            direction = 3;
        }    
    }
    if (event.key == "ArrowDown") { //down
        if(direction != 3 && olddirection != 3){
            direction = 4;
        }    
    }
});

let coord = [];
for(let x = -1; x<31; x++){
    coord[x]=[];
    for(let y = -1; y<31; y++){
        coord[x][y] = 0;
    }
}

let apple = [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)];
function spawnApple() {
    do {
        apple = [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)];
        
    } while (coord[apple[0]][apple[1]] != 0);
    fill('red', apple[0], apple[1]);
}



coord[14][14]=3;
let head = [14,14];
let score = 85;
scoreElement.textContent = "Score: " + score;
function tick(){
    console.log('TICK')
    console.log(direction)
    if(head[0]> 29  || head[1] > 29 || head[0]< 0 ||head[1]< 0){
        reset();
    }
    if(direction != null){
        console.log(direction)
        for(let x = 0; x<31; x++){
            for(let y = 0; y<31; y++){
                if(coord[x][y] > 0){
                    if((head[0] == apple[0] && head[1] == apple[1]) != true){
                        coord[x][y] = coord[x][y]-1;
                    }
                        fill('limeGreen',x,y);
                    if(coord[x][y] == 1){
                        fill('Chartreuse',x,y);
                    }
                    if(coord[x][y] > 78 && coord[x][y] % 2 == 0){
                        fill('gold',x,y);
                    }
                    if(coord[x][y] > 78 && coord[x][y] % 2 == 1){
                        fill('goldenrod',x,y);
                    }
                    if(coord[x][y] > 70 && coord[x][y] <79 ){
                        fill('goldenrod',x,y);
                    }
                }
                if(coord[x][y] == 0 && (x != apple[0] || y != apple[1]) ){fill('gray',x,y);}
            }
        }

        if(head[0] == apple[0] && head[1] == apple[1]) {
            score++;
            scoreElement.textContent = "Score: " + score;
            spawnApple();
            clearInterval(inetrvalId);
            inetrvalId = setInterval(tick,Math.max(100,4000/(10+score-3)));
        }
        if(head[0]> 29  || head[1] > 29 || head[0]< 0 ||head[1]< 0 || head[0] == null || head[1] == null){
            reset();
        }
        
            if(direction == 1){ // left
                if(coord[head[0]-1][head[1]] == 0){    
                    coord[head[0]-1][head[1]] = score;
                    head[0] = head[0]-1;
                    fill('lime',head[0],head[1]);
                } else {
                    reset();    
                }

            } 

            if(direction == 2 ){ // right
                if(coord[head[0]+1][head[1]] == 0){    
                    coord[head[0]+1][head[1]] = score;
                    head[0] = head[0]+1;
                    fill('lime',head[0],head[1]);
                } else {
                   reset();
                }

            }

            if(direction == 4 ){ // down
                if(coord[head[0]][head[1]+1] == 0){    
                    coord[head[0]][head[1]+1] = score;
                    head[1] = head[1]+1;
                    fill('lime',head[0],head[1]);
                } else {
                    reset();    
                }

            } 

            if(direction == 3 ){ // up
                if(coord[head[0]][head[1]-1] == 0){    
                    coord[head[0]][head[1]-1] = score;
                    head[1] = head[1]-1;
                    fill('lime',head[0],head[1]);
                } else {
                    reset();
                }    

            } 


        
        console.log(head[0] , head[1]);


        

    fill('green',head[0],head[1]);
    }
    olddirection = direction;
}



fill('green',14,14);
spawnApple();
inetrvalId = setInterval(tick,400);

