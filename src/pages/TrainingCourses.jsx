import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, Clock, Eye, ChevronLeft, ChevronDown } from 'lucide-react';
import banner from "../assets/banners/07.png";
import { Link } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';

// Add skeleton component
const TrainingCoursesSkeleton = ({ searchTerm, handleSearch }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 pt-14 md:pt-0 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="py-3 md:py-4 pt-0">
        <div className="flex items-center gap-1">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Title skeleton */}
      <div className="py-4 md:py-6">
        <div className="h-7 w-64 bg-gray-200 rounded border-l-4 border-[#024072] pl-3 mb-6 md:mb-10"></div>

        {/* Navigation and Search skeleton */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          {/* Tabs skeleton */}
          <div className="p-1 rounded-lg inline-flex w-full md:w-auto bg-white">
            <div className="h-10 w-32 bg-gray-200 rounded-md mr-2"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
          </div>

          {/* Search Input skeleton */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={t('report.search_input')}
              value={searchTerm}
              onChange={handleSearch}
              autoFocus
              className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Category buttons skeleton */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-8 w-24 bg-gray-200 rounded-full flex-shrink-0"></div>
          ))}
        </div>

        {/* Courses Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm">
              {/* Image skeleton */}
              <div className="w-full aspect-[16/9] bg-gray-200"></div>

              <div className="p-4">
                {/* Meta info skeleton */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Title skeleton */}
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>

                {/* Button skeleton */}
                <div className="h-10 w-full bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TrainingCourses() {
  const { t, i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };

  const months = t('months', { returnObjects: true });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('new');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleDateChange = (update) => {
    setDateRange(update);
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
  }, []);

  useEffect(() => {
    const fetchCourses = async (page = 1) => {
      setLoading(true);
      try {
        const fromDate = startDate ? startDate.toISOString().split('T')[0] : '';
        const toDate = endDate ? endDate.toISOString().split('T')[0] : '';

        const response = await sendRequest({
          method: 'GET',
          url: `/services/training/`,
          params: {
            page,
            page_size: 10,
            q: searchTerm,
            category_id: selectedCategory,
            order_by: orderBy == "all" ? "" : orderBy,
            from_date: fromDate,
            to_date: toDate
          }
        });
        if (response.success && response.data.ok) {
          setCourses(response.data.result.content);
          setPagination({
            totalElements: response.data.result.totalElements,
            totalPages: response.data.result.totalPages,
            currentPage: response.data.result.number,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCourses(pagination.currentPage || 1);
    }, searchTerm ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory, pagination.currentPage, orderBy, startDate, endDate]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchCourses(newPage);
    }
  };

  if (loading) {
    return <TrainingCoursesSkeleton searchTerm={searchTerm} handleSearch={handleSearch} />;
  }

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 pt-14 md:pt-0">
        {/* Header with Breadcrumb */}
        <div className="py-3 md:py-4 pt-0">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>{t('pages.courseItem.breadcrumb.home')}</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className='text-[#024072]'>{t('pages.courseItem.breadcrumb.materials')}</span>
          </div>
        </div>

        <div className="py-4 md:py-6">
          <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
            {t('pages.courseItem.breadcrumb.materials')}
          </h1>

          {/* Navigation and Search Container */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            {/* Tabs */}
            <div className="p-1 rounded-lg inline-flex w-full md:w-auto overflow-x-auto bg-white">
              <Link to={getLocalizedPath("/training-courses")}>
                <button className={`flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap bg-[#F5F5F5] text-[#595959]`}>
                  {t('educational_materials.education_course')}
                </button>
              </Link>
              <Link to={getLocalizedPath("/electronic-library")}>
                <button className={`flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap bg-white`}>
                  {t('educational_materials.electronic_library')}
                </button>
              </Link>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder={t('report.search_input')}
                value={searchTerm}
                onChange={handleSearch}
                autoFocus
                className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Update the filters section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full md:w-[70%]">
            {/* Category Select */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1.5">Kategoriya:</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(Number(e.target.value))}
                  className="w-full h-[48px] appearance-none bg-white border border-gray-200 rounded-lg px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Sort Select */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1.5">{t('common.sort')}:</label>
              <div className="relative">
                <select
                  className="w-full h-[48px] appearance-none bg-white border border-gray-200 rounded-lg px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="all">Hammasi</option>
                  <option value="new">{t('sort.newest')}</option>
                  <option value="old">{t('sort.oldest')}</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Date Range Picker */}
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1.5">{t('common.date')}</label>
              <div className="relative">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  className="w-full h-[48px] pl-10 bg-white border border-gray-200 rounded-lg cursor-pointer text-gray-900"
                  placeholderText={t('common.selectDate')}
                  isClearable={true}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  monthsShown={2}
                />
                <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {
            courses.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <span className="text-gray-500">{t('pages.statusCheck.testSelection.noTests')}</span>
              </div>
            ) : (

              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {courses.map((course) => (
                        <Link key={course.id}
                              to={getLocalizedPath(`/educational-materials/${course.id}`)}
                          className="block"
                        >
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={course.image || banner}
                        alt={t('pages.statusCheck.testSelection.organizationIcon')}
                        className="w-full aspect-[16/9] object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1 text-[#667085]">
                            <Clock size={16} className="text-[#667085]" />
                            <span className="text-sm">{course.video_length} {t('pages.courseItem.watch')}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#667085]">
                            <Eye size={16} className="text-[#667085]" />
                            <span className="text-sm">{course.views}</span>
                          </div>
                        </div>
                        <h3 className="font-medium text-[#024072] mb-4 text-lg mb-2">{course.name}</h3>
                        {/*<div*/}
                        {/*  className="text-sm text-[#4D4D4D] mb-4 line-clamp-2"*/}
                        {/*  dangerouslySetInnerHTML={{ __html: course.description }}*/}
                        {/*/>*/}
                          <button className="w-full bg-[#024072] text-white py-2 rounded-md hover:bg-[#02386A] transition-colors">
                            {t('educational_materials.start')}
                          </button>
                      </div>
                    </div>
                        </Link>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md"
                  >
                    <ChevronLeft size={16} className="text-[#024072]" />
                    <span>{t('educational_materials.prev')}</span>
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
                    <span>{t('educational_materials.next')}</span>
                    <ChevronRight size={16} className="text-[#024072]" />
                  </button>
                </div></>
            )
          }

        </div>
      </div>
    </div>
  );
}