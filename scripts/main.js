import { firebaseService } from '../services';

(async () => {
  await firebaseService.auth.checkAuthState();
})();
