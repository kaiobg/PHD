import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/questionnaires.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

import { utils } from '../utils';

import { COACH_PAGE, FORMS, NEXT_PAGE, PREVIOUS_PAGE, QUESTIONS } from './constants';
import { firebaseService, notification } from '../services';

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

let answers = [];

const pageUrl = new URL(window.location.href);
const isSingleForm = pageUrl.searchParams.get('single') == 'true';

firebaseService.auth.addAuthStateListener(async (user) => {
  if(user) {
    const savedAnswer = await firebaseService.form.getFormFromUser(currentForm);

    if(savedAnswer) {
      answers = savedAnswer;
      currentQuestion = answers.length - 1;
      updateQuestionLayout();
    }

    utils.hideLoading();
  }
});

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

  window.location = `${BASE_URL}${PREVIOUS_PAGE[currentForm]}`;
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

const sendForm = async () => {
  utils.showLoading();
  
  const now = (new Date()).toISOString();

  const categoriesValues = answers.reduce((acc, cur) => {
    const { question, value } = cur;
    const invertedValue = question.invert ? utils.invertLikertScaleValue(value) : value;
    const realValue = invertedValue * 2;

    const curSum = acc[question.category]?.sum ?? 0;
    const curQty = acc[question.category]?.qty ?? 0;

    const totalSum = curSum + realValue;
    const totalQuestions = curQty + 1;

    const generalSum = acc.general?.sum ?? 0;
    const generalQty = acc.general?.qty ?? 0;
    const generalTotalSum = generalSum + realValue;
    const generalTotalQuestions = generalQty + 1;

    return {
      ...acc,
      general: {
        sum: generalTotalSum,
        qty: generalTotalQuestions,
        avg: generalTotalSum / generalTotalQuestions,
      },
      [question.category]: {
        sum: totalSum,
        qty: totalQuestions,
        avg: totalSum / totalQuestions,
      },
    };
  }, {});

  const normalizedValues = Object.keys(categoriesValues).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: categoriesValues[cur].avg,
    };
  }, { 
    created_at: now,
    experience: firebaseService.user.getUserData('experience'),
    formation: firebaseService.user.getUserData('formation'),
    gender: firebaseService.user.getUserData('gender'),
    modality: firebaseService.user.getUserData('modality'),
  });

  let isSaveOk = false;

  if(isSingleForm) {
    // Save data to user and to general forms keys
    isSaveOk = await firebaseService.form.saveFormForUser(currentForm, normalizedValues);
    isSaveOk = isSaveOk && await firebaseService.form.saveGeneralForm(currentForm, normalizedValues);
  } else {
    if(currentForm == FORMS.EMOTIONAL_REGULATION) {
      // Save all data in correct keys
      isSaveOk = await firebaseService.form.saveAllForms(currentForm, normalizedValues);
    } else {
      // Save current answers to save, to load back if necessary until user finish
      isSaveOk = await firebaseService.form.saveTempFormForUser(currentForm, normalizedValues);
      isSaveOk = isSaveOk && await firebaseService.form.saveAnswersForUser(currentForm, answers);
    }
  }

  if(isSaveOk) {
    // Go to next form
    const nextUrl = isSingleForm ? `${BASE_URL}${COACH_PAGE}` : `${BASE_URL}${NEXT_PAGE[currentForm]}`;
    window.location = nextUrl;
  } else {
    notification.error('Algo deu errado, por favor, tente mais tarde');
    utils.hideLoading();
  }
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
