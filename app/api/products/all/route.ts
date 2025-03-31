import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, you would fetch this data from your database
    const allProducts = [
      {
        name: "रुद्राक्ष माला (Rudraksha Mala)",
        description: "शुद्ध रुद्राक्ष बीज से निर्मित पारंपरिक माला, आध्यात्मिक शक्ति और सुरक्षा के लिए।",
        price: 2499,
        slug: "rudraksha-mala",
        isStone: false
      },
      {
        name: "ध्यान गद्दी (Meditation Cushion)",
        description: "हमारे आरामदायक कुशन के साथ अपने ध्यान अभ्यास को बढ़ाएं।",
        price: 1499,
        slug: "meditation-cushion",
        isStone: false
      },
      {
        name: "Ruby (रूबी)",
        description: "Enhances confidence, leadership, and vitality. Associated with the Sun.",
        pricePerCarat: 15000,
        slug: "ruby",
        isStone: true
      },
      {
        name: "Blue Sapphire (नीलम)",
        description: "Enhances mental clarity and spiritual insight. Associated with Saturn.",
        pricePerCarat: 20000,
        slug: "blue-sapphire",
        isStone: true
      },
      {
        name: "Emerald (पन्ना)",
        description: "Encourages growth, patience, and wellbeing. Associated with Mercury.",
        pricePerCarat: 18000,
        slug: "emerald",
        isStone: true
      },
      {
        name: "Yellow Sapphire (पुखराज)",
        description: "Brings wisdom, prosperity, and optimism. Associated with Jupiter.",
        pricePerCarat: 12000,
        slug: "yellow-sapphire",
        isStone: true
      }
    ];

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch all products' }, { status: 500 });
  }
}