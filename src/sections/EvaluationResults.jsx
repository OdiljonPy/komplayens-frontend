import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown, MinusCircle } from 'lucide-react';
import { sendRequest } from '../utils/apiFunctions';
const EvaluationResults = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const categories = [
    { label: 'Yaxshi', color: '#22c55e' },
    { label: "Qoniqarli", color: '#3b82f6' },
    { label: 'Qoniqarsiz', color: '#ef4444' }
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
            change: item.difference
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
        return '#3b82f6';
      case 'qoniqarsiz':
        return '#ef4444';
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

  return (
    <div className="p-3 md:p-4 lg:p-4">
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 lg:p-6" style={{
        boxShadow: '0px 4px 29px 0px #0000001A',
        borderRadius: '10px'
      }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start xs:items-center gap-3 mb-4 md:mb-6">
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-[#1e293b]">
            Baholash natijalari
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

        {/* Categories */}
        <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2 bg-[#F9F9F9] rounded-[4px] px-2 py-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
              <span className="text-xs md:text-sm text-gray-600">{category.label}</span>
            </div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getColumnData(evaluationResults.flat()).map((columnItems, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {/* Column Header */}
              <div className=" rounded-lg p-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">Choraklik kesmida</span>
                  <div className="grid grid-cols-5 flex-1">
                    {['I', 'II', 'III', 'IV', 'V'].map((quarter, idx) => (
                      <div key={idx} className="text-center text-xs text-gray-500">{quarter}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column Cards */}
              {columnItems.map((item, index) => (
                <div key={index} className="bg-[#F9F9F9] rounded-[4px]">
                  <div className="p-3">
                    {/* Name and Quarters Row */}
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 min-w-[120px] mr-2 group relative">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getStatusColor(getStatus(item.this_year)) }}
                        />
                        <span className="text-sm truncate cursor-help" title={item.name}>
                          {truncateText(item.name)}
                        </span>

                        {/* Updated Popover with better width */}
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-10">
                          <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                            {item.name}
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 flex-1">
                        <div className="text-center text-sm">{item.first_quarter}</div>
                        <div className="text-center text-sm">{item.second_quarter}</div>
                        <div className="text-center text-sm">{item.third_quarter}</div>
                        <div className="text-center text-sm">{item.fourth_quarter}</div>
                        <div className="text-center text-sm">{item.fifth_quarter}</div>
                      </div>

                      {/* Change indicator moved inline */}
                      {item.change !== null ? (
                        <div className={`flex items-center gap-1 ml-2 ${item.change > 0 ? 'text-green-500' :
                          item.change < 0 ? 'text-red-500' : 'text-gray-500'
                          }`}>
                          {item.change !== 0 && (
                            item.change > 0 ?
                              <ArrowUp className="w-3 h-3" /> :
                              <ArrowDown className="w-3 h-3" />
                          )}
                          <span className="text-xs font-medium">
                            {item.change === 0 ? (
                              <span className="text-xs font-medium flex items-center gap-1">
                                <MinusCircle className="w-3 h-3" />
                                0
                              </span>
                            ) : Math.abs(item.change)}
                          </span>
                        </div>
                      ) : (<div className="flex items-center gap-1 ml-2 text-gray-500">
                        <span className="text-xs font-medium flex items-center gap-1">
                          <MinusCircle className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            0
                          </span>
                        </span>
                      </div>)}

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;