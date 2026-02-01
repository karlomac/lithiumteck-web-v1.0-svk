// PocketBase Seeding Script
// Run this in PocketBase Admin Console or via API to populate initial data

const POCKETBASE_URL = 'http://localhost:8090';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'your-admin-password-here';

// Helper function to create records via API
async function createRecord(collection, data) {
  const response = await fetch(`${POCKETBASE_URL}/api/collections/${collection}/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Main seeding function
async function seedDatabase() {
  console.log('Starting PocketBase seeding...');

  try {
    // 1. Create Services
    console.log('Creating services...');
    
    const services = [
      {
        name: 'World Building',
        description: 'Massive spawns, themed warps, and organic landscapes. Every block is placed with intent and cinematic precision.',
        category: 'world_building',
        base_price: 500,
        features: 'Custom spawns, themed warps, organic landscapes, cinematic builds, terraforming',
        delivery_time: '2-4 weeks',
        active: true,
        sort_order: 1
      },
      {
        name: 'Custom Plugins',
        description: 'Optimized Java solutions for Spigot, Paper, and Velocity. From custom minigames to complex database integrations.',
        category: 'custom_plugins',
        base_price: 750,
        features: 'Spigot/Paper/Velocity support, custom minigames, database integrations, performance optimization',
        delivery_time: '3-6 weeks',
        active: true,
        sort_order: 2
      },
      {
        name: 'Asset Design',
        description: 'Custom 3D Blockbench models, textures, and custom GUI menus that redefine the vanilla experience.',
        category: 'asset_design',
        base_price: 400,
        features: '3D Blockbench models, custom textures, GUI menus, resource packs, animations',
        delivery_time: '1-3 weeks',
        active: true,
        sort_order: 3
      }
    ];

    for (const service of services) {
      await createRecord('services', service);
      console.log(`Created service: ${service.name}`);
    }

    // 2. Create Projects
    console.log('Creating projects...');
    
    const projects = [
      {
        title: 'The Crystal Kingdom',
        description: 'A massive fantasy-themed spawn featuring crystalline structures, floating islands, and intricate detail work. This world build showcases advanced terraforming and architectural design.',
        category: 'world_build',
        status: 'featured',
        featured: true,
        sort_order: 1,
        github_url: null
      },
      {
        title: 'Dynamic Quest Engine',
        description: 'A comprehensive quest system plugin featuring dynamic quest generation, progress tracking, reward systems, and seamless integration with existing server economies.',
        category: 'plugin_development',
        status: 'featured',
        featured: true,
        sort_order: 2,
        github_url: 'https://github.com/lithiumteck/dynamic-quest-engine'
      },
      {
        title: 'Celestial Armory Pack',
        description: 'Complete 3D weapon and armor pack with celestial themes. Features custom models, textures, animations, and GUI redesigns for an immersive combat experience.',
        category: 'asset_design',
        status: 'featured',
        featured: true,
        sort_order: 3,
        github_url: null
      },
      {
        title: 'Neo-Tokyo Lobby',
        description: 'Cyberpunk-themed lobby build with neon aesthetics, futuristic architecture, and interactive elements. Combines traditional Minecraft building with modern design principles.',
        category: 'world_build',
        status: 'featured',
        featured: true,
        sort_order: 4,
        github_url: null
      }
    ];

    for (const project of projects) {
      await createRecord('projects', project);
      console.log(`Created project: ${project.title}`);
    }

    // 3. Create Media Records (you'll need to upload actual files separately)
    console.log('Creating media records...');
    
    const mediaItems = [
      {
        filename: 'crystal-kingdom-main.jpg',
        type: 'image',
        alt_text: 'The Crystal Kingdom - Massive fantasy spawn with crystalline structures',
        caption: 'The Crystal Kingdom - Featured world build project',
        sort_order: 1
      },
      {
        filename: 'dynamic-quest-engine-preview.jpg',
        type: 'image',
        alt_text: 'Dynamic Quest Engine plugin interface and features',
        caption: 'Dynamic Quest Engine - Custom plugin development',
        sort_order: 2
      },
      {
        filename: 'celestial-armory-pack.jpg',
        type: 'image',
        alt_text: 'Celestial Armory Pack - 3D weapon and armor models',
        caption: 'Celestial Armory Pack - Custom 3D asset design',
        sort_order: 3
      },
      {
        filename: 'neo-tokyo-lobby.jpg',
        type: 'image',
        alt_text: 'Neo-Tokyo Lobby - Cyberpunk themed server spawn',
        caption: 'Neo-Tokyo Lobby - Cyberpunk world build',
        sort_order: 4
      },
      {
        filename: 'hero-banner.jpg',
        type: 'image',
        alt_text: 'Lithiumteck hero banner showcasing portfolio work',
        caption: 'Portfolio hero banner',
        sort_order: 5
      }
    ];

    for (const media of mediaItems) {
      await createRecord('media', media);
      console.log(`Created media record: ${media.filename}`);
    }

    // 4. Create Sample Testimonials
    console.log('Creating testimonials...');
    
    const testimonials = [
      {
        rating: 5,
        content: 'Absolutely incredible work! The Crystal Kingdom spawn exceeded our expectations. Our players are amazed by the detail and creativity.',
        featured: true,
        approved: true
      },
      {
        rating: 5,
        content: 'The Dynamic Quest Engine plugin is exactly what our server needed. Performance is excellent and the features are comprehensive.',
        featured: true,
        approved: true
      },
      {
        rating: 5,
        content: 'Custom assets have transformed our server\'s visual appeal. The 3D models and textures are professional quality.',
        featured: true,
        approved: true
      }
    ];

    for (const testimonial of testimonials) {
      await createRecord('testimonials', testimonial);
      console.log('Created testimonial');
    }

    console.log('Seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Upload actual image files to media records via PocketBase Admin UI');
    console.log('2. Link media files to projects using the projects relation field');
    console.log('3. Create client records for testimonials if needed');
    console.log('4. Review and adjust sort orders and featured status');

  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

// Instructions for running this script:
/*
1. Start PocketBase server: ./pocketbase serve
2. Open PocketBase Admin UI in browser
3. Go to Settings > API Tokens and create a token with full access
4. Replace ADMIN_EMAIL and ADMIN_PASSWORD with your actual credentials
5. Run this script in Node.js or paste into browser console on Admin UI
6. Upload actual image files manually through Admin UI
7. Link media files to projects in the projects collection
*/

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { seedDatabase };
} else {
  // Browser usage - run in console
  window.seedDatabase = seedDatabase;
}
