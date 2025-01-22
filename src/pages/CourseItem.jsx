import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';

const CourseItem = () => {
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: `/services/training/${courseId}/`
      });

      if (response.success) {
        setCourseData(response.data.result);
      }
    };

    fetchCourseData();
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!courseData) return <div>Loading...</div>;

  // Extract video ID from YouTube URL
  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('?')[0].split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="py-2 text-sm text-gray-600">
        <span>Bosh sahifa</span>
        <span className="mx-2">›</span>
        <Link to="/training-courses" className="text-[#024072]">O'quv-uslubiy materiallar</Link>
        <span className="mx-2">›</span>
        <span className="text-[#024072]">Korrupsiyaga qarshi kurash asoslari</span>
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
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Qo'shimcha Materiallar</h3>
              <div className="space-y-4">
                {
                  courseData.materials.filter(material => material.type === "PDF").length !== 0 ? (
                    courseData.materials.filter(material => material.type === "PDF").map((material) => (
                      <div key={material.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium uppercase">{material.type}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{material.filename}</p>
                          </div>
                        </div>
                        <a href={material.file} download className="text-blue-600 hover:text-blue-700">
                          <Download size={20} />
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center">
                      <h1 className="text-2xl font-bold">No data found</h1>
                    </div>
                  )
                }
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Video Materiallar</h3>
              <div className="bg-white p-4 rounded-lg shadow mt-4">
                <div className="space-y-4">
                  {courseData.materials.filter(material => material.type === "MP4").length !== 0 ? (
                    courseData.materials.filter(material => material.type === "MP4").map((video) => (
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
                            Ko'rish
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center">
                      <h1 className="text-2xl font-bold">No data found</h1>
                    </div>
                  )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;