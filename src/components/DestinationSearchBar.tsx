import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { MapPin, Calendar as CalendarIcon, Search } from 'lucide-react';

// Mock list of destinations for autocomplete
const destinations = [
  "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", "Kerala Backwaters",
  "Udaipur", "Rishikesh", "Shimla", "Ladakh", "Varanasi", "Agra", "Kolkata"
];

const DestinationSearchBar: React.FC = () => {
  console.log('DestinationSearchBar loaded');

  const [destination, setDestination] = useState('');
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const navigate = useNavigate();

  const filteredDestinations = useMemo(() => {
    const lowercasedInput = destination.toLowerCase();
    return destinations.filter(d => d.toLowerCase().includes(lowercasedInput));
  }, [destination]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) {
      params.append('destination', destination);
    }
    if (date?.from) {
      params.append('from', format(date.from, 'yyyy-MM-dd'));
    }
    if (date?.to) {
      params.append('to', format(date.to, 'yyyy-MM-dd'));
    }
    console.log(`Searching with params: ${params.toString()}`);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_auto] gap-4 items-center">
        {/* Destination Input with Autocomplete */}
        <div className="relative">
          <Popover open={openAutocomplete} onOpenChange={setOpenAutocomplete}>
            <div className="flex items-center w-full">
              <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
              <PopoverTrigger asChild>
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (!openAutocomplete) setOpenAutocomplete(true);
                  }}
                  className="pl-10 h-12 text-base w-full"
                  aria-label="Destination"
                />
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search destinations..." />
                <CommandList>
                  <CommandEmpty>No destinations found.</CommandEmpty>
                  <CommandGroup>
                    {filteredDestinations.map((dest) => (
                      <CommandItem
                        key={dest}
                        value={dest}
                        onSelect={(currentValue) => {
                          setDestination(currentValue === destination ? "" : currentValue);
                          setOpenAutocomplete(false);
                        }}
                      >
                        {dest}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal h-12 text-base",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          size="lg"
          className="w-full lg:w-auto h-12 text-base"
          onClick={handleSearch}
          aria-label="Search for packages"
        >
          <Search className="mr-0 lg:mr-2 h-5 w-5" />
          <span className="hidden lg:inline">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default DestinationSearchBar;