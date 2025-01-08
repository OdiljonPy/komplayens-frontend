import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import banner from "../assets/banners/07.png";

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

const categories = ["Kategoriya", "Kategoriya", "Kategoriya", "Kategoriya"];

export default function EducationalMaterials() {
  const [activeTab, setActiveTab] = useState("O'quv Kurslari");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      {/* Header with Breadcrumb */}
      <div className="py-3 md:py-4">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>Bosh sahifa</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className='text-[#024072]'>O'quv-uslubiy materiallar</span>
        </div>
      </div>

      <div className="py-4 md:py-6">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          O'quv-Uslubiy Materiallar
        </h1>

        {/* Mobile Search Toggle */}
        <div className="flex md:hidden justify-end mb-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Search Input */}
        {isSearchOpen && (
          <div className="md:hidden mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tashkilotni qidirish"
                className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}

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

          {/* Desktop Search Input */}
          <div className="hidden md:block relative w-64">
            <input
              type="text"
              placeholder="Tashkilotni qidirish"
              className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto md:flex-wrap gap-2 mb-6 md:mb-8 pb-2 md:pb-0 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-1.5 rounded-full transition-colors whitespace-nowrap ${index === 0
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {exampleCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={banner}
                alt="Course illustration"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="p-3 md:p-4">
                <span className="text-sm text-gray-500">{course.duration}</span>
                <h3 className="font-medium text-base md:text-lg mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors">
                  Boshlash
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}