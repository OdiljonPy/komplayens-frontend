import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

import DocumentsCarousel from '../components/DocumentsCarousel';
import LinksCarousel from '../components/LinksCarousel';
import NewsGrid from '../sections/NewsGrid';
import { sendRequest } from '../utils/apiFunctions';

import { ChevronRight } from 'lucide-react'
import VideoCourseDashboard from '../sections/VideoCourseDashboard'

function UsefulResources() {
  const { t } = useTranslation();
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/about/',
          params: { type: 3 }
        });

        if (response.success) {
          setMainData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching main data:', error);
      }
    };

    fetchMainData();
  }, []);

  const documents = [
    { id: 1, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 2, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 3, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 4, name: 'korrupsiya.pdf', size: '120 KB' },
  ];

  const tests = [
    { id: 1, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 2, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 3, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 4, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 5, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
    { id: 6, name: "O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi" },
  ];
  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>{t('pages.handouts.breadcrumb.home')}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-blue-900">{t('pages.handouts.breadcrumb.resources')}</span>
      </div>

      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6">
        {t('pages.handouts.breadcrumb.resources')}
      </h1>

      {/* Main Card */}
      <div className="mb-6 py-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={mainData?.image}
              alt={mainData?.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{mainData?.title}</h2>
            <p className="text-gray-600 mb-4">
              {mainData?.short_description}
            </p>
          </div>
        </div>
      </div>
      <DocumentsCarousel documents={documents} />
      <NewsGrid />
      <VideoCourseDashboard />
      <LinksCarousel tests={tests} />
    </div>
  )
}

export default UsefulResources