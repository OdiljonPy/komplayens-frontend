import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { sendRequest } from '../utils/apiFunctions';
const EvaluationResults = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2023-2024');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const periods = ['2022-2023', '2023-2024', '2024-2025'];

  const categories = [
    { label: 'Yaxshi', color: '#22c55e' },
    { label: 'Qoniqarli', color: '#eab308' },
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
    if (score >= 95) return 'yaxshi';
    if (score >= 90) return 'qoniqarli';
    return 'qoniqarsiz';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'yaxshi':
        return '#22c55e';
      case 'qoniqarli':
        return '#eab308';
      case 'qoniqarsiz':
        return '#ef4444';
      default:
        return '#6b7280';
    }
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
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
              <span className="text-xs md:text-sm text-gray-600">{category.label}</span>
            </div>
          ))}
        </div>

        {/* Results Table */}
        <div className="space-y-3 md:space-y-4">
          {evaluationResults.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-2 md:gap-4">
              {row.map((item, colIndex) => (
                <div
                  key={colIndex}
                  className="flex-1 bg-[#F9F9F9] rounded-[4px] p-3"
                >
                  {/* Organization Name and Status */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getStatusColor(item.status) }}
                    ></div>
                    <span className="text-sm text-gray-600 max-w-[200px] truncate">
                      {item.name}
                    </span>
                  </div>

                  {/* Quarters */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Choraklik kesmida</span>
                    <div className="flex gap-3">
                      <span className="text-xs">I</span>
                      <span className="text-xs">II</span>
                      <span className="text-xs">III</span>
                      <span className="text-xs">IV</span>
                      <span className="text-xs">V</span>
                    </div>
                  </div>

                  {/* Scores and Change */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${item.status === 'yaxshi' ? 'text-green-500' :
                      item.status === 'qoniqarli' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                      {item.this_year}
                    </span>
                    <div className="flex items-center gap-3">
                      {[item.first_quarter, item.second_quarter, item.third_quarter,
                      item.fourth_quarter, item.fifth_quarter].map((score, idx) => (
                        <span key={idx} className="text-xs text-gray-600">{score}</span>
                      ))}
                    </div>
                    <div className={`flex items-center gap-1 ${item.change > 0 ? 'text-green-500' :
                      item.change < 0 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                      {item.change !== 0 && (
                        item.change > 0 ?
                          <ArrowUp className="w-3 h-3" /> :
                          <ArrowDown className="w-3 h-3" />
                      )}
                      <span className="text-xs">
                        {item.change === 0 ? '0' : Math.abs(item.change)}
                      </span>
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