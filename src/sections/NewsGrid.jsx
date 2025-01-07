import React from 'react';
import { Eye, Calendar } from 'lucide-react';
import banner from "../assets/banners/06.png"

const NewsGrid = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-4 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">Yangiliklar</h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3">
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={banner}
                alt="News"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="ml-3 flex flex-col flex-grow">
              <h3 className="text-sm font-medium mb-auto">
                Korrupsiyaga Qarshi Kurashda Yangi Qonun Qabul Qilindi
              </h3>

              <div className="flex justify-between text-gray-500 text-xs bg-[#F9F9F9] p-3 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>228</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>Avgust 18, 2024</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;