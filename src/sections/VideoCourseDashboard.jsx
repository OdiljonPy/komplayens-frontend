import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import banner from "../assets/banners/04.png"

const VideoCourseDashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2024-yil');

  const pieData = [
    { name: 'Qoniqarsiz', value: 44.55 },
    { name: 'Qoniqarli', value: 38.56 },
    { name: 'Yuqori', value: 32.00 }
  ];

  const progressData = [
    { name: "Markaziy bank", value: 93 },
    { name: "O'zkimyosanoat AJ", value: 90 },
    { name: "O'zbekiston texnik jihatdan tartibga solish agentligi", value: 89 },
    { name: "O'zbekneftgaz AJ", value: 88 },
    { name: "O'zbekiston temir yo'llari AJ", value: 87 }
  ];

  const COLORS = ['#ef4444', '#eab308', '#22c55e'];

  const courseData = [
    {
      id: 1,
      title: "Korrupsiyaga Qarshi Kurash Asoslari",
      description: "Ushbu Kurs Korrupsiya Tushunchasi, Uning Asosiy Turlari Va Ijtimoiy-Iqtisodiy Oqibatlari Haqida Keng Qamrovli Bilim Beradi.",
      views: 228,
      date: "Avgust 18, 2024"
    },
    {
      id: 2,
      title: "Korrupsiyaga Qarshi Kurash Asoslari",
      description: "Ushbu Kurs Korrupsiya Tushunchasi, Uning Asosiy Turlari Va Ijtimoiy-Iqtisodiy Oqibatlari Haqida Keng Qamrovli Bilim Beradi.",
      views: 228,
      date: "Avgust 18, 2024"
    },
    {
      id: 3,
      title: "Korrupsiyaga Qarshi Kurash Asoslari",
      description: "Ushbu Kurs Korrupsiya Tushunchasi, Uning Asosiy Turlari Va Ijtimoiy-Iqtisodiy Oqibatlari Haqida Keng Qamrovli Bilim Beradi.",
      views: 228,
      date: "Avgust 18, 2024"
    }
  ];

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
              <select className="w-full p-2 border rounded-md">
                <option>Eng yangi</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Sana</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                defaultValue="2024-12-18"
              />
            </div>
          </div>

          <div className="space-y-4">
            {courseData.map(course => (
              <div key={course.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <img src={banner} alt="" className='w-full md:w-48 h-32 bg-gray-200 rounded-md object-cover object-center' />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
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
                        {course.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          {/* Pie Chart Card */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Idoralar ochiqlik indeksi</h2>
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-base sm:text-lg">
                2024-yil
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
              {/* Legend */}
              <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-start gap-4 sm:gap-6 order-2 sm:order-1">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1 h-8 mg:h-12 rounded-sm" style={{ backgroundColor: COLORS[2 - index] }}></div>
                    <div>
                      <div className="text-gray-500 text-[12px] md:text-sm">{item.name}</div>
                      <div className="text-[14px]  md:text-xl  font-semibold">{item.value}%</div>
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
              <h2 className="text-[14px] md:text-lg  font-semibold text-gray-800">
                Faoliyat samaradorligi reytingi
              </h2>
              <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-[14px] md:text-base">
                Eng baland
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 flex-1 pr-4">{item.name}</span>
                    <span className="font-semibold text-[#27D157] text-base sm:text-lg">{item.value}</span>
                  </div>
                  <div className="w-full bg-[#D7EBDD] rounded-full h-2.5">
                    <div
                      className="bg-[#27D157] h-2.5 rounded-full"
                      style={{ width: `${item.value}%` }}
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