'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * OptimizedImage Component
 * Features:
 * - Built-in lazy loading
 * - Blur placeholder while loading
 * - Proper caching headers
 * - Responsive sizing
 * - Error handling with fallback
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  quality = 80,
  sizes,
  onLoadingComplete,
  blurDataURL,
  showLoader = false,
  fallbackSrc = '/assets/images/no_image.png',
  ...props
}) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoadingComplete = (result) => {
    setIsLoading(false);
    onLoadingComplete?.(result);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
    setCurrentSrc(fallbackSrc);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width / height }}>
      {/* Loading Skeleton */}
      {showLoader && isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Image */}
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={`w-full h-full object-${objectFit === 'cover' ? 'cover' : 'contain'} ${
          isLoading ? 'blur-sm' : 'blur-0'
        } transition-all duration-300`}
        style={{
          objectPosition,
          ...props.style,
        }}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />
    </div>
  );
}