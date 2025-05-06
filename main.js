const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const setupForm = document.getElementById('setupForm');

let score = 0;
let targets = [];

function moveTarget(target) {
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const targetWidth = target.offsetWidth;
  const targetHeight = target.offsetHeight;

  const maxX = areaWidth - targetWidth;
  const maxY = areaHeight - targetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

function updateScore() {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
}

function createTargets(count) {
  targets.forEach(t => t.remove());
  targets = [];

  for (let i = 0; i < count; i++) {
    const target = document.createElement('div');
    target.classList.add('target');
    target.textContent = i + 1;

    moveTarget(target);
    gameArea.appendChild(target);
    targets.push(target);

    target.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      moveTarget(target);
      updateScore();
    });
  }
}

setupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const quantity = parseInt(document.getElementById('quantity').value);
  if (quantity >= 1 && quantity <= 5) {
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    createTargets(quantity);
  }
});

gameArea.addEventListener('contextmenu', (e) => {
  if (!e.target.classList.contains('target')) {
    e.preventDefault();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
  }
});
