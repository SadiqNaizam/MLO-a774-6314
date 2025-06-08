import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, Tag, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  restaurant?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'm1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60', restaurant: 'Pizza Heaven' },
  { id: 'a2', name: 'Bruschetta', price: 7.50, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1505253716362-af242227bc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJ1c2NoZXR0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60', restaurant: 'Pizza Heaven' },
  { id: 'd1', name: 'Tiramisu', price: 6.50, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1571877275904-68eb1101614e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60', restaurant: 'Pizza Heaven' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  console.log('CartPage loaded');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example 8% tax
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu appName="FoodieApp" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <ShoppingCart className="mr-3 h-7 w-7 text-orange-600" /> Your Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                <Button asChild>
                  <Link to="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img src={item.imageUrl || 'https://via.placeholder.com/64'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.name}
                        {item.restaurant && <p className="text-xs text-gray-500">From: {item.restaurant}</p>}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input type="number" value={item.quantity} readOnly className="w-12 h-7 text-center px-1" />
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label="Remove item">
                          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <>
            <Separator />
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <Input 
                        type="text" 
                        placeholder="Enter promo code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow"
                    />
                    <Button variant="outline" onClick={() => alert(`Promo code '${promoCode}' applied (placeholder).`)}>Apply</Button>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span> <span>${deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Taxes (8%):</span> <span>${taxes.toFixed(2)}</span></div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-gray-800"><span>Total:</span> <span>${total.toFixed(2)}</span></div>
                </div>
            </CardContent>
            <CardFooter className="p-6 border-t">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
            </CardFooter>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;