import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendRequest } from '../utils/apiFunctions';

const CorruptionRisksItem = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/services/corruption/1/',
        });

        if (response.success) {
          setData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />

          {/* Image skeleton */}
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 animate-pulse" />

          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>

          {/* Date skeletons */}
          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          </div>

          <div className="mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse mb-4" />

          {/* Results skeleton */}
          <div className="mt-4">
            <div className="h-6 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" p-6">
        <h1 className="text-2xl font-bold mb-4">{data.name}</h1>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <p className="text-gray-600 mb-4">{data.short_desc}</p>

        <div className="mb-4">
          <p className="font-semibold">Start Date:</p>
          <p>{new Date(data.start_date).toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold">End Date:</p>
          <p>{new Date(data.end_date).toLocaleDateString()}</p>
        </div>

        {data.form_url && (
          <a
            href={data.form_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            {t('Open Form')}
          </a>
        )}

        {data.result && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">{t('Results')}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.result }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CorruptionRisksItem;