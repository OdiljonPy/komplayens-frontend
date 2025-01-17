

import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
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

const categories = ["Kategoriya", "Kategoriya", "Kategoriya", "Kategoriya"];

export default function TrainingCourses() {

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
          Ta'lim
        </h1>

        {/* Navigation and Search Container */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="p-1 rounded-lg inline-flex w-full md:w-auto overflow-x-auto bg-white">
            <Link to="/training-courses">
              <button
                className={`flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap bg-[#F5F5F5] text-[#595959] `}
              >
                O'quv Kurslari
              </button>
            </Link>
            <Link to="/electronic-library">
              <button
                className={`flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap bg-white `}
              >
                Elektron Kutubxona
              </button>
            </Link>
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
      </div>
    </div>
  );
}