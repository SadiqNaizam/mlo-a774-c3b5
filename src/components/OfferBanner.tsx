import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferBannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Discover Incredible India, On a Budget!",
  description = "Limited-time offers on our most popular packages. Save up to 25% and create memories that last a lifetime.",
  ctaText = "View All Deals",
  ctaLink = "/packages",
  className,
}) => {
  console.log('OfferBanner loaded');

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-xl p-8 md:p-12 bg-slate-900 text-white transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-cyan-500/20",
        className
      )}
    >
      {/* Background decorative pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80"><path fill="%2394a3b8" fill-opacity="0.2" d="M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v5.13a4 4 0 1 1-2 0V16zM66 64H71v2h-5v5.13a4 4 0 1 1-2 0V66h-5v-2h5v-5.13a4 4 0 1 1 2 0V64z"></path></svg>\')'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              {title}
            </h2>
          </div>
          <p className="mt-4 text-lg text-slate-300">
            {description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold group-hover:scale-105 transition-transform" asChild>
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;