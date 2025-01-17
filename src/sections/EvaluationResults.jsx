import React, { useState } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

const EvaluationResults = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2023-2024');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = ['2022-2023', '2023-2024', '2024-2025'];

  const categories = [
    { label: 'Yaxshi', color: '#22c55e' },
    { label: 'Qoniqarli', color: '#eab308' },
    { label: 'Qoniqarsiz', color: '#ef4444' }
  ];

  const evaluationData = [
    [
      { name: "Markaziy bank", status: "yaxshi", change: 3 },
      { name: "Turizm qo'mitasi", status: "qoniqarli", change: 3 },
      { name: "Andijon viloyat hokimligi", status: "qoniqarsiz", change: -7 }
    ],
    [
      { name: "O'zkimyosanoat AJ", status: "yaxshi", change: -7 },
      { name: "Turizm qo'mitasi", status: "qoniqarli", change: -7 },
      { name: "Andijon viloyat hokimligi", status: "qoniqarsiz", change: 3 }
    ],
    [
      { name: "Markaziy bank", status: "yaxshi", change: 3 },
      { name: "Turizm qo'mitasi", status: "qoniqarli", change: 0 },
      { name: "Andijon viloyat hokimligi", status: "qoniqarsiz", change: -7 }
    ],
    [
      { name: "O'zkimyosanoat AJ", status: "yaxshi", change: -7 },
      { name: "Turizm qo'mitasi", status: "qoniqarli", change: 3 },
      { name: "Andijon viloyat hokimligi", status: "qoniqarsiz", change: 3 }
    ],
    [
      { name: "Markaziy bank", status: "yaxshi", change: 3 },
      { name: "Turizm qo'mitasi", status: "qoniqarli", change: -7 },
      { name: "Andijon viloyat hokimligi", status: "qoniqarsiz", change: -7 }
    ],
    [
      { name: "O'zkimyosanoat AJ", status: "yaxshi", change: -7 },
      { name: "Turizm qo'mitasi", status: "qoniqarli", change: 0 },
      { name: "Andijon viloyat hokimligi", status: "qoniqarsiz", change: 3 }
    ]
  ];

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
      <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 lg:p-6">
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
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 z-10 min-w-[120px]">
                {periods.map((period) => (
                  <button
                    key={period}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {period}
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
          {evaluationData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-2 md:gap-4">
              {row.map((item, colIndex) => (
                <div
                  key={colIndex}
                  className="flex items-center justify-between flex-1 bg-[#F9F9F9] rounded-[4px] px-2 py-2 md:py-1.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getStatusColor(item.status) }}
                    ></div>
                    <span className="text-xs md:text-sm text-gray-600 truncate">
                      {item.name}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1 flex-shrink-0 ml-2 ${item.change > 0 ? 'text-green-500' : item.change < 0 ? 'text-red-500' : 'text-gray-500'
                      }`}
                  >
                    {item.change !== 0 && (
                      item.change > 0 ?
                        <ArrowUp className="w-3 h-3 md:w-4 md:h-4" /> :
                        <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                    <span className="text-xs md:text-sm">
                      {item.change === 0 ? '0' : Math.abs(item.change)}
                    </span>
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