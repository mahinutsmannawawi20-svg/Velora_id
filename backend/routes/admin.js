const express = require('express');
const router = express.Router();
const sql = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get dashboard statistics (protected)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // Get total counts
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const blogCount = await sql`SELECT COUNT(*) as count FROM blog_posts`;
    const testimonialCount = await sql`SELECT COUNT(*) as count FROM testimonials`;
    const contactCount = await sql`SELECT COUNT(*) as count FROM contacts`;
    const newContactCount = await sql`SELECT COUNT(*) as count FROM contacts WHERE status = 'new'`;
    const blogViews = await sql`SELECT COALESCE(SUM(views), 0) as total FROM blog_posts`;
    
    // Get recent contacts
    const recentContacts = await sql`
      SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5
    `;
    
    res.json({
      totalProjects: parseInt(projectCount[0].count),
      totalBlogPosts: parseInt(blogCount[0].count),
      totalTestimonials: parseInt(testimonialCount[0].count),
      totalContacts: parseInt(contactCount[0].count),
      newContacts: parseInt(newContactCount[0].count),
      totalBlogViews: parseInt(blogViews[0].total),
      recentContacts
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics', message: error.message });
  }
});

module.exports = router;
