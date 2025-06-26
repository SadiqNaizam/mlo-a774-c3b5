import React, { useState } from 'react';

// Custom Layout & Component Imports
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/PackageCard';

// shadcn/ui Component Imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Placeholder data for travel packages
const travelPackages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    title: 'Golden Triangle Odyssey',
    price: 45000,
    highlights: ['Taj Mahal Visit', 'Jaipur Forts', 'Delhi Sightseeing'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1593693397642-888942b80a1a?q=80&w=1974&auto=format&fit=crop',
    title: 'Kerala Backwater Bliss',
    price: 35000,
    highlights: ['Houseboat Stay', 'Munnar Tea Gardens', 'Spice Plantation Tour'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1603289449433-6a5d6a693a7d?q=80&w=2070&auto=format&fit=crop',
    title: 'Himalayan Adventure - Leh & Ladakh',
    price: 60000,
    highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La Pass'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1599661046223-e06588536342?q=80&w=2070&auto=format&fit=crop',
    title: 'Spiritual Varanasi & Ganges',
    price: 28000,
    highlights: ['Ganges Boat Ride', 'Evening Aarti Ceremony', 'Sarnath Visit'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
    title: 'Goan Beaches & Portuguese Culture',
    price: 32000,
    highlights: ['Beach Hopping', 'Old Goa Churches', 'Dudhsagar Falls'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?q=80&w=1935&auto=format&fit=crop',
    title: 'Royal Rajasthan Desert Safari',
    price: 55000,
    highlights: ['Jaisalmer Camel Safari', 'Jodhpur Mehrangarh Fort', 'Udaipur Lake Palace'],
  },
];


const PackagesPage = () => {
  console.log('PackagesPage loaded');
  const [priceRange, setPriceRange] = useState([50000]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">Explore Our Packages</h1>
            <p className="mt-4 text-lg text-muted-foreground">Find your perfect Indian adventure from our curated selection of tours.</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4">
              <Card className="sticky top-24 shadow-sm">
                <CardHeader>
                  <CardTitle>Filter & Sort</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Sort By */}
                  <div>
                    <Label htmlFor="sort-by" className="font-semibold">Sort by</Label>
                    <Select>
                      <SelectTrigger id="sort-by" className="w-full mt-2">
                        <SelectValue placeholder="Recommended" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />

                  {/* Price Range */}
                  <div>
                    <Label htmlFor="price-range" className="font-semibold">Max Price</Label>
                    <Slider
                      id="price-range"
                      max={100000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-3"
                    />
                    <div className="text-sm text-muted-foreground mt-2">
                      Up to: ₹{priceRange[0].toLocaleString('en-IN')}
                    </div>
                  </div>

                  <Separator />

                  {/* Themes */}
                  <div>
                    <h4 className="font-semibold mb-3">Themes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="adventure" />
                        <label htmlFor="adventure" className="text-sm font-medium leading-none">Adventure</label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="cultural" />
                        <label htmlFor="cultural" className="text-sm font-medium leading-none">Cultural</label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="relaxation" />
                        <label htmlFor="relaxation" className="text-sm font-medium leading-none">Relaxation</label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="spiritual" />
                        <label htmlFor="spiritual" className="text-sm font-medium leading-none">Spiritual</label>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </aside>

            {/* Packages Grid */}
            <div className="lg:w-3/4">
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {travelPackages.map((pkg, index) => (
                  <PackageCard
                    key={index}
                    imageUrl={pkg.imageUrl}
                    title={pkg.title}
                    price={pkg.price}
                    highlights={pkg.highlights}
                  />
                ))}
              </section>

              {/* Pagination */}
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;