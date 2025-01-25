import React, { useState, useEffect } from 'react';
import { Eye, Calendar } from 'lucide-react';
import { sendRequest } from '../utils/apiFunctions';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsGrid = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const { i18n } = useTranslation();

  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };

  const months = t('months', { returnObjects: true });

  useEffect(() => {
    const fetchNews = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: 'services/news/',
        params: {
          popular: false
        }
      });

      if (response.success && response.data.ok) {
        setNews(response.data.result.content);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const NewsGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <div key={item} className="flex bg-white rounded-lg shadow-sm p-3 animate-pulse">
          <div className="w-24 h-24 flex-shrink-0">
            <div className="w-full h-full bg-gray-200 rounded-lg"></div>
          </div>

          <div className="ml-3 flex flex-col flex-grow">
            <div className="space-y-2 mb-auto">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div className="flex justify-between text-gray-500 text-xs bg-[#F9F9F9] p-3 rounded-[8px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-8 h-3 bg-gray-200 rounded"></div>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
            {t('news.title')}
          </h1>
        </div>

        {news.length === 0 ? (
          <NewsGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((item) => (
              <Link to={getLocalizedPath(`/news/${item.id}`)} key={item.id}>
                <div key={item.id} className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="ml-3 flex flex-col flex-grow">
                    <h3 className="text-sm font-medium mb-auto line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex justify-between text-gray-500 text-xs bg-[#F9F9F9] p-3 rounded-[8px]">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{item.views}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(item.published_date)}</span>
                      </div>
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

export default NewsGrid;