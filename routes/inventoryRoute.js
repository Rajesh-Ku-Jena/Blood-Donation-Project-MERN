const express= require('express');
const { createInventoryController } = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router= express.Router();

router.post('/create', authMiddleware ,createInventoryController)

module.exports= router