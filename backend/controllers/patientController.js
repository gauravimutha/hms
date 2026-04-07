const db = require('../db');

const createPatient = async (req, res) => {
  const { name, age, gender, phone } = req.body;

  // Basic Input Validation
  if (!name || !age || !gender || !phone) {
    return res.status(400).json({ error: 'All fields (name, age, gender, phone) are required.' });
  }

  if (age <= 0) {
    return res.status(400).json({ error: 'Age must be a positive number.' });
  }

  // Very simple phone validation (just check length)
  const sanitizedPhone = phone.replace(/\D/g, '');
  if (sanitizedPhone.length !== 10) {
    return res.status(400).json({ error: 'Phone number must be exactly 10 digits.' });
  }

  try {
    const insertQuery = `
      INSERT INTO patients (name, age, gender, phone) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const result = await db.query(insertQuery, [name, parseInt(age, 10), gender, sanitizedPhone]);
    
    // Send a successful response
    return res.status(201).json({
      message: 'Patient registered successfully',
      patient: result.rows[0]
    });
  } catch (err) {
    console.error('Database Insertion Error:', err);
    return res.status(500).json({ error: 'Failed to register patient in the database.' });
  }
};

const getPatient = (req, res) => {
  const { id } = req.params;

  // For now, always return this mock patient instead of hitting the DB
  const mockPatient = {
    id: id,
    name: 'John Doe',
    age: 45,
    gender: 'male',
    phone: '1234567890',
    created_at: new Date().toISOString()
  };

  return res.status(200).json(mockPatient);
};

module.exports = {
  createPatient,
  getPatient
};
