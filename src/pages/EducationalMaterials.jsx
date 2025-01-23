import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown, ChevronLeft, FileText } from 'lucide-react';
import banner from "../assets/banners/07.png";
import { Link } from 'react-router-dom';
const exampleCourses = [
  {
    id: 1,
    title: "Korrupsiyaga qarshi kurash asoslari",
    description: "Ushbu kurs korrupsiya tushunchasi, uning asosiy turlari, oqibatlari va unga qarshi kurash usullarini o'rgatadi",
    duration: "14 daqiqa",
  },
].concat(Array(11).fill(null).map((_, i) => ({
  id: i + 2,
  title: "Korrupsiyaga qarshi kurash asoslari",
  description: "Ushbu kurs korrupsiya tushunchasi, uning asosiy turlari, oqibatlari va unga qarshi kurash usullarini o'rgatadi",
  duration: "14 daqiqa",
})));

const exampleBooks = Array(20).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Kitob nomi.pdf",
  author: "Yozuvchining ismi",
}));

const categories = ["Kategoriya", "Kategoriya", "Kategoriya", "Kategoriya"];

export default function EducationalMaterials() {
  const [activeTab, setActiveTab] = useState("O'quv Kurslari");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-4 pt-0">
      {/* Header with Breadcrumb */}
      <div className="py-3 md:py-4 pt-0">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>Bosh sahifa</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className='text-[#024072]'>O'quv-uslubiy materiallar</span>
        </div>
      </div>

      <div className="py-4 md:py-6">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          Oʻquv-uslubiy materiallar        </h1>

        {/* Navigation and Search Container */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="bg-gray-100 p-1 rounded-lg inline-flex w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab("O'quv Kurslari")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap ${activeTab === "O'quv Kurslari"
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-50'
                }`}
            >
              O'quv Kurslari
            </button>
            <button
              onClick={() => setActiveTab("Elektron Kutubxona")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap ${activeTab === "Elektron Kutubxona"
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-50'
                }`}
            >
              Elektron Kutubxona
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Tashkilotni qidirish"
              className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {activeTab === "O'quv Kurslari" ? (
          <>
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-1.5 rounded-full transition-colors ${index === 0
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-50'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {exampleCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={banner}
                    alt="Course illustration"
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="p-4">
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <h3 className="font-medium text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <Link
                      to={`/educational-materials/${course.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors">
                        Boshlash
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Dropdown and Info */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border"
                >
                  Bo'limi
                  <span className="text-blue-500">Bo'limi nomi</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Bo'limi nomi
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Bo'limi nomi
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500">100 kitob</span>
            </div>

            {/* Books Grid */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {exampleBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className={`flex items-center p-4 gap-3 ${index !== exampleBooks.length - 1 &&
                      (index % 2 === 0 ? 'border-r md:border-b' : 'border-b')
                      }`}
                  >
                    <FileText className="flex-shrink-0 text-gray-400" size={20} />
                    <div className="flex-grow min-w-0 px-6">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium truncate flex-1">{book.name}</span>
                        <span className="text-sm text-gray-500 truncate flex-1">{book.author}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 text-blue-500 hover:text-blue-700 text-sm">
                      Batafsil
                    </button>
                  </div>
                ))}
              </div>
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

              <button className="flex-shrink-0 flex items-center gap-1 px-3 py-2 text-gray-600">
                <span>Keyingisi</span>
                <ChevronRight size={20} />
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
          </>
        )}
      </div>
    </div>
  );
}