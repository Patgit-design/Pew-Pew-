let canvas = document.getElementById("mon_canvas");
let ctx = canvas.getContext("2d");

let start = document.getElementById("start");
let restart = document.getElementById("restart");
//let timer = document.getElementsByClassName("timer");
//let secondes = document.getElementById("chrono").innerHTML;
//let temps;
let timer = 30;
let intervalId = null;

let x = canvas.width / 2;
let y = canvas.height - 50;
let dy = -10;
let raf;



let ball = {
    radius: 2,
    show: false
}

let canon = {
    width: 30,
    height: 30,
    x: (canvas.width - this.width) / 2,
    // y: 605
}

let keyboard = {
    left: false,
    right: false,
    space: false
}

let brick = {
    width: 20,
    height: 15,
    padding: 10,
    x: 0,
    y: 70,
    randX: function() {
        return Math.floor(Math.random() * (canvas.width - 2 * this.padding - this.width) + this.padding);
    }
}

let game = {
    counter: 0,
    goal: 10,
    end: false
}

function stopChrono() {
    clearInterval(temps);
}

start.onclick = () => {
    brick.x = brick.randX();
    draw();
    startCount();


}

function startCount() {
    intervalId = setInterval(bip, 1000);

}

restart.onclick = () => {
    start.disabled = false;
    document.location.reload();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        canon.x = relativeX - canon.width / 2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        keyboard.right = true;
    } else if (e.keyCode == 37) {
        keyboard.left = true;
    } else if (e.keyCode == 32) {
        keyboard.space = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        keyboard.right = false;
    } else if (e.keyCode == 37) {
        keyboard.left = false;
    } else if (e.keyCode == 32) {
        keyboard.space = false;
    }
}

function drawResult() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You WIN! Click Restart to play again.", canvas.width / 2, canvas.height / 2);
    console.log("result");
}




function drawScore() {
    ctx.font = "20px Impact";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "end";
    ctx.fillText("Score: " + game.counter + "/" + game.goal, 130, 20);
}

function drawRules() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press de space bar to fight ! and <- or -> to move !", 400, 60);
    ctx.textAlign = "center";
}

function drawBall() {
    if (ball.show) {
        ctx.beginPath();
        ctx.arc(x, y - canon.height, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.closePath();
        console.log("draw");
    }
}

function drawCanon() {
    ctx.fillStyle = "red";
    ctx.fillRect(canon.x, canvas.height - canon.height, canon.width, canon.height);
    //  ctx.fillStyle = "green";
    // ctx.fillRect(canon.x + 5, y - canon.height, canon.width - 10, canon.height - 5);
}

function drawBrick() {

    ctx.fillStyle = "white";
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

function lose() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You LOSE! Click Restart to play again.", canvas.width / 2, canvas.height / 2);

}

function finish() {
    clearInterval(intervalId);


}

function bip() {
    timer--;
    if (timer < 0) {
        game.end = true;
        finish();
        lose();
        console.log("bip");
    } else {
        document.getElementById("bip").innerHTML = timer + " second(s) left";
    }
}


function collisionDetection() {
    if (x > brick.x && x < brick.x + brick.width && y > brick.y && y < brick.y + brick.height) {
        game.counter++;
        if (game.counter < game.goal) {
            y = canvas.height - 20;
            brick.x = brick.randX();
            ball.show = false;
        } else {
            game.end = true;
            drawResult();
            console.log("win");

        }

    }
}

function draw() {

    if (game.end) {
        window.cancelAnimationFrame(raf);
    } else {
        raf = window.requestAnimationFrame(draw);
    }

    start.disabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection();
    drawBrick();
    drawBall();
    drawCanon();
    drawScore();
    drawRules();



    if (keyboard.space) {
        x = (canon.x + 5) + canon.width / 2;
        ball.show = true;
        console.log("show");
    }

    if (ball.show && y + ball.radius > 0) {
        y += dy;
    } else {
        ball.show = false;
        y = canvas.height - 22;
    }

    if (keyboard.right && canon.x + canon.width < canvas.width) {
        canon.x += 5;
    } else if (keyboard.left && canon.x > 0) {
        canon.x -= 5;
    }
}


/*let min = 0,
    sec = 30,
    dse = 0;
let tmp = (min * 60 + sec) * 10 + dse;
*/

/*  let chrono = setInterval(function() {
        min = Math.floor(tmp / 600);
        sec = Math.floor((tmp - min * 600) / 10);
        dse = tmp - ((min * 60) + sec) * 10;
        tmp--;
        $('.timer').text(sec + ':' + dse);
    }, 100); */

/* function decrementerChrono() {
       if (secondes > 0) {
           secondes--;
           document.getElementById("chrono").innerHTML = secondes;
           let ok = window.setTimeout(decrementerChrono(), 1000);
           console.log(ok);
       } else {
           secondes = "Ça y est c'est fini gros, t'as perdu " + "<br />";
           stopChrono();
           console.log("stop");
       }

   }
   decrementerChrono();
   */

/* function decrementer() {
     if (timer.innerHTML > 0) {
         timer.innerHTML--;
         setTimeout(decrementer, 1000);
     }
 }
 setTimeout(decrementer, 1000);
 */