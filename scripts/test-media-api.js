const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testMediaAPI() {
  try {
    console.log('Testing Product Media API...');

    // First, let's create a test product
    const testProduct = await prisma.$queryRaw`
      INSERT INTO products (name, description, price, sku, slug, available, is_active, created_at, updated_at)
      VALUES ('Test Product for Media', 'Test product description', 1000.00, 'TEST-MEDIA-001', 'test-product-media', 10, true, NOW(), NOW())
    ` as any[];

    // Get the created product ID
    const product = await prisma.$queryRaw`
      SELECT id FROM products WHERE sku = 'TEST-MEDIA-001' ORDER BY id DESC LIMIT 1
    ` as any[];

    if (product.length === 0) {
      console.error('Failed to create test product');
      return;
    }

    const productId = product[0].id;
    console.log(`Created test product with ID: ${productId}`);

    // Test data for media
    const mediaData = [
      {
        type: 'image',
        url: 'https://example.com/image1.jpg',
        alt_text: 'Test product image 1',
        title: 'Test product image 1'
      },
      {
        type: 'image',
        url: 'https://example.com/image2.jpg',
        alt_text: 'Test product image 2',
        title: 'Test product image 2'
      },
      {
        type: 'image',
        url: 'https://example.com/image3.jpg',
        alt_text: 'Test product image 3',
        title: 'Test product image 3'
      }
    ];

    // Test creating media
    console.log('\n1. Testing POST (Create media)...');
    const createResponse = await fetch(`http://localhost:3000/api/products/${productId}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ media: mediaData })
    });

    if (createResponse.ok) {
      const createdMedia = await createResponse.json();
      console.log('✅ Media created successfully:', createdMedia);
    } else {
      const error = await createResponse.json();
      console.error('❌ Failed to create media:', error);
    }

    // Test getting media
    console.log('\n2. Testing GET (Retrieve media)...');
    const getResponse = await fetch(`http://localhost:3000/api/products/${productId}/media`);

    if (getResponse.ok) {
      const retrievedMedia = await getResponse.json();
      console.log('✅ Media retrieved successfully:', retrievedMedia);
    } else {
      const error = await getResponse.json();
      console.error('❌ Failed to retrieve media:', error);
    }

    // Test updating media
    console.log('\n3. Testing PUT (Update media)...');
    const updateData = [
      {
        type: 'image',
        url: 'https://example.com/updated-image1.jpg',
        alt_text: 'Updated test product image 1',
        title: 'Updated test product image 1'
      },
      {
        type: 'image',
        url: 'https://example.com/updated-image2.jpg',
        alt_text: 'Updated test product image 2',
        title: 'Updated test product image 2'
      }
    ];

    const updateResponse = await fetch(`http://localhost:3000/api/products/${productId}/media`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ media: updateData })
    });

    if (updateResponse.ok) {
      const updatedMedia = await updateResponse.json();
      console.log('✅ Media updated successfully:', updatedMedia);
    } else {
      const error = await updateResponse.json();
      console.error('❌ Failed to update media:', error);
    }

    // Test deleting media
    console.log('\n4. Testing DELETE (Remove media)...');
    const deleteResponse = await fetch(`http://localhost:3000/api/products/${productId}/media`, {
      method: 'DELETE'
    });

    if (deleteResponse.ok) {
      const deleteResult = await deleteResponse.json();
      console.log('✅ Media deleted successfully:', deleteResult);
    } else {
      const error = await deleteResponse.json();
      console.error('❌ Failed to delete media:', error);
    }

    // Clean up - delete the test product
    console.log('\n5. Cleaning up test data...');
    await prisma.$queryRaw`
      DELETE FROM products WHERE id = ${productId}
    ` as any[];
    console.log('✅ Test product deleted successfully');

    console.log('\n🎉 All media API tests completed!');

  } catch (error) {
    console.error('Error testing media API:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testMediaAPI();
}

module.exports = { testMediaAPI };
