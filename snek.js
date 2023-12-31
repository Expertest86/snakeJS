var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let scoreElement = document.getElementById("score");

function fill(color,x,y){    
    ctx.fillStyle = color;
    ctx.fillRect(30*x,30*y,30,30);
}
function Clear(){
    for(let x = 0; x<31; x++){
        coord[x]=[];
        for(let y = 0; y<31; y++){
            coord[x][y] = 0;
        }
    }
}

let direction = 1 
document.addEventListener('keydown', (event) => {
    if (event.key == "ArrowLeft" ) { //left

        direction = 1;
        console.log("left")
    }
    if (event.key == "ArrowRight") { //right

        direction = 2;

    }
    if (event.key == "ArrowUp") { //up

        direction = 3;

    }
    if (event.key == "ArrowDown") { //down

        direction = 4;

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



coord[14][14]=2;
let head = [14,14];
let score = 5;
scoreElement.textContent = "Score: " + score;
function tick(){
    console.log('TICK')
    console.log(direction)
    if(head[0]> 29  || head[1] > 29 || head[0]< 0 ||head[1]< 0){
        head = [14,14];
        score = 3;
        scoreElement.textContent = "Score: " + score;
        Clear()
    }
    if(direction != null){
        console.log(direction)
        for(let x = 0; x<31; x++){
            for(let y = 0; y<31; y++){
                if(coord[x][y] > 0){
                    coord[x][y] = coord[x][y]-1;
                    fill('lime',x,y);
                      
                }
                if(coord[x][y] == 0 && (x != apple[0] || y != apple[1]) ){fill('gray',x,y);}
            }
        }

        if(head[0] == apple[0] && head[1] == apple[1]) {
            score++;
            scoreElement.textContent = "Score: " + score;
            spawnApple();
        }
        if(head[0]> 29  || head[1] > 29 || head[0]< 0 ||head[1]< 0 || head[0] == null || head[1] == null){
            head = [14,14];
            score = 3;
            scoreElement.textContent = "Score: " + score;
            Clear()
        }

        if(direction == 1 ){ // left
            if(coord[head[0]-1][head[1]] == 0){    
                coord[head[0]-1][head[1]] = score;
                head[0] = head[0]-1;
                fill('lime',head[0],head[1]);
            } else {
                head = [14,14];
                score = 3;
                scoreElement.textContent = "Score: " + score;
                Clear()
            }

        } 
        if(direction == 2 ){ // right
            if(coord[head[0]+1][head[1]] == 0){    
                coord[head[0]+1][head[1]] = score;
                head[0] = head[0]+1;
                fill('lime',head[0],head[1]);
            } else {
                head = [14,14];
                score = 3;
                scoreElement.textContent = "Score: " + score;
                Clear()
            }

        } 
        if(direction == 4 ){ // down
            if(coord[head[0]][head[1]+1] == 0){    
                coord[head[0]][head[1]+1] = score;
                head[1] = head[1]+1;
                fill('lime',head[0],head[1]);
            } else {
                head = [14,14];
                score = 3;
                scoreElement.textContent = "Score: " + score;
                Clear()
            }

        } 
        if(direction == 3 ){ // up
            if(coord[head[0]][head[1]-1] == 0){    
                coord[head[0]][head[1]-1] = score;
                head[1] = head[1]-1;
                fill('lime',head[0],head[1]);
            } else {
                head = [14,14];
                score = 3;
                scoreElement.textContent = "Score: " + score;
                Clear()
            }    

        } 


        
        console.log(head[0] , head[1]);


        

    fill('green',head[0],head[1]);
    }
}




spawnApple();
setInterval(tick,400);

