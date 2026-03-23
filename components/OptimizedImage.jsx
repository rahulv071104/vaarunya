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
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for image
 * @param {number} [props.width] - Image width (not needed with fill)
 * @param {number} [props.height] - Image height (not needed with fill)
 * @param {boolean} [props.fill] - Use fill layout (fills parent container)
 * @param {boolean} [props.priority=false] - Priority loading
 * @param {string} [props.className=''] - CSS class name
 * @param {string} [props.objectFit='cover'] - CSS object-fit
 * @param {string} [props.objectPosition='center'] - CSS object-position
 * @param {number} [props.quality=80] - Image quality
 * @param {string} [props.sizes] - Responsive sizes string
 * @param {Function} [props.onLoadingComplete] - Callback when image loads
 * @param {string} [props.blurDataURL] - Blur placeholder data URL
 * @param {boolean} [props.showLoader=false] - Show loading animation
 * @param {string} [props.fallbackSrc] - Fallback image URL
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  quality = 80,
  sizes = undefined,
  onLoadingComplete = undefined,
  blurDataURL = undefined,
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

  // For fill mode, don't use wrapper with aspectRatio - parent handles sizing
  if (fill) {
    return (
      <>
        {/* Loading Skeleton */}
        {showLoader && isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse z-10" />
        )}

        {/* Image with fill */}
        <Image
          src={currentSrc}
          alt={alt}
          fill={true}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={`object-${objectFit === 'cover' ? 'cover' : 'contain'} ${
            isLoading ? 'blur-sm' : 'blur-0'
          } transition-all duration-300 ${className}`}
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
      </>
    );
  }

  // For fixed dimensions mode
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