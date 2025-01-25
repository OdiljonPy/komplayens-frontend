import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions'; // Update this path
import { useTranslation } from 'react-i18next';

const ElectronicLibrarySkeleton = () => (
  <div className="w-full p-4 animate-pulse">
    {/* Breadcrumb skeleton */}
    <div className="py-3 md:py-4 pt-0">
      <div className="flex items-center gap-2">
        {[1, 2].map((item) => (
          <div key={item} className="flex items-center gap-1">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            {item < 2 && <div className="h-4 w-4 bg-gray-200 rounded"></div>}
          </div>
        ))}
      </div>
    </div>

    {/* Title skeleton */}
    <div className="h-7 w-64 bg-gray-200 rounded mb-6"></div>

    {/* Navigation and Search skeleton */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="flex space-x-2">
        {[1, 2].map((tab) => (
          <div key={tab} className="h-10 w-32 bg-gray-200 rounded-md"></div>
        ))}
      </div>
      <div className="w-full md:w-64 h-10 bg-gray-200 rounded-md"></div>
    </div>

    {/* Main Content skeleton */}
    <div className="bg-white rounded-lg">
      {/* Department Selector skeleton */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-10 w-48 bg-gray-200 rounded-md"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="hidden md:block">
        <div className="border-b">
          <div className="grid grid-cols-6 gap-4 p-4">
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <div key={col} className="h-5 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="grid grid-cols-6 gap-4 p-4">
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <div key={col} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile List skeleton */}
      <div className="md:hidden divide-y">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Pagination skeleton */}
    <div className="flex justify-between items-center mt-6">
      <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <div key={page} className="w-8 h-8 bg-gray-200 rounded-md"></div>
        ))}
      </div>
      <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

const ElectronicLibrary = () => {
  const { t, i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: 'services/electron/library/category/'
        });

        if (response.success && response.data.ok) {
          setCategories(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const params = {
          page: pagination.currentPage,
          page_size: pagination.pageSize
        };

        if (selectedCategory) {
          params.category_id = selectedCategory.id;
        }

        if (searchQuery) {
          params.q = searchQuery;
        }

        const response = await sendRequest({
          method: 'GET',
          url: 'services/electron/library/',
          params
        });

        if (response.success && response.data.ok) {
          setBooks(response.data.result.content);
          setPagination(prev => ({
            ...prev,
            totalPages: response.data.result.totalPages,
            totalElements: response.data.result.totalElements
          }));
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const debounceTimer = setTimeout(fetchBooks, searchQuery ? 500 : 0);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, pagination.currentPage, pagination.pageSize, searchQuery]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className="w-full pt-14 md:pt-0">
      {loading ? (
        <ElectronicLibrarySkeleton />
      ) : (
        <div className="w-full p-4">
          {/* Breadcrumb */}
          <div className="py-3 md:py-4 pt-0">
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <span>{t('pages.electronicLibrary.breadcrumb.home')}</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className='text-[#024072]'>{t('pages.electronicLibrary.breadcrumb.education')}</span>
            </div>
          </div>

          <div className="py-4 md:py-6">
            {/* Title */}
            <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
              {t('pages.electronicLibrary.title')}
            </h1>

            {/* Navigation and Search */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="p-1 rounded-lg inline-flex w-full md:w-auto overflow-x-auto bg-white">
                <Link to={getLocalizedPath("/training-courses")}>
                  <button className="flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap text-[#595959]">
                    {t('pages.electronicLibrary.tabs.trainingCourses')}
                  </button>
                </Link>
                <Link to={getLocalizedPath("/electronic-library")}>
                  <button className="flex-1 md:flex-none px-4 py-2 rounded-md transition-colors whitespace-nowrap bg-[#F5F5F5] text-[#595959]">
                    {t('pages.electronicLibrary.tabs.electronicLibrary')}
                  </button>
                </Link>
              </div>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder={t('pages.electronicLibrary.search.placeholder')}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Main Content */}
            {categories.length > 0 ? (
              <>
                <div className="bg-white rounded-lg">
                  {/* Department Selector */}
                  <div className="p-4 border-b">
                    <div className="flex-row flex items-center gap-2">
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-2 bg-white px-4 py-2 rounded-md"
                        >
                          {t('pages.electronicLibrary.department.label')}
                          <span className="text-[#3981F7]">
                            {selectedCategory ? selectedCategory.name : t('pages.electronicLibrary.department.select')}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform text-[#3981F7] ${isDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md rounded-md z-10">
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-[#3981F7] bg-[#E6F4FF] px-2 py-1 rounded-[16px]">
                        {t('pages.electronicLibrary.bookCount', { count: pagination.totalElements })}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-4 px-4 text-left font-medium w-[200px]">{t('pages.electronicLibrary.table.bookName')}</th>
                          <th className="py-4 px-4 text-center font-medium w-[180px]">{t('pages.electronicLibrary.table.authorName')}</th>
                          <th className="py-4 px-4 text-center font-medium w-[150px]">{t('pages.electronicLibrary.table.publishType')}</th>
                          <th className="py-4 px-4 text-center font-medium w-[150px]">{t('pages.electronicLibrary.table.publishYear')}</th>
                          <th className="py-4 px-4 text-left font-medium">{t('pages.electronicLibrary.table.description')}</th>
                          <th className="py-4 px-4 text-center font-medium w-[100px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book) => (
                          <tr key={book.id} className="border-b last:border-b-0">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-[#E6F4FF] color-[#024072] p-2 rounded-[50%]">
                                  <svg className="text-gray-400 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                  </svg>
                                </div>
                                <span className="text-sm">{book.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-center">{book.author}</td>
                            <td className="py-4 px-4 text-sm text-center">{book.edition_type}</td>
                            <td className="py-4 px-4 text-sm text-center">{formatDate(book.edition_year)}</td>
                            <td className="py-4 px-4">
                              <p className="text-sm text-gray-500 line-clamp-2">{book.description || '-'}</p>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <a
                                href={book.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3981F7] text-sm hover:text-opacity-80 font-[600]"
                              >
                                {t('pages.electronicLibrary.table.details')}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile List View */}
                  <div className="md:hidden divide-y">
                    {books.map((book) => (
                      <div key={book.id} className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-[#E6F4FF] color-[#024072] p-2 rounded-[50%]">
                            <svg className="text-gray-400 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                          </div>
                          <span className="text-sm font-bold">{book.name}</span>
                        </div>
                        <div className="flex w-full justify-between items-center text-center">
                          <div className="text-sm text-gray-500 mb-2">{book.author}</div>
                          <a
                            href={book.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3981F7] text-sm"
                          >
                            {t('pages.electronicLibrary.table.details')}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex md:hidden justify-between items-center overflow-x-auto">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md"
                  >
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{t('pages.electronicLibrary.pagination.previous')}</span>
                  </button>

                  <div className="flex items-center gap-1 overflow-x-auto px-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                      ${page === pagination.currentPage ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="flex-shrink-0 flex items-center gap-1 px-3 py-2 text-gray-600"
                  >
                    <span>{t('pages.electronicLibrary.pagination.next')}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold">{t('pages.electronicLibrary.noData')}</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectronicLibrary;