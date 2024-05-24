import express from "express";
import wareHouseController from "../Controller/wareHouseController";

const router = express.Router();

router.get('/getwarehouse', wareHouseController.GetWareHouse);

export = router;