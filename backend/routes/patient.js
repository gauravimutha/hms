const express = require('express');
const router = express.Router();
const { createPatient, getPatient } = require('../controllers/patientController');

// POST /api/v1/patient
router.post('/patient', createPatient);

// GET /api/v1/patient/:id
router.get('/patient/:id', getPatient);

module.exports = router;
