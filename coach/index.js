import { firebaseService } from '../services';

document.getElementById("logout-btn").addEventListener("click",()=>{
    firebaseService.auth.signOut()
} );
