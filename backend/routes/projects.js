const express = require('express');
const router = express.Router();
const sql = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    
    let projects;
    if (featured) {
      projects = await sql`
        SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC
      `;
    } else {
      projects = await sql`
        SELECT * FROM projects ORDER BY created_at DESC
      `;
    }
    
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects', message: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const projects = await sql`
      SELECT * FROM projects WHERE id = ${req.params.id}
    `;
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(projects[0]);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project', message: error.message });
  }
});

// Create project (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, client, industry, tech_stack, image_url, project_url, dates, status, featured } = req.body;
    
    const result = await sql`
      INSERT INTO projects (title, description, client, industry, tech_stack, image_url, project_url, dates, status, featured)
      VALUES (${title}, ${description}, ${client}, ${industry}, ${tech_stack}, ${image_url}, ${project_url}, ${dates}, ${status || 'completed'}, ${featured || false})
      RETURNING id
    `;
    
    res.status(201).json({ id: result[0].id, message: 'Project created successfully' });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project', message: error.message });
  }
});

// Update project (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, client, industry, tech_stack, image_url, project_url, dates, status, featured } = req.body;
    
    const result = await sql`
      UPDATE projects 
      SET title = ${title}, description = ${description}, client = ${client}, industry = ${industry}, 
          tech_stack = ${tech_stack}, image_url = ${image_url}, project_url = ${project_url}, 
          dates = ${dates}, status = ${status}, featured = ${featured}
      WHERE id = ${req.params.id}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project', message: error.message });
  }
});

// Delete project (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await sql`
      DELETE FROM projects WHERE id = ${req.params.id} RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project', message: error.message });
  }
});

module.exports = router;
