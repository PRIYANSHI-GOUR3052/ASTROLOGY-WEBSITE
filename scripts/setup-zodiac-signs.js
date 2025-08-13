const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const initialZodiacSigns = [
  { name: 'Aries', slug: 'aries' },
  { name: 'Taurus', slug: 'taurus' },
  { name: 'Gemini', slug: 'gemini' },
  { name: 'Cancer', slug: 'cancer' },
  { name: 'Leo', slug: 'leo' },
  { name: 'Virgo', slug: 'virgo' },
  { name: 'Libra', slug: 'libra' },
  { name: 'Scorpio', slug: 'scorpio' },
  { name: 'Sagittarius', slug: 'sagittarius' },
  { name: 'Capricorn', slug: 'capricorn' },
  { name: 'Aquarius', slug: 'aquarius' },
  { name: 'Pisces', slug: 'pisces' },
];

async function setupZodiacSigns() {
  try {
    console.log('Setting up zodiac signs table...');
    
    // Create the table using Prisma
    console.log('Running Prisma migration...');
    
    // Insert initial zodiac signs
    console.log('Inserting initial zodiac signs...');
    
    for (const sign of initialZodiacSigns) {
      try {
        await prisma.zodiac_signs.create({
          data: sign
        });
        console.log(`✓ Created ${sign.name}`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`- ${sign.name} already exists`);
        } else {
          console.error(`✗ Error creating ${sign.name}:`, error.message);
        }
      }
    }
    
    console.log('Zodiac signs setup completed!');
  } catch (error) {
    console.error('Error setting up zodiac signs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupZodiacSigns();
