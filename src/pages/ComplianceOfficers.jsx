import React, { useState, useEffect } from 'react';
import { Search, Globe, Facebook, Instagram, ChevronLeft, ChevronRight, Youtube, Send } from 'lucide-react';

import { sendRequest } from '../utils/apiFunctions';

const ComplianceOfficers = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    size: 10
  });
  const [loading, setLoading] = useState(false);

  const fetchOrganizations = async (page = 1, query = '') => {
    setLoading(true);
    try {
      const response = await sendRequest({
        method: 'GET',
        url: '/services/organization/',
        params: {
          page,
          ...(query && { q: query })
        }
      });

      if (response.success) {
        setOrganizations(response.data.result.content);
        setPagination({
          totalElements: response.data.result.totalElements,
          totalPages: response.data.result.totalPages,
          currentPage: response.data.result.number,
          size: response.data.result.size
        });
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchOrganizations(1, searchQuery);
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    fetchOrganizations(page, searchQuery);
  };

  return (
    <div className=" bg-gray-50 p-4">
      <div className="mb-6">
        <div className="py-3 md:py-4 pt-0">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>Bosh sahifa</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className='text-[#024072]'>Komplayens ofitserlar</span>
          </div>
        </div>

      </div>

      {/* Header */}
      <div className=" mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-6 md:mb-10">
            Komplayens ofitserlar
          </h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Tashkilotni qidirish"
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {
        organizations.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <h1 className="text-2xl font-bold">No organizations found</h1>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {organizations.map((org) => (
                <div key={org.id} className="bg-white rounded-[16px] shadow-sm p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-[#024072] font-bold mb-4 line-clamp-2">
                    {org.name}
                  </h3>
                  <div className="space-y-2 mb-4 flex flex-col md:flex-row gap-2">
                    <a href={`tel:${org.phone_number}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <span className="mr-2"><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.81706 8.07799C8.39706 9.28601 9.18771 10.4182 10.189 11.4195C11.1903 12.4208 12.3225 13.2115 13.5306 13.7915C13.6345 13.8414 13.6864 13.8663 13.7522 13.8855C13.9858 13.9536 14.2727 13.9047 14.4705 13.763C14.5262 13.7231 14.5738 13.6755 14.6691 13.5802C14.9604 13.2889 15.1061 13.1432 15.2526 13.048C15.805 12.6888 16.5172 12.6888 17.0696 13.048C17.216 13.1432 17.3617 13.2889 17.6531 13.5802L17.8154 13.7426C18.2583 14.1855 18.4797 14.4069 18.6 14.6448C18.8393 15.1177 18.8393 15.6763 18.6 16.1492C18.4797 16.3871 18.2583 16.6085 17.8154 17.0514L17.6841 17.1827C17.2427 17.6241 17.022 17.8448 16.722 18.0133C16.3891 18.2003 15.872 18.3348 15.4902 18.3336C15.1461 18.3326 14.9109 18.2659 14.4405 18.1324C11.9127 17.4149 9.52736 16.0612 7.53738 14.0712C5.5474 12.0812 4.19367 9.69589 3.47619 7.16806C3.34269 6.69769 3.27593 6.4625 3.27491 6.11838C3.27377 5.73653 3.40824 5.21945 3.59526 4.88653C3.7638 4.5865 3.98447 4.36583 4.42583 3.92447L4.55719 3.79311C5.00006 3.35024 5.22149 3.12881 5.45931 3.00852C5.93228 2.7693 6.49083 2.7693 6.9638 3.00852C7.20162 3.12881 7.42305 3.35024 7.86592 3.79311L8.02831 3.9555C8.31965 4.24684 8.46532 4.39251 8.56056 4.53899C8.91972 5.0914 8.91972 5.80355 8.56056 6.35596C8.46532 6.50244 8.31965 6.64811 8.02831 6.93945C7.93305 7.03471 7.88542 7.08234 7.84555 7.13802C7.70388 7.33587 7.65496 7.62276 7.72306 7.85638C7.74223 7.92213 7.76717 7.97408 7.81706 8.07799Z" stroke="#3981F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg></span>
                      {org.phone_number}
                    </a>
                    {org.phone_number2 && (
                      <a href={`tel:${org.phone_number2}`} className="flex items-center text-gray-600 hover:text-blue-600" style={{
                        margin: 0
                      }}>
                        <span className="mr-2"><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.81706 8.07799C8.39706 9.28601 9.18771 10.4182 10.189 11.4195C11.1903 12.4208 12.3225 13.2115 13.5306 13.7915C13.6345 13.8414 13.6864 13.8663 13.7522 13.8855C13.9858 13.9536 14.2727 13.9047 14.4705 13.763C14.5262 13.7231 14.5738 13.6755 14.6691 13.5802C14.9604 13.2889 15.1061 13.1432 15.2526 13.048C15.805 12.6888 16.5172 12.6888 17.0696 13.048C17.216 13.1432 17.3617 13.2889 17.6531 13.5802L17.8154 13.7426C18.2583 14.1855 18.4797 14.4069 18.6 14.6448C18.8393 15.1177 18.8393 15.6763 18.6 16.1492C18.4797 16.3871 18.2583 16.6085 17.8154 17.0514L17.6841 17.1827C17.2427 17.6241 17.022 17.8448 16.722 18.0133C16.3891 18.2003 15.872 18.3348 15.4902 18.3336C15.1461 18.3326 14.9109 18.2659 14.4405 18.1324C11.9127 17.4149 9.52736 16.0612 7.53738 14.0712C5.5474 12.0812 4.19367 9.69589 3.47619 7.16806C3.34269 6.69769 3.27593 6.4625 3.27491 6.11838C3.27377 5.73653 3.40824 5.21945 3.59526 4.88653C3.7638 4.5865 3.98447 4.36583 4.42583 3.92447L4.55719 3.79311C5.00006 3.35024 5.22149 3.12881 5.45931 3.00852C5.93228 2.7693 6.49083 2.7693 6.9638 3.00852C7.20162 3.12881 7.42305 3.35024 7.86592 3.79311L8.02831 3.9555C8.31965 4.24684 8.46532 4.39251 8.56056 4.53899C8.91972 5.0914 8.91972 5.80355 8.56056 6.35596C8.46532 6.50244 8.31965 6.64811 8.02831 6.93945C7.93305 7.03471 7.88542 7.08234 7.84555 7.13802C7.70388 7.33587 7.65496 7.62276 7.72306 7.85638C7.74223 7.92213 7.76717 7.97408 7.81706 8.07799Z" stroke="#3981F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></span>
                        {org.phone_number2}
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    {org.weblink && (
                      <a href={org.weblink} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {org.facebook && (
                      <a href={org.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {org.instagram && (
                      <a href={org.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {org.telegram && (
                      <a href={org.telegram} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Send className="w-5 h-5" />
                      </a>
                    )}
                    {org.youtube && (
                      <a href={org.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                    {org.twitter && (
                      <a href={org.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Modified Pagination */}
            <div className="hidden md:flex justify-between items-center">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Oldingisi</span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md
                ${page === pagination.currentPage ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 bg-white rounded-md disabled:opacity-50"
              >
                <span>Keyingisi</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>

        )
      }
    </div>
  );
};

export default ComplianceOfficers;