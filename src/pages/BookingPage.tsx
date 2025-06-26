import React from 'react';

// Import custom layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import the primary component for this page
import MultiModalBookingForm from '@/components/MultiModalBookingForm';

const BookingPage = () => {
  console.log('BookingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">Finalize Your Dream Trip</h1>
        <p className="text-md text-muted-foreground text-center mb-8">
          You're just one step away from your next adventure in India.
        </p>
        <MultiModalBookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;