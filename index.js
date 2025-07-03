let canvas = document.querySelector(".gamecanvas");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let framecount = 0;
let isGameOver = false;
let score = 0;

const bgImage = new Image();
bgImage.src = 'Images/flappybirdbg.png';

const birdimg = new Image();
birdimg.src = 'Images/flappybird.png';

const pipeImg = new Image();
pipeImg.src = 'Images/bottompipe.png';

let bird = {
    x: 100,
    y: 200,
    height: 25,
    width: 25,

    velocity: 0
}
function draw() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImage , 0 , 0 , canvas.width , canvas.height);
        updateBird();
        updatePipe();

        ctx.drawImage(birdimg , bird.x , bird.y , bird.width , bird.height);

        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(`score : ${score}`, 40, 40);

        framecount++;
        if (framecount % 100 === 0) {
            generatePipe();
        }

        drawPipes();

        if (bird.y < 0 || (bird.y + bird.height) > canvas.height) {
            isGameOver = true;
            gameOver();
        }
        pipes.forEach(pipe => {
            if (bird.x < pipe.x + pipe.pipeWidth && bird.x + bird.width > pipe.x && (bird.y < pipe.upperPipe || bird.y + bird.height > pipe.upperPipe + pipe.pipeGap)) {
                isGameOver = true;
                gameOver()
            }
        });
    }


    requestAnimationFrame(draw);
}

let gravity = 0.2;
function updateBird() {
    bird.velocity += gravity;
    bird.y += bird.velocity;
}

let key = document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        bird.velocity = -5.2;
    }
})

let pipes = [];

function generatePipe() {

    let pipe = {
        x: canvas.width,
        pipeWidth: 40,
        pipeGap: 150,
        upperPipe: Math.floor((Math.random() * 250) + 50),
        passed: false
    }
    pipes.push(pipe);
}

function updatePipe() {
    pipes.forEach(pipe => {
        pipe.x -= 2.8;
        if (bird.x > (pipe.x + pipe.pipeWidth) && pipe.passed === false) {
            score++;
            pipe.passed = true;
        }
    });

    pipes = pipes.filter(pipe => pipe.x + pipe.pipeWidth > 0);

}

function drawPipes() {
    
    pipes.forEach(pipe => {
        ctx.save();
        ctx.translate(pipe.x + pipe.pipeWidth/2  ,  pipe.upperPipe);
        ctx.scale(1 , -1);
        ctx.drawImage(pipeImg , -pipe.pipeWidth / 2, 0, pipe.pipeWidth, canvas.height);
        ctx.restore();

        const bottom = pipe.upperPipe + pipe.pipeGap;
        ctx.drawImage(pipeImg, pipe.x, bottom, pipe.pipeWidth, canvas.height - bottom);
    });
}

function gameOver() {

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2)

    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Final Score : ${score}`, canvas.width / 2, (canvas.height / 2 + 50));
    const button = document.querySelector(".restart");
    button.style.display = "block";
}

const button = document.querySelector(".restart")
button.addEventListener("click", (e) => {
    window.location.reload();
})


bgImage.onload = () => {
    draw();
}

