import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSkeleton from '../LoadingSkeleton';

const HeroCarousel = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch slides data
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/slides');
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden rounded-2xl sm:rounded-3xl mt-8 sm:mt-12 md:mt-0">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.length === 0 ? (
            <SwiperSlide>
              <LoadingSkeleton />
            </SwiperSlide>
          ) : (
            slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="relative w-full h-full bg-gray-900/50"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Progress bars */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-20 left-auto flex gap-1 z-10">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className="h-0.5 w-8 sm:w-12 md:w-16 rounded-full overflow-hidden bg-white/30"
                      >
                        <div
                          className="h-full bg-white transition-all duration-500"
                          style={{
                            width: i === activeIndex ? '100%' : '0%',
                            transitionDuration: i === activeIndex ? '5000ms' : '0ms'
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
                    <div className="p-4 sm:p-8 md:p-12 max-w-xl h-full flex flex-col justify-center">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xs sm:text-sm md:text-base text-white/80 line-clamp-2 sm:line-clamp-3">
                        {slide.short_description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>

        {/* Navigation buttons */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex gap-2 z-10">
          <button
            onClick={() => swiper?.slidePrev()}
            className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 sm:p-2 backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 sm:p-2 backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel; 