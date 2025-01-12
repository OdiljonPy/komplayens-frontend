

import React from 'react';
import { Clock, Eye, ChevronRight } from 'lucide-react';
import banner from "../assets/banners/09.png"
import banner04 from "../assets/banners/04.png"
import { Link } from 'react-router-dom';

const NewsItem = () => {
  return (
    <div className="p-4 bg-gray-50">
      {/* Navigation */}
      <div className="py-3 md:py-4 pt-0">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>Bosh sahifa</span>
          <ChevronRight size={16} className="text-gray-400" />
          <Link to="/violations" className='text-gray-400'>Yangiliklar</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className='text-[#024072]'>Korrupsiyaga Qarshi Kurashda Yangi Qonun Qabul Qilindi</span>
        </div>
      </div>

      <div className="py-4 pb-0 ">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          Korrupsiyaga qarshi kurashda yangi qonun qabul qilindi
        </h1>
      </div>

      {/* Hero Section with Image */}
      <div className="relative h-64 md:h-96">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <img
            src={banner}
            alt="Anti-corruption law"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Korrupsiya jamiyat rivojlanishiga katta to'sqinlik qiluvchi muammolardan biridir. Bu nafaqat iqtisodiy yo'qotishlarga, balki ijtimoiy adolatsizlik va davlatga bo'lgan ishonchning pasayishiga olib keladi.
              </p>

              <h2 className="text-xl font-semibold mb-4">Korrupsiya tushunchasi</h2>
              <p className="text-gray-600 mb-6">
                Korrupsiya - bu shaxsning mansab vakolatlarini suiiste'mol qilishi orqali shaxsiy manfaatlarini ko'zlashidir.
              </p>

              <h2 className="text-xl font-semibold mb-4">Korrupsiyaning salbiy oqibatlari</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Iqtisodiy zarar: Mamlakatning iqtisodiy resurslari noto'g'ri taqsimlanadi</li>
                <li>Ijtimoiy adolatsizlik: Fuqarolar orasida tengsizlik kuchayadi</li>
                <li>Davlatga bo'lgan ishonchning pasayishi: Davlat institutlarining samaradorligi pasayadi</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4">Korrupsiyaga qarshi kurashning asosiy tamoyillari</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Ochiqlik va shaffofilik: Davlat va jamiyat faoliyatida shaffoflikni ta'minlash</li>
                <li>Huquqiy ta'minot: Korrupsiyaga qarshi qonunchilikni takomillashtirish</li>
                <li>Fuqarolik nazorati: Jamiyatning korrupsiyaga qarshi kurashda ishtirokini kuchaytirish</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Boshqa Yangiliklar</h2>
            <div className="">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-4 bg-white rounded-lg shadow hover:bg-gray-100 p-3 rounded-lg">
                    <img
                      src={banner04}
                      alt="News thumbnail"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">Korrupsiyaga Qarshi Kurashda Yangi Qonun Qabul Qilindi</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>228</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Avgust 18, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsItem;