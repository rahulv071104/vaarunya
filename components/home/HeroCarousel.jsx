'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/AppIcon';
import slide2 from '@/carousel_images/Agro_commodities_img.jpeg';
import slide1 from '@/carousel_images/cargo_img.jpeg';
import slide5 from '@/carousel_images/coffee_img.jpeg';
import slide4 from '@/carousel_images/spices_img.jpeg';
import slide3 from '@/carousel_images/fruits_and_veg _mg.jpeg';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: 'Global Export Excellence',
      subtitle: 'Connecting businesses worldwide with premium quality products',
      backgroundImage: slide1,
      primaryCTA: { text: 'Get Quote', link: '/get-quote-intelligent-conversion-portal' },
      secondaryCTA: { text: 'Explore Products', link: '/categories' },
      features: ['Global Network', 'Quality Assured', 'Transparent Process'],
    },
    {
      id: 2,
      title: 'Premium Quality Products',
      subtitle:
        'From aromatic spices to finest textiles, discover our curated collection of export-quality products with international certifications.',
      backgroundImage: slide2,
      primaryCTA: { text: 'Explore Products', link: '/categories' },
      secondaryCTA: { text: 'View Certifications', link: '/about#certifications-gallery' },
      features: ['ISO Certified', 'FSSAI Approved', 'Export Licensed'],
    },
    {
      id: 3,
      title: 'Transparent Trade Process',
      subtitle:
        'Experience complete transparency from order to delivery with our step-by-step process visualization and real-time tracking.',
      backgroundImage: slide3,
      primaryCTA: { text: 'See Process', link: '/process-transparency-center' },
      secondaryCTA: { text: 'Order Flow', link: '#order-processing-steps' },
      features: ['Real-time Tracking', 'Documentation Support', 'Compliance Guidance'],
    },
    {
      id: 4,
      title: 'Competitive & Transparent Pricing',
      subtitle:
        'Experience complete transparency from order to delivery with our step-by-step process visualization and real-time tracking.',
      backgroundImage: slide4,
      primaryCTA: { text: 'See Process', link: '/process-transparency-center' },
      secondaryCTA: { text: 'Get Quote', link: '/contact#contact-form' },
      features: ['Real-time Tracking', 'Documentation Support', 'Compliance Guidance'],
    },
    {
      id: 5,
      title: 'Innovation in Export',
      subtitle:
        'Our company is built on trust, transparency, and timely delivery. We keep you informed at every stage with a clear process and real-time tracking.',
      backgroundImage: slide5,
      primaryCTA: { text: 'See Process', link: '/process-transparency-center' },
      secondaryCTA: { text: 'About Us', link: '/about' },
      features: ['Real-time Tracking', 'Documentation Support', 'Compliance Guidance'],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTranslateX(0);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setTranslateX(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTranslateX(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTranslateX(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const touchCurrentX = e.targetTouches[0].clientX;
    const deltaX = touchCurrentX - touchStartX;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;

    const minSwipeDistance = 50;
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const swipePercentage = Math.abs(translateX) / containerWidth;

    if (swipePercentage > 0.2 || Math.abs(translateX) > minSwipeDistance) {
      if (translateX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      setTranslateX(0);
    }

    setTouchStartX(null);
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlide;
          const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
          const isNext = index === (currentSlide + 1) % slides.length;

          let slidePosition = 0;
          if (isCurrent) {
            slidePosition = translateX;
          } else if (isPrev) {
            slidePosition = -100 + translateX / 5; // Reduced drag offset for tighter transitions
          } else if (isNext) {
            slidePosition = 100 + translateX / 5; // Reduced drag offset for tighter transitions
          } else {
            slidePosition = index < currentSlide ? -100 : 100;
          }

          return (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${slidePosition}%)`,
                zIndex: isCurrent ? 10 : isPrev || isNext ? 5 : 0,
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.backgroundImage}
                  alt={slide.title}
                  width={2070}
                  height={1080}
                  className="w-full h-full object-cover"
                  priority // Preload all images
                  quality={90} // Optimize image quality
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                  <div className="max-w-3xl mx-auto">
                    <div className="animation-fade-in">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed mx-auto">
                        {slide.subtitle}
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {/* <Link
                        href={slide.primaryCTA.link}
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-montserrat font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300"
                      >
                        {slide.primaryCTA.text}
                      </Link> */}
                        <Link
                          href={slide.secondaryCTA.link}
                          className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-montserrat font-semibold rounded-lg hover:bg-white hover:text-secondary transition-all duration-300"
                        >
                          <Icon name="Play" size={20} className="mr-2" />
                          {slide.secondaryCTA.text}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;