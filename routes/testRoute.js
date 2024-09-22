const express= require('express');
const { testlog } = require('../controllers/testController');

const router= express.Router();

router.get('/test', testlog)

module.exports= router