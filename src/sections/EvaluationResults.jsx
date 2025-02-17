import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown, MinusCircle } from 'lucide-react';
import { sendRequest } from '../utils/apiFunctions';
import { useTranslation } from 'react-i18next';

const EvaluationResults = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activeTab, setActiveTab] = useState('yaxshi');

  const categories = [
    { label: t('evaluation.status.good'), color: '#22c55e' },
    { label: t('evaluation.status.satisfactory'), color: '#FF9437' },
    { label: t('evaluation.status.unsatisfactory'), color: '#ef4444' }
  ];

  // Fetch years when component mounts
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await sendRequest({ method: 'GET', url: '/statistic/year/' });
        if (response.success) {
          setYears(response.data.result);
          // Set initial selected year to the first year in the list
          if (response.data.result.length > 0) {
            setSelectedYear(response.data.result[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };
    fetchYears();
  }, []);

  // Fetch evaluation data when selected year changes
  useEffect(() => {
    const fetchEvaluationData = async () => {
      if (!selectedYear) return;

      try {
        const response = await sendRequest({ method: 'GET', url: `/statistic/quarterly/?year_id=${selectedYear}` });
        if (response.success) {
          // Transform API data to match the component's data structure
          const transformedData = response.data.result.map(item => ({
            name: item.name,
            status: getStatus(item.this_year),
            this_year: item.this_year,
            first_quarter: item.first_quarter,
            second_quarter: item.second_quarter,
            third_quarter: item.third_quarter,
            fourth_quarter: item.fourth_quarter,
            fifth_quarter: item.fifth_quarter,
            change: item.difference,
          }));

          // Split into rows of 3 items each
          const rows = [];
          for (let i = 0; i < transformedData.length; i += 3) {
            rows.push(transformedData.slice(i, i + 3));
          }
          setEvaluationResults(rows);
        }
      } catch (error) {
        console.error('Error fetching evaluation data:', error);
      }
    };
    fetchEvaluationData();
  }, [selectedYear]);

  // Helper function to determine status based on score
  const getStatus = (score) => {
    if (score > 80) return 'yaxshi';
    if (score >= 56) return 'qoniqarli';
    return 'qoniqarsiz';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'yaxshi':
        return '#22c55e';
      case 'qoniqarli':
        return '#FF9437';
      case 'qoniqarsiz':
        return '#DC2E2E';
      default:
        return '#6b7280';
    }
  };

  // Helper function to split data into columns based on status
  const getColumnData = (data) => {
    const yaxshi = [];
    const qoniqarli = [];
    const qoniqarsiz = [];

    data.forEach(item => {
      const score = item.this_year;
      if (score > 80) {
        yaxshi.push(item);
      } else if (score >= 56) {
        qoniqarli.push(item);
      } else {
        qoniqarsiz.push(item);
      }
    });

    return [yaxshi, qoniqarli, qoniqarsiz];
  };

  // Add this helper function to truncate text
  const truncateText = (text, maxLength = 12) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="flex md:flex-row justify-between items-start xs:items-center gap-3 mb-4 md:mb-6">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Categories Skeleton */}
      <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-6 bg-gray-200 rounded w-24"></div>
        ))}
      </div>

      {/* Table Header Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((col) => (
          <div key={col} className="flex flex-col gap-4">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="w-[50px]"></div>
                <div className="grid grid-cols-5 flex-1 gap-2">
                  {[1, 2, 3, 4, 5].map((q) => (
                    <div key={q} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row Skeletons */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="bg-gray-50 rounded-[4px] p-3">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 min-w-[120px] mr-2">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="w-[50px] text-center">
                    <div className="h-4 bg-gray-200 rounded mx-auto w-8"></div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 flex-1">
                    {[1, 2, 3, 4, 5].map((q) => (
                      <div key={q} className="h-4 bg-gray-200 rounded mx-auto w-8"></div>
                    ))}
                  </div>
                  <div className="w-[40px] ml-2">
                    <div className="h-4 bg-gray-200 rounded w-6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 lg:p-6" style={{
        boxShadow: '0px 4px 29px 0px #0000001A',
        borderRadius: '10px'
      }}>
        {evaluationResults.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Header */}
            <div className="flex md:flex-row justify-between items-start xs:items-center gap-3 mb-4 md:mb-6">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold text-[#1e293b]">
                {t('evaluation.title')}
              </h2>
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-sm"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {years.find(y => y.id === selectedYear)?.year || 'Select Year'}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 z-10 min-w-[120px]">
                    {years.map((year) => (
                      <button
                        key={year.id}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                        onClick={() => {
                          setSelectedYear(year.id);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {year.year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Categories as Tabs */}
            <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
              {categories.map((category, index) => {
                const status = category.label === t('evaluation.status.good') ? 'yaxshi'
                  : category.label === t('evaluation.status.satisfactory') ? 'qoniqarli'
                    : 'qoniqarsiz';

                const getStatusBgColor = (status, isActive) => {
                  if (!isActive) return 'bg-[#F9F9F9]';
                  switch (status) {
                    case 'yaxshi':
                      return 'bg-[#27D157] border border-[#27D157] text-white';
                    case 'qoniqarli':
                      return 'bg-[#FF9437] border border-[#FF9437] text-white';
                    case 'qoniqarsiz':
                      return 'bg-[#DC2E2E] border border-[#DC2E2E] text-white';
                    default:
                      return 'bg-[#F9F9F9]';
                  }
                };

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(status)}
                    className={`flex items-center gap-2 px-2 py-1 rounded-[4px] ${activeTab === status
                      ? `${getStatusBgColor(status, true)} border border-${status === 'yaxshi' ? '[]' : status === 'qoniqarli' ? 'orange' : 'red'
                      }-200`
                      : 'bg-[#F9F9F9]'
                      }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeTab === status ? 'white' : category.color }}
                    ></div>
                    <span className="text-xs md:text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Grid - Now showing only active tab */}
            <div className="grid grid-cols-1 gap-4">
              {/* Column Header */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 min-w-[100px] md:w-[70%] mr-2">
                    <span className="text-sm text-gray-500">{t('evaluation.quarterly_section')}</span>
                  </div>
                  <div className="w-[50px] text-center"></div>
                  <div className="grid grid-cols-5 flex-1 gap-2">
                    {['I', 'II', 'III', 'IV', 'V'].map((quarter, idx) => (
                      <div key={idx} className="text-center text-xs text-gray-500">{quarter}</div>
                    ))}
                  </div>
                  <div className="w-[40px]"></div>
                </div>
              </div>

              {/* Filtered Items */}
              {getColumnData(evaluationResults.flat())
                .find((items, index) => {
                  const status = index === 0 ? 'yaxshi'
                    : index === 1 ? 'qoniqarli'
                      : 'qoniqarsiz';
                  return status === activeTab;
                })
                ?.map((item, index) => (
                  <div key={index} className="bg-[#F9F9F9] rounded-[4px]">
                    <div className="p-3">
                      {/* Name and Quarters Row */}
                      <div className="flex items-center">
                        {/* Name and Status - Mobile View */}
                        <div className="flex md:hidden items-center gap-2 min-w-[100px] mr-2 group relative">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getStatusColor(getStatus(item.this_year)) }}
                          />
                          <span className="text-sm w-full truncate cursor-help" title={item.name}>
                            {truncateText(item.name, 10)}
                          </span>

                          {/* Popover for mobile */}
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-10">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                              {item.name}
                              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                            </div>
                          </div>
                        </div>

                        {/* Name and Status - Desktop View */}
                        <div className="hidden md:flex items-center gap-2 w-[70%] mr-2">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getStatusColor(getStatus(item.this_year)) }}
                          />
                          <span className="text-sm w-full">
                            {item.name}
                          </span>
                        </div>

                        {/* This Year Score */}
                        <div className={`text-sm font-medium w-[50px] text-center ${item.this_year > 80 ? 'text-[#27D157]' :
                          item.this_year >= 56 ? 'text-[#FF9437]' : 'text-[#DC2E2E]'
                          }`}>
                          {item.this_year}
                        </div>

                        {/* Quarters */}
                        <div className="grid grid-cols-5 gap-2 flex-1">
                          <div className="text-center text-sm">{item.first_quarter}</div>
                          <div className="text-center text-sm">{item.second_quarter}</div>
                          <div className="text-center text-sm">{item.third_quarter}</div>
                          <div className="text-center text-sm">{item.fourth_quarter}</div>
                          <div className="text-center text-sm">{item.fifth_quarter}</div>
                        </div>

                        {/* Updated Change Indicator */}
                        <div className={`flex items-center gap-1 ml-2 ${item.change > 0 ? 'text-[#27D157]' :
                          item.change < 0 ? 'text-[#DC2E2E]' : 'text-[#FF9437]'
                          }`}>
                          {item.change > 0 ? (
                            <ArrowUp className="w-3 h-3" />
                          ) :
                            item.change < 0 ? (
                              <ArrowDown className="w-3 h-3" />
                            ) : (
                              <MinusCircle className="w-3 h-3" />
                            )}
                          <span className="text-xs font-medium">
                            {item.change === null ? '0' :
                              item.change === 0 ? '0' :
                                Math.abs(item.change)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            </div>
          </>
        )}

        {/* Footer Descriptions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">

              <span className="text-gray-800"><span className="text-[#22c55e] font-medium">{t('evaluation.good')}</span> - {t('evaluation.goodDescription')}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">

              <span className="text-gray-800"> <span className="text-[#FF9437] font-medium">{t('evaluation.avarage')}</span> - {t('evaluation.avarageDescription')}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex  gap-1">

              <span className="text-gray-800"><span className="text-[#ef4444] font-medium">{t('evaluation.bad')}</span> - {t('evaluation.badDescription')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;