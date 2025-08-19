import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST - Save product attributes and their values
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    const body = await request.json();
    const { attributes } = body; // Array of { attributeId, value, valueType }

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    if (!Array.isArray(attributes)) {
      return NextResponse.json(
        { error: 'Attributes must be an array' },
        { status: 400 }
      );
    }

    // First, delete existing product attributes for this product
    await prisma.$queryRaw`
      DELETE FROM product_attribute_values 
      WHERE product_attribute_id IN (
        SELECT id FROM product_attributes WHERE product_id = ${productId}
      )
    ` as any[];

    await prisma.$queryRaw`
      DELETE FROM product_attributes WHERE product_id = ${productId}
    ` as any[];

    const savedAttributes = [];

    for (const attr of attributes) {
      const { attributeId, value, valueType = 'text' } = attr;

      if (!attributeId || value === undefined || value === null || value === '') {
        continue;
      }

      // Create product attribute record
      const productAttribute = await prisma.$queryRaw`
        INSERT INTO product_attributes (product_id, attribute_id, created_at, updated_at)
        VALUES (${productId}, ${parseInt(attributeId)}, NOW(), NOW())
      ` as any[];

      // Get the created product attribute ID
      const createdProductAttribute = await prisma.$queryRaw`
        SELECT id FROM product_attributes 
        WHERE product_id = ${productId} AND attribute_id = ${parseInt(attributeId)}
        ORDER BY id DESC LIMIT 1
      ` as any[];

      if (createdProductAttribute.length > 0) {
        const productAttributeId = createdProductAttribute[0].id;

        // Create product attribute value record
        let attributeValueId = null;
        let textValue = null;
        let numberValue = null;
        let booleanValue = null;
        let dateValue = null;

        // Handle different value types
        switch (valueType) {
          case 'select':
          case 'multiselect':
            // For select/multiselect, value should be attribute_value_id(s)
            if (Array.isArray(value)) {
              // Handle multiselect - create multiple records
              for (const valId of value) {
                await prisma.$queryRaw`
                  INSERT INTO product_attribute_values 
                  (product_attribute_id, attribute_value_id, created_at, updated_at)
                  VALUES (${productAttributeId}, ${parseInt(valId)}, NOW(), NOW())
                ` as any[];
              }
            } else {
              // Handle single select
              attributeValueId = parseInt(value);
            }
            break;
          case 'number':
            numberValue = parseFloat(value);
            break;
          case 'boolean':
            booleanValue = Boolean(value);
            break;
          case 'date':
            dateValue = new Date(value);
            break;
          default:
            textValue = String(value);
            break;
        }

        // Create the attribute value record (for non-multiselect cases)
        if (!Array.isArray(value) || valueType !== 'multiselect') {
          await prisma.$queryRaw`
            INSERT INTO product_attribute_values 
            (product_attribute_id, attribute_value_id, text_value, number_value, boolean_value, date_value, created_at, updated_at)
            VALUES (${productAttributeId}, ${attributeValueId}, ${textValue}, ${numberValue}, ${booleanValue}, ${dateValue}, NOW(), NOW())
          ` as any[];
        }

        savedAttributes.push({
          attributeId: parseInt(attributeId),
          value,
          valueType
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product attributes saved successfully',
      savedAttributes
    });

  } catch (error) {
    console.error('Error saving product attributes:', error);
    return NextResponse.json(
      { error: 'Failed to save product attributes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Retrieve product attributes and their values
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const productAttributes = await prisma.$queryRaw`
      SELECT 
        pa.id as product_attribute_id,
        pa.attribute_id,
        a.name as attribute_name,
        a.type as attribute_type,
        a.description as attribute_description,
        pav.id as value_id,
        pav.text_value,
        pav.number_value,
        pav.boolean_value,
        pav.date_value,
        pav.attribute_value_id,
        av.value as attribute_value_name
      FROM product_attributes pa
      JOIN attributes a ON pa.attribute_id = a.id
      LEFT JOIN product_attribute_values pav ON pa.id = pav.product_attribute_id
      LEFT JOIN attribute_values av ON pav.attribute_value_id = av.id
      WHERE pa.product_id = ${productId}
      ORDER BY a.sort_order ASC, pa.id ASC
    ` as any[];

    // Transform the data to a more usable format
    const transformedAttributes = {};
    
    productAttributes.forEach(row => {
      const attributeId = row.attribute_id;
      
      if (!transformedAttributes[attributeId]) {
        transformedAttributes[attributeId] = {
          attributeId: row.attribute_id,
          attributeName: row.attribute_name,
          attributeType: row.attribute_type,
          attributeDescription: row.attribute_description,
          values: []
        };
      }

      if (row.value_id) {
        let value = null;
        
        if (row.text_value !== null) value = row.text_value;
        else if (row.number_value !== null) value = row.number_value;
        else if (row.boolean_value !== null) value = row.boolean_value;
        else if (row.date_value !== null) value = row.date_value;
        else if (row.attribute_value_id !== null) value = row.attribute_value_id;

        transformedAttributes[attributeId].values.push({
          valueId: row.value_id,
          value: value,
          attributeValueName: row.attribute_value_name
        });
      }
    });

    return NextResponse.json(transformedAttributes);

  } catch (error) {
    console.error('Error fetching product attributes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product attributes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
