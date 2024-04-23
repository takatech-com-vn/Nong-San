import express from 'express';
import policyController from '../Controller/policyController';

const route = express.Router();

route.post('/create', policyController.CreatePolicy);
route.get('/listpolicy', policyController.ListPolicy);

export = route;