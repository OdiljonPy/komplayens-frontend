import React from 'react'

import DocumentsCarousel from '../components/DocumentsCarousel';
import LinksCarousel from '../components/LinksCarousel';

import banner from "../assets/banners/08.png"
import banner04 from "../assets/banners/04.png"
import { ChevronRight, Eye, Calendar } from 'lucide-react'
import VideoCourseDashboard from '../sections/VideoCourseDashboard'
function UsefulResources() {
  const documents = [
    { id: 1, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 2, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 3, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 4, name: 'korrupsiya.pdf', size: '120 KB' },
  ];
  const tests = [
    { id: 1, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 2, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 3, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 4, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 5, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 6, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
  ];
  return (

    <div className="p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Bosh sahifa</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-blue-900">Targʻibot va foydali axborotlar</span>
      </div>
      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">Targʻibot va foydali axborotlar</h1>
      {/* Main Card */}
      <div className=" mb-6  py-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={banner}
              alt="Corruption Risks"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-600 mb-4">
              Kasbiy Odob-Axloq Qoidalari — Bu Har Bir Soha Mutaxassisining O'z Faoliyatida Amal Qilishi Lozim Bo'lgan Axloqiy Tamoyillar Va Me'yorlar To'plamidir.
            </p>
            <div className="space-y-3">
              <p className="text-gray-600">
                - Mas'uliyatni Oshiradi: Ish Jarayonida Xatolarni Kamaytiradi Va Samaradorlikni Oshiradi.
              </p>
              <p className="text-gray-600">
                - Ishonchni Mustahkamlaydi: Hamkasablar Va Mijozlar Orasida Ishonchli Va Professional Imidj Yaratadi.
              </p>
              <p className="text-gray-600">
                - Ish Muhitini Yaxshilaydi: Jamoada Sog'lom Va Samimiy Muhit Shakllanishiga Hissa Qo'shadi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <DocumentsCarousel documents={documents} />
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">Yangiliklar</h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3">
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={banner04}
                alt="News"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="ml-3 flex flex-col flex-grow">
              <h3 className="text-sm font-medium mb-auto">
                Korrupsiyaga Qarshi Kurashda Yangi Qonun Qabul Qilindi
              </h3>

              <div className="flex justify-between text-gray-500 text-xs bg-[#F9F9F9] p-3 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>228</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Avgust 18, 2024</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <VideoCourseDashboard />
      <LinksCarousel tests={tests} />
    </div>

  )
}

export default UsefulResources