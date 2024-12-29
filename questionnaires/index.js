// TODO If there is an on going form, load current data and go to correct step
// TODO If user goes back to previous step, load that step data

import { utils } from '../utils';

import { NEXT_PAGE, QUESTIONS } from './constants';

const questionEl = document.querySelector('#question');
const questionOptionsEls = document.querySelectorAll('#question-options button');
const btnPreviousQuestion = document.querySelector('#btn-previous-question');
const btnNextQuestion = document.querySelector('#btn-next-question');
const btnEndForm = document.querySelector('#btn-end-form');


const currentForm = document.querySelector('#current-form').value;
const questions = QUESTIONS[currentForm];
const lastQuestion = questions.length - 1;
let currentQuestion = 0;

const answers = [];

const updateProgressBar = () => {
  // TODO Improve this calc
  // This should be related to current question, not the answers
  // For last question, consider answer
  const value = (currentQuestion) / questions.length * 100;
  utils.updateCSSVar('--form-progress', `${value}%`);
};

const getQuestion = () => {
  return questions[currentQuestion];
};

const updateQuestionLayout = () => {
  questionEl.innerText = `${currentQuestion + 1}. ${getQuestion()}`;  

  if(currentQuestion == lastQuestion) {
    btnNextQuestion.classList.add('display-none');
    btnEndForm.classList.remove('display-none');
  } else {
    btnNextQuestion.classList.remove('display-none');
    btnEndForm.classList.add('display-none');
  }

  const showPreviousBtnHandler = currentQuestion == 0 ? 'add' : 'remove';
  btnPreviousQuestion.classList[showPreviousBtnHandler]('visibility-hidden');

  updateBtnsState(answers[currentQuestion]?.value || null);

  updateProgressBar();
};

const previousQuestion = () => {
  if(currentQuestion <= 0) {
    currentQuestion = 0;
  } else {
    currentQuestion--;
  }

  updateQuestionLayout();
};

const nextQuestion = (event) => {
  if(currentQuestion >= lastQuestion) {
    currentQuestion = lastQuestion;
  } else {
    currentQuestion++;
  }

  updateQuestionLayout();
};

const sendForm = () => {
  // TODO Save values here
  // Use mocked data for now
  
  // Go to next form
  window.location = NEXT_PAGE[currentForm];
};

const updateBtnsState = (selected = null) => {
  btnNextQuestion.disabled = !selected;
  
  questionOptionsEls.forEach(btn => {
    const classHandler = btn.dataset.value == selected ? 'add' : 'remove';
    btn.classList[classHandler]('selected');
  });
};

questionOptionsEls.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = +btn.dataset.value;

    answers[currentQuestion] = {
      question: getQuestion(),
      value, 
    };

    nextQuestion();
  });
});

btnPreviousQuestion.addEventListener('click', previousQuestion);
btnNextQuestion.addEventListener('click', nextQuestion);
btnEndForm.addEventListener('click', sendForm);

updateQuestionLayout();
