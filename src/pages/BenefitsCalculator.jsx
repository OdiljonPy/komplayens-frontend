import React from 'react';
import banner from '../assets/banners/08.png'
import { Link } from 'react-router-dom'

const BenefitsCalculator = () => {
  return (
    <div className=" px-4 py-8 ">
      <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
        Manfaatlar To'qnashuvi
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="overflow-hidden">
          <img src={banner} alt="banner" className="w-full h-full object-cover" />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Jarayoni Haqida
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Kasbiy Odob-Axloq Qoidalari — Bu Har Bir Soha Mutaxassisining O'z Faoliyatida Amal Qilishi Lozim Bo'lgan Axloqiy Tamoyillar Va Me'yorlar To'plamidir. Ushbu Qoidalar Xodimning Professional Muhitda O'zini Qanday Tutishi, Hamkasblar, Mijozlar Va Rahbariyat Bilan Munosabatlar O'rnatishiga Yordam Beradi.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Amaliyot Davomida Kasbiy Odob-Axloq Qoidalarini O'rganish Va Ularga Rioya Qilish:
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-600">Mas'uliyatni Oshiradi: Ish Jarayonida Xatoliklarni Kamaytiradi Va Samaradorlikni Oshiradi.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-600">Ishonchni Mustahkamlaydi: Hamkasblar Va Mijozlar Orasida Ishonchli Va Professional Imidj Yaratadi.</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <Link to="/benefits/1">
              <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                Forma 1 yaratish
              </button>
            </Link>
            <Link to="/benefits/2">
              <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                Forma 2 yaratish
              </button>
            </Link>
            <Link to="/benefits/3">
              <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                Forma 3 yaratish
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCalculator;