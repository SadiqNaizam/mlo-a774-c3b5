import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page Components
import DestinationSearchBar from '@/components/DestinationSearchBar';
import PackageCard from '@/components/PackageCard';
import OfferBanner from '@/components/OfferBanner';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

// Placeholder data for featured packages
const featuredPackages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1617128072233-a55d2d5118f6?q=80&w=1932&auto=format&fit=crop',
    title: 'The Royal Charm of Jaipur',
    price: 25000,
    highlights: ['Amber Fort Tour', 'City Palace Visit', 'Local Market Shopping'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop',
    title: 'Kerala Backwaters Escape',
    price: 35000,
    highlights: ['Houseboat Stay', 'Lush Greenery', 'Ayurvedic Spa Session'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1590372705243-69e34a4d65e9?q=80&w=2070&auto=format&fit=crop',
    title: 'Goa Beach Paradise',
    price: 18000,
    highlights: ['Pristine Beaches', 'Vibrant Nightlife', 'Water Sports Activities'],
  },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Incredible India Awaits
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
              Discover the world's most vibrant culture, stunning landscapes, and unforgettable experiences.
            </p>
            <div className="mt-8 w-full">
              <DestinationSearchBar />
            </div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Travel Packages</h2>
              <p className="mt-2 text-lg text-muted-foreground">Handpicked journeys to the heart of India.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.title}
                  imageUrl={pkg.imageUrl}
                  title={pkg.title}
                  price={pkg.price}
                  highlights={pkg.highlights}
                />
              ))}
            </div>
             <div className="text-center mt-12">
                <Button size="lg" asChild>
                    <Link to="/packages">View All Packages</Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Offers Banner Section */}
        <section id="offers" className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <OfferBanner />
            </div>
        </section>
        
        {/* Extra Info Card Section */}
        <section className="pb-16 lg:pb-24">
            <div className="container mx-auto px-4">
                <Card className="text-center p-8 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-semibold">Plan Your Trip, Your Way</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="max-w-2xl mx-auto text-muted-foreground">
                            Not sure where to start? Use our Trip Cost Estimator to build a custom journey that fits your budget and style.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button variant="outline" size="lg" asChild>
                            <Link to="/trip-cost-estimator">Launch Estimator</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;