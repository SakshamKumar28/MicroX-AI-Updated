import React from 'react';
import { Plus } from 'lucide-react';

const CategoryCard = ({ title, description, image, large = false }) => {
    return (
        <div className={`relative group overflow-hidden rounded-3xl ${large ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
             <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{title}</h3>
                        <p className="text-white/80 text-sm max-w-xs line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                            {description}
                        </p>
                    </div>
                    <button className="bg-white text-dark w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
