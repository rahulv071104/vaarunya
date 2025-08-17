"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import logo from '@/Vaarunya_cropped_bg.png';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'About', path: '/about', icon: 'Users' },
    { name: 'Products', path: '/categories', icon: 'Package' },
    { name: 'Contact', path: '/contact', icon: 'Mail' },
  ];

  useEffect(() => {
    setIsClient(true); // Mark as client-side after mounting
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClient && pathname === '/' && !isScrolled 
          ? 'bg-transparent' 
          : 'bg-white/95 shadow-card md:backdrop-blur-md' // Apply backdrop-blur-md only for md and above
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="flex-shrink-0 ml-[-10px]">
              <Image
                width={64}
                height={64}
                src={logo}
                alt="Vaarunya Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-montserrat font-bold text-secondary-dark group-hover:text-primary transition-colors duration-300">
                {/* Vaarunya */}
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-4 py-2 rounded-lg font-montserrat font-medium transition-all duration-300 group ${
                  isClient && pathname === '/' && !isScrolled
                    ? isActivePath(item.path)
                      ? 'text-white'
                      : 'text-white hover:text-primary'
                    : isActivePath(item.path)
                      ? 'text-primary bg-accent'
                      : 'text-secondary hover:text-primary hover:bg-accent/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </span>
                {isActivePath(item.path) && (isScrolled || pathname !== '/') && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact#contact-form"
              className={`hidden sm:inline-flex items-center px-6 py-2.5 font-montserrat font-semibold rounded-lg transition-all duration-300 ${
                isClient && pathname === '/' && !isScrolled
                  ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5'
              }`}
            >
              <Icon name="MessageSquare" size={18} className="mr-2" />
              Get Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isClient && pathname === '/' && !isScrolled
                  ? 'text-white hover:text-primary hover:bg-accent'
                  : 'text-secondary hover:text-primary hover:bg-accent'
              }`}
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

      
      </div>
      {/* Mobile Navigation */}
<div 
  className={`lg:hidden transition-all duration-300 ease-in-out ${
    isMenuOpen 
      ? 'max-h-96 opacity-100 pb-6' 
      : 'max-h-0 opacity-0 overflow-hidden'
  } bg-white relative z-50 pointer-events-auto`}
>
  <nav className="flex flex-col space-y-2 pt-4 border-t border-border-light">
    {navigationItems.map((item) => (
      <Link
        key={item.name}
        href={item.path}
        onClick={closeMenu}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-montserrat font-medium transition-all duration-300 ${
          isClient && pathname === '/' && !isScrolled
            ? isActivePath(item.path)
              ? 'text-black'
              : 'text-secondary hover:text-primary hover:bg-accent/50'
            : isActivePath(item.path)
              ? 'text-primary bg-accent border-l-4 border-primary'
              : 'text-secondary hover:text-primary hover:bg-accent/50'
        }`}
      >
        <Icon name={item.icon} size={20} />
        <span>{item.name}</span>
      </Link>
    ))}
    
    {/* Mobile CTA */}
    <Link
      href="/get-quote-intelligent-conversion-portal"
      onClick={closeMenu}
      className="flex items-center  space-x-2 px-4 py-3 text-primary font-montserrat font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300"
    >
      <Icon name="MessageSquare" size={20} />
      <span>Get Quote</span>
    </Link>
  </nav>
</div>

{/* Mobile Menu Overlay */}
{isMenuOpen && (
  <div 
    className="lg:hidden fixed inset-0 bg-black/40 z-30" 
    onClick={closeMenu}
  ></div>
)}


      {/* Mobile Menu Overlay */}
    
    </header>
  );
};

export default Header;