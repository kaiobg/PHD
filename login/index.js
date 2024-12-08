import { firebaseService } from '../services';

// TEMP CODE
window.email = 'teste5@teste.com';
window.password = 'senha123';
window.signIn = firebaseService.auth.signIn;
window.signOut = firebaseService.auth.signOut;



const onSubmitForm = (e)=>{
    e.preventDefault ()
    console.log(e)
    const form=e.target
    const email=form.email.value
    const senha=form.senha.value

    firebaseService.auth.signIn(email,senha);

    window.location = "/coach/";
}

document.querySelector("#identification-form").addEventListener("submit",onSubmitForm)