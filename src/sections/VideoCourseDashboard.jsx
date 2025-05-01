import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { sendRequest } from '../utils/apiFunctions'; // Update this path
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VideoCourseDashboard = () => {
  const { t, i18n } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setYears] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [orderBy, setOrderBy] = useState('new');
  const [selectedDate, setSelectedDate] = useState('2024-12-18');
  const [sortType, setSortType] = useState('high'); // 'high' or 'low'
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2024-12-18"));

  const months = t('months', { returnObjects: true });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Fetch years on component mount
  useEffect(() => {
    const fetchYears = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: 'statistic/year/'
      });

      if (response.success && response.data.ok) {
        setYears(response.data.result);
        // Set initial selected year to the first year in the list
        if (response.data.result.length > 0) {
          setSelectedYear(response.data.result[0]);
        }
      }
    };

    fetchYears();
  }, []);

  // Fetch statistics when selected year changes
  useEffect(() => {
    const fetchStatistics = async () => {
      if (!selectedYear) return;

      const response = await sendRequest({
        method: 'GET',
        url: 'statistic/',
        params: { year_id: selectedYear.id }
      });

      if (response.success && response.data.ok) {
        const { rainbow, liner } = response.data.result;
        // Transform rainbow data for pie chart
        const transformedPieData = [
          { name: t('ratings.unsatisfactory'), value: rainbow.unsatisfactory },
          { name: t('ratings.satisfactory'), value: rainbow.satisfactory },
          { name: t('ratings.high'), value: rainbow.high }
        ];
        setPieData(transformedPieData);

        // Sort liner data by percentage
        const sortedData = [...liner].sort((a, b) => b.percentage - a.percentage);
        const halfLength = Math.ceil(sortedData.length / 2);

        // Take first half for high, second half for low
        setProgressData(sortType === 'high' ?
          sortedData.slice(0, halfLength) :
          sortedData.slice(halfLength).reverse()
        );
      }
    };

    fetchStatistics();
  }, [selectedYear, sortType]); // Add sortType to dependencies

  // New useEffect for fetching courses
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: '/services/training/',
        params: {
          from_date: selectedDate,
          order_by: orderBy,
          popular: true
        }
      });

      if (response.success && response.data.ok) {
        // Take only the first 3 courses
        setCourses(response.data.result.content.slice(0, 3));
      }
    };

    fetchCourses();
  }, [orderBy, selectedDate]);

  const COLORS = ['#ef4444', '#eab308', '#22c55e'];

  // Add helper function for localized paths
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };

  const CoursesSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white p-4 rounded-lg animate-pulse">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-48 h-32 bg-gray-200 rounded-md"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const StatisticsSkeleton = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Pie Chart Skeleton */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="flex justify-center items-center h-[200px]">
          <div className="w-48 h-48 rounded-full border-8 border-gray-200 animate-pulse"></div>
        </div>
      </div>

      {/* Progress Bars Skeleton */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        <div className="space-y-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Format date for API
  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-gray-50 py-8 sm:mt-4">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-8">
          {/* Left Section - Video Courses */}
          <div className="lg:col-span-7">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
                {t('videoCourses.title')}
              </h1>

              <Link to={getLocalizedPath('/training-courses')}>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-[12px] flex items-center gap-2">
                  <span className='text-[14px]'>{t('common.details')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>



            <div className="space-y-4">
              {courses.length === 0 ? (
                <CoursesSkeleton />
              ) : (
                courses.map(course => (
                  <div key={course.id} className="bg-white p-4 rounded-lg " style={{
                    boxShadow: '0px 0px 32px 0px #00000012'
                  }}>
                    <Link to={getLocalizedPath(`/educational-materials/${course.id}`)}>
                      <div className="flex flex-col lg:flex-row gap-4">
                        <img
                          src={course.image}
                          alt=""
                          className='w-full lg:w-48 h-32 bg-gray-200 rounded-md object-cover object-center'
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                          <div
                            className="text-gray-600 mb-4  hidden md:line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: course.description }}
                          />
                          <div className="flex gap-4 text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {course.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(course.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {(!selectedYear || pieData.length === 0) ? (
              <StatisticsSkeleton />
            ) : (
              <>
                {/* Pie Chart Card */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                  {/* Header section */}
                  <div className="flex flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
                      {t('dashboard.openness_index')}
                    </h2>
                    <div className="relative">
                      <button
                        onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-base sm:text-lg"
                      >
                        {selectedYear ? `${selectedYear.year}-yil` : 'Yilni tanlang'}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {isYearDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                          {years.map((year) => (
                            <button
                              key={year.id}
                              onClick={() => {
                                setSelectedYear(year);
                                setIsYearDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                            >
                              {year.year}-yil
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Mobile View */}
                    <div className="flex flex-col gap-6 sm:hidden">
                      {/* Chart */}
                      {/* Legend for Mobile */}
                      <div className="w-full flex flex-row justify-center gap-6">
                        {pieData.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1 h-10 rounded-sm" style={{ backgroundColor: COLORS[2 - index] }}></div>
                            <div>
                              <div className="text-gray-500 text-xs">{item.name}</div>
                              <div className="text-sm font-semibold">{item.value}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-full flex justify-center">
                        <PieChart width={280} height={180} className="scale-90">
                          <Pie
                            data={pieData}
                            cx={140}
                            cy={140}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={90}
                            outerRadius={120}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[2 - index]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>


                    </div>

                    {/* Desktop View */}
                    <div className="hidden sm:flex sm:flex-row sm:items-start sm:gap-8">
                      {/* Legend for Desktop */}
                      <div className="w-auto flex flex-col justify-start gap-6">
                        {pieData.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1 h-8 rounded-sm" style={{ backgroundColor: COLORS[2 - index] }}></div>
                            <div>
                              <div className="text-gray-500 text-sm">{item.name}</div>
                              <div className="text-xl font-semibold">{item.value}%</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart */}
                      <div className="w-auto flex justify-end flex-1">
                        <PieChart width={280} height={180} className="scale-110">
                          <Pie
                            data={pieData}
                            cx={140}
                            cy={140}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={90}
                            outerRadius={120}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[2 - index]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bars Card */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-6 gap-2">
                    <h2 className="text-[14px] md:text-lg font-semibold text-gray-800">
                      {t('dashboard.performance_rating')}
                    </h2>
                    <div className="relative">
                      <button
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-[14px] md:text-base"
                      >
                        {sortType === 'high' ? t('sort.highest') : t('sort.lowest')}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {isSortDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                          <button
                            onClick={() => {
                              setSortType('high');
                              setIsSortDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                          >
                            {t('sort.highest')}
                          </button>
                          <button
                            onClick={() => {
                              setSortType('low');
                              setIsSortDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                          >
                            {t('sort.lowest')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-5">
                    {progressData.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 flex-1 pr-4">{item.name}</span>
                          <span className={`font-semibold ${sortType === 'high' ? 'text-[#27D157]' : 'text-[#ef4444]'} text-base sm:text-lg`}>
                            {item.percentage}
                          </span>
                        </div>
                        <div className={`w-full ${sortType === 'high' ? 'bg-[#D7EBDD]' : 'bg-[#FFEBEB]'} rounded-full h-2.5`}>
                          <div
                            className={`${sortType === 'high' ? 'bg-[#27D157]' : 'bg-[#ef4444]'} h-2.5 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCourseDashboard;