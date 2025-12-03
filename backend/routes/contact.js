const express = require('express');
const router = express.Router();
const sql = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, company, service, message } = req.body;
    
    if (!first_name || !last_name || !email || !message) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    
    const result = await sql`
      INSERT INTO contacts (first_name, last_name, email, company, service, message, status)
      VALUES (${first_name}, ${last_name}, ${email}, ${company}, ${service}, ${message}, 'new')
      RETURNING id
    `;
    
    res.status(201).json({ 
      id: result[0].id, 
      message: 'Contact form submitted successfully. We will get back to you soon!' 
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ error: 'Failed to submit contact form', message: error.message });
  }
});

// Get all contacts (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    
    let contacts;
    if (status) {
      contacts = await sql`
        SELECT * FROM contacts WHERE status = ${status} ORDER BY created_at DESC
      `;
    } else {
      contacts = await sql`
        SELECT * FROM contacts ORDER BY created_at DESC
      `;
    }
    
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts', message: error.message });
  }
});

// Update contact status (protected)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const result = await sql`
      UPDATE contacts SET status = ${status} WHERE id = ${req.params.id} RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ message: 'Contact status updated successfully' });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ error: 'Failed to update contact status', message: error.message });
  }
});

module.exports = router;
