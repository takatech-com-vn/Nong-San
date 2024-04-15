import exptess from 'express';
import loginController from '../Controller/loginController';

const router = exptess.Router();

router.post('/register', loginController.Register);

export = router;