const express = require('express');
const router = express.Router();
const sql = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { published, category } = req.query;
    
    let posts;
    if (published && category) {
      posts = await sql`
        SELECT * FROM blog_posts WHERE published = ${published === 'true'} AND category = ${category} ORDER BY created_at DESC
      `;
    } else if (published) {
      posts = await sql`
        SELECT * FROM blog_posts WHERE published = ${published === 'true'} ORDER BY created_at DESC
      `;
    } else if (category) {
      posts = await sql`
        SELECT * FROM blog_posts WHERE category = ${category} ORDER BY created_at DESC
      `;
    } else {
      posts = await sql`
        SELECT * FROM blog_posts ORDER BY created_at DESC
      `;
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts', message: error.message });
  }
});

// Get single blog post by slug (increments view count)
router.get('/:slug', async (req, res) => {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts WHERE slug = ${req.params.slug}
    `;
    
    if (posts.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Increment view count
    await sql`
      UPDATE blog_posts SET views = views + 1 WHERE slug = ${req.params.slug}
    `;
    
    res.json(posts[0]);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Failed to fetch blog post', message: error.message });
  }
});

// Create blog post (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, slug, excerpt, content, author, category, tags, image_url, published } = req.body;
    
    const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, image_url, published, views)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${author}, ${category}, ${tags}, ${image_url}, ${published !== false}, 0)
      RETURNING id
    `;
    
    res.status(201).json({ id: result[0].id, message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Failed to create blog post', message: error.message });
  }
});

// Update blog post (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, slug, excerpt, content, author, category, tags, image_url, published } = req.body;
    
    const result = await sql`
      UPDATE blog_posts 
      SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content}, 
          author = ${author}, category = ${category}, tags = ${tags}, image_url = ${image_url}, published = ${published}
      WHERE id = ${req.params.id}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Failed to update blog post', message: error.message });
  }
});

// Delete blog post (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await sql`
      DELETE FROM blog_posts WHERE id = ${req.params.id} RETURNING id
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Failed to delete blog post', message: error.message });
  }
});

module.exports = router;
