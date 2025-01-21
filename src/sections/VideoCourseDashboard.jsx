import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import banner from "../assets/banners/04.png";
import { sendRequest } from '../utils/apiFunctions'; // Update this path

const VideoCourseDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setYears] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [orderBy, setOrderBy] = useState('new');
  const [selectedDate, setSelectedDate] = useState('2024-12-18');

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
          { name: 'Qoniqarsiz', value: rainbow.unsatisfactory },
          { name: 'Qoniqarli', value: rainbow.satisfactory },
          { name: 'Yuqori', value: rainbow.high }
        ];
        setPieData(transformedPieData);
        setProgressData(liner);
      }
    };

    fetchStatistics();
  }, [selectedYear]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-4">
      <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-8">
        {/* Left Section - Video Courses */}
        <div className="lg:col-span-7">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">Video kurslar</h1>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50">
              Batafsil
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Saralash:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="new">Eng yangi</option>
                <option value="old">Eng eski</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Sana</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {
              courses.length !== 0 ? (
                courses.map(course => (
                  <div key={course.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={course.image}
                        alt=""
                        className='w-full md:w-48 h-32 bg-gray-200 rounded-md object-cover object-center'
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                        <div
                          className="text-gray-600 mb-4 line-clamp-3"
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
                            <Calendar className="w-4 h-4" />
                            {course.video_length} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <h1 className="text-2xl font-bold">No data found</h1>
                </div>
              )
            }
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          {/* Pie Chart Card */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Idoralar ochiqlik indeksi</h2>
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

            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
              {/* Legend */}
              <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-start gap-4 sm:gap-6 order-2 sm:order-1">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1 h-8 mg:h-12 rounded-sm" style={{ backgroundColor: COLORS[2 - index] }}></div>
                    <div>
                      <div className="text-gray-500 text-[12px] md:text-sm">{item.name}</div>
                      <div className="text-[14px] md:text-xl font-semibold">{item.value}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="w-full sm:w-auto flex justify-center sm:justify-end flex-1 order-1 sm:order-2">
                <PieChart width={280} height={150} className="sm:scale-110 -mt-4">
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

          {/* Progress Bars Card */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[14px] md:text-lg font-semibold text-gray-800">
                Faoliyat samaradorligi reytingi
              </h2>
              {/* <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-[14px] md:text-base">
                Eng baland
                <ChevronDown className="w-4 h-4" />
              </button> */}
            </div>

            <div className="space-y-5">
              {progressData.map((item, index) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 flex-1 pr-4">{item.name}</span>
                    <span className="font-semibold text-[#27D157] text-base sm:text-lg">{item.percentage}</span>
                  </div>
                  <div className="w-full bg-[#D7EBDD] rounded-full h-2.5">
                    <div
                      className="bg-[#27D157] h-2.5 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCourseDashboard;