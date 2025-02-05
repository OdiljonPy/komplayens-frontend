import React, { useEffect, useState } from 'react';
import { Eye, Calendar } from 'lucide-react';
import banner from "../assets/banners/05.png"
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { sendRequest } from '../utils/apiFunctions';



const Announcements = () => {
  const { t, i18n } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);

  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const months = t('months', { returnObjects: true });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

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

  const AnnouncementsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
          <div className="p-3">
            <div className="w-full h-[200px] bg-gray-200 rounded-[8px]"></div>
          </div>

          <div className="px-4 pb-4">
            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>

            {/* Stats bar skeleton */}
            <div className="flex justify-between text-sm bg-[#F9F9F9] p-4 rounded-[8px]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full mt-8">
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">
          {t('announcements.title')}
        </h1>

        {announcements.length === 0 ? (
          <AnnouncementsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {announcements.map((announcement, idx) => (
              <Link to={getLocalizedPath(`/announcements/${announcement.id}`)} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow" key={idx}>
                <div className="p-3">
                  <img
                    src={announcement.image || banner}
                    alt="Seminar"
                    className="w-full h-[200px] object-cover rounded-[8px]"
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


                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(announcement.published_date)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;