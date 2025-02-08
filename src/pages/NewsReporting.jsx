import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, Search, Calendar } from 'lucide-react';
import bank_logo from "../assets/icons/bank.png";
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';
import { useTranslation } from 'react-i18next';
import { Globe, Facebook, Instagram, Youtube, Send } from 'lucide-react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const PhoneInput = ({ value, onChange }) => {
  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;

    // Remove all non-numeric characters except '+'
    inputValue = inputValue.replace(/[^0-9+]/g, '');

    // Ensure the value starts with +998
    if (!inputValue.startsWith('+998')) {
      inputValue = '+998';
    }

    // Limit to +998 plus 9 digits
    if (inputValue.length > 13) {
      inputValue = inputValue.slice(0, 13);
    }

    onChange(inputValue);
  };

  return (
    <input
      type="tel"
      value={value || '+998'}
      onChange={handlePhoneChange}
      placeholder="+998 (99) 998-98-98"
      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

const ToggleButtons = ({ activeTab, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-lg">
      <button
        className={`px-4 py-2 rounded-md ${activeTab === 'system'
          ? 'bg-white text-[#024073] shadow-sm'
          : 'text-gray-600'
          }`}
        onClick={() => onChange('system')}
      >
        {t('pages.newsReporting.toggleButtons.system')}
      </button>
      <button
        className={`px-4 py-2 rounded-md ${activeTab === 'direct'
          ? 'bg-white text-[#024073] shadow-sm'
          : 'text-gray-600'
          }`}
        onClick={() => onChange('direct')}
      >
        {t('pages.newsReporting.toggleButtons.direct')}
      </button>
    </div>
  );
};
// Step 1: Organization Selection Component
const OrganizationSelection = ({ onNext, onSelect, selectedOrgId }) => {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
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
      onSelect(org);
    }
  };

  return (
    <>
      {/* Search Input - Centered */}
      <div className="flex justify-center mb-8">
        <div className="relative w-[400px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('pages.newsReporting.organization.searchPlaceholder')}
            className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <OrganizationSelectionSkeleton />
      ) : (
        /* Organizations Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => handleSelectOrg(org)}
              className={`p-6  rounded-lg shadow-sm hover:shadow-md transition-shadow h-[150px] flex flex-col justify-between cursor-pointer ${selectedOrg?.id === org.id ? 'bg-[#024072]' : ''}`}
              style={{
                boxShadow: '0px 4px 29px 0px #0000001A',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 flex-shrink-0 ${selectedOrg?.id === org.id ? 'bg-white' : 'bg-[#E6F4FF]'} rounded-[50%] flex items-center justify-center`}>
                  <img
                    src={bank_logo}
                    alt={t('pages.newsReporting.organization.title')}
                    className="w-8 h-8"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm line-clamp-3 ${selectedOrg?.id === org.id ? 'text-white' : 'text-gray-900'}`}>
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
                  className={`text-sm hover:underline ${selectedOrg?.id === org.id ? 'text-white font-semibold' : 'text-[#024073]'}`}
                  style={{
                    textDecoration: 'underline'
                  }}
                >
                  {t('common.details')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!loading && organizations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {t('common.noData')}
        </div>
      )}
    </>
  );
};

// Add this skeleton component at the top of the file
const OrganizationSelectionSkeleton = () => (
  <div className="animate-pulse">
    {/* Search Input Skeleton */}
    <div className="flex justify-center mb-8">
      <div className="relative w-[400px]">
        <div className="w-full h-[52px] bg-gray-200 rounded-lg"></div>
      </div>
    </div>

    {/* Organizations Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="p-6 rounded-lg shadow-sm h-[150px]"
          style={{
            boxShadow: '0px 4px 29px 0px #0000001A',
          }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-4 pl-16">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Step 2: Report Details Component
const ReportDetails = ({ onFormDataChange, onFileChange, formData: initialFormData, selectedOrganization }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('system');
  const [violationTypes, setViolationTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState({
    types: false,
    regions: false,
    districts: false
  });

  const [formData, setFormData] = useState(initialFormData || {
    type: '',
    region: '',
    district: '',
    date: '',
    time: '',
    details: ''
  });

  const [files, setFiles] = useState(initialFormData?.files || []);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchViolationTypes = async () => {
      if (!loading.types) {
        setLoading(prev => ({ ...prev, types: true }));
        try {
          const response = await sendRequest({
            method: 'GET',
            url: '/services/violation/report/types/'
          });
          setViolationTypes(Array.isArray(response.data.result) ? response.data.result : []);
        } catch (error) {
          console.error('Error fetching violation types:', error);
          setViolationTypes([]);
        } finally {
          setLoading(prev => ({ ...prev, types: false }));
        }
      }
    };

    fetchViolationTypes();
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!loading.regions) {
        setLoading(prev => ({ ...prev, regions: true }));
        try {
          const response = await sendRequest({
            method: 'GET',
            url: '/regions/'
          });
          setRegions(Array.isArray(response.data.result) ? response.data.result : []);
        } catch (error) {
          console.error('Error fetching regions:', error);
          setRegions([]);
        } finally {
          setLoading(prev => ({ ...prev, regions: false }));
        }
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.region && !loading.districts) {
        setLoading(prev => ({ ...prev, districts: true }));
        try {
          const response = await sendRequest({
            method: 'GET',
            url: `/region/${formData.region}/`
          });
          setDistricts(Array.isArray(response.data.result) ? response.data.result : []);
        } catch (error) {
          console.error('Error fetching districts:', error);
          setDistricts([]);
        } finally {
          setLoading(prev => ({ ...prev, districts: false }));
        }
      }
    };

    fetchDistricts();
  }, [formData.region]);

  const handleFormChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    if (field === 'region') {
      newFormData.district = '';
      setDistricts([]);
    }
    setFormData(newFormData);
    onFormDataChange?.(newFormData);
  };

  useEffect(() => {
    if (onFileChange) {
      onFileChange(files);
    }
  }, [files, onFileChange]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.map(file => ({
      file,
      progress: 0,
      id: Math.random().toString(36).substr(2, 9)
    }));

    setFiles(prev => {
      const updatedFiles = [...prev, ...newFiles];
      if (onFileChange) {
        onFileChange(updatedFiles);
      }
      return updatedFiles;
    });

    newFiles.forEach(fileObj => {
      const interval = setInterval(() => {
        setFiles(prev => {
          const updatedFiles = prev.map(f => {
            if (f.id === fileObj.id && f.progress < 100) {
              return { ...f, progress: f.progress + 10 };
            }
            return f;
          });
          if (onFileChange) {
            onFileChange(updatedFiles);
          }
          return updatedFiles;
        });
      }, 200);

      setTimeout(() => clearInterval(interval), 2000);
    });
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== fileId);
      if (onFileChange) {
        onFileChange(updatedFiles);
      }
      return updatedFiles;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isFormValid =
    formData.type &&
    formData.region &&
    formData.district &&
    formData.date &&
    formData.time;

  useEffect(() => {
    const isValid = formData.type &&
      formData.region &&
      formData.district &&
      formData.date &&
      formData.time;

    if (onFormDataChange) {
      onFormDataChange({
        ...formData,
        isValid
      });
    }
  }, [formData.type, formData.region, formData.district, formData.date, formData.time]);

  // Add new function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update form validity when switching tabs
    if (onFormDataChange) {
      onFormDataChange({
        ...formData,
        isValid: tab === 'direct' ? true : isFormValid
      });
    }
  };

  // Add organization info display component
  const OrganizationInfo = ({ organization }) => (
    <div className="bg-white rounded-lg p-6 border mb-6 flex flex-col md:flex-row gap-4 justify-between shadow-lg">
      <h3 className="text-lg font-medium text-[#024072] mb-4 w-full md:max-w-[50%]">{organization.name}</h3>
      <div className="space-y-2 mb-4 flex flex-col md:flex-row gap-2">
        <a href={`tel:${organization.phone_number}`} className="flex items-center text-gray-600 hover:text-[#024073]">
          <span className="mr-2">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.81706 8.07799C8.39706 9.28601 9.18771 10.4182 10.189 11.4195C11.1903 12.4208 12.3225 13.2115 13.5306 13.7915C13.6345 13.8414 13.6864 13.8663 13.7522 13.8855C13.9858 13.9536 14.2727 13.9047 14.4705 13.763C14.5262 13.7231 14.5738 13.6755 14.6691 13.5802C14.9604 13.2889 15.1061 13.1432 15.2526 13.048C15.805 12.6888 16.5172 12.6888 17.0696 13.048C17.216 13.1432 17.3617 13.2889 17.6531 13.5802L17.8154 13.7426C18.2583 14.1855 18.4797 14.4069 18.6 14.6448C18.8393 15.1177 18.8393 15.6763 18.6 16.1492C18.4797 16.3871 18.2583 16.6085 17.8154 17.0514L17.6841 17.1827C17.2427 17.6241 17.022 17.8448 16.722 18.0133C16.3891 18.2003 15.872 18.3348 15.4902 18.3336C15.1461 18.3326 14.9109 18.2659 14.4405 18.1324C11.9127 17.4149 9.52736 16.0612 7.53738 14.0712C5.5474 12.0812 4.19367 9.69589 3.47619 7.16806C3.34269 6.69769 3.27593 6.4625 3.27491 6.11838C3.27377 5.73653 3.40824 5.21945 3.59526 4.88653C3.7638 4.5865 3.98447 4.36583 4.42583 3.92447L4.55719 3.79311C5.00006 3.35024 5.22149 3.12881 5.45931 3.00852C5.93228 2.7693 6.49083 2.7693 6.9638 3.00852C7.20162 3.12881 7.42305 3.35024 7.86592 3.79311L8.02831 3.9555C8.31965 4.24684 8.46532 4.39251 8.56056 4.53899C8.91972 5.0914 8.91972 5.80355 8.56056 6.35596C8.46532 6.50244 8.31965 6.64811 8.02831 6.93945C7.93305 7.03471 7.88542 7.08234 7.84555 7.13802C7.70388 7.33587 7.65496 7.62276 7.72306 7.85638C7.74223 7.92213 7.76717 7.97408 7.81706 8.07799Z" stroke="#3981F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {organization.phone_number}
        </a>
        {organization.phone_number2 && (
          <a href={`tel:${organization.phone_number2}`} className="flex items-center text-gray-600 hover:text-[#024073] mt-0" style={{
            marginTop: '0px'
          }}>
            <span className="mr-2">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.81706 8.07799C8.39706 9.28601 9.18771 10.4182 10.189 11.4195C11.1903 12.4208 12.3225 13.2115 13.5306 13.7915C13.6345 13.8414 13.6864 13.8663 13.7522 13.8855C13.9858 13.9536 14.2727 13.9047 14.4705 13.763C14.5262 13.7231 14.5738 13.6755 14.6691 13.5802C14.9604 13.2889 15.1061 13.1432 15.2526 13.048C15.805 12.6888 16.5172 12.6888 17.0696 13.048C17.216 13.1432 17.3617 13.2889 17.6531 13.5802L17.8154 13.7426C18.2583 14.1855 18.4797 14.4069 18.6 14.6448C18.8393 15.1177 18.8393 15.6763 18.6 16.1492C18.4797 16.3871 18.2583 16.6085 17.8154 17.0514L17.6841 17.1827C17.2427 17.6241 17.022 17.8448 16.722 18.0133C16.3891 18.2003 15.872 18.3348 15.4902 18.3336C15.1461 18.3326 14.9109 18.2659 14.4405 18.1324C11.9127 17.4149 9.52736 16.0612 7.53738 14.0712C5.5474 12.0812 4.19367 9.69589 3.47619 7.16806C3.34269 6.69769 3.27593 6.4625 3.27491 6.11838C3.27377 5.73653 3.40824 5.21945 3.59526 4.88653C3.7638 4.5865 3.98447 4.36583 4.42583 3.92447L4.55719 3.79311C5.00006 3.35024 5.22149 3.12881 5.45931 3.00852C5.93228 2.7693 6.49083 2.7693 6.9638 3.00852C7.20162 3.12881 7.42305 3.35024 7.86592 3.79311L8.02831 3.9555C8.31965 4.24684 8.46532 4.39251 8.56056 4.53899C8.91972 5.0914 8.91972 5.80355 8.56056 6.35596C8.46532 6.50244 8.31965 6.64811 8.02831 6.93945C7.93305 7.03471 7.88542 7.08234 7.84555 7.13802C7.70388 7.33587 7.65496 7.62276 7.72306 7.85638C7.74223 7.92213 7.76717 7.97408 7.81706 8.07799Z" stroke="#3981F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {organization.phone_number2}
          </a>
        )}
      </div>
      <div className="flex space-x-3">
        {organization.weblink && (
          <a href={organization.weblink} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#3981F7] text-white rounded-full hover:bg-[#02315a] w-10 h-10 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </a>
        )}
        {organization.facebook && (
          <a href={organization.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#3981F7] text-white rounded-full hover:bg-[#02315a] w-10 h-10 flex items-center justify-center">
            <Facebook className="w-5 h-5" />
          </a>
        )}
        {organization.instagram && (
          <a href={organization.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#3981F7] text-white rounded-full hover:bg-[#02315a] w-10 h-10 flex items-center justify-center">
            <Instagram className="w-5 h-5" />
          </a>
        )}
        {organization.telegram && (
          <a href={organization.telegram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#3981F7] text-white rounded-full hover:bg-[#02315a] w-10 h-10 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </a>
        )}
        {organization.youtube && (
          <a href={organization.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#3981F7] text-white rounded-full hover:bg-[#02315a] w-10 h-10 flex items-center justify-center">
            <Youtube className="w-5 h-5" />
          </a>
        )}
        {organization.twitter && (
          <a href={organization.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#3981F7] text-white rounded-full hover:bg-[#02315a] w-10 h-10 flex items-center justify-center">
            <Twitter className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    // Update form validity whenever activeTab changes
    if (onFormDataChange) {
      onFormDataChange({
        ...formData,
        isValid: activeTab === 'direct' ? true : isFormValid
      });
    }
  }, [activeTab]);

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-6">{t('pages.newsReporting.reportDetails.title')}</h2>

      <div className="mb-6">
        <ToggleButtons activeTab={activeTab} onChange={handleTabChange} />
      </div>

      {activeTab === 'direct' && selectedOrganization && (
        <OrganizationInfo organization={selectedOrganization} />
      )}

      {activeTab === 'system' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative">
                <div className="text-sm text-gray-600 mb-1">
                  {t('pages.newsReporting.reportDetails.type')} <span className="text-red-500">*</span>
                </div>
                <select
                  className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={formData.type}
                  onChange={(e) => handleFormChange('type', e.target.value)}
                  disabled={loading.types}
                >
                  <option value="">{t('pages.newsReporting.reportDetails.selectType')}</option>
                  {loading.types ? (
                    <option>{t('pages.newsReporting.loading')}</option>
                  ) : (
                    Array.isArray(violationTypes) && violationTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))
                  )}
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Sana <span className="text-red-500">*</span>
                  </div>
                  <div className="relative">
                    <DatePicker
                      selected={formData.date}
                      onChange={(date) => handleFormChange('date', date)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                      calendarClassName="custom-calendar"
                      showPopperArrow={false}
                    />
                    <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Vaqt <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.time}
                    onChange={(e) => handleFormChange('time', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="text-sm text-gray-600 mb-1">
                  {t('pages.newsReporting.location.selectRegion')} <span className="text-red-500">*</span>
                </div>
                <select
                  className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={formData.region}
                  onChange={(e) => handleFormChange('region', e.target.value)}
                  disabled={loading.regions}
                >
                  <option value="">{t('pages.newsReporting.location.selectRegion')}</option>
                  {loading.regions ? (
                    <option>{t('pages.newsReporting.loading')}</option>
                  ) : (
                    Array.isArray(regions) && regions.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))
                  )}
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <div className="text-sm text-gray-600 mb-1">
                  {t('pages.newsReporting.location.selectDistrict')} <span className="text-red-500">*</span>
                </div>
                <select
                  className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={formData.district}
                  onChange={(e) => handleFormChange('district', e.target.value)}
                  disabled={!formData.region || loading.districts}
                >
                  <option value="">{t('pages.newsReporting.location.selectDistrict')}</option>
                  {loading.districts ? (
                    <option>{t('pages.newsReporting.loading')}</option>
                  ) : (
                    Array.isArray(districts) && districts.map(district => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))
                  )}
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                {t('pages.newsReporting.reportDetails.description')}
              </div>
              <textarea
                rows={4}
                placeholder={t('pages.newsReporting.reportDetails.description')}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={formData.details}
                onChange={(e) => handleFormChange('details', e.target.value)}
                maxLength={1000}
              />
              <div className="text-right text-sm text-gray-500">
                {formData.details.length}/1000
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">
                {t('pages.newsReporting.fileUpload.title')}
              </div>
              <div className="border-2 border-dashed rounded-lg p-6">
                <div className="text-center mb-4">
                  <p className="text-gray-600 mb-2">
                    {t('pages.newsReporting.fileUpload.dragDropText')}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('pages.newsReporting.fileUpload.formatInfo')}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.mp4"
                    onChange={handleFileChange}
                    multiple
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    {t('pages.newsReporting.fileUpload.uploadButton')}
                  </button>
                </div>

                {files.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {files.map((fileObj) => (
                      <div key={fileObj.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-50 rounded">
                            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{fileObj.file.name}</p>
                            <p className="text-xs text-gray-500">
                              {Math.round(fileObj.file.size / 1024)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                          <div className="flex items-center flex-1 sm:flex-none">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#024073] transition-all duration-300"
                                style={{ width: `${fileObj.progress}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              {fileObj.progress}%
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(fileObj.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Contact Form Component
const ContactForm = ({ formData, onFormDataChange }) => {
  const { t } = useTranslation();
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  const isLastPersonComplete = () => {
    const lastPerson = formData[formData.length - 1];
    return (
      lastPerson.name.trim() !== '' &&
      lastPerson.position.trim() !== '' &&
      lastPerson.phone.length === 13
    );
  };

  const handleAddPerson = () => {
    if (isLastPersonComplete()) {
      onFormDataChange([...formData, { name: '', position: '', phone: '+998' }]);
    }
  };

  const handleRemovePerson = (index) => {
    const newData = formData.filter((_, i) => i !== index);
    onFormDataChange(newData);
  };

  const handleInputChange = (index, field, value) => {
    const newData = formData.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onFormDataChange(newData);
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
        <h2 className="text-xl font-medium text-gray-800">
          {t('pages.newsReporting.contactForm.title')}
        </h2>
        <div className="flex flex-col md:flex-row xs:flex-row gap-2 xs:gap-4 w-full sm:w-auto">
          <button
            onClick={handleAddPerson}
            disabled={!isLastPersonComplete()}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${isLastPersonComplete()
              ? 'text-[#024073] border-[#024073] hover:bg-blue-50'
              : 'text-gray-400 border-gray-200 cursor-not-allowed'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>{t('pages.newsReporting.contactForm.addPerson')}</span>
          </button>
          {formData.length > 1 && (
            <button
              onClick={() => setShowDeleteButtons(!showDeleteButtons)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>{t('pages.newsReporting.contactForm.removePerson')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {formData.map((person, index) => (
          <div key={index} className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {t('pages.newsReporting.contactForm.fullName')} <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  placeholder={t('pages.newsReporting.contactForm.fullNamePlaceholder')}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {t('pages.newsReporting.contactForm.position')} <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  value={person.position}
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                  placeholder={t('pages.newsReporting.contactForm.positionPlaceholder')}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">
                    {t('pages.newsReporting.contactForm.phoneNumber')} <span className="text-red-500">*</span>
                  </div>
                  <PhoneInput
                    value={person.phone}
                    onChange={(value) => handleInputChange(index, 'phone', value)}
                  />
                </div>
                {showDeleteButtons && formData.length > 1 && (
                  <button
                    onClick={() => handleRemovePerson(index)}
                    className="h-[46px] w-[46px] flex items-center justify-center text-gray-400 hover:text-red-600 border border-gray-200 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// First, add new component for Reporter Information
const ReporterInfo = ({ formData, onFormDataChange, isAnonymous, onAnonymousChange }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Anonim tanlanganda formani tozalaymiz va valid qilamiz
    if (isAnonymous) {
      onFormDataChange({}); // Barcha maydonlarni tozalash
    }
  }, [isAnonymous]);

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-6">
        {t('pages.newsReporting.reporterInfo.title')}
      </h2>

      <div className="mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${!isAnonymous ? 'bg-white shadow-sm text-[#024073]' : 'text-gray-500'}`}
            onClick={() => onAnonymousChange(false)}
          >
            {t('pages.newsReporting.reporterInfo.aboutReporter')}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${isAnonymous ? 'bg-white shadow-sm text-[#024073]' : 'text-gray-500'}`}
            onClick={() => onAnonymousChange(true)}
          >
            {t('pages.newsReporting.reporterInfo.anonymous')}
          </button>
        </div>
      </div>

      {/* Faqat anonim bo'lmaganda inputlarni ko'rsatamiz */}
      {!isAnonymous && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">
              {t('pages.newsReporting.reporterInfo.fullName')} <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
              placeholder={t('pages.newsReporting.contactForm.fullNamePlaceholder')}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">
              {t('pages.newsReporting.reporterInfo.phoneNumber')} <span className="text-red-500">*</span>
            </div>
            <PhoneInput
              value={formData.phone || '+998'}
              onChange={(value) => onFormDataChange({ ...formData, phone: value })}
            />
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">
              {t('pages.newsReporting.reporterInfo.email')} <span className="text-red-500">*</span>
            </div>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
              placeholder={t('pages.newsReporting.reporterInfo.email')}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Step 4: Report Confirmation Component

const SuccessModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {t('pages.newsReporting.successModal.message')}
          </h3>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-[#024073] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('pages.newsReporting.successModal.ok')}
          </button>
        </div>
      </div>
    </div>
  );
};
const NewsReporting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [reportFormData, setReportFormData] = useState({
    type: '',
    region: '',
    district: '',
    date: '',
    time: '',
    details: '',
    files: [],
  });

  const [contactFormData, setContactFormData] = useState([{
    name: '',
    position: '',
    phone: '+998'
  }]);

  const [reporterFormData, setReporterFormData] = useState({
    name: '',
    phone: '+998',
    email: ''
  });
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleReportFormChange = (data) => {
    setReportFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleFileChange = (files) => {
    setReportFormData(prev => {
      if (JSON.stringify(prev.files) === JSON.stringify(files)) {
        return prev;
      }
      return {
        ...prev,
        files: files
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Organization ID always required
      formData.append('organization', selectedOrgId);
      formData.append('is_anonim', isAnonymous.toString());

      // Only append if direct contact is not selected (system form is filled)
      if (reportFormData.date && reportFormData.time) {
        // Convert date to YYYY-MM-DD format
        const dateObj = new Date(reportFormData.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Add timezone offset
        const timezoneOffset = new Date().getTimezoneOffset();
        const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
        const offsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
        const offsetSign = timezoneOffset > 0 ? '-' : '+';

        // Combine date, time and timezone offset
        const formattedDateTime = `${formattedDate}T${reportFormData.time}:00${offsetSign}${offsetHours}:${offsetMinutes}`;

        formData.append('event_time', formattedDateTime);
      }
      if (reportFormData.region) {
        formData.append('region', reportFormData.region);
      }
      if (reportFormData.district) {
        formData.append('district', reportFormData.district);
      }
      if (reportFormData.type) {
        formData.append('report_type', reportFormData.type);
      }
      if (reportFormData.details) {
        formData.append('comment', reportFormData.details);
      }
      if (reportFormData.files && reportFormData.files.length > 0) {
        reportFormData.files.forEach(fileObj => {
          formData.append('file', fileObj.file);
        });
      }

      // Reporter info - only append non-empty values
      if (reporterFormData.name) {
        formData.append('informant_full_name', reporterFormData.name);
      }
      if (reporterFormData.phone) {
        formData.append('informant_phone_number', reporterFormData.phone);
      }
      if (reporterFormData.email) {
        formData.append('informant_email', reporterFormData.email);
      }

      // Contact form data - only append if there are contacts and they have data
      if (contactFormData && contactFormData.length > 0) {
        contactFormData.forEach(contact => {
          if (contact.name) {
            formData.append('full_name', contact.name);
          }
          if (contact.position) {
            formData.append('position', contact.position);
          }
          if (contact.phone) {
            formData.append('phone_number', contact.phone);
          }
        });
      }

      const response = await fetch('https://api-dev.komplayens.uz/api/v1/services/violation/report/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowModal(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleOrganizationSelect = (org) => {
    setSelectedOrgId(org.id);
    setSelectedOrganization(org);
  };

  const handleAnonymousChange = (value) => {
    setIsAnonymous(value);
    if (value) {
      setReporterFormData({}); // Formani tozalash
      // Keyingi buttonni enable qilish
      setCurrentStep(prevStep => {
        const isValid = true; // Anonim tanlanganda har doim valid
        setIsAnonymous(true);
        return prevStep;
      });
    }
  };

  const isReporterInfoValid = () => {
    if (isAnonymous) {
      return true; // Anonim tanlangan bo'lsa har doim valid
    }
    // Anonim bo'lmaganda hamma maydonlar to'ldirilishi shart
    return (
      reporterFormData.name?.trim() &&
      reporterFormData.phone?.length === 13 &&
      reporterFormData.email?.trim()
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <OrganizationSelection onNext={handleNext} onSelect={handleOrganizationSelect} selectedOrgId={selectedOrgId} />;
      case 2:
        return (
          <ReportDetails
            onFormDataChange={handleReportFormChange}
            onFileChange={handleFileChange}
            formData={reportFormData}
            selectedOrganization={selectedOrganization}
          />
        );
      case 3:
        return (
          <ContactForm
            onFormDataChange={setContactFormData}
            formData={contactFormData}
          />
        );
      case 4:
        return (
          <ReporterInfo
            formData={reporterFormData}
            onFormDataChange={setReporterFormData}
            isAnonymous={isAnonymous}
            onAnonymousChange={handleAnonymousChange}
          />
        );
      default:
        return null;
    }
  };

  const isNextButtonDisabled = () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    switch (currentStep) {
      case 1:
        return !selectedOrgId;
      case 2:
        return !reportFormData.isValid;
      case 3:
        return !contactFormData.every(contact =>
          contact.name && contact.position && contact.phone.length === 13
        );
      case 4:
        if (isAnonymous) {
          return false;
        }
        return !reporterFormData.name ||
          !reporterFormData.phone ||
          reporterFormData.phone.length !== 13 ||
          !reporterFormData.email ||
          !isValidEmail(reporterFormData.email);
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 py-8 pt-14 md:pt-0">
        <div className="py-3 md:py-4 pt-0">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>{t('pages.newsReporting.breadcrumbs.home')}</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className='text-[#024072]'>{t('pages.newsReporting.breadcrumbs.report')}</span>
          </div>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">{t('pages.newsReporting.title')}</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
          <div className="flex items-center space-x-2 min-w-[280px] sm:w-[400px]">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-[#024073] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className={`flex-grow h-1 ${currentStep >= 2 ? 'bg-[#024073]' : 'bg-gray-300'}`}></div>

            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${currentStep >= 2 ? 'bg-[#024073]' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                {currentStep >= 2 ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </div>
            </div>
            <div className={`flex-grow h-1 ${currentStep >= 3 ? 'bg-[#024073]' : 'bg-gray-300'}`}></div>

            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${currentStep >= 3 ? 'bg-[#024073]' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                {currentStep >= 3 ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </div>
            </div>
            <div className={`flex-grow h-1 ${currentStep >= 4 ? 'bg-[#024073]' : 'bg-gray-300'}`}></div>

            <div className="flex-shrink-0">
              <div className={`w-8 h-8 ${currentStep >= 4 ? 'bg-[#024073]' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                {currentStep >= 4 ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isNextButtonDisabled()}
            className={`px-6 py-2 text-[#024073] border border-[#024072] rounded-[13px] w-[186px] hover:bg-blue-50 sm:w-auto flex items-center justify-center gap-2 ${isNextButtonDisabled() ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''
              }`}
          >
            <p className="text-sm">
              {currentStep === 4
                ? t('pages.newsReporting.submitButton')
                : t('pages.newsReporting.nextButton')}
            </p>
            {currentStep !== 4 && <ChevronRight size={16} className="text-gray-400" />}
          </button>
        </div>

        {renderCurrentStep()}

        <SuccessModal
          isOpen={showModal}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default NewsReporting;