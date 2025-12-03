const express = require('express');
const router = express.Router();
const sql = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    
    let testimonials;
    if (featured) {
      testimonials = await sql`
        SELECT * FROM testimonials WHERE featured = true ORDER BY created_at DESC
      `;
    } else {
      testimonials = await sql`
        SELECT * FROM testimonials ORDER BY created_at DESC
      `;
    }
    
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials', message: error.message });
  }
});

// Create testimonial (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, position, company, content, rating, avatar_url, featured } = req.body;
    
    const result = await sql`
      INSERT INTO testimonials (name, position, company, content, rating, avatar_url, featured)
      VALUES (${name}, ${position}, ${company}, ${content}, ${rating || 5}, ${avatar_url}, ${featured || false})
      RETURNING id
    `;
    
    res.status(201).json({ id: result[0].id, message: 'Testimonial created successfully' });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ error: 'Failed to create testimonial', message: error.message });
  }
});

// Update testimonial (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, position, company, content, rating, avatar_url, featured } = req.body;
    
    const result = await sql`
      UPDATE testimonials 
      SET name = ${name}, position = ${position}, company = ${company}, content = ${content}, 
          rating = ${rating}, avatar_url = ${avatar_url}, featured = ${featured}
      WHERE id = ${req.params.id}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ error: 'Failed to update testimonial', message: error.message });
  }
});

// Delete testimonial (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await sql`
      DELETE FROM testimonials WHERE id = ${req.params.id} RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ error: 'Failed to delete testimonial', message: error.message });
  }
});

module.exports = router;
