// import React from 'react'

// function Announcements() {
//   return (
//     <div>Announcements</div>
//   )
// }

// export default Announcements

import React from 'react'
import { ChevronRight, Eye, Calendar, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import banner from "../assets/banners/05.png"
function Announcements() {
  const categories = ["Kategoriya", "Kategoriya", "Kategoriya", "Kategoriya"];

  return (
    <div className="p-4 pt-0">
      <div className="py-4 pb-0 ">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          E'lonlar
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-3">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={banner}
                  alt="Seminar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="px-4 pb-4">
              <h3 className="text-base font-medium mb-3 text-gray-800">
                Korrupsiyaga Qarshi Kurash Bo'yicha O'quv Seminari – 15 Dekabr
              </h3>

              <div className="flex justify-between text-gray-500 text-sm bg-[#F9F9F9] p-4 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>228</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Avgust 18, 2024</span>
                </div>
              </div>
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
  )
}

export default Announcements