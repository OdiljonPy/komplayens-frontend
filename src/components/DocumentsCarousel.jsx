import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Download } from 'lucide-react';
import { sendRequest } from '../utils/apiFunctions';
import pdfImg from "../assets/icons/pdf.png"


const DocumentsCarousel = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/services/corruption/media/'
        });
        if (response.success) {
          setDocuments(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#024072]"></div>
      </div>
    );
  }

  return (
    <div className="relative" id="links-section">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
          Ma'lumotnomalar
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
        {documents.map((doc) => (
          <SwiperSlide key={doc.id}>
            <div className="bg-[#F5F5F5] rounded-xl p-6 border border-[#DFDFDF] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 flex-row">
                  <img src={pdfImg} alt="pdf" className="w-5 h-5" />
                  <p className="text-[#595959] text-sm mb-1">{doc.filename}</p>

                </div>
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C8C8C] hover:text-blue-600"
                >
                  <Download className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DocumentsCarousel;