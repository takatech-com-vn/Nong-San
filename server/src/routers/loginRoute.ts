import exptess from 'express';
import loginController from '../Controller/loginController';

const router = exptess.Router();

router.post('/register', loginController.Register);
router.post('/listlogin', loginController.ListLogin);
router.get('/user', loginController.UserLogin);
router.get('/logout', loginController.Logout);
router.post('/forgot-password', loginController.ForgotPassword);

export = router;