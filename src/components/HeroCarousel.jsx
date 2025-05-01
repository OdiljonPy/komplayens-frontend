import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { sendRequest } from '../utils/apiFunctions'; // Update this path as needed

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: 'banner/'
      });

      if (response.success && response.data.ok) {
        setSlides(response.data.result);
      }
    };

    fetchBanners();
  }, []);

  const LoadingSkeleton = () => (
    <div className="relative w-full h-full bg-[#F3F3F3] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F3F3F3] to-transparent">
        <div className="p-8 md:p-12 max-w-xl h-full flex flex-col justify-center gap-4">
          <div className="h-8 md:h-12 bg-gray-700 rounded-lg w-3/4"></div>
          <div className="h-4 md:h-6 bg-gray-700 rounded-lg w-full"></div>
          <div className="h-4 md:h-6 bg-gray-700 rounded-lg w-2/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto ">
      <div className="relative h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl sm:rounded-3xl mt-[50px] md:mt-0">
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
                  <div className="absolute top-6 right-20 left-auto flex gap-1 z-10" style={{
                    borderRadius: "20px"
                  }}>
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className="h-0.5 w-16 rounded-full overflow-hidden bg-white/30"
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
                    <div className="p-8 md:p-12 max-w-xl h-full flex flex-col justify-center">
                      <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-sm md:text-lg text-white/80">
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
        <div className="absolute bottom-8 right-8 flex gap-2 z-10">
          <button
            onClick={() => swiper?.slidePrev()}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;