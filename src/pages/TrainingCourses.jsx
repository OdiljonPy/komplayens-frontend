import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, Clock, Eye, ChevronLeft } from 'lucide-react';
import banner from "../assets/banners/07.png";
import { Link } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';


export default function TrainingCourses() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [pagination, setPagination] = useState({});

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await sendRequest({ method: 'GET', url: '/services/training/category/' });
      if (response.success && response.data.ok) {
        setCategories(response.data.result);
      }
    };
    fetchCategories();
  }, [])
  useEffect(() => {
    const fetchCourses = async (page = 1) => {
      const response = await sendRequest({
        method: 'GET',
        url: `/services/training/?page=${page}&page_size=10&q=${searchTerm}&category_id=${selectedCategory}`
      });
      if (response.success && response.data.ok) {
        setCourses(response.data.result.content);
        setPagination({
          totalElements: response.data.result.totalElements,
          totalPages: response.data.result.totalPages,
          currentPage: response.data.result.number,
        });
      }
    };



    const debounceTimer = setTimeout(() => {
      fetchCourses(pagination.currentPage || 1);
    }, searchTerm ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory, pagination.currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchCourses(newPage);
    }
  };

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
          Oʻquv-uslubiy materiallar
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
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-1.5 rounded-full transition-colors whitespace-nowrap ${selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {
          courses.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-gray-500">Kurslar topilmadi</span>
            </div>
          ) : (

            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={course.image || banner}
                      alt="Course illustration"
                      className="w-full aspect-[16/9] object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 text-[#667085]">
                          <Clock size={16} className="text-[#667085]" />
                          <span className="text-sm">{course.video_length} daqiqa</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#667085]">
                          <Eye size={16} className="text-[#667085]" />
                          <span className="text-sm">228</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-[#024072] text-lg mb-2">{course.name}</h3>
                      <div
                        className="text-sm text-[#4D4D4D] mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />
                      <Link
                        to={`/educational-materials/${course.id}`}
                        className="block"
                      >
                        <button className="w-full bg-[#024072] text-white py-2 rounded-md hover:bg-[#02386A] transition-colors">
                          Boshlash
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md"
                >
                  <ChevronLeft size={16} className="text-[#024072]" />
                  <span>Oldingisi</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md
                  ${pagination.currentPage === index + 1 ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md"
                >
                  <span>Keyingisi</span>
                  <ChevronRight size={16} className="text-[#024072]" />
                </button>
              </div></>
          )
        }

      </div>
    </div>
  );
}