

import React from 'react';
import { Search, Globe, Facebook, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComplianceOfficers = () => {
  const officers = [
    {
      id: 1,
      title: "O'zbekiston Respublikasi Prezidenti huzuridagi Tadbirkorlik subyektlarining huquqlari va qonuniy manfaatlarini himoya qilish bo'yicha vakil",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 2,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 3,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 4,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 5,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 6,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 7,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 8,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    {
      id: 9,
      title: "Vazirlar Mahkamasi huzuridagi Soliq qo'mitasi",
      phone1: "998712030051",
      phone2: "998712030040",
    },
    // Repeat for other officers...
  ];

  return (
    <div className=" bg-gray-50 p-4">
      <div className="mb-6">
        <div className="py-3 md:py-4 pt-0">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>Bosh sahifa</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className='text-[#024072]'>Komplayens ofitserlar</span>
          </div>
        </div>

      </div>

      {/* Header */}
      <div className=" mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
            Komplayens ofitserlar
          </h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Tashkilotni qidirish"
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {officers.map((officer) => (
          <div key={officer.id} className="bg-white rounded-[16px] shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-[#024072] font-bold mb-4 line-clamp-2">
              {officer.title}
            </h3>
            <div className="space-y-2 mb-4 flex flex-row gap-2">
              <a href={`tel:${officer.phone1}`} className="flex items-center text-gray-600 hover:text-blue-600">
                <span className="mr-2">📞</span>
                {officer.phone1}
              </a>
              <a href={`tel:${officer.phone2}`} className="flex items-center text-gray-600 hover:text-blue-600 m-0" style={{
                margin: "0 10px"
              }}>
                <span className="mr-2">📞</span>
                {officer.phone2}
              </a>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}


      </div>
      {/* Pagination - Mobile */}
      <div className="flex md:hidden justify-between items-center overflow-x-auto">
        <button className="flex-shrink-0 flex items-center gap-1 px-3 py-2 text-gray-600">
          <ChevronLeft size={20} />
          <span>Oldingisi</span>
        </button>

        <div className="flex items-center gap-1 overflow-x-auto px-2">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                ${page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex-shrink-0 flex items-center gap-1 px-3 py-2 text-gray-600">
          <span>Keyingisi</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination - Desktop */}
      <div className="hidden md:flex justify-between items-center">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <ChevronLeft size={20} />
          <span>Oldingisi</span>
        </button>

        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-md
                ${page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
          <span>Keyingisi</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ComplianceOfficers;