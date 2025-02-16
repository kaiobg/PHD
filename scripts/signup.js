import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/signup.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

import { firebaseService, notification } from '../services';
import { utils } from '../utils';

let checkIfIsLoggedIn = true;

const onSubmitForm = async (e) => {
    e.preventDefault();

    const form = e.target
    const name=form.name.value.trim()
    const birth=form.birth.value.trim()
    const age=form.age.value.trim()
    const gender=form.gender.value.trim()
    const modality=form.modality.value.trim()
    const otherModality = form['other-modality'].value.trim();
    const experience=form.experience.value.trim()
    const formation=form.formation.value.trim()
    const email=form.email.value.trim()
    const password=form.senha.value.trim()
    const confirmpassword=form.confirmpassword.value.trim()
    const tcle=form.tcle.checked

    if (name.length<=0) {
        notification.error("Por favor, coloque seu nome!")
        return;
    }
    if (birth.length<=0) {
        notification.error("Responda sua data de nascimento")
        return;
    }
    if (+age < 18) {
        notification.error("Não poderá participar, volte quando tiver 18!")
        return;
    }
    if (gender.length<=0) {
        notification.error("Selecione uma opção no gênero")
        return;
    }
    if (modality.length<=0) {
        notification.error("Qual modalidade você é treinador(a)")
        return;
    }

    if(modality == 'outros' && otherModality.length <= 0) {
      notification.error("Informe sua modalidade")
      return;
    }

    if (experience.length<=0) {
        notification.error("Preencha o tempo de experiência.")
        return;
    }
    
    if (formation.length<=0) {
        notification.error("Qual sua formação?")
        return;
    }
    if (email.length<=0 && !email.includes ("@") && !email.includes(".")) {
        notification.error("Preencha corretamente seu e-mail.")
        return;
    }
    if (password.length<=0 || password!= confirmpassword) {
        notification.error("Crie uma senha.")
        return;
    }
    if (tcle == false){
        notification.error("Assine o termo por favor!")
        return;
    }

    
    const userData = {
      name, 
      birth, 
      age, 
      gender,
      modality,
      otherModality,
      experience,
      formation,
      email,
      password,
    };

    const result = await firebaseService.user.addUser(userData);

    if(result) {
      window.location = `${BASE_URL}coach/`;
    }
};

document.querySelector("#identification-form").addEventListener("submit",onSubmitForm);

firebaseService.auth.addAuthStateListener(async (user) => {
  if(checkIfIsLoggedIn && user) {
    window.location = `${BASE_URL}coach/`;
  }

  checkIfIsLoggedIn = false;

  utils.hideLoading();
});

const modalitySelect = document.querySelector('#modality');
const otherModalityInput = document.querySelector('#other-modality-input');
const otherModalityLabel = document.querySelector('#other-modality-label');

modalitySelect.addEventListener('change', () => {
  const modality = modalitySelect.value;

  const classHandler = modality == 'outros' ? 'remove' : 'add';
  otherModalityInput.classList[classHandler]('display-none');
  otherModalityLabel.classList[classHandler]('display-none');
});


// Fill form for tests
// (() => {
//   const form = document.querySelector("#identification-form");
//   form.name.value = 'Nome';
//   form.birth.value = '1997-05-11';
//   form.age.value = 19;
//   form.gender.value = 'feminino';
//   form.modality.value = 'outros';
//   form['other-modality'].value = 'uma aí';
//   form.experience.value = '3-5';
//   form.formation.value = 'mest';
//   form.email.value = 'email@email.com';
//   form.senha.value = '123123';
//   form.confirmpassword.value = '123123';
//   form.tcle.checked = true;
// })();
