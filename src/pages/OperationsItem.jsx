
import React, { useRef } from 'react';
import { MessageSquare, Plus } from 'lucide-react';

const OperationsItem = () => {
  const commentRef = useRef(null);

  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const comments = [
    {
      id: 1,
      name: "Ism Familia",
      date: "21.01.2020",
      text: "Etika va korrupsiyaga qarshi kurash o'zaro chambarchas bog'liq bo'lib, ular jamiyatning ijtimoiy, iqtisodiy va madaniy rivojlanishida muhim ahamiyat kasb etadi. Etika — bu jamiyatda qabul qilingan odob-axloq me'yorlari va qoidalarga asoslangan, insonlar o'rtasidagi munosabatlarni boshqaruvchi tamoyillar tizimidir. Korrupsiya esa ushbu tamoyillarga zid ravishda, jamiyatning adolat va tenglikka asoslangan tartibini buzadigan jiddiy muammo hisoblanadi."
    },
    {
      id: 2,
      name: "Ism Familia",
      date: "21.01.2021",
      text: "Etika va korrupsiyaga qarshi kurash o'zaro chambarchas bog'liq bo'lib, ular jamiyatning ijtimoiy, iqtisodiy va madaniy rivojlanishida muhim ahamiyat kasb etadi. Etika — bu jamiyatda qabul qilingan odob-axloq me'yorlari va qoidalarga asoslangan, insonlar o'rtasidagi munosabatlarni boshqaruvchi tamoyillar tizimidir. Korrupsiya esa ushbu tamoyillarga zid ravishda, jamiyatning adolat va tenglikka asoslangan tartibini buzadigan jiddiy muammo hisoblanadi."
    },
    {
      id: 3,
      name: "Siz",
      date: "21.01.2022",
      text: "Etika va korrupsiyaga qarshi kurash o'zaro chambarchas bog'liq bo'lib, ular jamiyatning ijtimoiy, iqtisodiy va madaniy rivojlanishida muhim ahamiyat kasb etadi. Etika — bu jamiyatda qabul qilingan odob-axloq me'yorlari va qoidalarga asoslangan, insonlar o'rtasidagi munosabatlarni boshqaruvchi tamoyillar tizimidir. Korrupsiya esa ushbu tamoyillarga zid ravishda, jamiyatning adolat va tenglikka asoslangan tartibini buzadigan jiddiy muammo hisoblanadi."
    }
  ];

  return (
    <div className="p-4">
      {/* Header Section with blue line */}
      <header >
        <div className=" px-4 sm:px-6 py-6 flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] ">
            Etika Masalalari Va Korrupsiyaga Qarshi Kurash: Jamiyatda Odob-Axloqni Mustahkamlash
          </h1>
          <span className="text-blue-600 text-sm bg-blue-50 px-3 rounded">Davlat xizmati</span>
        </div>
      </header>

      <main className=" px-4 sm:px-6 py-6 space-y-6">
        {/* Dilemma Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex">
            <div className="w-1 bg-[#3982f771] rounded-l-lg"></div>
            <div className="px-6 py-5 flex-1">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Dilemma</h2>
              <p className="text-gray-600 text-base mb-6">
                Ushbu keysda davlat xizmatchisining shaxsiy manfaatlari va xizmat vazifalari o'rtasidagi ziddiyat tahlil qilinadi.
              </p>
              <div className="flex items-center gap-6">
                <button
                  onClick={scrollToComment}
                  className="flex items-center gap-2 text-gray-600 border rounded-md border-[#024072] px-3 py-2 hover:border-blue-600 hover:text-blue-600"
                >
                  <Plus size={20} />
                  <span className="text-sm">Kommentariya qo'shish</span>
                </button>
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageSquare size={20} />
                  <span className="text-sm">32</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Analysis Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex">
            <div className="p-6 flex-1">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Ekspert xulosasi</h2>
              {/* Expert content */}
              <p className="text-gray-600 text-base mb-6">
                Etika va korrupsiyaga qarshi kurash o‘zaro chambarchas bog‘liq bo‘lib, ular jamiyatning ijtimoiy, iqtisodiy va madaniy rivojlanishida muhim ahamiyat kasb etadi. Etika — bu jamiyatda qabul qilingan odob-axloq me’yorlari va qoidalarga asoslangan, insonlar o‘rtasidagi munosabatlarni boshqaruvchi tamoyillar tizimidir. Korrupsiya esa ushbu tamoyillarga zid ravishda, jamiyatning adolat va tenglikka asoslangan tartibini buzadigan jiddiy muammo hisoblanadi.
                <br />
                <br />
                Etika va korrupsiya: o‘zaro bog‘liqlik
                Etika me’yorlariga rioya qilish, birinchi navbatda, jamiyatda ishonch muhitini yaratadi. Davlat idoralari va jamoat tashkilotlari odob-axloq qoidalariga qat’iy rioya qilsa, fuqarolar davlat institutlariga nisbatan ishonchni oshiradi. Aksincha, korrupsiya jamiyatda adolatsizlik va tengsizlikni kuchaytirib, fuqarolarning davlatga bo‘lgan ishonchini yo‘qotishiga olib keladi.


              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow-sm">
              <div className="flex">
                <div className="w-1 bg-[#B9B9B9] rounded-l-lg"></div>
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-medium ${comment.name === 'Siz' ? 'text-blue-600' : 'text-gray-900'}`}>
                      {comment.name}
                    </span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="bg-white rounded-lg shadow-sm" ref={commentRef}>
          <div className="flex">
            <div className="p-6 flex-1">
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Kommentariya qo'shish"
              ></textarea>
              <div className="mt-4 flex justify-between items-center">
                <button className="flex items-center gap-2 text-gray-600 border border-[#024072] rounded-md px-3 py-2 hover:border-[#024072] hover:text-[#024072]">
                  <Plus size={20} />
                  <span>Kommentariya qoldirish</span>
                </button>
                <span className="text-gray-400 text-sm">0/460</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperationsItem;