
import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Operations = () => {
  const [category, setCategory] = useState('Hammasi');
  const [isOpen, setIsOpen] = useState(false);

  const cards = Array(9).fill({
    title: 'Etika masalalari va korrupsiyaga qarshi kurash: Jamiyatda odob-axloqni mustahkamlash',
    description: 'Ushbu keysda davlat xizmatchisining shaxsiy manfaatlari va xizmat vazifalari oʻrtasidagi ziddiyat tahlil qilinadi.',
    buttonText: 'Davlat xizmati'
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          Amaliyot: Kasbiy Odob-Axloq Qoidalari Bilan Ishlash
        </h1>
      </div>

      {/* Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-4 py-2 "
          >
            <span>Kategoriya: {category}</span>
            <ChevronDown size={20} />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10" style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}>
              <div className="py-1">
                {["Bo'limi nomi", "Bo'limi nomi", "Bo'limi nomi", "Bo'limi nomi"].map((item, index) => (
                  <button
                    key={index}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setCategory(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Amaliyotni qidirish"
            className="w-full px-4 py-2 pl-10 bg-white rounded-md shadow-sm border border-gray-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm  border-gray-200 overflow-hidden"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
            <div className="p-6 relative">
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-[#E5F4FF] text-[#595959] rounded-md text-sm">
                  {card.buttonText}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 pr-24">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <Link
                className="text-[#024072] underline"
                to={`/operations/${card.id}`}>
                Batafsil
              </Link>
            </div>
          </div>
        ))}
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
                ${page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
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
              className={`w-8 h-8 flex items-center justify-center rounded
                ${page === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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
    </div>
  );
};

export default Operations;