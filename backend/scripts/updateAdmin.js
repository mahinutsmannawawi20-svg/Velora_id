const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const sql = require('../config/database');
const bcrypt = require('bcryptjs');

async function updateAdmin() {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            console.error('❌ ADMIN_EMAIL or ADMIN_PASSWORD not found in .env');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(`🔄 Updating admin to email: ${email}`);

        // Find existing admin
        const admins = await sql`SELECT * FROM users WHERE role = 'admin' LIMIT 1`;

        if (admins.length > 0) {
            await sql`
                UPDATE users
                SET email = ${email}, password = ${hashedPassword}
                WHERE id = ${admins[0].id}
            `;
            console.log('✅ Admin credentials updated successfully');
        } else {
            await sql`
                INSERT INTO users (email, password, name, role)
                VALUES (${email}, ${hashedPassword}, 'Admin', 'admin')
            `;
            console.log('✅ Admin user created');
        }
        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to update admin:', error);
        process.exit(1);
    }
}

updateAdmin();
