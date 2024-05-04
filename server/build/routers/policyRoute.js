"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const policyController_1 = __importDefault(require("../Controller/policyController"));
const router = express_1.default.Router();
router.post('/create', policyController_1.default.CreatePolicy);
router.get('/listpolicy', policyController_1.default.ListPolicy);
router.delete('/deletepolicy/:id', policyController_1.default.DeletePolicy);
router.get('/getpolicyid/:id', policyController_1.default.GetPolicyID);
router.put('/updatepolicy/:id', policyController_1.default.UpdatePolicy);
module.exports = router;
