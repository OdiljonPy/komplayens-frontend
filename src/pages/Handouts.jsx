import React, { useState, useEffect } from 'react'

import { sendRequest } from '../utils/apiFunctions';
import { ChevronRight } from 'lucide-react'

import pdf from "../assets/icons/pdf.png"
import ppt from "../assets/icons/ppt.png"
import xls from "../assets/icons/xls.png"
import zip from "../assets/icons/zip.png"

function Handouts() {
  const [mainData, setMainData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [handouts, setHandouts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0
  });

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/about/',
          params: { type: 3 }
        });

        if (response.success) {
          setMainData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching main data:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/services/handout/category/',
        });

        if (response.success) {
          setCategories(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchHandouts = async () => {
      try {
        const params = {};
        if (selectedCategory) params.category_id = selectedCategory;
        if (searchQuery) params.q = searchQuery;

        const response = await sendRequest({
          method: 'GET',
          url: '/services/handout/',
          params
        });

        if (response.success) {
          setHandouts(response.data.result.content);
          setPagination({
            currentPage: response.data.result.number,
            totalPages: response.data.result.totalPages,
            totalElements: response.data.result.totalElements
          });
        }
      } catch (error) {
        console.error('Error fetching handouts:', error);
      }
    };

    fetchMainData();
    fetchCategories();
    fetchHandouts();
  }, [selectedCategory, searchQuery]);


  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Bosh sahifa</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-blue-900">Targʻibot va foydali axborotlar</span>
      </div>

      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">
        Targʻibot va foydali axborotlar
      </h1>

      {/* Main Card */}
      <div className="mb-6 py-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={mainData?.image}
              alt={mainData?.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{mainData?.title}</h2>
            <p className="text-gray-600 mb-4">
              {mainData?.short_description}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">
        Tarqatma materiallar
      </h1>

      {/* Header with Select and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 
            rounded-lg shadow-sm appearance-none cursor-pointer
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            hover:border-gray-400 transition-colors duration-200
            bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Barcha kategoriyalar</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative w-full md:w-64">
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Qidirish..."
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>
      </div>

      {/* Updated Files Grid */}
      {
        handouts.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {handouts.map((handout) => (
              <div key={handout.id} className="bg-[#F5F5F5] border border-[#DFDFDF] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8">
                      <img
                        src={handout.type === "ZIP" ? zip : handout.type === "PPT" ? ppt : handout.type === "XLS" ? xls : pdf}
                        alt="File icon"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{handout.name}</p>
                    </div>
                  </div>
                  <a
                    href={handout.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <h1 className="text-2xl font-bold">No data found</h1>
          </div>
        )
      }

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Handouts