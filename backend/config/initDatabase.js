require('dotenv').config();
const sql = require('./database');
const bcrypt = require('bcryptjs');

async function initDatabase() {
  try {
    console.log('🔄 Initializing Neon PostgreSQL database...');

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Users table created');

    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        client VARCHAR(255),
        industry VARCHAR(255),
        tech_stack TEXT,
        image_url TEXT,
        project_url TEXT,
        dates VARCHAR(255),
        status VARCHAR(50) DEFAULT 'completed',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Projects table created');

    // Create blog_posts table
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        tags TEXT,
        image_url TEXT,
        published BOOLEAN DEFAULT true,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Blog posts table created');

    // Create testimonials table
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        company VARCHAR(255),
        content TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        avatar_url TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Testimonials table created');

    // Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Contacts table created');

    // Check if admin user exists
    const existingAdmin = await sql`
      SELECT * FROM users WHERE email = ${process.env.ADMIN_EMAIL}
    `;

    if (existingAdmin.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await sql`
        INSERT INTO users (email, password, name, role)
        VALUES (${process.env.ADMIN_EMAIL}, ${hashedPassword}, 'Admin', 'admin')
      `;
      console.log('✅ Default admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Seed projects (only if table is empty)
    const existingProjects = await sql`SELECT COUNT(*) as count FROM projects`;
    if (existingProjects[0].count === '0') {
      const projects = [
        {
          title: 'E-Commerce Platform Modernization',
          description: 'Transformasi platform e-commerce dengan microservices architecture dan cloud-native solutions. Meningkatkan performa loading hingga 40% dan conversion rate sebesar 25%.',
          client: 'PT Retail Indonesia',
          industry: 'Retail & E-Commerce',
          tech_stack: 'React, Node.js, PostgreSQL, AWS, Docker, Kubernetes',
          image_url: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          project_url: 'https://example.com/demo-ecommerce',
          dates: 'Jan 2024 - Apr 2024'
        },
        {
          title: 'Banking Mobile App Development',
          description: 'Pengembangan aplikasi mobile banking dengan fitur AI-powered financial advisor, biometric security, dan real-time transaction tracking.',
          client: 'Bank Digital Nusantara',
          industry: 'Finance & Banking',
          tech_stack: 'React Native, Python, TensorFlow, MongoDB, Azure',
          image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          project_url: 'https://example.com/demo-banking',
          dates: 'Mar 2024 - Jul 2024'
        },
        {
          title: 'Healthcare Management System',
          description: 'Sistem manajemen rumah sakit terintegrasi dengan EMR, telemedicine, dan appointment booking system yang efisien.',
          client: 'RS Modern Sehat',
          industry: 'Healthcare',
          tech_stack: 'Vue.js, Java Spring Boot, MySQL, Redis, WebRTC',
          image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          project_url: 'https://example.com/demo-health',
          dates: 'Feb 2024 - Jun 2024'
        },
        {
          title: 'Logistics Tracking Platform',
          description: 'Platform real-time tracking dan optimization untuk supply chain management dengan integrasi IoT sensors.',
          client: 'Logistik Express',
          industry: 'Logistics',
          tech_stack: 'Angular, Go, PostgreSQL, RabbitMQ, Google Maps API',
          image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          project_url: 'https://example.com/demo-logistics',
          dates: 'Apr 2024 - Aug 2024'
        },
        {
          title: 'Education Learning Platform',
          description: 'Platform pembelajaran online dengan AI-powered personalization, interactive quizzes, dan progress tracking.',
          client: 'EduTech Indonesia',
          industry: 'Education',
          tech_stack: 'Next.js, Python, PostgreSQL, AWS, OpenAI API',
          image_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          project_url: 'https://example.com/demo-edutech',
          dates: 'May 2024 - Sep 2024'
        },
        {
          title: 'Manufacturing IoT Dashboard',
          description: 'Dashboard monitoring dan analytics untuk smart factory implementation, menampilkan data sensor real-time dan predictive maintenance.',
          client: 'PT Manufaktur Modern',
          industry: 'Manufacturing',
          tech_stack: 'React, Node.js, InfluxDB, MQTT, Grafana',
          image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          project_url: 'https://example.com/demo-iot',
          dates: 'Jun 2024 - Oct 2024'
        }
      ];

      for (const project of projects) {
        await sql`
          INSERT INTO projects (title, description, client, industry, tech_stack, image_url, project_url, dates, status, featured)
          VALUES (${project.title}, ${project.description}, ${project.client}, ${project.industry}, 
                  ${project.tech_stack}, ${project.image_url}, ${project.project_url}, ${project.dates}, 'completed', true)
        `;
      }
      console.log('✅ Sample projects seeded');
    }

    // Seed blog posts (only if table is empty)
    const existingPosts = await sql`SELECT COUNT(*) as count FROM blog_posts`;
    if (existingPosts[0].count === '0') {
      const posts = [
        {
          title: 'Transformasi Digital: Panduan Lengkap untuk Perusahaan Modern',
          slug: 'transformasi-digital-panduan-lengkap',
          excerpt: 'Pelajari langkah-langkah strategis untuk mengimplementasikan transformasi digital di perusahaan Anda',
          content: 'Transformasi digital bukan hanya tentang teknologi, tetapi juga tentang perubahan budaya organisasi. Dalam artikel ini, kita akan membahas strategi komprehensif...',
          author: 'Velora Team',
          category: 'Digital Transformation',
          image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Cloud Migration: Best Practices dan Strategi',
          slug: 'cloud-migration-best-practices',
          excerpt: 'Tips dan trik untuk migrasi ke cloud yang sukses tanpa disruption bisnis',
          content: 'Migrasi ke cloud memerlukan perencanaan matang dan eksekusi yang tepat. Simak best practices dari expert kami...',
          author: 'Velora Team',
          category: 'Cloud Computing',
          image_url: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Cybersecurity di Era Digital: Melindungi Aset Digital Perusahaan',
          slug: 'cybersecurity-era-digital',
          excerpt: 'Strategi komprehensif untuk mengamankan infrastruktur IT perusahaan Anda',
          content: 'Keamanan siber menjadi prioritas utama di era digital ini. Pelajari cara melindungi data dan aset perusahaan Anda...',
          author: 'Velora Team',
          category: 'Security',
          image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Memilih Tech Stack yang Tepat untuk Startup Anda',
          slug: 'memilih-tech-stack-startup',
          excerpt: 'Panduan memilih teknologi yang scalable dan cost-effective untuk startup',
          content: 'Pemilihan tech stack yang tepat sangat krusial untuk kesuksesan jangka panjang startup Anda. Berikut panduannya...',
            author: 'Velora Team',
          category: 'Technology',
          image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'AI dan Machine Learning dalam Bisnis: Peluang dan Tantangan',
          slug: 'ai-machine-learning-bisnis',
          excerpt: 'Bagaimana AI dapat meningkatkan efisiensi dan inovasi bisnis Anda',
          content: 'Artificial Intelligence membuka peluang baru untuk otomasi dan insights bisnis. Temukan cara memanfaatkannya...',
          author: 'Velora Team',
          category: 'AI & Innovation',
          image_url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ];

      for (const post of posts) {
        await sql`
          INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image_url, published, views)
          VALUES (${post.title}, ${post.slug}, ${post.excerpt}, ${post.content}, 
                  ${post.author}, ${post.category}, ${post.image_url}, true, 0)
        `;
      }
      console.log('✅ Sample blog posts seeded');
    }

    // Seed testimonials (only if table is empty)
    const existingTestimonials = await sql`SELECT COUNT(*) as count FROM testimonials`;
    if (existingTestimonials[0].count === '0') {
      const testimonials = [
        {
          name: 'Budi Santoso',
          position: 'CTO',
          company: 'PT Retail Indonesia',
          content: 'Velora membantu kami melakukan transformasi digital dengan sangat profesional. Tim mereka sangat kompeten dan responsif.',
          rating: 5
        },
        {
          name: 'Sarah Williams',
          position: 'Head of Digital',
          company: 'Bank Digital Nusantara',
          content: 'Implementasi mobile banking kami berjalan mulus berkat expertise Velora dalam fintech solutions.',
          rating: 5
        },
        {
          name: 'Dr. Ahmad Hidayat',
          position: 'Direktur IT',
          company: 'RS Modern Sehat',
          content: 'Sistem manajemen rumah sakit yang dikembangkan Velora sangat membantu meningkatkan efisiensi operasional kami.',
          rating: 5
        }
      ];

      for (const testimonial of testimonials) {
        await sql`
          INSERT INTO testimonials (name, position, company, content, rating, featured)
          VALUES (${testimonial.name}, ${testimonial.position}, ${testimonial.company}, 
                  ${testimonial.content}, ${testimonial.rating}, true)
        `;
      }
      console.log('✅ Sample testimonials seeded');
    }

    console.log('🎉 Database initialization completed successfully!');
    console.log('');
    console.log('📊 Database Summary:');
    console.log('   - Admin user ready');
    console.log('   - Sample projects loaded');
    console.log('   - Sample blog posts loaded');
    console.log('   - Sample testimonials loaded');
    console.log('');
    console.log('🔐 Admin Login:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = initDatabase;
