import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/login.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

import { firebaseService, notification } from '../services';
import { utils } from '../utils';

const onSubmitForm = async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const email = form.email.value;

  const result = await firebaseService.auth.resetPassword(email);

  if(result) {
    notification.success('E-mail de redefinição de senha enviado. Verifique sua caixa de entrada.');
  }
};

document.querySelector('#identification-form').addEventListener('submit', onSubmitForm);

firebaseService.auth.addAuthStateListener(async (user) => {
  if(user) {
    window.location = `${BASE_URL}coach/`;
    return;
  }

  utils.hideLoading();
});
