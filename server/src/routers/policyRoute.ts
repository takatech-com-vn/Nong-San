import express from 'express';
import policyController from '../Controller/policyController';
import { isAuthenticated } from '../config/configSession';

const router = express.Router();

router.post('/create',policyController.CreatePolicy);
router.get('/listpolicy', policyController.ListPolicy);
router.delete('/deletepolicy/:id',policyController.DeletePolicy);
router.get('/getpolicyid/:id', policyController.GetPolicyID);
router.put('/updatepolicy/:id',policyController.UpdatePolicy);

export = router;