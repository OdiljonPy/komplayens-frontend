import React, { useState, useEffect } from 'react';
import { Eye, Calendar } from 'lucide-react';
import { sendRequest } from '../utils/apiFunctions';
import { Link } from 'react-router-dom';

const NewsGrid = () => {
  const [news, setNews] = useState([]);

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
    const months = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel',
      'May', 'Iyun', 'Iyul', 'Avgust',
      'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="w-full p-4 my-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
          Yangiliklar
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <Link to={`/news/${item.id}`}>
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
    </div>
  );
};

export default NewsGrid;