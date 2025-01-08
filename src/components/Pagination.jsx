// Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages = 10, onPageChange }) => {
  const renderPageNumbers = () => {
    if (window.innerWidth < 640) { // Mobile view
      const pages = [];

      if (currentPage > 1) {
        pages.push(
          <button
            key="prev-page"
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {currentPage - 1}
          </button>
        );
      }

      pages.push(
        <button
          key="current-page"
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
        >
          {currentPage}
        </button>
      );

      if (currentPage < totalPages) {
        pages.push(
          <button
            key="next-page"
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {currentPage + 1}
          </button>
        );
      }

      return pages;
    }

    // Desktop view
    return [1, 2, 3, '...', 8, 9, 10].map((page, index) => (
      <button
        key={index}
        onClick={() => page !== '...' && onPageChange(page)}
        disabled={page === '...'}
        className={`px-2 py-1 ${currentPage === page
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 hover:bg-gray-100'
          } rounded-md ${page === '...' ? 'cursor-default hover:bg-transparent' : ''}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="min-w-[32px] h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="min-w-[32px] h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;

