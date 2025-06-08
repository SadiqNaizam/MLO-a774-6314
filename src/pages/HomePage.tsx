import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MapPin, Filter } from 'lucide-react';

const placeholderRestaurants = [
  { id: '1', name: 'Pizza Heaven', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, deliveryTime: '25-30 min' },
  { id: '2', name: 'Burger Joint', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['American', 'Burgers'], rating: 4.2, deliveryTime: '20-25 min' },
  { id: '3', name: 'Sushi World', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, deliveryTime: '30-40 min' },
  { id: '4', name: 'Curry House', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, deliveryTime: '35-45 min' },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('New York, NY'); // Default or auto-detected location

  console.log('HomePage loaded');

  const handleRestaurantClick = (id: string | number) => {
    console.log(`Navigating to restaurant with id: ${id}`);
    // In a real app, this would use react-router-dom's navigate function
    // e.g., navigate(`/restaurant/${id}`);
    alert(`Would navigate to restaurant ID: ${id}`);
  };

  const filteredRestaurants = placeholderRestaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu appName="FoodieApp" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Location and Search Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="flex items-center w-full sm:w-auto">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <Input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location" 
                className="w-full"
              />
            </div>
            <Button className="w-full sm:w-auto">Update Location</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              className="w-full pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <h2 className="text-xl font-semibold text-gray-700 mr-4 hidden sm:block">Filter by:</h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="any">
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Rating</SelectItem>
              <SelectItem value="4+">4 Stars & Up</SelectItem>
              <SelectItem value="3+">3 Stars & Up</SelectItem>
            </SelectContent>
          </Select>
           <Button variant="outline" className="w-full sm:w-auto bg-white">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </section>

        {/* Restaurant Listings Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Restaurants Near You</h2>
          {filteredRestaurants.length > 0 ? (
            <ScrollArea className="h-auto"> {/* Adjust height as needed or remove for natural flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    imageUrl={restaurant.imageUrl}
                    cuisineTypes={restaurant.cuisineTypes}
                    rating={restaurant.rating}
                    deliveryTime={restaurant.deliveryTime}
                    onClick={handleRestaurantClick}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-gray-500 py-10">No restaurants found matching your criteria. Try a different search or location.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;