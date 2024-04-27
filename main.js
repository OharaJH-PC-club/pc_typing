const words = ["apple", "banana", "orange", "grape", "kiwi"];
let currentWord;
let score = 0;

function startGame() {
  document.getElementById('input').focus();
  document.getElementById('input').value = '';
  currentWord = generateWord();
  document.getElementById('word').textContent = currentWord;
  document.getElementById('input').addEventListener('input', checkInput);
}

function generateWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function checkInput() {
  const typedWord = document.getElementById('input').value.trim();
  if (typedWord === currentWord) {
    score++;
    document.getElementById('input').value = '';
    currentWord = generateWord();
    document.getElementById('word').textContent = currentWord;
  }
}