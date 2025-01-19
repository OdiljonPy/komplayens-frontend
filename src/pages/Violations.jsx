import React, { useEffect, useState } from 'react'
import { ChevronRight, Eye, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { sendRequest } from '../utils/apiFunctions';

function Violations() {
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/services/news/category/'
        });

        if (response.success) {
          setCategories(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch news with filters
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const params = {
          page: pagination.currentPage,
          page_size: pagination.pageSize
        };

        if (selectedCategory) {
          params.category_id = selectedCategory;
        }

        const response = await sendRequest({
          method: 'GET',
          url: '/services/news/',
          params
        });

        if (response.success) {
          setNews(response.data.result.content);
          setPagination(prev => ({
            ...prev,
            totalPages: response.data.result.totalPages
          }));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory, pagination.currentPage, pagination.pageSize]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    if (typeof page === 'number' && page !== pagination.currentPage) {
      setPagination(prev => ({ ...prev, currentPage: page }));
    }
  };

  const generatePaginationArray = () => {
    const delta = 1;
    const range = [];
    for (let i = Math.max(1, pagination.currentPage - delta);
      i <= Math.min(pagination.totalPages, pagination.currentPage + delta);
      i++) {
      range.push(i);
    }

    if (range[0] > 1) {
      range.unshift(1);
      if (range[1] > 2) range.splice(1, 0, '...');
    }

    if (range[range.length - 1] < pagination.totalPages) {
      if (range[range.length - 1] < pagination.totalPages - 1) {
        range.push('...');
      }
      range.push(pagination.totalPages);
    }

    return range;
  };

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

      <div className="py-4 pb-0">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          Yangiliklar
        </h1>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategorySelect(null)}
          className={`px-4 py-1.5 rounded-[20px] transition-colors 
            ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
        >
          Hammasi
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`px-4 py-1.5 rounded-[20px] transition-colors 
              ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 border-b pb-8 min-h-[500px]">
        {news.map((item) => (
          <Link to={`/news/${item.id}`} key={item.id} className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3" style={{
            maxHeight: "150px"
          }}>
            <div className="w-32 h-full flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="ml-3 flex flex-col flex-grow justify-center">
              <h3 className="text-sm font-medium mb-4">
                {item.title}
              </h3>

              <div className="flex justify-between text-gray-500 text-xs bg-[#F9F9F9] p-3 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{item.views}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{new Date(item.published_date).toLocaleDateString()}</span>
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
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
        >
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Oldingisi</span>
        </button>

        <div className="flex items-center gap-1 overflow-x-auto px-2">
          {generatePaginationArray().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              disabled={typeof page !== 'number'}
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                ${pagination.currentPage === page ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600'}
                ${typeof page !== 'number' ? 'cursor-default' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
        >
          <span>Keyingisi</span>
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
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
        >
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Oldingisi</span>
        </button>

        <div className="flex items-center gap-2">
          {generatePaginationArray().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              disabled={typeof page !== 'number'}
              className={`w-8 h-8 flex items-center justify-center rounded-md
                ${pagination.currentPage === page ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600 hover:bg-gray-100'}
                ${typeof page !== 'number' ? 'cursor-default' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
        >
          <span>Keyingisi</span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Violations;