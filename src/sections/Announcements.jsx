import React, { useEffect, useState } from 'react';
import { Eye, Calendar } from 'lucide-react';
import banner from "../assets/banners/05.png"
import { useTranslation } from 'react-i18next';

import { sendRequest } from '../utils/apiFunctions';


const Announcements = () => {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // API dan ma'lumotlarni olish
    const fetchAnnouncements = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: '/services/announcement/?popular=true' // sendRequest dan foydalanish
      });

      if (response.success && response.data.ok) {
        setAnnouncements(response.data.result.content); // Olingan ma'lumotlarni set qilish
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="w-full p-4 mt-4">
      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">
        {t('announcements.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {announcements.map((announcement, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-3">
              <img
                src={announcement.image || banner}
                alt="Seminar"
                className="w-full h-full max-h-[200px] object-cover rounded-[8px]"
              />
            </div>

            <div className="px-4 pb-4">
              <h3 className="text-base font-medium mb-3 text-[#595959]">
                {announcement.title || "Default Title"}
              </h3>

              <div className="flex justify-between text-[#595959] text-sm bg-[#F9F9F9] p-4 rounded-[8px]">
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{announcement.views || 0}</span>
                </div>

                <div className="flex items-center gap-1 text-[#595959]">
                  <Calendar size={14} />
                  <span>{announcement.date || ""}</span>
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