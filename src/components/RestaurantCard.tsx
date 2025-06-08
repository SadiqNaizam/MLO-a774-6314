import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react'; // Example icons

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl?: string; // Optional image
  cuisineTypes: string[];
  rating?: number; // e.g., 4.5
  deliveryTime?: string; // e.g., "25-30 min"
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    if (onClick) {
      console.log("RestaurantCard clicked:", id);
      onClick(id);
    }
  };

  return (
    <Card
      className={`w-full overflow-hidden transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold truncate" title={name}>{name}</CardTitle>
        <div className="text-sm text-gray-600 truncate">
          {cuisineTypes.join(', ')}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          {rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
          {deliveryTime && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{deliveryTime}</span>
            </div>
          )}
        </div>
      </CardContent>
      {cuisineTypes.length > 0 && (
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
          {cuisineTypes.slice(0, 3).map((cuisine) => ( // Show max 3 badges
            <Badge key={cuisine} variant="outline" className="text-xs">{cuisine}</Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
export default RestaurantCard;