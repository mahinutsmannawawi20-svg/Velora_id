require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const sql = require('./database');

async function resetData() {
  try {
    console.log('🗑️ Clearing data...');
    await sql`DELETE FROM projects`;
    await sql`DELETE FROM blog_posts`;
    await sql`DELETE FROM testimonials`;
    console.log('✅ Data cleared!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    process.exit(1);
  }
}

resetData();
