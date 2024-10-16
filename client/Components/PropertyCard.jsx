import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="w-64 rounded-md shadow-md overflow-hidden bg-white border border-black">
      <img
        className="w-full h-48 object-cover"
        src={property.imageUrl}
        alt={property.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{property.title}</div>
        <p className="text-gray-700 text-base mb-4">{property.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold">{property.price}</span>
          <span className="text-green-600">{property.location}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;