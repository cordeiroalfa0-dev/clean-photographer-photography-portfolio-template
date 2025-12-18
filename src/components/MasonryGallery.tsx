import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  type?: "image" | "video";
  src: string;
  videoSrc?: string;
  highResSrc?: string;
  alt: string;
  span?: number;
  width?: number;
  height?: number;
}

interface MasonryGalleryProps {
  images: GalleryItem[];
  onImageClick: (index: number) => void;
}

const MasonryGallery = ({ images, onImageClick }: MasonryGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageHover = (index: number) => {
    setHoveredIndex(index);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-8 pb-20">
      <div className="text-center">
        {images.map((image, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: (index % 5) * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
            onClick={() => onImageClick(index)}
            onMouseEnter={() => handleImageHover(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative cursor-zoom-in inline-block align-top p-1 md:p-1.5 lg:p-2 group"
            style={{ height: "300px" }}
          >
            <div className="relative h-full overflow-hidden">
              {image.type === "video" ? (
                <div className="relative h-full w-auto inline-block">
                  {image.width && image.height && (
                    <svg
                      width={image.width}
                      height={image.height}
                      viewBox={`0 0 ${image.width} ${image.height}`}
                      className="h-full w-auto"
                    >
                      <rect width={image.width} height={image.height} className="fill-muted" />
                    </svg>
                  )}
                  <video
                    poster={image.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => handleImageLoad(index)}
                    className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-700 ease-smooth ${
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "grayscale opacity-40"
                        : "grayscale-0 opacity-100"
                    } group-hover:scale-[1.03]`}
                    style={{
                      opacity: loadedImages.has(index) ? (hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1) : 0,
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <source src={image.videoSrc} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <picture className={`inline-block h-full w-auto ${loadedImages.has(index) ? "show" : ""}`}>
                  {image.width && image.height && (
                    <svg
                      width={image.width}
                      height={image.height}
                      viewBox={`0 0 ${image.width} ${image.height}`}
                      className="h-full w-auto"
                    >
                      <rect width={image.width} height={image.height} className="fill-muted" />
                    </svg>
                  )}
                  <img
                    src={image.src}
                    alt={image.alt}
                    onLoad={() => handleImageLoad(index)}
                    className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-700 ease-smooth ${
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "grayscale opacity-40"
                        : "grayscale-0 opacity-100"
                    } group-hover:scale-[1.03]`}
                    style={{
                      opacity: loadedImages.has(index) ? (hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1) : 0,
                      transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    loading="lazy"
                  />
                </picture>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MasonryGallery;