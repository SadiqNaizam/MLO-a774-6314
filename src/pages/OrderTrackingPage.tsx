import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import OrderStatusStepper from '@/components/OrderStatusStepper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, HelpCircle, RefreshCw, ShoppingBag } from 'lucide-react';

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'FAILED';

// Placeholder order data
const placeholderOrder = {
  id: 'ORD12345XYZ',
  status: 'PREPARING' as OrderStatus,
  estimatedDelivery: '4:30 PM - 4:45 PM',
  deliveryPartner: {
    name: 'John Rider',
    phone: '555-1234',
  },
  items: [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Coke', quantity: 2, price: 1.50 },
  ],
  total: 15.99,
  restaurantName: "Pizza Heaven",
  orderDate: new Date().toLocaleDateString(),
};


const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId?: string }>(); // In real app, use this to fetch order
  console.log('OrderTrackingPage loaded for order ID:', orderId || 'N/A (using placeholder)');

  const order = placeholderOrder; // Use placeholder data

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu appName="FoodieApp" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Alert className="mb-8 bg-green-50 border-green-200 text-green-700">
          <ShoppingBag className="h-5 w-5" />
          <AlertTitle className="font-semibold">Order Placed Successfully!</AlertTitle>
          <AlertDescription>
            Your order <span className="font-medium">{order.id}</span> is confirmed. You can track its progress below.
          </AlertDescription>
        </Alert>

        <Card className="w-full max-w-3xl mx-auto shadow-xl">
          <CardHeader className="bg-gray-100 rounded-t-lg">
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-2xl font-bold text-gray-800">Track Your Order</CardTitle>
                    <CardDescription>Order ID: <span className="font-semibold text-orange-600">{order.id}</span></CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert("Refreshing order status...")}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <OrderStatusStepper currentStatus={order.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Estimated Delivery Time:</h3>
                    <p className="text-orange-600 font-bold text-lg">{order.estimatedDelivery}</p>
                </div>
                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && order.status !== 'FAILED' && order.deliveryPartner && (
                     <div>
                        <h3 className="font-semibold text-gray-700 mb-1">Delivery Partner:</h3>
                        <p>{order.deliveryPartner.name} ({order.deliveryPartner.phone})</p>
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Restaurant:</h3>
                    <p>{order.restaurantName}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Order Date:</h3>
                    <p>{order.orderDate}</p>
                </div>
            </div>
            
            <div>
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Order Items:</h3>
                <ul className="space-y-2">
                    {order.items.map(item => (
                        <li key={item.name} className="flex justify-between p-2 bg-white border rounded-md">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-right font-bold text-lg mt-3">Total: ${order.total.toFixed(2)}</p>
            </div>

          </CardContent>
          <CardFooter className="p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="outline" asChild>
                <Link to="/contact-support">
                    <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                </Link>
            </Button>
            <Button variant="default" asChild>
                <Link to={`/receipt/${order.id}`}> {/* Example receipt link */}
                    <FileText className="mr-2 h-4 w-4" /> View Receipt
                </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;