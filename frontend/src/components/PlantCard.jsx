import React from 'react';
import { ShoppingCart } from 'lucide-react';

const PlantCard = ({ name, price, category, image }) => {
  return (
    <div className="group">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 bg-gray-100">
             <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <ShoppingCart className="w-4 h-4" />
                </button>
            </div>
            {category && (
                 <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-full">
                        {category}
                    </span>
                </div>
            )}
        </div>
        <div>
            <h3 className="text-lg font-bold font-display">{name}</h3>
            <div className="flex justify-between items-center mt-1">
                 <p className="text-gray-500 text-sm">{category}</p>
                 <p className="font-medium">${price}</p>
            </div>
        </div>
    </div>
  );
};

export default PlantCard;
