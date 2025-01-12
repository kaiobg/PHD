import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/questionnaires.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

// TODO If there is an on going form, load current data and go to correct step
// TODO If user goes back to previous step, load that step data

import { utils } from '../utils';

import { COACH_PAGE, FORMS, NEXT_PAGE, PREVIOUS_PAGE, QUESTIONS } from './constants';

const questionEl = document.querySelector('#question');
const questionOptionsEls = document.querySelectorAll('#question-options button');
const btnPreviousForm = document.querySelector('#btn-previous-form');
const btnPreviousQuestion = document.querySelector('#btn-previous-question');
const btnNextQuestion = document.querySelector('#btn-next-question');
const btnEndForm = document.querySelector('#btn-end-form');


const currentForm = document.querySelector('#current-form').value;
const questions = QUESTIONS[currentForm];
const lastQuestion = questions.length - 1;
let currentQuestion = 0;

const answers = [];

const pageUrl = new URL(window.location.href);
const isSingleForm = pageUrl.searchParams.get('single') == 'true';

if(isSingleForm) {
  document.querySelector('.steps').classList.add('display-none');
  document.querySelector('#form-title').classList.remove('display-none');
}

const updateProgressBar = () => {
  const hasAnswer = answers[currentQuestion] ? 1 : 0;
  const value = (currentQuestion + hasAnswer) / questions.length * 100;

  utils.updateCSSVar('--form-progress', `${value}%`);
};

const getQuestion = () => {
  return questions[currentQuestion];
};

const getQuestionText = () => {
  return questions[currentQuestion].text;
};

const updateQuestionLayout = () => {
  questionEl.innerText = `${currentQuestion + 1}. ${getQuestionText()}`;  

  if(currentQuestion == lastQuestion) {
    btnNextQuestion.classList.add('display-none');
    btnEndForm.classList.remove('display-none');
  } else {
    btnNextQuestion.classList.remove('display-none');
    btnEndForm.classList.add('display-none');
  }

  if(currentForm != FORMS.ATTITUDE && currentQuestion == 0) {
    btnPreviousForm.classList.remove('display-none');
  } else {
    btnPreviousForm.classList.add('display-none');
  }

  const showPreviousBtnHandler = currentQuestion == 0 ? 'add' : 'remove';
  btnPreviousQuestion.classList[showPreviousBtnHandler]('display-none');

  updateBtnsState(answers[currentQuestion]?.value || null);

  updateProgressBar();
};

const previousForm = () => {
  if(isSingleForm || currentForm == FORMS.ATTITUDE) {
    return;
  }

  window.location = PREVIOUS_PAGE[currentForm];
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
  const nextUrl = isSingleForm ? COACH_PAGE : NEXT_PAGE[currentForm];
  window.location = nextUrl;
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

btnPreviousForm.addEventListener('click', previousForm);
btnPreviousQuestion.addEventListener('click', previousQuestion);
btnNextQuestion.addEventListener('click', nextQuestion);
btnEndForm.addEventListener('click', sendForm);

updateQuestionLayout();
