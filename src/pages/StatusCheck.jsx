import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, X, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { sendRequest } from '../utils/apiFunctions';
import bank_logo from "../assets/icons/bank.png";
import file_icon from "../assets/icons/file-check.png";

const TestSelectionSkeleton = () => (
  <div className="animate-pulse">
    {/* Search Input Skeleton */}
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-[400px]">
        <div className="w-full h-[52px] bg-gray-200 rounded-lg"></div>
      </div>
    </div>

    {/* Tests Grid Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="p-6 rounded-lg shadow-sm h-[150px] flex flex-col justify-between"
          style={{
            boxShadow: '0px 4px 29px 0px #0000001A',
          }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#E6F4FF] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-2 flex justify-start pl-16">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestSelection = ({ onNext, onSelect, selectedTestId }) => {
  const { t } = useTranslation();
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);

  const fetchTests = async (query = '') => {
    setLoading(true);
    try {
      const response = await sendRequest({
        method: 'GET',
        url: '/services/honesty/category/',
        params: query ? { q: query } : {}
      });

      if (response.success && response.data.ok) {
        setTests(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchTests(searchQuery);
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSelectTest = (test) => {
    setSelectedTest(test);
    if (onSelect) {
      onSelect(test.id);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-[400px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('pages.statusCheck.testSelection.searchPlaceholder')}
            className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <TestSelectionSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tests.map((test) => (
              <div
                key={test.id}
                onClick={() => handleSelectTest(test)}
                className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-[150px] flex flex-col justify-between cursor-pointer 
                  ${selectedTest?.id === test.id ? 'border-2 bg-[#024072] text-white' : ''}`}
                style={{
                  boxShadow: '0px 4px 29px 0px #0000001A',
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 flex-shrink-0 ${selectedTest?.id === test.id ? 'bg-blue-100' : 'bg-[#E6F4FF]'} 
                    rounded-[50%] flex items-center justify-center`}>
                    <img src={test.image} alt={t('pages.statusCheck.testSelection.organizationIcon')} className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-gray-900 text-sm line-clamp-3 
                      ${selectedTest?.id === test.id ? 'text-white' : ''}`}>
                      {test.name}
                    </h3>
                  </div>
                </div>
                <div className="mt-2 flex justify-start pl-16">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTest(test);
                    }}
                    className={`text-sm hover:underline ${selectedTest?.id === test.id ? 'text-white' : 'text-[#024073]'}`}
                    style={{
                      textDecoration: 'underline',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {t('pages.statusCheck.testSelection.select')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t('pages.statusCheck.testSelection.noTests')}
            </div>
          )}
        </>
      )}
    </>
  );
};

const SelectionModal = ({ isOpen, onClose, onSelect }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-4 sm:p-8 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute right-4 sm:right-8 top-4 sm:top-8">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 border-l-4 border-[#024073] pl-3">
          {t('pages.statusCheck.selectionModal.title')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="bg-white rounded-xl p-4 sm:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow border"
            onClick={() => onSelect("member")}
          >
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <img src={file_icon} alt={t('pages.statusCheck.selectionModal.memberIcon')} className="w-8 h-8" />
            </div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">
              {t('pages.statusCheck.selectionModal.memberText')}
            </h4>
            <span className="text-blue-600 text-sm underline">
              {t('pages.statusCheck.selectionModal.select')}
            </span>
          </div>
          <div
            className="bg-white rounded-xl p-4 sm:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow border"
            onClick={() => onSelect("non-member")}
          >
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <img src={file_icon} alt={t('pages.statusCheck.selectionModal.nonMemberIcon')} className="w-8 h-8" />
            </div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">
              {t('pages.statusCheck.selectionModal.nonMemberText')}
            </h4>
            <span className="text-blue-600 text-sm underline">
              {t('pages.statusCheck.selectionModal.select')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganizationListSkeleton = () => (
  <div className="animate-pulse">
    {/* Search Input Skeleton */}
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-[400px]">
        <div className="w-full h-[52px] bg-gray-200 rounded-lg"></div>
      </div>
    </div>

    {/* Organizations Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="p-6 rounded-lg shadow-sm h-[150px] flex flex-col justify-between"
          style={{
            boxShadow: '0px 4px 29px 0px #0000001A',
          }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#E6F4FF] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-2 flex justify-start pl-16">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OrganizationList = ({ onSelect, selectedOrgId }) => {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const fetchOrganizations = async (query = '') => {
    setLoading(true);
    try {
      const response = await sendRequest({
        method: 'GET',
        url: '/services/organization/',
        params: query ? { q: query } : {}
      });

      if (response.success && response.data.ok) {
        setOrganizations(response.data.result.content);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchOrganizations(searchQuery);
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSelectOrg = (org) => {
    setSelectedOrg(org);
    if (onSelect) {
      onSelect(org.id);
    }
  };

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-[400px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('pages.statusCheck.organizationList.searchPlaceholder')}
            className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <OrganizationListSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                onClick={() => handleSelectOrg(org)}
                className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-[150px] flex flex-col justify-between cursor-pointer ${selectedOrg?.id === org.id ? 'border-2 bg-[#024072] text-white' : ''
                  }`}
                style={{
                  boxShadow: '0px 4px 29px 0px #0000001A',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 flex-shrink-0 ${selectedOrg?.id === org.id ? 'bg-blue-100' : 'bg-[#E6F4FF]'
                    } rounded-[50%] flex items-center justify-center`}>
                    <img
                      src={bank_logo}
                      alt={t('pages.statusCheck.organizationList.orgIcon')}
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-gray-900 text-sm line-clamp-3 ${selectedOrg?.id === org.id ? 'text-white' : ''
                      }`}>
                      {org.name}
                    </h3>
                  </div>
                </div>
                <div className="mt-2 flex justify-start pl-16">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectOrg(org);
                    }}
                    className={`text-sm hover:underline ${selectedOrg?.id === org.id ? 'text-white' : 'text-[#024073]'
                      }`}
                    style={{
                      textDecoration: 'underline',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {t('pages.statusCheck.organizationList.select')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {organizations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t('pages.statusCheck.organizationList.noOrganizations')}
            </div>
          )}
        </>
      )}
    </>
  );
};

const TestQuestionsSkeleton = () => (
  <div className="px-4 animate-pulse">
    {/* Header skeleton */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-64 bg-gray-200 rounded border-l-4 border-[#024072] pl-3"></div>
        <div className="h-7 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Question and Answers skeleton */}
      <div className="flex-1">
        {/* Question skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Answer options skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-transparent"
            >
              <div className="w-4 h-4 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress sidebar skeleton */}
      <div className="w-full lg:w-64">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* Progress counter skeleton */}
          <div className="text-right mb-4">
            <div className="h-4 w-32 bg-gray-200 rounded ml-auto mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded ml-auto"></div>
          </div>

          {/* Question numbers grid skeleton */}
          <div className="grid grid-cols-7 gap-1">
            {[...Array(21)].map((_, idx) => (
              <div
                key={idx}
                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Navigation buttons skeleton */}
    <div className="flex justify-between mt-8">
      <div className="h-10 w-28 bg-gray-200 rounded"></div>
      <div className="h-10 w-28 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const TestQuestions = ({ onFinish, selectedTestId, selectedOrgId }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(14 * 60);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.location.reload();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          url: `/services/honesty/test/`,
          params: { category_id: selectedTestId }
        });

        if (response.success && response.data.ok) {
          if (!response.data.new) {
            onFinish(response.data);
            return;
          }
          setQuestions(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedTestId, onFinish]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmitTest = async () => {
    const formattedAnswers = questions.map(question => ({
      test: question.id,
      answer: answers[question.id] || null
    }));

    try {
      const params = { category_id: selectedTestId };
      if (selectedOrgId) {
        params.organization_id = selectedOrgId;
      }

      const response = await sendRequest({
        method: 'POST',
        url: '/services/honesty/test/result/',
        params,
        data: formattedAnswers
      });

      if (response.success && response.data) {
        onFinish(response.data);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  if (loading && questions.length === 0) {
    return <TestQuestionsSkeleton />;
  }

  if (!loading && questions.length === 0) {
    return null;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
            {t('menu.integrity_test')}
          </h1>
          <div className="text-gray-600">
            {t('pages.statusCheck.testQuestions.timeLeft')}: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl" dangerouslySetInnerHTML={{ __html: `${currentQuestionIndex + 1}. ${currentQuestion.question}` }} />
          </div>

          <div className="space-y-4">
            {currentQuestion.answers.map((option, idx) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${answers[currentQuestion.id] === option.id
                  ? 'bg-blue-50 border-2 border-[#024072]'
                  : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={answers[currentQuestion.id] === option.id}
                  onChange={() => setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: option.id
                  }))}
                  className="w-4 h-4 border-2 border-gray-300"
                />
                <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: option.answer }} />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-64">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-right mb-4">
              <div className="text-sm text-gray-500">{t('pages.statusCheck.testQuestions.correctAnswers')}</div>
              <div className="text-2xl font-bold">
                {Object.keys(answers).length}/{questions.length}
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer text-xs
                    ${idx === currentQuestionIndex ? 'bg-blue-600 text-white' :
                      answers[questions[idx].id] ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'}`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1)}
          className="px-6 py-2 border rounded text-[#024073]"
          disabled={currentQuestionIndex === 0}
        >
          ‹ {t('pages.statusCheck.testQuestions.previous')}
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitTest}
            className="px-6 py-2 rounded bg-orange-500 text-white"
          >
            {t('pages.statusCheck.testQuestions.finish')}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
            className="px-6 py-2 border rounded bg-[#024073] text-white"
          >
            {t('pages.statusCheck.testQuestions.next')} ›
          </button>
        )}
      </div>
    </div>
  );
};

const TestResultsSkeleton = () => (
  <div className="px-4 animate-pulse">
    {/* Header skeleton */}
    <div className="mb-8">
      <div className="h-7 w-64 bg-gray-200 rounded border-l-4 border-[#024072] pl-3"></div>
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Questions and Answers skeleton */}
      <div className="flex-1 space-y-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-3">
            {/* Question skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>

            {/* Answer options skeleton */}
            <div className="space-y-2">
              {[1, 2, 3, 4].map((answer) => (
                <div key={answer} className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Correct answer box skeleton */}
            <div className="bg-[#F3FFF3] p-4 rounded-md">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results sidebar skeleton */}
      <div className="w-full lg:w-64">
        <div className="sticky top-8">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            {/* Percentage skeleton */}
            <div className="text-right mb-4">
              <div className="h-4 w-32 bg-gray-200 rounded ml-auto mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded ml-auto"></div>
            </div>

            {/* Question numbers grid skeleton */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(21)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestResults = ({ testData }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testData) {
      setLoading(false);
    }
  }, [testData]);

  if (loading) {
    return <TestResultsSkeleton />;
  }

  const percentage = testData.percent;
  const questions = testData.result;

  return (
    <div className="px-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
          {t('menu.integrity_test')}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {questions.map((question, index) => {
            const userResult = question.user_result;
            const selectedAnswer = question.answers.find(a => a.id === userResult?.answer);
            const correctAnswer = question.answers.find(a => a.is_true);

            return (
              <div key={question.id} className="space-y-3">
                <h3 className="text-lg" dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }} />

                <div className="space-y-2">
                  {question.answers.map((answer) => {
                    const isSelected = userResult?.answer === answer.id;
                    const isCorrect = answer.is_true;

                    return (
                      <div key={answer.id} className="flex items-center gap-3">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            checked={isSelected}
                            readOnly
                            className="w-4 h-4"
                          />
                          {isSelected && (
                            <div className={`absolute -left-0.5 -top-0.5 w-5 h-5 rounded-full border-2 
                              ${isCorrect ? 'border-green-500' : 'border-red-500'}`}
                            />
                          )}
                        </div>
                        <span
                          className={`${isSelected ? (isCorrect ? 'text-green-600' : 'text-red-500') : ''}`}
                          dangerouslySetInnerHTML={{ __html: answer.answer }}
                        />
                        {isSelected && (
                          <span className="ml-2 italic">
                            {isCorrect ? t('pages.statusCheck.testResults.correct') : t('pages.statusCheck.testResults.incorrect')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {userResult && !userResult.result && (
                  <div className="bg-[#F3FFF3] p-4 rounded-md">
                    <div className="text-green-600 font-medium mb-2">
                      {t('pages.statusCheck.testResults.correctAnswerLabel')}: <span dangerouslySetInnerHTML={{ __html: correctAnswer?.answer }} />
                    </div>
                    <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: question.advice }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-64">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="text-right mb-4">
                <div className="text-sm text-gray-500">{t('pages.statusCheck.testResults.correctAnswer')}</div>
                <div className="text-2xl font-bold">{percentage}%</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {questions.map((question, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 flex items-center justify-center rounded text-xs
                      ${question.user_result?.result ? 'bg-[#F3FFF3] text-green-600' : 'bg-[#FFF3F3] text-red-500'}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCheck = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [membershipType, setMembershipType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [testQuestions, setTestQuestions] = useState(null);

  const handleNext = () => {
    if (currentStep === 1 && selectedTestId) {
      setShowModal(true);
    } else if (currentStep === 2 && selectedOrgId) {
      setShowQuestions(true);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleMembershipSelect = (type) => {
    setMembershipType(type);
    setShowModal(false);
    setCurrentStep(2);
  };

  const handleTestSelect = (id) => {
    setSelectedTestId(id);
  };

  const handleOrgSelect = (id) => {
    setSelectedOrgId(id);
  };

  const handleTestFinish = (data) => {
    setTestResults(data);
    setCurrentStep(4);
  };

  return (
    <div className="container mx-auto">
      <div className="w-full px-4 md:px-0 py-8 pt-16 md:pt-0">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 overflow-x-auto whitespace-nowrap">
          <span>{t('pages.statusCheck.breadcrumb.home')}</span>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-[#024073]">{t('pages.statusCheck.breadcrumb.test')}</span>
        </div>

        {currentStep === 1 && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">
                {t('menu.integrity_test')}
              </h1>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center space-x-2 min-w-[280px] sm:w-[400px]">
                  {[1, 2, 3].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${currentStep >= step ? 'bg-[#024073]' : 'bg-gray-300'} 
                        rounded-full flex items-center justify-center`}
                        >
                          {currentStep >= step ? (
                            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                      {index < 2 && (
                        <div className={`flex-grow h-1 ${currentStep > step ? 'bg-[#024073]' : 'bg-gray-300'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!selectedTestId}
                  className={`px-6 py-2 border rounded-[13px] w-[186px] flex items-center justify-center gap-2 ${!selectedTestId
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-[#024073] border-[#024072] hover:bg-[#024072] hover:text-white'
                    }`}
                >
                  <p className="text-sm">{t('pages.statusCheck.steps.next')}</p>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              </div>

              <TestSelection
                onSelect={handleTestSelect}
                selectedTestId={selectedTestId}
              />
            </div>

            <SelectionModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSelect={handleMembershipSelect}
            />
          </>
        )}

        {currentStep === 2 && membershipType === "member" && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">{t('pages.statusCheck.breadcrumb.test')}</h1>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center space-x-2 min-w-[280px] sm:w-[400px]">
                  {[1, 2, 3, 4].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 ${currentStep >= step ? 'bg-[#024073]' : 'bg-gray-300'} 
                        rounded-full flex items-center justify-center`}
                        >
                          {currentStep >= step ? (
                            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                      {index < 3 && (
                        <div className={`flex-grow h-1 ${currentStep > step ? 'bg-[#024073]' : 'bg-gray-300'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!selectedOrgId}
                  className={`px-6 py-2 border rounded-[13px] w-[186px] flex items-center justify-center gap-2 ${!selectedOrgId
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-[#024073] border-[#024072] hover:bg-[#024072] hover:text-white'
                    }`}
                >
                  <p className="text-sm">{t('pages.statusCheck.steps.next')}</p>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              </div>

              <OrganizationList
                onSelect={handleOrgSelect}
                selectedOrgId={selectedOrgId}
              />
            </div>
          </>
        )}

        {currentStep === 2 && membershipType === "non-member" && (
          <TestQuestions
            onFinish={handleTestFinish}
            selectedTestId={selectedTestId}
            selectedOrgId={selectedOrgId}
          />
        )}

        {currentStep === 3 && showQuestions && (
          <TestQuestions
            onFinish={handleTestFinish}
            selectedTestId={selectedTestId}
            selectedOrgId={selectedOrgId}
          />
        )}

        {currentStep === 4 && testResults && (
          <TestResults testData={testResults} />
        )}
      </div>
    </div>
  );
};

export default StatusCheck;