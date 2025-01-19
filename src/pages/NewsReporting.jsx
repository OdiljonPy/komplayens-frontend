import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import bank_logo from "../assets/icons/bank.png";
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';



const ToggleButtons = ({ activeTab, onChange }) => {
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-lg">
      <button
        className={`px-4 py-2 rounded-md ${activeTab === 'system'
          ? 'bg-white text-[#024073] shadow-sm'
          : 'text-gray-600'
          }`}
        onClick={() => onChange('system')}
      >
        Tizim Orqali
      </button>
      <button
        className={`px-4 py-2 rounded-md ${activeTab === 'direct'
          ? 'bg-white text-[#024073] shadow-sm'
          : 'text-gray-600'
          }`}
        onClick={() => onChange('direct')}
      >
        To'g'ridan-To'g'ri Aloqa
      </button>
    </div>
  );
};
// Step 1: Organization Selection Component
const OrganizationSelection = ({ onNext, onSelect, selectedOrgId }) => {
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
    fetchOrganizations();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    fetchOrganizations(value);
  };

  const handleSelectOrg = (org) => {
    setSelectedOrg(org);
    if (onSelect) {
      onSelect(org.id);
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
            placeholder="Tashkilotni qidirish"
            className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#024072]"></div>
        </div>
      )}

      {/* Organizations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => handleSelectOrg(org)}
              className={`p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-[150px] flex flex-col justify-between cursor-pointer ${selectedOrg?.id === org.id ? 'bg-blue-50 border-2 border-[#024072]' : ''
                }`}
              style={{
                boxShadow: '0px 4px 29px 0px #0000001A',
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 flex-shrink-0 ${selectedOrg?.id === org.id ? 'bg-blue-100' : 'bg-[#E6F4FF]'
                  } rounded-[50%] flex items-center justify-center`}>
                  <img
                    src={bank_logo}
                    alt="Bank icon"
                    className="w-8 h-8"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-3">
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
                  className={`text-[#024073] text-sm hover:underline ${selectedOrg?.id === org.id ? 'font-semibold' : ''
                    }`}
                  style={{
                    textDecoration: 'underline'
                  }}
                >
                  Tanlash
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!loading && organizations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Tashkilotlar topilmadi
        </div>
      )}
    </>
  );
};

// Step 2: Report Details Component
const ReportDetails = ({ onFormDataChange, formData: initialFormData }) => {
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

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Fetch violation types
  useEffect(() => {
    const fetchViolationTypes = async () => {
      setLoading(prev => ({ ...prev, types: true }));
      try {
        const response = await sendRequest({
          method: 'POST',
          url: '/services/violation/report/types/'
        });
        if (response.success && response.data.ok) {
          setViolationTypes(response.data.result);
          if (response.data.result.length > 0 && !formData.type) {
            handleFormChange('type', response.data.result[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching violation types:', error);
      } finally {
        setLoading(prev => ({ ...prev, types: false }));
      }
    };
    fetchViolationTypes();
  }, []);

  // Fetch regions
  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(prev => ({ ...prev, regions: true }));
      try {
        const response = await sendRequest({
          method: 'GET',
          url: '/regions/'
        });
        if (response.success && response.data.ok) {
          setRegions(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(prev => ({ ...prev, regions: false }));
      }
    };
    fetchRegions();
  }, []);

  // Fetch districts when region changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.region) {
        setDistricts([]);
        return;
      }

      setLoading(prev => ({ ...prev, districts: true }));
      try {
        const response = await sendRequest({
          method: 'GET',
          url: `/region/${formData.region}/`
        });
        if (response.success && response.data.ok) {
          setDistricts(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setLoading(prev => ({ ...prev, districts: false }));
      }
    };

    fetchDistricts();
  }, [formData.region]);

  // Update parent component when form data changes
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  const handleFormChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'region') {
        newData.district = '';
      }
      return newData;
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-6">Hodisa Tafsilotlari</h2>

      {/* Toggle Buttons */}
      <div className="mb-6">
        <ToggleButtons activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Type Selection and Region/District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Violation Type Select */}
          <div className="relative">
            <div className="text-sm text-gray-600 mb-1">
              Xabar turini tanlash <span className="text-red-500">*</span>
            </div>
            <select
              className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={formData.type}
              onChange={(e) => handleFormChange('type', e.target.value)}
              disabled={loading.types}
            >
              {loading.types ? (
                <option>Yuklanmoqda...</option>
              ) : (
                violationTypes.map(type => (
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

          {/* Region/District Selects */}
          <div className="space-y-4">
            {/* Region Select */}
            <div className="relative">
              <div className="text-sm text-gray-600 mb-1">
                Viloyat <span className="text-red-500">*</span>
              </div>
              <select
                className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={formData.region}
                onChange={(e) => handleFormChange('region', e.target.value)}
                disabled={loading.regions}
              >
                <option value="">Viloyatni tanlang</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-[38px] pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* District Select */}
            <div className="relative">
              <div className="text-sm text-gray-600 mb-1">
                Tuman <span className="text-red-500">*</span>
              </div>
              <select
                className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={formData.district}
                onChange={(e) => handleFormChange('district', e.target.value)}
                disabled={!formData.region || loading.districts}
              >
                <option value="">Tumanni tanlang</option>
                {districts.map(district => (
                  <option key={district.id} value={district.id}>{district.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-[38px] pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">
              Sana <span className="text-red-500">*</span>
            </div>
            <input
              type="date"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.date}
              onChange={(e) => handleFormChange('date', e.target.value)}
            />
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

        {/* Details and File Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Details Textarea */}
          <div>
            <div className="text-sm text-gray-600 mb-1">
              Hodisa tafsilotlari
            </div>
            <textarea
              rows={4}
              placeholder="Hodisa tafsilotlari"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={formData.details}
              onChange={(e) => handleFormChange('details', e.target.value)}
              maxLength={460}
            />
            <div className="text-right text-sm text-gray-500">
              {formData.details.length}/460
            </div>
          </div>

          {/* File Upload */}
          <div>
            <div className="text-sm text-gray-600 mb-1">
              Fayl yuklash
            </div>
            <div className="border-2 border-dashed rounded-lg p-6">
              {!file ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    Faylni tanlang yoki shu yerga joylshtiring
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    JPEG, PNG, PDF va MP4 formatlari, 50 MB gacha
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.mp4"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Faylni yuklash
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {Math.round(file.size / 1024)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="flex items-center flex-1 sm:flex-none">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#024073] transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {uploadProgress}%
                      </span>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
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

// Step 3: Report Confirmation Component

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    phone: ''
  });

  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-800 mb-6">
        Aloqador Shaxsning Ma'lumotlari
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Name Input */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            F.I.Sh <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Murodov Islom"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Position Input */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Lavozimi <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            placeholder="Lavozimi"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Input */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Telefon raqami <span className="text-red-500">*</span>
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+998 (99) 998-98-98"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

// Step 4: Report Confirmation Component

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Message */}
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            Xabar yuborildi!
          </h3>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-[#024073] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
const NewsReporting = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [selectedOrgId, setSelectedOrgId] = useState(null);

  const [reportFormData, setReportFormData] = useState({
    type: '',
    region: '',
    district: '',
    date: '',
    time: '',
    details: '',
  });

  const [contactFormData, setContactFormData] = useState({
    name: '',
    position: '',
    phone: ''
  });

  const handleReportFormChange = (data) => {
    setReportFormData(data);
  };
  const handleContactFormChange = (data) => {
    setContactFormData(data);
  };

  const handleNext = () => {
    if (currentStep === 3) {
      setShowModal(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className=" px-4 py-8 pt-0">
      {/* Title */}
      <div className="py-3 md:py-4 pt-0">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span>Bosh sahifa</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className='text-[#024072]'>Xabar yuborish</span>
        </div>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Xabar Yuborish</h1>
      </div>

      {/* Steps and Button Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        {/* Steps */}
        <div className="flex items-center space-x-2 min-w-[280px] sm:w-[400px]">
          {/* Step 1 */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-[#024073] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className={`flex-grow h-1 ${currentStep >= 2 ? 'bg-[#024073]' : 'bg-gray-300'}`}></div>

          {/* Step 2 */}
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

          {/* Step 3 */}
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
          <div className="flex-grow h-1 bg-gray-300"></div>

          {/* Step 4 */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentStep === 1 && !selectedOrgId}
          // className="px-6 py-2 text-[#024073] border border-[#024072] rounded-[13px] w-[186px] hover:bg-blue-50  sm:w-auto flex items-center justify-center gap-2"
          className={`px-6 py-2 text-[#024073] border border-[#024072] rounded-[13px] w-[186px] hover:bg-blue-50 sm:w-auto flex items-center justify-center gap-2 \${currentStep === 1 && !selectedOrgId ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}`}
        >
          <p className="text-sm"> {currentStep === 3 ? 'Yuborish' : 'Keyingisi'}</p>
          {currentStep !== 3 && <ChevronRight size={16} className="text-gray-400" />}
        </button>
      </div>

      {/* Current Step Content */}
      {currentStep === 1 && <OrganizationSelection onNext={handleNext} onSelect={setSelectedOrgId} selectedOrgId={selectedOrgId} />}
      {currentStep === 2 && <ReportDetails
        onFormDataChange={handleReportFormChange}
        formData={reportFormData}
      />}
      {currentStep === 3 && <ContactForm
        onFormDataChange={handleContactFormChange}
        formData={contactFormData}
      />}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NewsReporting;