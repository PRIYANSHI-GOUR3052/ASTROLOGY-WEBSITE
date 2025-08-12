const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const initialCategories = [
  { name: "Gemstones & Crystals", slug: "gemstones-crystals", icon: "💎" },
  { name: "Rudraksha & Malas", slug: "rudraksha-malas", icon: "📿" },
  { name: "Spiritual Bracelets", slug: "spiritual-bracelets", icon: "🧿" },
  { name: "Sacred Yantras", slug: "sacred-yantras", icon: "🔱" },
  { name: "Astrology Reports", slug: "astrology-reports", icon: "📜" },
  { name: "Puja Essentials", slug: "puja-essentials", icon: "🪔" },
  { name: "Feng Shui Items", slug: "feng-shui-items", icon: "🌬️" },
  { name: "Meditation Tools", slug: "meditation-tools", icon: "🧘" },
];

async function setupCategories() {
  try {
    console.log('Setting up initial categories...');
    
    for (const category of initialCategories) {
      // Check if category already exists
      const existing = await prisma.categories.findUnique({
        where: { slug: category.slug }
      });
      
      if (!existing) {
        await prisma.categories.create({
          data: category
        });
        console.log(`✅ Created category: ${category.name}`);
      } else {
        console.log(`⏭️  Category already exists: ${category.name}`);
      }
    }
    
    console.log('✅ Categories setup completed!');
  } catch (error) {
    console.error('❌ Error setting up categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupCategories();
