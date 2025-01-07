import React from 'react';
import { Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import banner from "../assets/banners/04.png"

const VideoCourseDashboard = () => {
  const pieData = [
    { name: 'Part 1', value: 44.55 },
    { name: 'Part 1', value: 38.56 },
    { name: 'Part 1', value: 30.12 }
  ];

  const lineData = [
    { name: 'Noyabr', actual: 15000, predicted: 12000 },
    { name: '', actual: 17000, predicted: 14000 },
    { name: '', actual: 13000, predicted: 16000 },
    { name: '', actual: 19000, predicted: 15000 },
    { name: '', actual: 16000, predicted: 18000 },
    { name: 'Dekabr', actual: 20000, predicted: 19000 },
  ];

  const COLORS = ['#1e40af', '#22c55e', '#6b7280'];

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

  const formatYAxis = (value) => {
    return `${value / 1000}k`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-8">
        {/* Left Section */}
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
        <div className="lg:col-span-5 lg:space-y-6 md:space-y-4 space-y-2">
          {/* Pie Chart Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm h-86" style={{
            paddingBottom: "0"
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Infografika</h2>
              <span className="text-sm text-gray-500">1-31 Mart, 2024</span>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-4">
              <div className="flex flex-row gap-2 md:gap-0 md:flex-col justify-between space-y-2">
                <div key={0} className="flex items-center gap-2">
                  <div className="w-1 h-12 rounded-sm" style={{ backgroundColor: COLORS[2] }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-col">
                      <span className="text-gray-600 text-[14px]">Part 1</span>
                      <span className="font-medium text-[18px] md:text-[24px]">{pieData[2].value}%</span>
                    </div>
                  </div>
                </div>
                <div key={1} className="flex items-center gap-2">
                  <div className="w-1 h-8 rounded-sm" style={{ backgroundColor: COLORS[1] }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-col">
                      <span className="text-gray-600 text-[14px]">Part 1</span>
                      <span className="font-medium text-[18px] md:text-[24px]">{pieData[1].value}%</span>
                    </div>
                  </div>
                </div>
                <div key={2} className="flex items-center gap-2">
                  <div className="w-1 h-8 rounded-sm" style={{ backgroundColor: COLORS[0] }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-col">
                      <span className="text-gray-600 text-[14px]">Part 1</span>
                      <span className="font-medium text-[18px] md:text-[24px]">{pieData[0].value}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <PieChart width={220} height={220} className="md:scale-125">
                  <Pie
                    data={pieData}
                    cx={96}
                    cy={110}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>

          {/* Line Chart Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm h-86">
            <div className="flex justify-start h-full">
              <LineChart
                width={350}
                height={300}
                data={lineData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                className="md:scale-110"
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e40af" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ dy: 10 }}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 25000]}
                  ticks={[0, 5000, 10000, 15000, 20000, 25000]}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: 'white'
                  }}
                  labelStyle={{ color: 'white' }}
                  cursor={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#1e40af"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#1e40af' }}
                  fill="url(#colorUv)"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#f97316' }}
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCourseDashboard;