import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendRequest } from '../utils/apiFunctions';

// Add skeleton component
const OperationsSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-4 pt-16 md:p-6 md:pt-6 animate-pulse">
    {/* Header skeleton */}
    <div className="mb-6">
      <div className="h-7 w-64 bg-gray-200 rounded border-l-4 border-[#024072] pl-3"></div>
    </div>

    {/* Navigation Bar skeleton */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      {/* Category dropdown skeleton */}
      <div className="relative">
        <div className="h-10 w-48 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Search input skeleton */}
      <div className="relative w-full md:w-64">
        <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>

    {/* Cards Grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-sm border-gray-200 overflow-hidden p-6">
          {/* Category badge skeleton */}
          <div className="flex w-full justify-end mb-3">
            <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
          </div>

          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>

          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>

          {/* Link skeleton */}
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>

    {/* Pagination skeleton */}
    <div className="hidden md:flex justify-between items-center">
      {/* Previous button skeleton */}
      <div className="h-10 w-32 bg-gray-200 rounded-md"></div>

      {/* Page numbers skeleton */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-8 w-8 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Next button skeleton */}
      <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
    </div>

    {/* Mobile pagination skeleton */}
    <div className="flex md:hidden justify-between items-center">
      <div className="h-10 w-28 bg-gray-200 rounded-md"></div>
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-8 w-8 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-10 w-28 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

const Operations = () => {
  const { t, i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessions = async () => {
      setLoading(true);
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/services/profession/'
        });
        if (response.success) {
          setProfessions(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching professions:', error);
      }
    };
    fetchProfessions();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const params = {
          page: pagination.currentPage,
          page_size: pagination.pageSize
        };

        if (selectedProfession) {
          params.profession_id = selectedProfession;
        }

        if (debouncedSearchQuery) {
          params.q = debouncedSearchQuery;
        }

        const response = await sendRequest({
          method: 'GET',
          url: '/services/professional/ethics/',
          params
        });

        if (response.success) {
          setCards(response.data.result.content);
          setPagination(prev => ({
            ...prev,
            totalPages: response.data.result.totalPages
          }));
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [selectedProfession, debouncedSearchQuery, pagination.currentPage, pagination.pageSize]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleProfessionSelect = (id) => {
    setSelectedProfession(id);
    setIsOpen(false);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
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

  const handlePageChange = (page) => {
    if (typeof page === 'number' && page !== pagination.currentPage) {
      setPagination(prev => ({ ...prev, currentPage: page }));
    }
  };

  const handlePrevPage = () => {
    setPagination(prev => ({
      ...prev,
      currentPage: Math.max(1, prev.currentPage - 1)
    }));
  };

  const handleNextPage = () => {
    setPagination(prev => ({
      ...prev,
      currentPage: Math.min(prev.totalPages, prev.currentPage + 1)
    }));
  };

  if (loading) {
    return <OperationsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-16 md:p-6 md:pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          {t('pages.handouts.title')}
        </h1>
      </div>

      {/* Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-4 py-2"
          >
            <span className="text-gray-600">{t('pages.operations.category')}:
              <span className="text-[#3981F7] ml-2">
                {professions.find(p => p.id === selectedProfession)?.name || t('pages.operations.all')}
              </span>
            </span>
            <ChevronDown size={20} className="text-gray-400" />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-1 text-gray-600">
                <button
                  className="block w-full px-4 py-3 text-left hover:bg-gray-50 text-[#3981F7]"
                  onClick={() => handleProfessionSelect(null)}
                >
                  {t('pages.operations.all')}
                </button>
                {professions.map((profession) => (
                  <button
                    key={profession.id}
                    className="block w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-600"
                    onClick={() => handleProfessionSelect(profession.id)}
                  >
                    {profession.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('pages.operations.search.placeholder')}
            className="w-full px-4 py-2 pr-10 bg-white rounded-md shadow-sm border border-gray-200"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-sm border-gray-200 overflow-hidden" style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="p-6">
              <div className="flex w-full justify-end ">
                <span className="inline-block px-3 py-1 bg-[#E5F4FF] text-[#595959] rounded-md text-sm mb-3">
                  {professions.find(p => p.id === card.profession)?.name}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.case}</p>
              <Link
                className="text-[#024072] underline"
                to={getLocalizedPath(`/operations/${card.id}`)}
              >
                {t('pages.operations.details')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex md:hidden justify-between items-center overflow-x-auto">
        <button
          onClick={handlePrevPage}
          disabled={pagination.currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 4.86523M4.6665 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t('pages.handouts.pagination.previous')}</span>
        </button>

        <div className="flex items-center gap-1 overflow-x-auto px-2">
          {generatePaginationArray().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              disabled={typeof page !== 'number'}
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md
                ${pagination.currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600'}
                ${typeof page !== 'number' ? 'cursor-default' : 'hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={pagination.currentPage === pagination.totalPages}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50">
          <span>{t('pages.handouts.pagination.next')}</span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Pagination - Desktop */}
      <div className="hidden md:flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={pagination.currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 4.86523M4.6665 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t('pages.handouts.pagination.previous')}</span>
        </button>

        <div className="flex items-center gap-2">
          {generatePaginationArray().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              disabled={typeof page !== 'number'}
              className={`w-8 h-8 flex items-center justify-center rounded
                ${pagination.currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600'}
                ${typeof page !== 'number' ? 'cursor-default' : 'hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={pagination.currentPage === pagination.totalPages}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50">
          <span>{t('pages.handouts.pagination.next')}</span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Operations;