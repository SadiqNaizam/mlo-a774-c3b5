import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Mountain,
  Menu,
  User,
  Plane,
  Briefcase,
  LogOut,
  Calculator,
  Ticket,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/packages', label: 'Packages' },
    { to: '/trip-cost-estimator', label: 'Estimator' },
    { to: '/#offers', label: 'Offers', isComingSoon: true },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                      {link.isComingSoon && <Badge variant="secondary">Soon</Badge>}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Logo & Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Mountain className="h-6 w-6" />
            <span className="font-bold">Wanderlust India</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {navLinks.map((link) => (
              <NavLink
                to={link.to}
                key={link.to}
                className={navLinkClasses}
              >
                {link.label}
                {link.isComingSoon && <Badge variant="secondary" className="ml-2">Soon</Badge>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Guest User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    guest@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/user-profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/booking">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Plane className="mr-2 h-4 w-4" />
                <span>Flight Tickets</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;