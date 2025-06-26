import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PackageCardProps {
  imageUrl: string;
  title: string;
  price: number;
  highlights: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ imageUrl, title, price, highlights }) => {
  console.log('PackageCard loaded for:', title);

  return (
    <Link to="/booking" className="block group outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <div className="relative">
          {/* Image */}
          <div className="overflow-hidden">
             <img
              src={imageUrl || 'https://via.placeholder.com/400x300'}
              alt={`View of ${title}`}
              className="object-cover w-full h-52 transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* Hover Overlay with Highlights */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <h3 className="text-white font-semibold text-md mb-2">Key Highlights:</h3>
              <ul className="space-y-1">
                {highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-200">
                    <Star className="h-4 w-4 mr-2 text-yellow-400 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 bg-white">
          <h2 className="text-lg font-bold text-gray-800 truncate" title={title}>
            {title}
          </h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600 text-sm">Starting from</p>
            <div className="flex items-center text-xl font-extrabold text-gray-900">
              <IndianRupee className="h-5 w-5" />
              <span>{price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PackageCard;