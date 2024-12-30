import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/login.css'; // DO NOT REMOVE THIS

import './main'; // DO NOT REMOVE THIS

import { firebaseService } from '../services';

const onSubmitForm = async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  const user = await firebaseService.auth.signIn(email, password);

  if(user) {
    window.location = '/coach/';
  }
};

document.querySelector('#identification-form').addEventListener('submit', onSubmitForm);
