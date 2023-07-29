const scorecardContainer = document.getElementById('scorecard-container');
const showScoreButton = document.getElementById('show-score-btn');
const showAnswersButton = document.getElementById('show-answers-btn');
const answersContainer = document.getElementById('answers-container');
const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
let score = 0;

function calculateScore() {
  score = 0;
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }
}

function showScorecard() {
  calculateScore();
  let html = `<h2>Your Score: ${score}/${correctAnswers.length}</h2>`;
  scorecardContainer.innerHTML = html;
  showScoreButton.style.display = 'none';
  showAnswersButton.style.display = 'block';
}

function showCorrectAnswers() {
  let html = '<h3>Correct Answers:</h3><ul>';
  for (let i = 0; i < correctAnswers.length; i++) {
    html += `<li><strong>Q${i + 1}:</strong> ${decodeHtml(correctAnswers[i])}</li>`;
  }
  html += '</ul>';
  answersContainer.innerHTML = html;
  answersContainer.style.display = 'block';
  showAnswersButton.style.display = 'none';
}

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

showScoreButton.addEventListener('click', showScorecard);
showAnswersButton.addEventListener('click', showCorrectAnswers);
