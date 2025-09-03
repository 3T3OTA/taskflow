import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import { Star, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { testimonialsData as testimonials } from "@/data";

const SwipeIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 1 }}
      className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20 md:hidden"
    >
      <div className="bg-default-100/70 backdrop-blur-md shadow-md px-3 py-1.5 rounded-full flex items-center gap-2">
        <div className="w-5 h-2 bg-primary rounded-full animate-pulse"></div>
        <p className="text-xs text-default-600">Swipe to see more</p>
      </div>
    </motion.div>
  );
};




function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); 
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (!autoPaused) {
      interval = setInterval(() => {
        setDirection(1);
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPaused]);
  const getCardWidth = () => {
    if (!carouselRef.current) return 100 / 3;
    
    const containerWidth = carouselRef.current.clientWidth;
    if (containerWidth < 480) {
      return 100; 
    } else if (containerWidth < 640) {
      return 90; 
    } else if (containerWidth < 768) {
      return 80; 
    } else if (containerWidth < 1024) {
      return 50; 
    } else if (containerWidth < 1280) {
      return 100 / 3; 
    } else {
      return 25; 
    }
  };
  
  const [cardWidth, setCardWidth] = useState(100 / 3);
  useEffect(() => {
    if (carouselRef.current) {
      setCardWidth(getCardWidth());
    }
  }, []);
  useEffect(() => {
    const currentRef = carouselRef.current;
    if (!currentRef) return;
    
    let touchStartY = 0;
    let touchStartX = 0;
    let isHorizontalDrag = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isHorizontalDrag = false;
    };
    
    const handleTouchMovePassive = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = Math.abs(touchCurrentX - touchStartX);
      const diffY = Math.abs(touchCurrentY - touchStartY);
      
      if (!isHorizontalDrag) {
        isHorizontalDrag = diffX > diffY && diffX > 5;
      }
      
      if (isHorizontalDrag && Math.abs(dragOffset) > 5) {
        e.preventDefault();
      }
    };
    
    currentRef.addEventListener('touchstart', handleTouchStart, { passive: true });
    currentRef.addEventListener('touchmove', handleTouchMovePassive, { passive: false });
    
    return () => {
      currentRef.removeEventListener('touchstart', handleTouchStart);
      currentRef.removeEventListener('touchmove', handleTouchMovePassive);
    };
  }, [isDragging, dragOffset]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setAutoPaused(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX); 
    
    setDragOffset(walk);
    
    if (walk > 0) {
      setDirection(-1);
    } else if (walk < 0) {
      setDirection(1);
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setAutoPaused(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    
    setLastMoveTime(Date.now());
  };
  const [lastMoveTime, setLastMoveTime] = useState(0);
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX); 
    const currentTime = Date.now();
    if (currentTime - lastMoveTime > 30) { 
      setLastMoveTime(currentTime);
    }
    
    let adjustedWalk = walk;
    if ((activeIndex === 0 && walk > 0) || 
        (activeIndex === testimonials.length - 1 && walk < 0)) {
      adjustedWalk = walk * 0.4;
    }
    
    setDragOffset(adjustedWalk);
    
    if (walk > 0) {
      setDirection(-1);
    } else if (walk < 0) {
      setDirection(1);
    }
    
  };
  
  const handleTouchEnd = () => {
    handleEnd();
  };
  const handleEnd = () => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);
    
    const containerWidth = carouselRef.current.clientWidth;
    const slideWidth = containerWidth * (cardWidth / 100);
    
    const isMobile = containerWidth < 640;
    const walkThreshold = slideWidth * (isMobile ? 0.1 : 0.2);
    
    let newIndex = activeIndex;
    
    if (Math.abs(dragOffset) > walkThreshold) {
      if (dragOffset > 0) {
        newIndex = activeIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
      } else {
        newIndex = (activeIndex + 1) % testimonials.length;
      }
    }
    
    setActiveIndex(newIndex);
    setDragOffset(0);
    
    setTimeout(() => {
      setAutoPaused(false);
    }, 2000);
  };
  
  const handleMouseUp = () => {
    handleEnd();
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const newCardWidth = getCardWidth();
        setDragOffset(0);
        if (newCardWidth !== cardWidth) {
          setActiveIndex(0); 
        }
      }
    };
    
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    handleResize(); 
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [cardWidth]);
    return (    
    <section className="relative py-12 sm:py-16 overflow-hidden" style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" }}>
      {}
      {}
      {}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-pink-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-6">        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center backdrop-blur-sm py-3 sm:py-4 mb-8 sm:mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-default-900 dark:text-white xl:text-5xl">
            What Our Users Say
          </h2>
          <p className="max-w-md mx-auto mt-3 sm:mt-4 text-sm sm:text-base font-normal text-default-600 dark:text-default-400">
            Hear from our satisfied users about their experiences with our platform
          </p>
        </motion.div>
        
        <div className="relative">          {}
          <div className="absolute top-1/2 left-1 sm:-left-4 -translate-y-1/2 z-10">
            <button 
              onClick={handlePrev}
              className="p-2 sm:p-3 bg-default-100/80 backdrop-blur-sm hover:bg-default-200/80 rounded-full shadow-md transition-all 
                        touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="text-default-700" size={16} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-1 sm:-right-4 -translate-y-1/2 z-10">
            <button 
              onClick={handleNext}
              className="p-2 sm:p-3 bg-default-100/80 backdrop-blur-sm hover:bg-default-200/80 rounded-full shadow-md transition-all 
                        touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ArrowRight className="text-default-700" size={16} strokeWidth={2.5} />
            </button>
          </div>
            {}
          <div 
            className="relative overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing" 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            ref={carouselRef}
          >            
            <SwipeIndicator />
            <div 
              className={`flex transition-transform duration-500 ease-in-out ${isDragging ? 'transition-none' : ''}`}
              style={{
                width: '100%',
                transform: `translateX(calc(-${activeIndex * cardWidth}% + ${dragOffset}px))`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              {}
              {isDragging && Math.abs(dragOffset) > 20 && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30">
                  {dragOffset > 0 ? (
                    <ArrowLeft size={48} className="text-primary animate-pulse" />
                  ) : (
                    <ArrowRight size={48} className="text-primary animate-pulse" />
                  )}
                </div>
              )}
              {[...testimonials, ...testimonials.slice(0, 3)].map((testimonial, index) => (                
                <motion.div
                  key={index}
                  initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 15,
                    mass: 0.8
                  }}
                  className="px-1.5 sm:px-2 box-border"
                  style={{ minWidth: `${cardWidth}%` }}
                >                  <div className="h-full px-1">
                    <Card className="border-1 border-default-200 dark:border-default-100/20 shadow-md h-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-900">
                      {}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"></div>
                      
                      {}
                      <div className="absolute top-2 right-2 sm:hidden">
                        <div className="bg-default-50/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-0.5 border border-default-200/50">
                          <Star size={10} className="text-warning" fill="currentColor" />
                          <span className="text-[10px] font-semibold">{testimonial.rating}/5</span>
                        </div>
                      </div>
                      
                      <CardHeader className="flex gap-3 sm:gap-4 pb-2 flex-col sm:flex-row">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 shrink-0 shadow-inner">
                          <User size={20} strokeWidth={1.5} className="text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                            <p className="text-sm sm:text-md font-semibold text-default-700">{testimonial.name}</p>
                            {testimonial.rating >= 4 && (
                              <Chip color="success" size="sm" variant="flat" className="text-xs py-0.5">Verified</Chip>
                            )}
                          </div>
                          {}
                          <div className="hidden sm:flex gap-0.5 sm:gap-1 mt-0.5">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-warning" fill="currentColor" />
                            ))}
                            {[...Array(5 - testimonial.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-default-300" />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="pt-1 pb-3 sm:pb-4">
                        <p className="text-default-600 text-xs sm:text-sm md:text-base italic">&ldquo;{testimonial.comment}&rdquo;</p>
                      </CardBody>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
            {}
          <div className="flex justify-center mt-5 sm:mt-8 gap-1.5 sm:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`rounded-full transition-all touch-manipulation ${
                  index === activeIndex 
                    ? "bg-primary w-6 sm:w-8 h-2 sm:h-3" 
                    : "bg-default-300 hover:bg-default-400 w-2 sm:w-3 h-2 sm:h-3"
                }`}
                style={{
                  boxShadow: index === activeIndex ? '0 0 5px rgba(var(--color-primary-500), 0.5)' : 'none'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
