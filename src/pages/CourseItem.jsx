import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendRequest } from '../utils/apiFunctions';
import pdf from "../assets/icons/pdf.png";

const CourseItemSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 md:px-0 animate-pulse">
    {/* Breadcrumb skeleton */}
    <div className="py-2 flex items-center gap-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          {item < 3 && <div className="h-4 w-2 bg-gray-200 rounded">›</div>}
        </div>
      ))}
    </div>

    <div className="py-6">
      {/* Video player skeleton */}
      <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden h-96 mb-8"></div>

      {/* Title skeleton */}
      <div className="h-7 w-3/4 bg-gray-200 rounded mb-6 md:mb-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Description skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3, 4].map((line) => (
            <div key={line} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>

        {/* Materials skeleton */}
        <div className="space-y-8">
          {/* PDF Materials */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Materials */}
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="space-y-4">
                {[1, 2].map((video) => (
                  <div key={video} className="flex items-start space-x-3">
                    <div className="w-24 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CourseItem = () => {
  const { t, i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: `/services/training/${courseId}/`
      });

      if (response.success) {
        setCourseData(response.data.result);
      }
      setLoading(false);
    };

    fetchCourseData();
    window.scrollTo(0, 0);
  }, [courseId]);

  if (loading) return <CourseItemSkeleton />;
  if (!courseData) return <div>{t('pages.courseItem.loading')}</div>;

  // Extract video ID from YouTube URL
  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('?')[0].split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 pt-14 md:pt-0">
        <div className="py-2 text-sm text-gray-600 overflow-x-auto">
          <div className="flex items-center min-w-max">
            <span>{t('pages.courseItem.breadcrumb.home')}</span>
            <span className="mx-2">›</span>
            <Link to={getLocalizedPath("/training-courses")} className="text-[#024072]">
              {t('pages.courseItem.breadcrumb.materials')}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-[#024072]">{t('pages.courseItem.breadcrumb.course')}</span>
          </div>
        </div>

        <div className="py-6">
          <div className="relative w-full bg-black rounded-lg overflow-hidden h-96 mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getYoutubeEmbedUrl(courseData.video)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
            {courseData.name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div dangerouslySetInnerHTML={{ __html: courseData.description }} className="text-gray-700" />
            </div>

            <div className="space-y-8">
              {courseData.materials.filter(material => material.type === "PDF").length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-4">{t('pages.courseItem.additionalMaterials')}</h3>
                  <div className="space-y-4">
                    {courseData.materials.filter(material => material.type === "PDF").map((material) => (
                      <div key={material.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={pdf} alt="pdf" className="w-6 h-6" />
                          <div>
                            <p className="text-sm font-medium">{material.filename}</p>
                          </div>
                        </div>
                        <a href={material.file} download className="text-blue-600 hover:text-blue-700">
                          <Download size={20} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {courseData.materials.filter(material => material.type === "MP4").length > 0 && (
                <div>
                  <h3 className="font-semibold">{t('pages.courseItem.videoMaterials')}</h3>
                  <div className="bg-white p-4 rounded-lg shadow mt-4">
                    <div className="space-y-4">
                      {courseData.materials.filter(material => material.type === "MP4").map((video) => (
                        <div key={video.id} className="flex items-start space-x-3">
                          <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={courseData.image}
                              alt={video.video_title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 line-clamp-2 mb-1">{video.video_title}</p>
                            <a href={video.video} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline">
                              {t('pages.courseItem.watch')}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;