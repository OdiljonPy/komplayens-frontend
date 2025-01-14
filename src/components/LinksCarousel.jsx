import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'lucide-react';

const LinksCarousel = ({ tests }) => {
  return (
    <div className="relative" id="links-section">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
          Foydali havolalar
        </h1>
        <div className="flex gap-4">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50" id="link-prev">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50" id="link-next">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          prevEl: '#link-prev',
          nextEl: '#link-next',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
      >
        {tests.map((test) => (
          <SwiperSlide key={test.id} className='pb-3'>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full" style={{
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
            }}>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium text-gray-900">{test.name}</h3>
                  <div className="text-[#595959] text-sm hover:underline mt-2 w-full flex items-center gap-2 bg-[#F9F9F9] p-2 rounded-lg justify-start">
                    <Link size={16} />
                    <p className="text-[#595959]">parlament.mygov.uz</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LinksCarousel