import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/signup.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

import { firebaseService, notification } from '../services';
import { utils } from '../utils';

const onSubmitForm = async (e) => {
    e.preventDefault();

    const form = e.target
    const name=form.name.value.trim()
    const birth=form.birth.value.trim()
    const age=form.age.value.trim()
    const gender=form.gender.value.trim()
    const modality=form.modality.value.trim()
    const experience=form.experience.value.trim()
    const formation=form.formation.value.trim()
    const email=form.email.value.trim()
    const password=form.senha.value.trim()
    const confirmpassword=form.confirmpassword.value.trim()
    const tcle=form.tcle.checked

    if (name.length<=0) {
        notification.error("Meu jovem, coloque seu nome!")
        return;
    }
    if (birth.length<=0) {
        notification.error("Responde sua data de nascimento")
        return;
    }
    if (+age < 18) {
        notification.error("Não poderá participar, volte aos 18!")
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
        notification.error("Faça uma senha.")
        return;
    }
    if (tcle == false){
        notification.error("assina essa parada mano (mona)!")
        return;
    }

    
    const userData={
        name, birth, age, gender,modality,experience,formation,email,password
    }

    await firebaseService.user.addUser(userData);
    
    window.location = `${BASE_URL}coach/`;
};

document.querySelector("#identification-form").addEventListener("submit",onSubmitForm);

firebaseService.auth.addAuthStateListener(async (user) => {
  if(user) {
    window.location = `${BASE_URL}coach/`;
  }

  utils.hideLoading();
});
