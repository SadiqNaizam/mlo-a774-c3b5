import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow, TableCaption } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// Icons
import { User, Camera } from 'lucide-react';

// Placeholder Data
const bookings = [
  { id: '1', packageName: 'Golden Triangle Adventure', bookingDate: '2023-10-15', travelDates: '2023-11-20 to 2023-11-27', status: 'Completed', price: '₹45,000' },
  { id: '2', packageName: 'Kerala Backwaters Escape', bookingDate: '2024-01-20', travelDates: '2024-03-10 to 2024-03-17', status: 'Completed', price: '₹60,000' },
  { id: '3', packageName: 'Himalayan Trekking Tour', bookingDate: '2024-05-10', travelDates: '2024-09-05 to 2024-09-15', status: 'Upcoming', price: '₹85,000' },
  { id: '4', packageName: 'Rajasthan Royal Forts', bookingDate: '2023-08-01', travelDates: '2023-09-01 to 2023-09-08', status: 'Cancelled', price: '₹55,000' },
];

const wishlistItems = [
  { id: 'w1', name: 'Goa Beach Paradise', description: 'Relax on the sunny beaches of Goa.', imageUrl: 'https://images.unsplash.com/photo-1590372793188-782d8b598129?q=80&w=800' },
  { id: 'w2', name: 'Leh-Ladakh Bike Trip', description: 'An adventurous journey through mountain passes.', imageUrl: 'https://images.unsplash.com/photo-1616864354228-567ac3a4b6b2?q=80&w=800' },
  { id: 'w3', name: 'Gardens of Kashmir', description: 'Explore the serene and beautiful gardens.', imageUrl: 'https://images.unsplash.com/photo-1595861110361-5586940f5d76?q=80&w=800' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-muted/20">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">My Profile</h1>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="settings">Profile Settings</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>A record of all your past and upcoming trips.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of your recent bookings.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Package</TableHead>
                        <TableHead>Travel Dates</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.packageName}</TableCell>
                          <TableCell>{booking.travelDates}</TableCell>
                          <TableCell>
                            <Badge variant={
                              booking.status === 'Completed' ? 'default' :
                              booking.status === 'Upcoming' ? 'secondary' : 'destructive'
                            }>{booking.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{booking.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>Manage your account details and password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/avatars/01.png" alt="@user" />
                                <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                            </Avatar>
                            <Button variant="outline"><Camera className="mr-2 h-4 w-4" /> Change Photo</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue="Wanderlust User" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="user@wanderlust.com" disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>A collection of your dream destinations and packages.</CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover" />
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Link to="/packages" className="w-full">
                                <Button className="w-full">View Package</Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Your wishlist is empty.</p>
                      <Link to="/packages">
                        <Button variant="link" className="mt-2">Explore Packages</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;