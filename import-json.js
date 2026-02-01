// PocketBase JSON Import Script
// Alternative to the seed script - uses JSON files

const POCKETBASE_URL = 'http://localhost:8090';

// JSON data for import
const importData = {
  services: [
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
  ],
  
  projects: [
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
  ],

  testimonials: [
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
  ]
};

// Function to import JSON data via API
async function importCollection(collectionName, data) {
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/${collectionName}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      console.log(`✅ Imported ${collectionName}:`, await response.json());
    } else {
      console.error(`❌ Failed to import ${collectionName}:`, await response.text());
    }
  } catch (error) {
    console.error(`❌ Error importing ${collectionName}:`, error);
  }
}

// Main import function
async function importAllData() {
  console.log('🚀 Starting JSON import...');
  
  // Import each collection
  for (const [collection, records] of Object.entries(importData)) {
    console.log(`\n📁 Importing ${collection}...`);
    
    for (const record of records) {
      await importCollection(collection, record);
    }
  }
  
  console.log('\n✨ Import completed!');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { importAllData, importData };
} else {
  window.importAllData = importAllData;
  window.importData = importData;
}
