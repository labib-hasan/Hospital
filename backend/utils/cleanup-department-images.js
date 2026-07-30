// Script to remove department cover photos from the database
// Run this script to delete all uploaded department cover images

import db from "../config/db.js";

async function cleanupDepartmentImages() {
  console.log('🧹 Starting cleanup of department cover images...\n');
  
  try {
    // First, check how many images exist
    const [beforeCount] = await db.execute(
      "SELECT COUNT(*) as count FROM page_images WHERE page_type = 'department'"
    );
    console.log(`📊 Images before cleanup: ${beforeCount[0].count}`);
    
    if (beforeCount[0].count === 0) {
      console.log('✅ No department images to clean up.');
      return;
    }
    
    // Show current images for reference
    const [currentImages] = await db.execute(
      "SELECT id, page_id, image_url, title, is_active, created_at FROM page_images WHERE page_type = 'department'"
    );
    
    console.log('\n📷 Current department images:');
    currentImages.forEach(img => {
      console.log(`  - [${img.page_id}] ${img.image_url.substring(0, 60)}...`);
    });
    
    // Delete all department images
    const [deleteResult] = await db.execute(
      "DELETE FROM page_images WHERE page_type = 'department'"
    );
    
    console.log(`\n🗑️  Deleted ${deleteResult.affectedRows} department images`);
    
    // Verify deletion
    const [afterCount] = await db.execute(
      "SELECT COUNT(*) as count FROM page_images WHERE page_type = 'department'"
    );
    console.log(`✅ Images after cleanup: ${afterCount[0].count}`);
    
    console.log('\n✨ Department cover photos have been removed.');
    console.log('Now the department pages will use default Unsplash cover images.');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  }
  
  process.exit(0);
}

// Run if called directly
cleanupDepartmentImages();
