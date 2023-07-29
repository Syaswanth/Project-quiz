const API_URL = 'https://opentdb.com/api.php?amount=5&type=multiple'; // Change '5' to the number of questions you want
const questionContainer = document.getElementById('question-container');
const submitButton = document.getElementById('submit-btn');
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    questions = data.results;
    showQuestions();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

function showQuestions() {
  let html = '';
  questions.forEach((question, index) => {
    html += `<div id="question${index}">
                <p><strong>${index + 1}. ${decodeHtml(question.question)}</strong></p>
                <ul>
                  ${shuffleArray([
                    ...question.incorrect_answers,
                    question.correct_answer,
                  ])
                    .map(
                      (answer) =>
                        `<li><input type="radio" name="question${index}" value="${answer}">${decodeHtml(
                          answer
                        )}</li>`
                    )
                    .join('')}
                </ul>
              </div>`;
  });
  questionContainer.innerHTML = html;
}

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

submitButton.addEventListener('click', () => {
  const userAnswers = [];
  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selectedOption) {
      userAnswers.push(selectedOption.value);
    } else {
      userAnswers.push(null);
    }
  });

  // Store user answers and correct answers in localStorage
  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  localStorage.setItem('correctAnswers', JSON.stringify(questions.map(q => q.correct_answer)));

  // Navigate to the scorecard page
  window.location.href = 'scorecard.html';
});

fetchQuestions();
