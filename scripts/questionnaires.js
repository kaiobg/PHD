import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/questionnaires.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

// TODO If there is an on going form, load current data and go to correct step
// TODO If user goes back to previous step, load that step data

import { utils } from '../utils';

import { COACH_PAGE, FORMS, FORMS_PASCAL_CASE, NEXT_PAGE, PREVIOUS_PAGE, QUESTIONS } from './constants';
import { firebaseService } from '../services';

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

firebaseService.auth.addAuthStateListener(async (user) => {
  if(user) {
    // await firebaseService.form.getFormFromUserAttitude();
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

const sendForm = async () => {
  // TODO Save values here
  // Use mocked data for now

  const now = (new Date()).toISOString();

  const categoriesValues = answers.reduce((acc, cur) => {
    const { question, value } = cur;
    const invertedValue = question.invert ? utils.invertLikertScaleValue(value) : value;
    const realValue = invertedValue * 2;

    const curSum = acc[question.category]?.sum ?? 0;
    const curQty = acc[question.category]?.qty ?? 0;

    const totalSum = curSum + realValue;
    const totalQuestions = curQty + 1;

    return {
      ...acc,
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
  });

  let isSaveOk = false;

  if(isSingleForm) {
    // Save data to user and to general forms keys
    isSaveOk = await firebaseService.form[`saveFormForUser${FORMS_PASCAL_CASE[currentForm]}`](normalizedValues);
    isSaveOk = isSaveOk && await firebaseService.form[`saveFormForAverage${FORMS_PASCAL_CASE[currentForm]}`](normalizedValues);
  } else {
    // Save current answers to save, to load back if necessary until user finish
    console.log(answers);
    isSaveOk = await firebaseService.form[`saveAnswersForUser${FORMS_PASCAL_CASE[currentForm]}`](answers);
  }

  console.log(isSaveOk);

  // Go to next form
  // const nextUrl = isSingleForm ? COACH_PAGE : NEXT_PAGE[currentForm];
  // window.location = nextUrl;
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
