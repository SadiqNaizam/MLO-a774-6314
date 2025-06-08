import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from "@/components/ui/form"; // Assuming useForm is part of your form setup
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Package, UserCircle, Home as HomeIcon } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City name is too short"),
  zipCode: z.string().min(5, "Zip code must be 5 digits").max(5, "Zip code must be 5 digits"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["creditCard", "paypal", "cod"], { required_error: "Please select a payment method" }),
  saveAddress: z.boolean().optional(),
  promoCode: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" })
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Placeholder order summary
const orderSummaryItems = [
    { name: "Margherita Pizza", quantity: 1, price: 12.99 },
    { name: "Bruschetta", quantity: 2, price: 7.50 },
];
const subtotal = orderSummaryItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const deliveryFee = 5.00;
const taxes = subtotal * 0.08;
const total = subtotal + deliveryFee + taxes;


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '', email: '', phone: '', address: '', city: '', zipCode: '', country: 'USA',
      paymentMethod: undefined, saveAddress: false, promoCode: '', agreeToTerms: false,
    },
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log("Checkout form submitted:", data);
    alert("Order placed successfully! (Placeholder - navigating to order tracking next)");
    // In a real app: process payment, save order, then navigate
    // navigate('/order-tracking/new-order-id');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu appName="FoodieApp" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form Section */}
          <section className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Secure Checkout</CardTitle>
                <CardDescription>Please fill in your details to complete the order.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Contact Information */}
                    <div className="space-y-4 p-4 border rounded-md">
                      <h3 className="text-lg font-semibold flex items-center"><UserCircle className="mr-2 h-5 w-5 text-orange-600" />Contact Information</h3>
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl><Input type="tel" placeholder="123-456-7890" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Delivery Address */}
                     <div className="space-y-4 p-4 border rounded-md">
                      <h3 className="text-lg font-semibold flex items-center"><HomeIcon className="mr-2 h-5 w-5 text-orange-600" />Delivery Address</h3>
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St, Apt 4B" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="zipCode" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl><Input placeholder="12345" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="USA">United States</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                       <FormField control={form.control} name="saveAddress" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                          <FormLabel className="font-normal">Save this address for future orders</FormLabel>
                        </FormItem>
                      )} />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4 p-4 border rounded-md">
                       <h3 className="text-lg font-semibold flex items-center"><CreditCard className="mr-2 h-5 w-5 text-orange-600" />Payment Method</h3>
                       <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                              <FormItem className="flex items-center space-x-2">
                                <FormControl><RadioGroupItem value="creditCard" /></FormControl>
                                <FormLabel className="font-normal">Credit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
                                <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                <FormLabel className="font-normal">PayPal</FormLabel>
                              </FormItem>
                               <FormItem className="flex items-center space-x-2">
                                <FormControl><RadioGroupItem value="cod" /></FormControl>
                                <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      {/* Placeholder for card details if 'creditCard' is selected */}
                      {form.watch("paymentMethod") === "creditCard" && (
                        <div className="space-y-2 pt-2 border-t mt-2">
                            <Input placeholder="Card Number" />
                            <div className="grid grid-cols-2 gap-2">
                                <Input placeholder="MM/YY" />
                                <Input placeholder="CVC" />
                            </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Promo Code Accordion */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="promo-code">
                        <AccordionTrigger className="text-base font-medium">Have a Promo Code?</AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <FormField control={form.control} name="promoCode" render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl><Input placeholder="Enter code" {...field} /></FormControl>
                              <Button type="button" variant="outline">Apply</Button>
                            </FormItem>
                          )} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Agree to <Link to="/terms" className="underline hover:text-orange-600">terms and conditions</Link></FormLabel>
                        </div>
                         <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" size="lg" className="w-full">Place Order</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>

          {/* Order Summary Section */}
          <aside className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24"> {/* Sticky for visibility */}
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center"><Package className="mr-2 h-6 w-6 text-orange-600"/>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderSummaryItems.map(item => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between text-sm"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Delivery Fee:</span> <span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Taxes (8%):</span> <span>${taxes.toFixed(2)}</span></div>
                <hr />
                <div className="flex justify-between text-lg font-bold"><span>Total:</span> <span>${total.toFixed(2)}</span></div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;