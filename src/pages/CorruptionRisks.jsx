import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, Calendar, ArrowUpDown, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import pdfImg from "../assets/icons/pdf.png"
import { sendRequest } from '../utils/apiFunctions';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from 'date-fns/format';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const Filters = ({ onFilterChange }) => {
  const { t } = useTranslation();

  const [selectedSort, setSelectedSort] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

  const datePickerRef = useRef(null);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateDisplay = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      return `${format(dateRange[0].startDate, 'dd.MM.yyyy')} - ${format(dateRange[0].endDate, 'dd.MM.yyyy')}`;
    }
    return '';
  };

  const handleDateSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleApplyDateRange = () => {
    setIsDatePickerOpen(false);
    // Call filter function
    if (onFilterChange) {
      onFilterChange({
        sort: selectedSort,
        status: selectedStatus,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      {/* Sort Select */}
      <div className="w-full md:w-[280px]">
        <label className="block text-sm text-gray-600 mb-1.5">
          {t('pages.corruptionRisks.sorting')}
        </label>
        <div className="relative">
          <select
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
              onFilterChange?.({
                sort: e.target.value,
                status: selectedStatus,
                startDate: dateRange[0].startDate,
                endDate: dateRange[0].endDate
              });
            }}
            className="w-full h-[48px] appearance-none bg-white border border-gray-200 rounded-lg px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{t('pages.corruptionRisks.newest')}</option>
            <option value="new">{t('pages.corruptionRisks.new')}</option>
            <option value="old">{t('pages.corruptionRisks.old')}</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Status Select */}
      <div className="w-full md:w-[280px]">
        <label className="block text-sm text-gray-600 mb-1.5">
          {t('pages.corruptionRisks.status')}
        </label>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              onFilterChange?.({
                sort: selectedSort,
                status: e.target.value,
                startDate: dateRange[0].startDate,
                endDate: dateRange[0].endDate
              });
            }}
            className="w-full h-[48px] appearance-none bg-white border border-gray-200 rounded-lg px-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{t('pages.corruptionRisks.all')}</option>
            <option value="1">{t('pages.corruptionRisks.inProgress')}</option>
            <option value="2">{t('pages.corruptionRisks.closed')}</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="w-full md:w-[280px]">
        <label className="block text-sm text-gray-600 mb-1.5">
          {t('common.date')}
        </label>
        <div className="relative" ref={datePickerRef}>
          <div
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="w-full h-[48px] bg-white border border-gray-200 rounded-lg px-4 flex items-center cursor-pointer text-gray-900"
          >
            {formatDateDisplay() || t('common.selectDate')}
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {isDatePickerOpen && (
            <div className="absolute z-50 mt-1">
              <DateRange
                ranges={dateRange}
                onChange={handleDateSelect}
                months={2}
                direction="horizontal"
                className="border border-gray-200 rounded-lg shadow-lg"
              />
              <div className="bg-white p-4 border-t flex justify-end">
                <button
                  onClick={handleApplyDateRange}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CorruptionRisks() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [documents, setDocuments] = useState([]);
  const [aboutInfo, setAboutInfo] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalElements: 0
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch documents
      const mediaResponse = await sendRequest({
        method: 'GET',
        url: 'services/corruption/media/'
      });

      if (mediaResponse.success && mediaResponse.data.ok) {
        setDocuments(mediaResponse.data.result);
      }

      // Fetch about information
      const aboutResponse = await sendRequest({
        method: 'GET',
        url: '/about/',
        params: { type: 2 }
      });

      if (aboutResponse.success && aboutResponse.data.ok) {
        setAboutInfo(aboutResponse.data.result);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedSort, selectedStatus, startDate, endDate, pagination.currentPage]);

  const handleFilterChange = (filters) => {
    // Update states
    setSelectedSort(filters.sort);
    setSelectedStatus(filters.status);
    if (filters.startDate) {
      setStartDate(format(filters.startDate, 'yyyy-MM-dd'));
    }
    if (filters.endDate) {
      setEndDate(format(filters.endDate, 'yyyy-MM-dd'));
    }

    // Reset pagination to first page when filters change
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const fetchTasks = async () => {
    const params = {
      page: pagination.currentPage,
      page_size: pagination.pageSize
    };

    if (selectedSort) params.order_by = selectedSort;
    if (selectedStatus) params.status = selectedStatus;
    if (startDate) params.from_date = startDate;
    if (endDate) params.to_date = endDate;

    try {
      const response = await sendRequest({
        method: 'GET',
        url: 'services/corruption/',
        params
      });

      if (response.success && response.data.ok) {
        setTasks(response.data.result.content);
        setPagination(prev => ({
          ...prev,
          totalPages: response.data.result.totalPages,
          totalElements: response.data.result.totalElements
        }));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div className="w-full">
      <div className="p-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 px-4">
          <span>{t('educational_materials.home')}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-900">{t('menu.corruption_risks_1')} {t('menu.corruption_risks_2')}</span>
        </div>

        <div className="p-4">
          <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
            {t('menu.corruption_risks_1')} {t('menu.corruption_risks_2')}
          </h1>
        </div>
        {/* About Section */}
        <div className="mb-6 px-4 py-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              {aboutInfo && (
                <img
                  src={aboutInfo.image}
                  alt={aboutInfo.title}
                  className="w-full max-h-[250px] rounded-lg"
                />
              )}
            </div>
            <div className="flex-1">
              {aboutInfo && (
                <>
                  <h2 className="text-xl font-semibold mb-4">{aboutInfo.title}</h2>
                  <p className="text-gray-600 mb-4">{aboutInfo.short_description}</p>
                </>
              )}
            </div>
          </div>
        </div>


        <div className="relative mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">

            </h1>
            <div className="flex gap-4">
              <button
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                id="doc-prev"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                id="doc-next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              prevEl: '#doc-prev',
              nextEl: '#doc-next',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1536: {
                slidesPerView: 4,
              },
            }}
          >
            {documents.map((doc) => (
              <SwiperSlide key={doc.id}>
                <div className="bg-[#F5F5F5] rounded-xl p-6 border border-[#DFDFDF] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 flex-row">
                      <img src={pdfImg} alt="pdf" className="w-5 h-5" />
                      <p className="text-[#595959] text-sm mb-1">{doc.filename}</p>

                    </div>
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C8C8C] hover:text-blue-600"
                    >
                      <Download className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Filters onFilterChange={handleFilterChange} />
        {
          tasks.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <div className="bg-white rounded-lg border border-gray-200 min-w-[1000px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 bg-[#F8FAFC] divide-x divide-gray-200 border-b text-sm">
                    <div className="px-4 py-3">
                      <button className="flex items-center gap-2 text-gray-500 font-medium">
                        {t('pages.corruptionRisks.surveyName')}
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-500 font-medium">{t('pages.corruptionRisks.startDate')}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-500 font-medium">{t('pages.corruptionRisks.endDate')}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-500 font-medium">{t('pages.corruptionRisks.status')}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-500 font-medium">{t('pages.corruptionRisks.results')}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-500 font-medium">{t('pages.corruptionRisks.participate')}</span>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <div key={task.id} className="grid grid-cols-6 bg-white text-sm">
                        <div className="px-4 py-3">
                          <span className="text-gray-900">{task.name}</span>
                        </div>
                        <div className="px-4 py-3">
                          <span className="text-gray-600">{formatDate(task.start_date)}</span>
                        </div>
                        <div className="px-4 py-3">
                          <span className="text-gray-600">{formatDate(task.end_date)}</span>
                        </div>
                        <div className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${task.status === 1
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {task.status === 1 ? 'Faol' : 'Yakunlangan'}
                          </span>
                        </div>
                        <div className="px-4 py-3">
                          {task.status != 1 ? (
                            <Link
                              to={getLocalizedPath(`/corruption-risks/${task.id}`)}
                            >
                              <button className="px-3 py-1.5 text-sm bg-[#024072] text-white rounded-md hover:bg-[#02386A]">
                                Natijalarni ko'rish
                              </button>
                            </Link>
                          ) : (
                            <span className="text-gray-600">Natijalar hali yo'q</span>
                          )}
                        </div>
                        <div className="px-4 py-3">
                          {task.status === 1 ? (
                            <a
                              href={task.form_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Qatnashish
                            </a>
                          ) : (
                            <button className="px-3 py-1.5 rounded-md text-sm bg-gray-100 text-gray-600">
                              Yakunlangan
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className=" mt-6 flex justify-between items-center">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
                >
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3332 10.6986H4.6665M4.6665 10.6986L10.4998 16.5319M4.6665 10.6986L10.4998 4.86523"
                      stroke="#414651" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{t('educational_materials.prev')}</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[32px] h-8 flex items-center justify-center rounded-md ${page === pagination.currentPage
                        ? 'bg-[#F9F5FF] text-[#7F56D9]'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
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
                  <span>{t('educational_materials.next')}</span>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.6665 10.6986H16.3332M16.3332 10.6986L10.4998 4.86523M16.3332 10.6986L10.4998 16.5319" stroke="#414651"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold">{t('pages.corruptionRisks.noData')}</h1>
            </div>
          )
        }
      </div>
    </div>
  );
}