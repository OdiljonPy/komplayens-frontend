import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import bank_logo from "../assets/icons/bank.png";
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/apiFunctions';

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
const ReportDetails = ({ onFormDataChange, onFileChange, formData: initialFormData }) => {
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

  // Fetch violation types
  useEffect(() => {
    const fetchViolationTypes = async () => {
      setLoading(prev => ({ ...prev, types: true }));
      try {
        const response = await sendRequest({
          method: 'GET',
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

  // Update parent component when files change
  useEffect(() => {
    if (onFileChange) {
      onFileChange(files);
    }
  }, [files, onFileChange]);

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

    // Simulate upload progress for each file
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

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-6">Hodisa Tafsilotlari</h2>

      {/* Toggle Buttons */}
      <div className="mb-6">
        <ToggleButtons activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Type Selection and Region/District with Date/Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
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

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Right Column - Region/District */}
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
              <div className="text-center mb-4">
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
                  multiple
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Faylni yuklash
                </button>
              </div>

              {/* Uploaded Files List */}
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
    </div>
  );
};

// Step 3: Report Confirmation Component

// Contact Form Component
const ContactForm = ({ formData, onFormDataChange }) => {
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  const handleAddPerson = () => {
    onFormDataChange([...formData, { name: '', position: '', phone: '+998' }]);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">
          Aloqador Shaxsning Ma'lumotlari
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleAddPerson()}
            className="flex items-center gap-2 text-[#024073] hover:text-blue-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Shaxsni qo'shish
          </button>
          {formData.length > 1 && (
            <button
              onClick={() => setShowDeleteButtons(!showDeleteButtons)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Shaxsni olib tashlash
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {formData.map((person, index) => (
          <div key={index} className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name Input */}
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  F.I.Sh <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
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
                  value={person.position}
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                  placeholder="Lavozimi"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone Input with Delete Button */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">
                    Telefon raqami <span className="text-red-500">*</span>
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
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-6">Xabar Yuborish</h2>

      {/* Toggle Buttons */}
      <div className="mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${!isAnonymous ? 'bg-white shadow-sm text-[#024073]' : 'text-gray-500'}`}
            onClick={() => onAnonymousChange(false)}
          >
            Xabar Beruvchi Haqida Ma'lumot
          </button>
          <button
            className={`px-4 py-2 rounded-md ${isAnonymous ? 'bg-white shadow-sm text-[#024073]' : 'text-gray-500'}`}
            onClick={() => onAnonymousChange(true)}
          >
            Anonomim Xabar Qoldirish
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Name Input */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            F.I.Sh <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
            placeholder="Islomov Murod"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isAnonymous}
          />
        </div>

        {/* Phone Input */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Telefon raqami <span className="text-red-500">*</span>
          </div>
          <PhoneInput
            value={formData.phone}
            onChange={(value) => onFormDataChange({ ...formData, phone: value })}
          />
        </div>

        {/* Email Input */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Elektron pochta <span className="text-red-500">*</span>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
            placeholder="Elektron pochta"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isAnonymous}
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

  // Update reportFormData to include files
  const [reportFormData, setReportFormData] = useState({
    type: '',
    region: '',
    district: '',
    date: '',
    time: '',
    details: '',
    files: [], // Add files array to store uploaded files
  });

  const [contactFormData, setContactFormData] = useState([{
    name: '',
    position: '',
    phone: '+998'
  }]);

  // Add new states for reporter information
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

  // Add new handler for file updates
  const handleFileChange = (files) => {
    setReportFormData(prev => ({
      ...prev,
      files: files
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Single value fields
      formData.append('organization', selectedOrgId);
      formData.append('event_time', `${reportFormData.date}T${reportFormData.time}`);
      formData.append('region', reportFormData.region);
      formData.append('district', reportFormData.district);
      formData.append('report_type', reportFormData.type);
      formData.append('comment', reportFormData.details);

      // Reporter info
      formData.append('informant_full_name', reporterFormData.name);
      formData.append('informant_phone_number', reporterFormData.phone);
      formData.append('informant_email', reporterFormData.email);
      formData.append('is_anonim', isAnonymous.toString());

      // Multiple files
      reportFormData.files.forEach(fileObj => {
        formData.append('file', fileObj.file);
      });

      // Multiple contact persons
      contactFormData.forEach((contact, index) => {
        formData.append('full_name', contact.name);
        formData.append('position', contact.position);
        formData.append('phone_number', contact.phone);
      });

      const response = await fetch('https://api.komplayens.uz/api/v1/services/violation/report/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If successful, show modal
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Here you might want to show an error message to the user
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      handleSubmit(); // Call submit instead of directly showing modal
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  // Update the steps rendering to include the new component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <OrganizationSelection onNext={handleNext} onSelect={setSelectedOrgId} selectedOrgId={selectedOrgId} />;
      case 2:
        return (
          <ReportDetails
            onFormDataChange={handleReportFormChange}
            onFileChange={handleFileChange}
            formData={reportFormData}
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
            onAnonymousChange={setIsAnonymous}
          />
        );
      default:
        return null;
    }
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
          <div className={`flex-grow h-1 ${currentStep >= 4 ? 'bg-[#024073]' : 'bg-gray-300'}`}></div>

          {/* Step 4 */}
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

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentStep === 1 && !selectedOrgId}
          className={`px-6 py-2 text-[#024073] border border-[#024072] rounded-[13px] w-[186px] hover:bg-blue-50 sm:w-auto flex items-center justify-center gap-2 ${currentStep === 1 && !selectedOrgId ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}`}
        >
          <p className="text-sm">{currentStep === 4 ? 'Yuborish' : 'Keyingisi'}</p>
          {currentStep !== 4 && <ChevronRight size={16} className="text-gray-400" />}
        </button>
      </div>

      {/* Current Step Content */}
      {renderCurrentStep()}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NewsReporting;