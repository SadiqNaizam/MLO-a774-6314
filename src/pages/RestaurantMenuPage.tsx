import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Star, Clock, ShoppingCart, Utensils } from 'lucide-react';

// Placeholder data
const restaurantDetails = {
  id: '1',
  name: 'Pizza Heaven',
  logoUrl: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png', // Generic pizza icon
  rating: 4.5,
  deliveryTime: '25-30 min',
  address: '123 Pizza St, Flavor Town, USA',
  tags: ['Italian', 'Pizza', 'Top Rated'],
  menu: {
    appetizers: [
      { id: 'a1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter and herbs.', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1589647390010-DA86DP93Af96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60', tags: ['Vegetarian'] },
      { id: 'a2', name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, basil, and balsamic glaze.', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1505253716362-af242227bc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJ1c2NoZXR0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&q=60', tags: ['Vegetarian', 'Popular'] },
    ],
    mainCourses: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza with basil.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=200&q=60', tags: ['Vegetarian', 'Best Seller'] },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Pizza topped with delicious pepperoni slices.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60', tags: [] },
      { id: 'm3', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta and pecorino cheese.', price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1588013273468-315080664211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhZ2hldHRpJTIwY2FyYm9uYXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=200&q=60', tags: ['Popular'] },
    ],
    desserts: [
      { id: 'd1', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert.', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1571877275904-68eb1101614e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60', tags: ['Vegetarian'] },
    ],
  }
};

const RestaurantMenuPage = () => {
  // In a real app, restaurantId would be used to fetch specific restaurant data
  const { restaurantId } = useParams<{ restaurantId?: string }>(); 
  console.log('RestaurantMenuPage loaded for restaurant ID:', restaurantId || 'N/A (using placeholder)');

  const handleAddToCart = (itemId: string | number) => {
    // Here you would typically update cart state and show a toast notification
    console.log(`Item ${itemId} added to cart.`);
    alert(`Item ${itemId} added to cart!`); // Placeholder for toast
  };

  const menuCategories = Object.keys(restaurantDetails.menu) as Array<keyof typeof restaurantDetails.menu>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu appName="FoodieApp" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* Dynamic restaurant name if available */}
            <BreadcrumbItem>
              <BreadcrumbPage>{restaurantDetails.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Restaurant Info Header */}
        <header className="mb-8 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-orange-500">
            <AvatarImage src={restaurantDetails.logoUrl} alt={restaurantDetails.name} />
            <AvatarFallback>{restaurantDetails.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{restaurantDetails.name}</h1>
            <p className="text-gray-600 mb-2">{restaurantDetails.address}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <Badge variant="secondary" className="text-sm flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" /> {restaurantDetails.rating.toFixed(1)}
              </Badge>
              <Badge variant="outline" className="text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-600" /> {restaurantDetails.deliveryTime}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {restaurantDetails.tags.map(tag => (
                <Badge key={tag} variant="default" className="bg-orange-100 text-orange-700">{tag}</Badge>
              ))}
            </div>
          </div>
        </header>
        
        {/* Menu Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <Utensils className="h-6 w-6 mr-2 text-orange-500" /> Menu
          </h2>
          <Accordion type="multiple" defaultValue={menuCategories} className="w-full space-y-3">
            {menuCategories.map((categoryKey) => {
                const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1).replace(/([A-Z])/g, ' $1').trim(); // "mainCourses" -> "Main Courses"
                const items = restaurantDetails.menu[categoryKey];
                return (
                    <AccordionItem value={categoryKey} key={categoryKey} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:bg-orange-50">
                        {categoryName} ({items.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-2 py-2 sm:px-4 sm:py-4">
                        <ScrollArea className="max-h-[600px] p-1"> {/* Adjust max height */}
                        <div className="space-y-4">
                            {items.map(item => (
                            <MenuItemCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                tags={item.tags}
                                onAddToCart={handleAddToCart}
                                isOutOfStock={item.id === 'm3'} // Example: mark one item as out of stock
                            />
                            ))}
                        </div>
                        </ScrollArea>
                    </AccordionContent>
                    </AccordionItem>
                );
            })}
          </Accordion>
        </section>

        {/* Floating Cart Button (Optional) */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button size="lg" className="rounded-full shadow-lg" asChild>
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-5 w-5" /> View Cart (3 items) {/* Placeholder item count */}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;