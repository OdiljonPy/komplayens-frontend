import React from 'react'
import { ChevronRight, Eye, Calendar, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import banner from "../assets/banners/06.png"
function Violations() {
  const categories = ["Kategoriya", "Kategoriya", "Kategoriya", "Kategoriya"];

  return (
    <div className="p-4 pt-0">
      {/* Header with Breadcrumb */}
      <div className="py-3 md:py-4 pt-0">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>Bosh sahifa</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className='text-[#024072]'>Yangiliklar</span>
        </div>
      </div>

      <div className="py-4 pb-0 ">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          Yangiliklar
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-1.5 rounded-[20px] transition-colors ${index === 0
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-50'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 border-b pb-8 min-h-[500px]">
        {[...Array(9)].map((_, idx) => (
          <Link to={`/news/${idx}`} key={idx} className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3">
            <div className="w-32 h-full flex-shrink-0">
              <img
                src={banner}
                alt="News"
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="ml-3 flex flex-col flex-grow  justify-center">
              <h3 className="text-sm font-medium mb-4">
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
          </Link>
        ))}
      </div>

      {/* Pagination - Mobile */}
      <div className="flex md:hidden justify-between items-center overflow-x-auto">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Oldingisi</span>
        </button>

        <div className="flex items-center gap-1 overflow-x-auto px-2">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                ${page === 1 ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md">
          <span>Keyingisi</span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      {/* Pagination - Desktop */}
      <div className="hidden md:flex justify-between items-center">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Oldingisi</span>
        </button>

        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-md
                ${page === 1 ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md">
          <span>Keyingisi</span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Violations