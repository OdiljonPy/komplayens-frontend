import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CorruptionRisksItemSkeleton = () => (
  <div className="w-full p-4 animate-pulse">
    {/* Breadcrumb skeleton */}
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          {item < 3 && <div className="h-4 w-4 bg-gray-200 rounded"></div>}
        </div>
      ))}
    </div>

    {/* Title skeleton */}
    <div className="h-7 w-3/4 bg-gray-200 rounded mb-4"></div>

    {/* Participants count skeleton */}
    <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>

    {/* Questions skeleton */}
    <div className="space-y-8">
      {[1, 2, 3].map((questionNumber) => (
        <div key={questionNumber} className="space-y-4">
          {/* Question title */}
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>

          {/* Answer options */}
          <div className="space-y-2">
            {[1, 2, 3].map((answer) => (
              <div key={answer} className="h-5 w-1/2 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CorruptionRisksItem = () => {
  const { t, i18n } = useTranslation();
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };

  return (
    <>
      {loading ? (
        <CorruptionRisksItemSkeleton />
      ) : (
        <div className="w-full p-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>{t('pages.corruptionRisks.breadcrumb.home')}</span>
            <ChevronRight className="h-4 w-4" />
            <Link to={getLocalizedPath("/corruption-risks")}>
              <span>{t('pages.corruptionRisks.breadcrumb.risks')}</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-blue-500">{t('pages.corruptionRisks.breadcrumb.results')}</span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">
            {t('pages.corruptionRisks.results')}
          </h1>
          <div className="mb-8 text-lg">
            {t('pages.corruptionRisks.survey.participants', { count: 125 })}
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {[1, 2, 3].map((questionNumber) => (
              <div key={questionNumber} className="space-y-4">
                <h2 className="text-gray-800">
                  {questionNumber}. {t(`pages.corruptionRisks.survey.questions.${questionNumber}`)}
                </h2>
                <div className="space-y-2">
                  <div>
                    {t('pages.corruptionRisks.survey.questions.answers.yes', { percent: 45, count: 45 })}
                  </div>
                  <div>
                    {t('pages.corruptionRisks.survey.questions.answers.partial', { percent: 30, count: 30 })}
                  </div>
                  <div>
                    {t('pages.corruptionRisks.survey.questions.answers.no', { percent: 25, count: 25 })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CorruptionRisksItem;