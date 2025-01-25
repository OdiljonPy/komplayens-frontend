import React, { useRef, useEffect, useState } from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sendRequest } from '../utils/apiFunctions';

// Add skeleton component
const OperationsItemSkeleton = () => (
  <div className="px-4 sm:px-6 py-6 space-y-6 animate-pulse">
    {/* Header skeleton */}
    <header>
      <div className="pt-10 md:pt-0 flex justify-between items-center">
        <div className="h-6 w-2/3 bg-gray-200 rounded border-l-4 border-[#024072] pl-3"></div>
        <div className="h-6 w-32 bg-blue-50 rounded"></div>
      </div>
    </header>

    {/* Dilemma Section skeleton */}
    <div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex">
          <div className="w-1 bg-[#3982f771] rounded-l-lg"></div>
          <div className="flex-1 px-6 py-5">
            {/* Title skeleton */}
            <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>

            {/* Content skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            </div>

            {/* Button skeleton */}
            <div className="flex items-center gap-6">
              <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Comments Section skeleton */}
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white p-4 rounded-lg shadow-sm">
          {/* Comment content skeleton */}
          <div className="space-y-2 mb-3">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>

          {/* Comment metadata skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Comment input skeleton */}
    {true && (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="h-24 w-full bg-gray-200 rounded-lg mb-4"></div>
        <div className="flex justify-end">
          <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    )}
  </div>
);

const OperationsItem = () => {
  const { t } = useTranslation();
  const { operationId } = useParams();
  const commentRef = useRef(null);
  const dilemmaRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [originalTop, setOriginalTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  // Update useEffect to handle loading state
  useEffect(() => {
    const fetchItemData = async () => {
      setLoading(true);
      try {
        const response = await sendRequest({
          method: 'GET',
          url: `/services/professional/ethics/${operationId}/`
        });
        if (response.success) {
          console.log("response.data.result", response.data.result);
          setItemData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log("operationId", operationId);

    if (operationId) {
      fetchItemData();
    }
  }, [operationId]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle sticky behavior
  useEffect(() => {
    if (dilemmaRef.current) {
      const rect = dilemmaRef.current.getBoundingClientRect();
      setOriginalTop(rect.top + window.scrollY);
    }

    const handleScroll = () => {
      if (dilemmaRef.current) {
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollBottom = scrollY + viewportHeight;
        const shouldBeSticky = scrollY > originalTop && scrollBottom < (documentHeight - 100);

        setIsSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [originalTop]);

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr || !operationId) return;

        const user = JSON.parse(userStr);
        const response = await sendRequest({
          method: 'GET',
          url: '/services/officer/advice/list/',
          params: {
            professional_ethics: operationId
          },
          token: user.access_token
        });

        if (response.success) {
          setComments(response.data.result.content);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [operationId]);

  // Scroll to comment function
  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const userStr = localStorage.getItem('user');
      if (!userStr || !operationId) return;

      const user = JSON.parse(userStr);
      const response = await sendRequest({
        method: 'POST',
        url: '/services/officer/advice/',
        data: {
          professional_ethics: operationId,
          comment: newComment.trim()
        },
        token: user.access_token
      });

      if (response.success) {
        // Add new comment to the list
        setComments(prevComments => [...prevComments, response.data.result]);
        // Clear the input
        setNewComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <OperationsItemSkeleton />;
  }

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 py-6 space-y-6">
        {/* Dilemma Section */}
        <header>
          <div className="pt-10 md:pt-0 flex justify-between items-center">
            <h1 className="text-sm md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">
              {itemData?.title}
            </h1>
            <span className="text-blue-600 text-sm bg-blue-50 px-3 rounded">
              {t('pages.operations.publicService')}
            </span>
          </div>
        </header>
        <div ref={dilemmaRef}>
          <div className={`bg-white transition-all duration-300 ease-in-out
            ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''}
            ${isSticky && isMobile ? 'px-2 py-2' : ''}
          `}>
            <div className={`${isSticky ? 'p-6' : ''}`}>
              <div className="bg-white rounded-lg shadow-sm">
                <div className="flex">
                  <div className="w-1 bg-[#3982f771] rounded-l-lg"></div>
                  <div className={`flex-1 ${isMobile ? 'px-4 py-4' : 'px-6 py-5'}`}>
                    <h2 className={`font-medium text-gray-900 mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {t('pages.operations.dilemma')}
                    </h2>
                    <p className={`text-gray-600 mb-6 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {itemData?.case}
                    </p>
                    {isAuthenticated && (
                      <div className="flex items-center gap-6">
                        <button
                          onClick={scrollToComment}
                          className={`flex items-center gap-2 text-gray-600 border rounded-md 
                            border-[#024072] hover:border-blue-600 hover:text-blue-600
                            ${isMobile ? 'px-2 py-1' : 'px-3 py-2'}`}
                        >
                          <Plus size={isMobile ? 16 : 20} />
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                            {t('pages.operations.addComment')}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MessageSquare size={isMobile ? 16 : 20} />
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>32</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer div */}
        {isSticky && <div className={isMobile ? 'h-32' : 'h-48'} />}

        {/* Expert Analysis Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex">
            <div className="p-6 flex-1">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                {t('pages.operations.expertOpinion')}
              </h2>
              <div
                className="text-gray-600 text-base mb-6"
                dangerouslySetInnerHTML={{ __html: itemData?.description }}
              />
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <>
            {/* Comments Section */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg shadow-sm">
                  <div className="flex">
                    <div className="w-1 bg-[#B9B9B9] rounded-l-lg"></div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.officer_full_name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="bg-white rounded-lg shadow-sm" ref={commentRef}>
              <div className="flex">
                <div className="p-6 flex-1">
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t('pages.operations.commentPlaceholder')}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    maxLength={460}
                  ></textarea>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || isSubmitting}
                      className={`flex items-center gap-2 text-gray-600 border border-[#024072] rounded-md 
                        hover:border-[#024072] hover:text-[#024072] transition-colors
                        ${isMobile ? 'px-2 py-1 text-sm' : 'px-3 py-2'}
                        ${(!newComment.trim() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Plus size={isMobile ? 16 : 20} />
                      <span>
                        {isSubmitting ? t('pages.operations.sending') : t('pages.operations.leaveComment')}
                      </span>
                    </button>
                    <span className="text-gray-400 text-sm">
                      {newComment.length}/460
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OperationsItem;