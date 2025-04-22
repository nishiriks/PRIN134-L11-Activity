const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;

function moveTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - target.offsetWidth;
  const maxY = gameAreaRect.height - target.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

function updateScore() {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
}

target.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  moveTarget();
  updateScore();
});

gameArea.addEventListener('contextmenu', (e) => {
  if (e.target !== target) {
    e.preventDefault();
  }
});

// Initial target position
moveTarget();

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault(); 
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
  }
});