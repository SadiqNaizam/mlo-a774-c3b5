import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Twitter, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Mountain className="h-6 w-6" />
              <span className="text-lg font-semibold">Wanderlust India</span>
            </Link>
            <p className="text-sm">
              Your gateway to exploring the incredible diversity of India.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email for newsletter" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/packages" className="hover:text-primary">Packages</Link>
              <Link to="/trip-cost-estimator" className="hover:text-primary">Trip Estimator</Link>
              <Link to="/#offers" className="hover:text-primary">Special Offers</Link>
              <Link to="/booking" className="hover:text-primary">My Bookings</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Support</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/#about" className="hover:text-primary">About Us</Link>
              <Link to="/#contact" className="hover:text-primary">Contact</Link>
              <Link to="/#faq" className="hover:text-primary">FAQ</Link>
              <Link to="/#careers" className="hover:text-primary">Careers</Link>
            </nav>
          </div>
          
          {/* Legal */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/#terms" className="hover:text-primary">Terms of Service</Link>
              <Link to="/#privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/#cancellation" className="hover:text-primary">Cancellation Policy</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-muted pt-8 sm:flex-row">
          <p className="text-sm">
            &copy; {currentYear} Wanderlust India. All Rights Reserved.
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link to="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            <Link to="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link to="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;