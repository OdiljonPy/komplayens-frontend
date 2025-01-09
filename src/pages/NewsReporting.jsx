import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import bank_logo from "../assets/icons/bank.png";
import { useNavigate } from 'react-router-dom';


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
const OrganizationSelection = ({ onNext }) => {
  const organizations = [
    { id: 1, name: "Davlat tashkilot no'mi" },
    { id: 2, name: "Davlat tashkilot no'mi" },
    { id: 3, name: "Davlat tashkilot no'mi" },
    { id: 4, name: "Davlat tashkilot no'mi" },
    { id: 5, name: "Davlat tashkilot no'mi" },
    { id: 6, name: "Davlat tashkilot no'mi" },
    { id: 7, name: "Davlat tashkilot no'mi" },
    { id: 8, name: "Davlat tashkilot no'mi" },
  ];


  return (
    <>
      {/* Search Input - Centered */}
      <div className="flex justify-center mb-8">
        <div className="relative w-[400px]">
          <input
            type="text"
            placeholder="Tashkilotni qidirish"
            className="w-full p-4 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="
                w-12 h-12
                bg-[#E6F4FF]
                rounded-[50%]
                flex items-center justify-center
              ">
                <img
                  src={bank_logo}
                  alt="Bank icon"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{org.name}</h3>
                <button
                  onClick={onNext}
                  className="text-[#024073] text-sm hover:underline mt-2"
                >
                  Tanlash
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// Step 2: Report Details Component
const ReportDetails = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [formData, setFormData] = useState({
    type: 'Korrupsiyaviy huquqbuzarlik',
    date: '',
    location: '',
    time: '',
    details: '',
  });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate upload progress
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
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Hodisa Tafsilotlari</h2>

      {/* Toggle Buttons */}
      <div className="mb-6">
        <ToggleButtons activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Type Selection */}
        <div className="relative">
          <div className="text-sm text-gray-600 mb-1">
            Xabar turini tanlash <span className="text-red-500">*</span>
          </div>
          <select
            className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Korrupsiyaviy huquqbuzarlik">Korrupsiyaviy huquqbuzarlik</option>
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
              placeholder="dd/mm/yyyy"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">
              Vaqt <span className="text-red-500">*</span>
            </div>
            <input
              type="time"
              placeholder="--:--"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Joylashuv <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            placeholder="viloyat, tuman/shahar"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Hodisa tafsilotlari
          </div>
          <textarea
            rows={4}
            placeholder="Hodisa tafsilotlari"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          />
          <div className="text-right text-sm text-gray-500">
            {formData.details.length}/460
          </div>
        </div>

        {/* File Upload */}
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
            <div className="flex items-center justify-between">
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
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
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
    <div className="max-w-7xl mx-auto">
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
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-8">
      {/* Title */}
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
          className="px-6 py-2 text-[#024073] border border-[#024073] rounded hover:bg-blue-50 w-full sm:w-auto"
        >
          {currentStep === 3 ? 'Yuborish' : 'Keyingisi'}
        </button>
      </div>

      {/* Current Step Content */}
      {currentStep === 1 && <OrganizationSelection onNext={handleNext} />}
      {currentStep === 2 && <ReportDetails />}
      {currentStep === 3 && <ContactForm />}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NewsReporting;