import React, { useEffect, useState } from 'react';
import { Clock, Eye, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';

const NewsItem = () => {
  const { newsId } = useParams();
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: `/services/news/${newsId}/`
        });

        if (response.success) {
          setNewsData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    if (newsId) {
      fetchNewsData();
    }
  }, [newsId]);

  if (!newsData) return null;

  return (
    <div className="p-4 bg-gray-50">
      {/* Navigation */}
      <div className="py-3 md:py-4 pt-0">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>Bosh sahifa</span>
          <ChevronRight size={16} className="text-gray-400" />
          <Link to="/violations" className='text-gray-400'>Yangiliklar</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className='text-[#024072]'>{newsData.title}</span>
        </div>
      </div>

      <div className="py-4 pb-0">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          {newsData.title}
        </h1>
      </div>

      {/* Hero Section with Image */}
      <div className="relative h-64 md:h-96">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <img
            src={newsData.image}
            alt={newsData.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              {/* Short description */}
              <p className="text-gray-600 mb-6">
                {newsData.short_description}
              </p>

              {/* Main description */}
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: newsData.description }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Boshqa Yangiliklar</h2>
            <div className="space-y-4">
              {newsData.additional.map((item) => (
                <Link
                  to={`/news/${item.id}`}
                  key={item.id}
                  className="flex space-x-4 bg-white rounded-lg shadow hover:bg-gray-100 p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(item.published_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsItem;