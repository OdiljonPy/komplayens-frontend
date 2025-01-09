import React from 'react';
import { Download } from 'lucide-react';
import banner from "../assets/banners/04.png";
import { Link } from 'react-router-dom';


const CourseItem = () => {
  const pageData = {
    title: "Korrupsiyaga Qarshi Kurash Asoslari",
    description: "Korrupsiya jamiyat rivojlanishiga katta to'sqinlik qiluvchi muammolardan biridir. Bu nafaqat iqtisodiy yo'qotishlarga, balki ijtimoiy adolatsizlik va davlatga bo'lgan ishonchning pasayishiga olib keladi.",
    mainContent: {
      definition: {
        title: "Korrupsiya tushunchasi",
        content: "Korrupsiya - bu shaxsning mansab vakolatlarini suiiste'mol qilishi orqali shaxsiy manfaatlarini ko'zlashidir."
      }
    },
    materials: [
      {
        title: "korrupsiya.pdf",
        size: "1.05 MB",
        type: "pdf"
      },
      {
        title: "korrupsiya.pptx",
        size: "1.51 MB",
        type: "pptx"
      }
    ],
    videoMaterials: [
      {
        title: "Korrupsiyaga Qarshi Kurashda Legal Demo",
        thumbnail: banner,
      },
      {
        title: "Korrupsiyaga Qarshi Kurashda Yang Demo",
        thumbnail: banner,
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="py-2 text-sm text-gray-600">
        <span>Bosh sahifa</span>
        <span className="mx-2">›</span>
        <Link to="/educational-materials" className="text-[#024072]">O'quv-uslubiy materiallar</Link>
        <span className="mx-2">›</span>
        <span className="text-[#024072]">Korrupsiyaga qarshi kurash asoslari</span>
      </div>

      <div className="py-6">
        {/* Video section with reduced height */}
        <div className="relative w-full bg-black rounded-lg overflow-hidden h-96 mb-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/k_isLq_UEUE?si=yLiwvgHyHl-3UJnW"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          {pageData.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-gray-700">{pageData.description}</p>

            <div className="space-y-4">
              <h2 className="text-md font-semibold">{pageData.mainContent.definition.title}</h2>
              <p className="text-gray-700">{pageData.mainContent.definition.content}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Qo'shimcha Materiallar</h3>
              <div className="space-y-4">
                {pageData.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium uppercase">{material.type}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{material.title}</p>
                        <p className="text-xs text-gray-500">{material.size}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Updated Video materials section to match the design */}
            <h3 className="font-semibold ">Video Materiallar</h3>
            <div className="bg-white p-4 rounded-lg shadow " style={{
              marginTop: "1rem"
            }}>
              <div className="space-y-4">
                {pageData.videoMaterials.map((video, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 line-clamp-2 mb-1">{video.title}</p>
                      <button className="text-blue-600 text-xs hover:underline">
                        Bitafisi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;