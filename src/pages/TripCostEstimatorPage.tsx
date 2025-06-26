import React from 'react';

// Import layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import the main feature component for this page
import TripCostEstimator from '@/components/TripCostEstimator';

/**
 * TripCostEstimatorPage
 * 
 * A dedicated page to host the interactive trip cost estimation tool.
 * It provides the standard application layout (Header and Footer) and
 * features the TripCostEstimator component as its main content.
 */
const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Application Header with navigation */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow w-full flex items-center justify-center container mx-auto px-4 py-8 md:py-16">
        {/* The interactive cost estimator component is the star of this page. */}
        <TripCostEstimator />
      </main>

      {/* Application Footer */}
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;