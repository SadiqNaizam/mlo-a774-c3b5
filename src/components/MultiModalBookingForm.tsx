import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { User, Hotel, Plane, CarFront, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bookingFormSchema = z.object({
  // Personal Details
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().optional(),

  // Travel Preferences
  needsHotel: z.boolean().default(false).optional(),
  hotelStars: z.string().optional(),
  needsFlight: z.boolean().default(false).optional(),
  flightClass: z.enum(["economy", "business", "first"]).optional(),
  needsCab: z.boolean().default(false).optional(),
  cabType: z.enum(["sedan", "suv", "hatchback"]).optional(),

  // Payment Information
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid format. Use MM/YY." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const MultiModalBookingForm: React.FC = () => {
  console.log("MultiModalBookingForm loaded");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      needsHotel: false,
      needsFlight: false,
      needsCab: false,
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Form Submitted:", data);
    toast.success("Booking Confirmed!", {
      description: "Your travel arrangements have been successfully booked. Check your email for details.",
      duration: 5000,
    });
    form.reset();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>Fill in the details below to finalize your trip.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal"><User className="w-4 h-4 mr-2" />Personal Details</TabsTrigger>
                <TabsTrigger value="travel"><Plane className="w-4 h-4 mr-2" />Travel Options</TabsTrigger>
                <TabsTrigger value="payment"><CreditCard className="w-4 h-4 mr-2" />Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="pt-6">
                <div className="space-y-4">
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" placeholder="+91 12345 67890" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                   <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl><Textarea placeholder="123, Wanderlust Street, New Delhi" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>
              </TabsContent>

              <TabsContent value="travel" className="pt-6">
                 <div className="space-y-6">
                    <FormField control={form.control} name="needsHotel" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base flex items-center"><Hotel className="w-4 h-4 mr-2"/>Add Hotel</FormLabel>
                                <FormDescription>Include hotel booking in your package.</FormDescription>
                            </div>
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="needsFlight" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base flex items-center"><Plane className="w-4 h-4 mr-2"/>Add Flight</FormLabel>
                                <FormDescription>Include flight tickets in your package.</FormDescription>
                            </div>
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="needsCab" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base flex items-center"><CarFront className="w-4 h-4 mr-2"/>Add Cab Service</FormLabel>
                                <FormDescription>Include local transport in your package.</FormDescription>
                            </div>
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                 </div>
              </TabsContent>

              <TabsContent value="payment" className="pt-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="cardholderName" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="cvv" render={({ field }) => (
                            <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl><Input type="password" placeholder="•••" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </div>
              </TabsContent>
            </Tabs>
            <CardFooter className="p-0 pt-6">
                <Button type="submit" className="w-full" size="lg">
                    Confirm and Pay
                </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MultiModalBookingForm;