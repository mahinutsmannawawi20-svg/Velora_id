# Velora Company Website - Full Stack

![Velora Logo](images/logo.png)

## 📋 Overview

Velora is a professional full-stack company website built with modern web technologies, featuring a comprehensive backend API, database integration, and admin panel.

## 🚀 Tech Stack

**Frontend:**

- HTML5, CSS3, JavaScript (ES6+)
- Responsive design (Mobile, Tablet, Desktop)
- Smooth animations & transitions

**Backend:**

- Node.js & Express.js
- Better-SQLite3 (Database)
- JWT Authentication
- RESTful API

## 📁 Project Structure

```
velora-website/
├── index.html              # Homepage
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # Main JavaScript
├── images/                 # Image assets
├── pages/                  # Additional HTML pages
├── admin/                  # Admin panel pages
├── backend/
│   ├── server.js          # Express server
│   ├── config/
│   │   ├── database.js
│   │   └── initDatabase.js
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── database/          # SQLite database
├── package.json
└── .env                   # Environment variables
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Initialize Database

```bash
npm run init-db
```

This will create the database with the following tables:

- **users** - Admin users
- **projects** - Portfolio projects
- **blog_posts** - Blog articles
- **testimonials** - Client testimonials
- **contacts** - Contact form submissions

### Step 3: Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 🔐 Default Admin Credentials

```
Email: admin@velora.com
Password: admin123
```

**⚠️ IMPORTANT: Change these credentials in production!**

## 📘 API Documentation

### Authentication

#### POST `/api/auth/login`

Login and get JWT token

```json
{
  "email": "admin@velora.com",
  "password": "admin123"
}
```

#### GET `/api/auth/verify`

Verify JWT token (requires Authorization header)

### Projects

#### GET `/api/projects`

Get all projects (optional query: `?featured=true`)

#### GET `/api/projects/:id`

Get single project

#### POST `/api/projects` 🔒

Create new project (requires authentication)

#### PUT `/api/projects/:id` 🔒

Update project (requires authentication)

#### DELETE `/api/projects/:id` 🔒

Delete project (requires authentication)

### Blog

#### GET `/api/blog`

Get all blog posts (optional queries: `?published=true&category=Technology`)

#### GET `/api/blog/:slug`

Get single blog post by slug

#### POST `/api/blog` 🔒

Create new blog post (requires authentication)

#### PUT `/api/blog/:id` 🔒

Update blog post (requires authentication)

#### DELETE `/api/blog/:id` 🔒

Delete blog post (requires authentication)

### Testimonials

#### GET `/api/testimonials`

Get all testimonials (optional query: `?featured=true`)

#### POST `/api/testimonials` 🔒

Create testimonial (requires authentication)

#### PUT `/api/testimonials/:id` 🔒

Update testimonial (requires authentication)

#### DELETE `/api/testimonials/:id` 🔒

Delete testimonial (requires authentication)

### Contact

#### POST `/api/contact`

Submit contact form

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "company": "ABC Corp",
  "service": "consulting",
  "message": "I'm interested in your services"
}
```

#### GET `/api/contact` 🔒

Get all contact submissions (requires authentication)

#### PATCH `/api/contact/:id/status` 🔒

Update contact status (requires authentication)

### Admin

#### GET `/api/admin/stats` 🔒

Get dashboard statistics (requires authentication)

🔒 = Requires JWT token in Authorization header

## 🎨 Features

✅ Multi-page website structure
✅ Responsive design (mobile, tablet, desktop)
✅ RESTful API with full CRUD operations
✅ JWT authentication & authorization
✅ Admin dashboard with statistics
✅ Contact form with database storage
✅ Blog system with view counter
✅ Portfolio/Projects showcase
✅ Client testimonials management
✅ Smooth animations & transitions
✅ Professional UI/UX design

## 🛠️ Database Schema

### users

- id, email, password (hashed), name, role, created_at

### projects

- id, title, description, client, industry, tech_stack, image_url, project_url, start_date, end_date, status, featured, created_at, updated_at

### blog_posts

- id, title, slug, excerpt, content, author, category, tags, image_url, published, views, created_at, updated_at

### testimonials

- id, name, position, company, content, rating, avatar_url, featured, created_at

### contacts

- id, first_name, last_name, email, company, service, message, status, created_at

## 📱 Pages

1. **Home** (`/`) - Landing page with hero, services, solutions, testimonials
2. **About** (`/pages/about`) - Company information & team
3. **Services** (`/pages/services`) - Detailed service descriptions
4. **Portfolio** (`/pages/portfolio`) - Project showcase
5. **Blog** (`/pages/blog`) - Article listing
6. **Contact** (`/pages/contact`) - Contact form
7. **Admin** (`/admin/*`) - Admin panel (login, dashboard, management)

## 🔧 Development

### Add New API Endpoint

1. Create route file in `backend/routes/`
2. Import and use in `backend/server.js`
3. Add authentication middleware if needed

### Add New Page

1. Create HTML file in `pages/` or `admin/`
2. Update navigation links
3. Add route in `backend/server.js` if needed

## 📝 Environment Variables

Create `.env` file with:

```
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
DB_PATH=./backend/database/velora.db
ADMIN_EMAIL=admin@velora.com
ADMIN_PASSWORD=admin123
```

## 🚀 Deployment

### Production Checklist

- [ ] Change default admin password
- [ ] Update JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS settings
- [ ] Setup HTTPS/SSL
- [ ] Configure database backups
- [ ] Setup logging & monitoring

## 📞 Support

For support, email hello@velora.com or visit our website.

## 📄 License

MIT License - feel free to use for your projects!

---

Built with ❤️ by Velora Team
