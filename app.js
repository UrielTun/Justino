const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');
const velocidad = document.getElementById('velocidad');
const valorVelocidad = document.getElementById('valor_velocidad');
const color = document.getElementById('color');
const musica = document.getElementById('musica');
const audio = document.getElementById('audio');
const valorJustino = document.getElementById('valor_justino');
const velocidadJustino = document.getElementById('velocidad_justino');

let playerPosition = { x: 100, y: 100 };
let beyoncePosition = { x: 300, y: 300 };

let playerSpeed = 40;
let beyonceSpeed = 10;

velocidad.addEventListener('input', () =>{
    playerSpeed = Number(velocidad.value);
    valorVelocidad.textContent = playerSpeed;
});

velocidadJustino.addEventListener('input', () => {
    beyonceSpeed = Number(velocidadJustino.value);
    valorJustino.textContent = beyonceSpeed;
});

color.addEventListener('change', () =>{
    gameArea.style.backgroundColor = color.value;
});

musica.addEventListener('change', () => {
    if (musica.checked) {
        audio.play();
    } else {
        audio.pause();
    }
});

window.addEventListener('keydown', (event) => {
    const maxX = gameArea.clientWidth - player.offsetWidth;
    const maxY = gameArea.clientHeight - player.offsetHeight;

    switch (event.key) {
        case 'ArrowUp':
            playerPosition.y = Math.max(0, playerPosition.y - playerSpeed);
            break;

        case 'ArrowDown':
            playerPosition.y = Math.min(maxY, playerPosition.y + playerSpeed);
            break;

        case 'ArrowLeft':
            playerPosition.x = Math.max(0, playerPosition.x - playerSpeed);
            break;

        case 'ArrowRight':
            playerPosition.x = Math.min(maxX, playerPosition.x + playerSpeed);
            break;
    }

    updatePositions();
});

function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed / 10;
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed / 10;
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed / 10;
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed / 10;
    }

    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const beyonceRect = beyonce.getBoundingClientRect();

    const colision =
        playerRect.left < beyonceRect.right &&
        playerRect.right > beyonceRect.left &&
        playerRect.top < beyonceRect.bottom &&
        playerRect.bottom > beyonceRect.top;

    if (colision) {
        alert('¡Justino te atrapó!');

        playerPosition = { x: 100, y: 100 };
        beyoncePosition = { x: 300, y: 300 };

        updatePositions();
    }
}

function gameLoop() {
    moveBeyonce();
    requestAnimationFrame(gameLoop);
}

updatePositions();
gameLoop();