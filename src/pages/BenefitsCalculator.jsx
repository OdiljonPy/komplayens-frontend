import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

const BenefitsCalculator = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const [aboutData, setAboutData] = useState({
    title: '',
    short_description: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await sendRequest({
          method: 'GET',
          url: '/about/',
          params: { type: 1 }
        });

        if (response.success && response.data.ok) {
          setAboutData(response.data.result);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const BenefitsCalculatorSkeleton = () => (
    <div className="px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6 animate-pulse">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            {item < 3 && <div className="h-4 w-2 bg-gray-200 rounded">/</div>}
          </div>
        ))}
      </div>

      {/* Title skeleton */}
      <div className="h-7 w-64 bg-gray-200 rounded mb-10 animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section skeleton */}
        <div className="h-[400px] bg-gray-200 rounded-[24px] max-h-[320px] animate-pulse"></div>

        {/* Content Section skeleton */}
        <div className="space-y-4 animate-pulse">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>

          {/* Description skeleton - multiple lines */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Buttons skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-10 bg-gray-200 rounded-[12px]"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <BenefitsCalculatorSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 py-8 pt-14 md:pt-0">
        <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
          {t('pages.benefits.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="overflow-hidden rounded-[24px] max-h-[320px]">
            <img src={aboutData.image} alt={aboutData.title} className="w-full h-full object-cover" />
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {aboutData.title}
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {aboutData.short_description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <Link to={getLocalizedPath("/benefits/shablon1")}>
                <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                  {t('pages.benefits.button1')}
                </button>
              </Link>
              <Link to={getLocalizedPath("/benefits/shablon2")}>
                <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                  {t('pages.benefits.button2')}
                </button>
              </Link>
              <Link to={getLocalizedPath("/benefits/shablon3")}>
                <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                  {t('pages.benefits.button3')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCalculator;