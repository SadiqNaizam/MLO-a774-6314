import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Tag } from 'lucide-react'; // Icons

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string; // Optional image
  tags?: string[]; // e.g., "Spicy", "Vegetarian", "Popular"
  onAddToCart: (id: string | number) => void;
  isOutOfStock?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  tags,
  onAddToCart,
  isOutOfStock = false,
}) => {
  console.log("Rendering MenuItemCard:", name, "Out of stock:", isOutOfStock);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
        console.log("Adding to cart:", id, name);
        onAddToCart(id);
    }
  };

  return (
    <Card className={`w-full flex flex-col md:flex-row overflow-hidden ${isOutOfStock ? 'opacity-70 bg-gray-50' : ''}`}>
      {imageUrl && (
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-48 md:h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          </CardHeader>
          {description && (
            <CardContent className="p-0 mb-2">
              <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </CardContent>
          )}
          {tags && tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <CardFooter className="p-0 flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">${price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={isOutOfStock ? "bg-gray-400" : ""}
          >
            {isOutOfStock ? "Out of Stock" : <><PlusCircle className="mr-2 h-4 w-4" /> Add</>}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
export default MenuItemCard;