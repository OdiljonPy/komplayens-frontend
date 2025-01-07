import React from 'react';
import { Eye, Calendar } from 'lucide-react';
import banner from "../assets/banners/05.png"

const Announcements = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 py-4 mt-4">
      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">E'lonlar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-3">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={banner}
                  alt="Seminar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="px-4 pb-4">
              <h3 className="text-base font-medium mb-3 text-gray-800">
                Korrupsiyaga Qarshi Kurash Bo'yicha O'quv Seminari – 15 Dekabr
              </h3>

              <div className="flex justify-between text-gray-500 text-sm bg-[#F9F9F9] p-4 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>228</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={14} />
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

export default Announcements;