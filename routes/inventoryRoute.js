const express= require('express');
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router= express.Router();

router.post('/create', authMiddleware ,createInventoryController)

router.get('/get-inventory', authMiddleware, getInventoryController)

module.exports= router