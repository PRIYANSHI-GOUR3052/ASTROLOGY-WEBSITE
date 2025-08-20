const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupTestAttributes() {
  try {
    console.log('Setting up test attributes...');

    // Create test attributes
    const attributes = [
      {
        name: 'Color',
        slug: 'color',
        type: 'select',
        description: 'Product color',
        is_required: true,
        is_filterable: true,
        is_searchable: true,
        sort_order: 1
      },
      {
        name: 'Size',
        slug: 'size',
        type: 'select',
        description: 'Product size',
        is_required: false,
        is_filterable: true,
        is_searchable: false,
        sort_order: 2
      },
      {
        name: 'Material',
        slug: 'material',
        type: 'select',
        description: 'Product material',
        is_required: false,
        is_filterable: true,
        is_searchable: true,
        sort_order: 3
      },
      {
        name: 'Weight',
        slug: 'weight',
        type: 'number',
        description: 'Product weight in grams',
        is_required: false,
        is_filterable: false,
        is_searchable: false,
        sort_order: 4
      },
      {
        name: 'Certified',
        slug: 'certified',
        type: 'boolean',
        description: 'Whether the product is certified',
        is_required: false,
        is_filterable: true,
        is_searchable: false,
        sort_order: 5
      }
    ];

    // Insert attributes
    for (const attr of attributes) {
      await prisma.$queryRaw`
        INSERT INTO attributes (name, slug, type, description, is_required, is_filterable, is_searchable, sort_order, created_at, updated_at)
        VALUES (${attr.name}, ${attr.slug}, ${attr.type}, ${attr.description}, ${attr.is_required}, ${attr.is_filterable}, ${attr.is_searchable}, ${attr.sort_order}, NOW(), NOW())
        ON DUPLICATE KEY UPDATE updated_at = NOW()
      `;
    }

    console.log('Attributes created successfully');

    // Get attribute IDs
    const colorAttr = await prisma.$queryRaw`SELECT id FROM attributes WHERE slug = 'color' LIMIT 1` as any[];
    const sizeAttr = await prisma.$queryRaw`SELECT id FROM attributes WHERE slug = 'size' LIMIT 1` as any[];
    const materialAttr = await prisma.$queryRaw`SELECT id FROM attributes WHERE slug = 'material' LIMIT 1` as any[];

    if (colorAttr.length > 0) {
      const colorAttrId = colorAttr[0].id;
      
      // Create color values
      const colorValues = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White'];
      for (const color of colorValues) {
        await prisma.$queryRaw`
          INSERT INTO attribute_values (attribute_id, value, slug, sort_order, is_active, created_at, updated_at)
          VALUES (${colorAttrId}, ${color}, ${color.toLowerCase()}, 0, true, NOW(), NOW())
          ON DUPLICATE KEY UPDATE updated_at = NOW()
        `;
      }
    }

    if (sizeAttr.length > 0) {
      const sizeAttrId = sizeAttr[0].id;
      
      // Create size values
      const sizeValues = ['Small', 'Medium', 'Large', 'Extra Large'];
      for (const size of sizeValues) {
        await prisma.$queryRaw`
          INSERT INTO attribute_values (attribute_id, value, slug, sort_order, is_active, created_at, updated_at)
          VALUES (${sizeAttrId}, ${size}, ${size.toLowerCase()}, 0, true, NOW(), NOW())
          ON DUPLICATE KEY UPDATE updated_at = NOW()
        `;
      }
    }

    if (materialAttr.length > 0) {
      const materialAttrId = materialAttr[0].id;
      
      // Create material values
      const materialValues = ['Gold', 'Silver', 'Copper', 'Brass', 'Steel', 'Plastic', 'Wood', 'Stone'];
      for (const material of materialValues) {
        await prisma.$queryRaw`
          INSERT INTO attribute_values (attribute_id, value, slug, sort_order, is_active, created_at, updated_at)
          VALUES (${materialAttrId}, ${material}, ${material.toLowerCase()}, 0, true, NOW(), NOW())
          ON DUPLICATE KEY UPDATE updated_at = NOW()
        `;
      }
    }

    console.log('Attribute values created successfully');

    // Get a category and zodiac for testing
    const category = await prisma.$queryRaw`SELECT id FROM categories LIMIT 1` as any[];
    const zodiac = await prisma.$queryRaw`SELECT id FROM zodiac_signs LIMIT 1` as any[];

    if (category.length > 0 && colorAttr.length > 0) {
      const categoryId = category[0].id;
      const colorAttrId = colorAttr[0].id;
      
      // Assign color attribute to category
      await prisma.$queryRaw`
        INSERT INTO category_attributes (category_id, attribute_id, is_required, sort_order, created_at, updated_at)
        VALUES (${categoryId}, ${colorAttrId}, true, 1, NOW(), NOW())
        ON DUPLICATE KEY UPDATE updated_at = NOW()
      `;
      
      console.log(`Color attribute assigned to category ${categoryId}`);
    }

    if (zodiac.length > 0 && materialAttr.length > 0) {
      const zodiacId = zodiac[0].id;
      const materialAttrId = materialAttr[0].id;
      
      // Assign material attribute to zodiac
      await prisma.$queryRaw`
        INSERT INTO zodiac_attributes (zodiac_id, attribute_id, is_required, sort_order, created_at, updated_at)
        VALUES (${zodiacId}, ${materialAttrId}, false, 1, NOW(), NOW())
        ON DUPLICATE KEY UPDATE updated_at = NOW()
      `;
      
      console.log(`Material attribute assigned to zodiac ${zodiacId}`);
    }

    console.log('Test attributes setup completed successfully!');

  } catch (error) {
    console.error('Error setting up test attributes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupTestAttributes();
