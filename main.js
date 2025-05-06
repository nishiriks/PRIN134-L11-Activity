const gameArea = document.getElementById('gameArea');
const btn = document.getElementById('btn');
const numberInput = document.getElementById('quantity');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;
let currentIndex = 1; 
let totalTargets = 0;

function moveTarget(target) {
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const targetSize = 50;

  const maxX = areaWidth - targetSize;
  const maxY = areaHeight - targetSize;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

function updateScore() {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
}

function resetGameState() {
  currentIndex = 1;
  totalTargets = 0;
}

function createTargets(count) {
  gameArea.innerHTML = '';
  resetGameState();
  totalTargets = count;

  for (let i = 1; i <= count; i++) {
    const target = document.createElement('div');
    target.classList.add('target');
    target.textContent = i.toString();
    target.dataset.number = i;

    moveTarget(target);

    target.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const clickedNumber = parseInt(target.dataset.number);

      if (clickedNumber === currentIndex) {
        target.remove();
        currentIndex++;

        
        if (currentIndex > totalTargets) {
          updateScore(); 
        }
      } else {
        
      }
    });

    gameArea.appendChild(target);
  }
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const count = parseInt(numberInput.value);

  if (count >= 1 && count <= 5) {
    createTargets(count);
  } else {
    alert("Please enter a number between 1 and 5.");
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    score = 0;
    updateScore();
    resetGameState();
    gameArea.innerHTML = '';
  }
});

gameArea.addEventListener('contextmenu', (e) => {
  if (!e.target.classList.contains('target')) {
    e.preventDefault();
  }
});