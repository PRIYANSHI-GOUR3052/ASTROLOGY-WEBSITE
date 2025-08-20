const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testShippingAPI() {
  try {
    console.log('Testing Shipping API...');

    // First, let's create a test product
    const testProduct = await prisma.$queryRaw`
      INSERT INTO products (name, description, price, sku, slug, available, is_active, created_at, updated_at)
      VALUES ('Test Product for Shipping', 'Test product description', 1000.00, 'TEST-SHIP-001', 'test-product-shipping', 10, true, NOW(), NOW())
    ` as any[];

    // Get the created product ID
    const product = await prisma.$queryRaw`
      SELECT id FROM products WHERE sku = 'TEST-SHIP-001' ORDER BY id DESC LIMIT 1
    ` as any[];

    if (product.length === 0) {
      console.error('Failed to create test product');
      return;
    }

    const productId = product[0].id;
    console.log(`Created test product with ID: ${productId}`);

    // Test data for shipping
    const shippingData = {
      weight: 2.5,
      weight_unit: 'kg',
      length: 20.0,
      width: 15.0,
      height: 10.0,
      dimension_unit: 'cm',
      shipping_class: 'standard',
      is_free_shipping: false,
      shipping_cost: 150.00,
      max_shipping_cost: 200.00,
      shipping_zones: ['IN', 'US', 'UK']
    };

    // Test creating shipping details
    console.log('\n1. Testing POST (Create shipping details)...');
    const createResponse = await fetch(`http://localhost:3000/api/products/${productId}/shipping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shippingData)
    });

    if (createResponse.ok) {
      const createdShipping = await createResponse.json();
      console.log('✅ Shipping details created successfully:', createdShipping);
    } else {
      const error = await createResponse.json();
      console.error('❌ Failed to create shipping details:', error);
    }

    // Test getting shipping details
    console.log('\n2. Testing GET (Retrieve shipping details)...');
    const getResponse = await fetch(`http://localhost:3000/api/products/${productId}/shipping`);

    if (getResponse.ok) {
      const retrievedShipping = await getResponse.json();
      console.log('✅ Shipping details retrieved successfully:', retrievedShipping);
    } else {
      const error = await getResponse.json();
      console.error('❌ Failed to retrieve shipping details:', error);
    }

    // Test updating shipping details
    console.log('\n3. Testing PUT (Update shipping details)...');
    const updateData = {
      ...shippingData,
      weight: 3.0,
      shipping_cost: 200.00,
      is_free_shipping: true
    };

    const updateResponse = await fetch(`http://localhost:3000/api/products/${productId}/shipping`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.ok) {
      const updatedShipping = await updateResponse.json();
      console.log('✅ Shipping details updated successfully:', updatedShipping);
    } else {
      const error = await updateResponse.json();
      console.error('❌ Failed to update shipping details:', error);
    }

    // Test deleting shipping details
    console.log('\n4. Testing DELETE (Remove shipping details)...');
    const deleteResponse = await fetch(`http://localhost:3000/api/products/${productId}/shipping`, {
      method: 'DELETE'
    });

    if (deleteResponse.ok) {
      const deleteResult = await deleteResponse.json();
      console.log('✅ Shipping details deleted successfully:', deleteResult);
    } else {
      const error = await deleteResponse.json();
      console.error('❌ Failed to delete shipping details:', error);
    }

    // Clean up - delete the test product
    console.log('\n5. Cleaning up test data...');
    await prisma.$queryRaw`
      DELETE FROM products WHERE id = ${productId}
    ` as any[];
    console.log('✅ Test product deleted successfully');

    console.log('\n🎉 All shipping API tests completed!');

  } catch (error) {
    console.error('Error testing shipping API:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testShippingAPI();
}

module.exports = { testShippingAPI };
