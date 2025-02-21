import React from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: {
      en: string;
      hi: string;
    };
  } | null;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
        <p className="mb-4">{service.description.hi}</p>
        <p className="mb-4">{service.description.en}</p>
        <button onClick={onClose} className="mt-4 bg-black text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}; 