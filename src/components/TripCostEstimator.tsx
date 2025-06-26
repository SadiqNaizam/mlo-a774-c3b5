import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useSpring, useTransform } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Flight, Hotel, Car, Users, CalendarDays, IndianRupee, ArrowRight } from 'lucide-react';

// A small helper component for the animated counter
const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString('en-IN')
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

const TripCostEstimator: React.FC = () => {
  console.log('TripCostEstimator loaded');
  const navigate = useNavigate();

  // State for user selections
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeHotel, setIncludeHotel] = useState(true);
  const [includeTransport, setIncludeTransport] = useState(false);
  
  const [numTravelers, setNumTravelers] = useState([2]);
  const [tripDuration, setTripDuration] = useState([5]);
  const [hotelStars, setHotelStars] = useState('4');

  const [totalCost, setTotalCost] = useState(0);

  // Memoized calculation logic
  const calculateCost = useCallback(() => {
    const travelers = numTravelers[0];
    const duration = tripDuration[0];
    let cost = 0;

    // Base cost (placeholder)
    const baseDailyCost = 1500; // A base cost per person per day

    // Hotel Cost
    let hotelCostPerNight = 0;
    if (includeHotel) {
      switch (hotelStars) {
        case '3': hotelCostPerNight = 2500; break;
        case '4': hotelCostPerNight = 4500; break;
        case '5': hotelCostPerNight = 8000; break;
        default: hotelCostPerNight = 4500;
      }
    }
    
    // Flight Cost
    const flightCostPerPerson = includeFlights ? 12000 : 0;
    
    // Local Transport Cost
    const transportCostPerDay = includeTransport ? 2000 : 0;

    // Total Calculation
    const accommodationCost = hotelCostPerNight * duration * Math.ceil(travelers / 2); // Assuming 2 per room
    const flightTotal = flightCostPerPerson * travelers;
    const transportTotal = transportCostPerDay * duration;
    const baseTotal = baseDailyCost * travelers * duration;

    cost = baseTotal + accommodationCost + flightTotal + transportTotal;

    setTotalCost(cost);
  }, [includeFlights, includeHotel, includeTransport, numTravelers, tripDuration, hotelStars]);

  // Recalculate cost whenever a dependency changes
  useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  const handleFindPackages = () => {
    // In a real app, you might pass the budget and other params in the URL
    // e.g., navigate(`/packages?max-budget=${totalCost}&travelers=${numTravelers[0]}`);
    navigate('/packages');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Trip Cost Estimator</CardTitle>
        <CardDescription>Customize your trip to get a real-time cost estimate.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2">Your Preferences</h3>
            {/* Services Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <Label htmlFor="flights-switch" className="flex items-center gap-2 font-medium">
                  <Flight className="h-5 w-5 text-blue-500" />
                  Include Flights
                </Label>
                <Switch id="flights-switch" checked={includeFlights} onCheckedChange={setIncludeFlights} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <Label htmlFor="hotel-switch" className="flex items-center gap-2 font-medium">
                  <Hotel className="h-5 w-5 text-purple-500" />
                  Include Hotel
                </Label>
                <Switch id="hotel-switch" checked={includeHotel} onCheckedChange={setIncludeHotel} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <Label htmlFor="transport-switch" className="flex items-center gap-2 font-medium">
                  <Car className="h-5 w-5 text-green-500" />
                  Include Local Transport
                </Label>
                <Switch id="transport-switch" checked={includeTransport} onCheckedChange={setIncludeTransport} />
              </div>
            </div>

            <Separator />

            {/* Sliders and Select */}
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="travelers-slider" className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Users className="h-5 w-5" /> Number of Travelers</span>
                  <span className="font-bold text-lg">{numTravelers[0]}</span>
                </Label>
                <Slider id="travelers-slider" min={1} max={10} step={1} value={numTravelers} onValueChange={setNumTravelers} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration-slider" className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Trip Duration (Days)</span>
                   <span className="font-bold text-lg">{tripDuration[0]}</span>
                </Label>
                <Slider id="duration-slider" min={1} max={30} step={1} value={tripDuration} onValueChange={setTripDuration} />
              </div>
              {includeHotel && (
                <div className="grid gap-2">
                  <Label htmlFor="hotel-stars">Hotel Star Rating</Label>
                  <Select value={hotelStars} onValueChange={setHotelStars}>
                    <SelectTrigger id="hotel-stars" className="w-full">
                      <SelectValue placeholder="Select hotel rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">★★★ (3-Star)</SelectItem>
                      <SelectItem value="4">★★★★ (4-Star)</SelectItem>
                      <SelectItem value="5">★★★★★ (5-Star)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Cost Summary */}
          <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-lg p-8 border-2 border-dashed">
            <h3 className="text-xl font-semibold text-gray-700">Total Estimated Cost</h3>
            <div className="flex items-baseline my-4">
              <IndianRupee className="h-10 w-10 text-blue-600" />
              <p className="text-6xl font-extrabold text-blue-600 tracking-tighter">
                <AnimatedCounter value={totalCost} />
              </p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              This is an estimate. Prices may vary based on availability and demand.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-gray-50 border-t">
        <Button size="lg" className="w-full text-lg" onClick={handleFindPackages}>
          Find Packages for this Budget
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCostEstimator;