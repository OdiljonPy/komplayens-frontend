import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions'; // Adjust path as needed
import { useTranslation } from 'react-i18next';

const BenefitsCalculator = () => {
  const { t } = useTranslation();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#024072]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
        {t('pages.benefits.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="overflow-hidden rounded-[24px]">
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
            <Link to="/benefits/shablon1">
              <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                {t('pages.benefits.form1.buttonText')}
              </button>
            </Link>
            <Link to="/benefits/shablon2">
              <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                {t('pages.benefits.form2.buttonText')}
              </button>
            </Link>
            <Link to="/benefits/shablon3">
              <button className="bg-[#024072] w-full text-white px-4 py-2 rounded-[12px] hover:bg-blue-900 transition-colors">
                {t('pages.benefits.form3.buttonText')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCalculator;