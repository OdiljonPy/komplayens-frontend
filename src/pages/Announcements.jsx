import React, { useEffect, useState } from 'react'
import { Eye, Calendar, } from 'lucide-react'
import banner from "../assets/banners/05.png"
import { sendRequest } from '../utils/apiFunctions';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";


function Announcements() {
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
  const [announcements, setAnnouncements] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);


  const fetchAnnouncements = async (page = 1, categoryId = null, date = null) => {
    const response = await sendRequest({ method: 'GET', url: `/services/announcement/?page=${page}&page_size=10&${categoryId ? `category_id=${categoryId}` : ''}&${date ? `from_date=${date}` : ''}` });
    if (response.success && response.data.ok) {
      setAnnouncements(response.data.result.content);
      setPagination({
        totalElements: response.data.result.totalElements,
        totalPages: response.data.result.totalPages,
        currentPage: response.data.result.number,
      });
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await sendRequest({ method: 'GET', url: '/services/announcement/categories/' });
      if (response.success && response.data.ok) {
        setCategories(response.data.result);
      }
    };

    fetchCategories();
    fetchAnnouncements();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchAnnouncements(newPage); // Fetch announcements for the new page
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchAnnouncements(1, categoryId);
  };

  const CategoriesSkeleton = () => (
    <div className="flex overflow-x-auto whitespace-nowrap md:flex-wrap gap-2 mb-8 pb-2 hide-scrollbar">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-[34px] w-24 bg-gray-200 rounded-[8px] animate-pulse flex-shrink-0"></div>
      ))}
    </div>
  );

  const AnnouncementsSkeleton = () => (
    <>
      {/* Categories skeleton */}
      <CategoriesSkeleton />

      {/* Announcements grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="p-3">
              <div className="w-full h-[200px] bg-gray-200 rounded-[8px]"></div>
            </div>

            {/* Content skeleton */}
            <div className="px-4 pb-4">
              {/* Title skeleton */}
              <div className="h-5 bg-gray-200 rounded w-full mb-3"></div>

              {/* Stats bar skeleton */}
              <div className="flex justify-between text-sm bg-[#F9F9F9] p-4 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-3.5 bg-gray-200 rounded"></div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
                  <div className="w-16 h-3.5 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="hidden md:flex justify-between items-center">
        <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
        <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Mobile pagination skeleton */}
      <div className="flex md:hidden justify-between items-center">
        <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
        <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </>
  );

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 pt-12 md:pt-0">
        <div className="py-4 pb-0">
          <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
            {t('pages.announcements.title')}
          </h1>
        </div>

        {announcements.length === 0 ? (
          <AnnouncementsSkeleton />
        ) : (
          <>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              {/* Date Selection with MUI-like design */}
              {/* <div className="w-full md:w-64 relative">

                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      const formattedDate = date.toISOString().split('T')[0]; // Formats to "YYYY-MM-DD"
                      fetchAnnouncements(1, null, formattedDate);
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    calendarClassName="custom-calendar"
                    showPopperArrow={false}
                  />
                  <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div> */}

              <div className="w-full md:w-auto flex overflow-x-auto whitespace-nowrap gap-2 pb-2 md:flex-wrap scrollbar-hide">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`px-4 py-1.5 rounded-[8px] transition-colors flex-shrink-0 ${selectedCategory === null
                    ? 'bg-[#3981F7] text-white'
                    : 'bg-white hover:bg-gray-50'
                    }`}
                >
                  {t('pages.announcements.all')}
                </button>
                {categories.map((category, index) => (
                  <button
                    onClick={() => handleCategorySelect(category.id)}
                    key={index}
                    className={`px-4 py-1.5 rounded-[8px] transition-colors flex-shrink-0 ${selectedCategory === category.id
                      ? 'bg-[#3981F7] text-white'
                      : 'bg-white hover:bg-gray-50'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {announcements.map((announcement, idx) => (
                <Link
                  to={getLocalizedPath(`/announcements/${announcement.id}`)}
                  key={announcement.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-3">
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full object-cover h-[200px] rounded-lg"
                    />
                  </div>

                  <div className="px-4 pb-4">
                    <h3 className="text-base font-medium mb-3 text-gray-800">
                      {announcement.title}
                    </h3>

                    <div className="flex justify-between text-gray-500 text-sm bg-[#F9F9F9] p-4 rounded-[8px]">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{announcement.views}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(announcement.published_date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination - Mobile */}
            <div className="flex md:hidden justify-between items-center overflow-x-auto">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md"
              >
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t('pages.announcements.previous')}</span>
              </button>

              <div className="flex items-center gap-1 overflow-x-auto px-2">
                {Array.from({ length: pagination.totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                    ${pagination.currentPage === index + 1 ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600'}`}
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
                <span>{t('pages.announcements.next')}</span>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Pagination - Desktop */}
            <div className="hidden md:flex justify-between items-center">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md"
              >
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t('pages.announcements.previous')}</span>
              </button>

              <div className="flex items-center gap-2">
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
                <span>{t('pages.announcements.next')}</span>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Announcements