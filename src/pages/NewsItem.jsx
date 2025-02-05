import React, { useEffect, useState } from 'react';
import { Calendar, Eye, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendRequest } from '../utils/apiFunctions';

const NewsItemSkeleton = () => (
  <div className="px-4 pt-16 md:pt-0 bg-gray-50 animate-pulse">
    {/* Navigation skeleton */}
    <div className="py-3 md:py-4 pt-0 overflow-x-auto">
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-1">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            {item < 3 && <div className="h-4 w-4 bg-gray-200 rounded"></div>}
          </div>
        ))}
      </div>
    </div>

    {/* Title skeleton */}
    <div className="py-4 pb-0">
      <div className="h-7 w-3/4 bg-gray-200 rounded mb-6 md:mb-10"></div>
    </div>

    {/* Hero Image skeleton */}
    <div className="relative h-64 md:h-96">
      <div className="absolute inset-0 rounded-lg bg-gray-200"></div>
    </div>

    {/* Main Content skeleton */}
    <main className="px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article Content skeleton */}
        <div className="lg:col-span-2">
          {/* Short description skeleton */}
          <div className="mb-6">
            {[1, 2].map((line) => (
              <div key={line} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            ))}
          </div>

          {/* Main description skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((paragraph) => (
              <div key={paragraph}>
                {[1, 2, 3].map((line) => (
                  <div key={line} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="lg:col-span-1">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex space-x-4 bg-white shadow p-3 rounded-lg">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

const NewsItem = () => {
  const { t, i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const months = t('months', { returnObjects: true });


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  const { newsId } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsData();
    }
  }, [newsId]);

  if (loading) return <NewsItemSkeleton />;
  if (!newsData) return null;

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 pt-16 md:pt-0 bg-gray-50">
        {/* Navigation */}
        <div className="py-3 md:py-4 pt-0 overflow-x-auto">
          <div className="text-sm text-gray-600 flex items-center gap-1 whitespace-nowrap min-w-max">
            <span>{t('pages.newsItem.breadcrumb.home')}</span>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to={getLocalizedPath("/violations")} className='text-gray-400'>{t('pages.newsItem.breadcrumb.news')}</Link>
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
              <h2 className="text-lg font-semibold mb-4">{t('pages.newsItem.relatedNews')}</h2>
              <div className="space-y-4">
                {newsData.additional.map((item) => (
                  <Link
                    to={getLocalizedPath(`/news/${item.id}`)}
                    key={item.id}
                    className="flex space-x-4 bg-white shadow hover:bg-gray-100 p-3 rounded-lg"
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
                          <Calendar size={12} />
                          <span>
                            {formatDate(item.published_date)}
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
    </div>
  );
};

export default NewsItem;