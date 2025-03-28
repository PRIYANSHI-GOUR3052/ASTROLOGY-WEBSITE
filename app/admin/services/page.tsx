'use client';

import React, { useState } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';

// Initial services based on the image
const initialServices = [
  {
    id: 1,
    icon: '☀️',
    title: 'ज्योतिष परामर्श',
    titleEn: 'Astrology Consultation',
    description: 'अपने जीवन पथ, सबंधों और करियर के बारे में व्यक्तिगत ज्योतिषीय अंतर्दृष्टि प्राप्त करें।',
    descriptionEn: 'Gain insights into your life path, relationships, and career through personalized astrological readings.'
  },
  {
    id: 2,
    icon: '🏠',
    title: 'वास्तु शास्त्र',
    titleEn: 'Vastu Shastra',
    description: 'सकारात्मक ऊर्जा और समृद्धि को आकर्षित करने के लिए अपने रहने और काम के स्थान को सामंजस्य पूर्ण बनाएं।',
    descriptionEn: 'Harmonize your living and working spaces to attract positive energy and prosperity.'
  },
  {
    id: 3,
    icon: '#',
    title: 'अंक ज्योतिष',
    titleEn: 'Numerology',
    description: 'अपने जीवन की संख्याओं में छिपे अर्थ और आपकी निधि पर उनके प्रभाव को जानें।',
    descriptionEn: 'Uncover the hidden meanings in your life\'s numbers and their influence on your destiny.'
  }
];

export default function ServicesManagement() {
  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    icon: '⭐'
  });

  const handleAddService = () => {
    // Validate input
    if (!newService.title || !newService.description) {
      alert('Please fill in both title and description');
      return;
    }

    // Create new service with unique ID
    const serviceToAdd = {
      ...newService,
      id: Date.now()
    };

    // Add service
    setServices([...services, serviceToAdd]);

    // Reset form
    setNewService({
      title: '',
      titleEn: '',
      description: '',
      descriptionEn: '',
      icon: '⭐'
    });
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Services Management
        </h1>

        {/* Add New Service Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Hindi Title"
              value={newService.title}
              onChange={(e) => setNewService({...newService, title: e.target.value})}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="English Title"
              value={newService.titleEn}
              onChange={(e) => setNewService({...newService, titleEn: e.target.value})}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Hindi Description"
              value={newService.description}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              className="border p-2 rounded col-span-2"
              rows={3}
            />
            <textarea
              placeholder="English Description"
              value={newService.descriptionEn}
              onChange={(e) => setNewService({...newService, descriptionEn: e.target.value})}
              className="border p-2 rounded col-span-2"
              rows={3}
            />
            <div className="col-span-2 flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2">Icon:</span>
                <input
                  type="text"
                  value={newService.icon}
                  onChange={(e) => setNewService({...newService, icon: e.target.value})}
                  className="border p-2 rounded w-16 text-center"
                />
              </div>
              <button 
                onClick={handleAddService}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
              >
                <PlusCircle className="mr-2" /> Add Service
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              <button 
                onClick={() => handleDeleteService(service.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash2 />
              </button>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{service.titleEn}</p>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <p className="text-sm italic text-gray-500">{service.descriptionEn}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Book Your Call Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}