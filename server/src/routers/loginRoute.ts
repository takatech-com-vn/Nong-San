import express from 'express';
import loginController from '../Controller/loginController';
import { isAuthenticated } from '../config/configSession';

const router = express.Router();

router.post('/register', loginController.Register);
router.post('/listlogin', loginController.ListLogin);
router.get('/user', isAuthenticated,loginController.UserLogin);
router.get('/logout', isAuthenticated, loginController.Logout);
router.post('/forgot-password', loginController.ForgotPassword);

export = router;