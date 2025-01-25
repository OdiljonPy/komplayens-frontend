// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const Step1Form = ({ formData, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Supervisor Information */}
      <div className="bg-white p-6 rounded-[12px] shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">{t('pages.benefits.form1.supervisorInfo')}</h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.supervisorFullName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="supervisorFIO"
            value={formData.supervisorFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.fullName')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.supervisorPosition')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="supervisorPosition"
            value={formData.supervisorPosition}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.position')}
          />
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-white p-6 rounded-[12px] shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">{t('pages.benefits.employeeInfo')}</h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.fullName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="managerFIO"
            value={formData.managerFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.fullName')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.position')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.position')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.passportInfo')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="passportSeries"
            value={formData.passportSeries}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="AA 1234567"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.passportDate')} <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="passportIssueDate"
            value={formData.passportIssueDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.pinfl')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jshshir"
            value={formData.jshshir}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="12345678901234"
            maxLength="14"
          />
        </div>
      </div>

      {/* Yaqin qarindosh ma'lumotlari */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">
          {t('pages.benefits.relativeInfo')}
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.fullName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeFIO"
            value={formData.relativeFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.fullName')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.relativePassportInfo')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativePassport"
            value={formData.relativePassport}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.passportInfo')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.relativePinfl')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeJSHSHIR"
            value={formData.relativeJSHSHIR}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="12345678901234"
            maxLength="14"
          />
        </div>
      </div>
    </div>
  );
};

// Step2Form.jsx
const Step2Form = ({ formData, handleInputChange, handleGeneratePDF }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">
          {t('pages.benefits.form2.conflictInfo')}
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form2.description')} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg min-h-[100px]"
            placeholder={t('pages.benefits.form2.descriptionPlaceholder')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form2.measures')} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="measures"
            value={formData.measures}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg min-h-[100px]"
            placeholder={t('pages.benefits.form2.descriptionPlaceholder')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form2.registrationInfo')}
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleGeneratePDF}
          className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          {t('pages.benefits.generateNotification')}
        </button>
      </div>
    </div>
  );
};

const BenefitsItem = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const firstPageRef = useRef(null);
  const secondPageRef = useRef(null);

  const [formData, setFormData] = useState({
    supervisorPosition: '', // Rahbar lavozimi
    supervisorFIO: '', // Rahbar FIO

    // Xodim ma'lumotlari
    position: '', // Xodim lavozimi
    managerFIO: '', // Xodim FIO
    passportSeries: '',
    passportIssueDate: '',
    jshshir: '',

    // Yaqin qarindosh ma'lumotlari
    relativeFIO: '',
    relativePassport: '',
    relativeJSHSHIR: '',

    // Birinchi yuridik shaxs
    legalEntityName1: '',
    stir1: '',

    // Ikkinchi yuridik shaxs (qarindoshniki)
    legalEntityName2: '',
    stir2: '',

    // Step 2 uchun
    description: '',
    measures: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setCurrentStep(2);


  const FirstDocument = React.forwardRef(({ formData }, ref) => {
    const { t } = useTranslation();

    return (
      <div ref={ref} className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px]">
        {/* Header section */}
        <div className="text-right mb-8 text-sm">
          <p>{t('pages.benefits.form1.to')}</p>
          <div className="break-words max-w-[300px] ml-auto">
            <p>{formData.supervisorPosition || ''}</p>
            <p>{formData.supervisorFIO || ''}</p>
          </div>
          <p className="mt-4">{t('pages.benefits.form1.from')}</p>
          <div className="break-words max-w-[300px] ml-auto">
            <p>{formData.position || ''}</p>
            <p>{formData.managerFIO || ''}</p>
          </div>
        </div>

        <h1 className="text-center font-bold text-base md:text-xl mb-6 whitespace-normal">
          {t('pages.benefits.form1.notification')}
        </h1>

        <p className="mb-6 text-sm whitespace-normal">
          {t('pages.benefits.form1.introText')}
        </p>

        <div className="space-y-6">
          {/* Employee Information Section */}
          <div>
            <h2 className="font-bold mb-4">{t('pages.benefits.employeeInfo')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 min-w-[500px]">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 w-8">1.</td>
                    <td className="border border-gray-300 p-2 whitespace-normal">
                      {t('pages.benefits.form1.tables.employeeTable.idCardInfo')}
                    </td>
                    <td className="border border-gray-300 p-2 whitespace-normal">
                      {`${formData.passportSeries} ${formData.passportIssueDate}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2.</td>
                    <td className="border border-gray-300 p-2 whitespace-normal">
                      {t('pages.benefits.form1.tables.employeeTable.pinfl')}
                    </td>
                    <td className="border border-gray-300 p-2">{formData.jshshir}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Relative Information Section */}
          <div>
            <p className="font-bold mb-2 border-b border-gray-300 py-2">
              {t('pages.benefits.relativeInfo')}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-4 min-w-[500px]">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 w-8">1.</td>
                    <td className="border border-gray-300 p-2">
                      {t('pages.benefits.form1.tables.relativeTable.fullName')}
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativeFIO}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2.</td>
                    <td className="border border-gray-300 p-2 whitespace-normal">
                      {t('pages.benefits.form1.tables.relativeTable.idCardInfo')}
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativePassport}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">3.</td>
                    <td className="border border-gray-300 p-2 whitespace-normal">
                      {t('pages.benefits.form1.tables.relativeTable.pinfl')}
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativeJSHSHIR}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Entity Tables */}
          <div className="space-y-6">
            {/* First Legal Entity Table */}
            <div>
              <p className="font-bold text-sm mb-2 border-b border-gray-300 py-2 whitespace-normal">
                {t('pages.benefits.form1.tables.legalEntity1.title')}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 mb-4 min-w-[500px]">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 w-8">1.</td>
                      <td className="border border-gray-300 p-2">
                        {t('pages.benefits.form1.tables.legalEntity1.name')}
                      </td>
                      <td className="border border-gray-300 p-2">{formData.legalEntityName1}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">2.</td>
                      <td className="border border-gray-300 p-2">
                        {t('pages.benefits.form1.tables.legalEntity1.tin')}
                      </td>
                      <td className="border border-gray-300 p-2">{formData.stir1}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Second Legal Entity Table */}
            <div>
              <p className="font-bold text-sm mb-2 border-b border-gray-300 py-2 whitespace-normal">
                {t('pages.benefits.form1.tables.legalEntity2.title')}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 min-w-[500px]">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 w-8">1.</td>
                      <td className="border border-gray-300 p-2">
                        {t('pages.benefits.form1.tables.legalEntity2.name')}
                      </td>
                      <td className="border border-gray-300 p-2">{formData.legalEntityName2}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">2.</td>
                      <td className="border border-gray-300 p-2">
                        {t('pages.benefits.form1.tables.legalEntity2.tin')}
                      </td>
                      <td className="border border-gray-300 p-2">{formData.stir2}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const SecondDocument = React.forwardRef(({ formData }, ref) => (
    <div ref={ref} className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px]">
      <p className="text-sm mb-8 text-justify whitespace-normal">
        {t('pages.benefits.form2.infoNote')}
      </p>

      <h1 className="text-center font-bold text-base md:text-xl mb-6 whitespace-normal">
        {t('pages.benefits.form2.conflictInfo')}
      </h1>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-gray-300 min-w-[500px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 w-8">1.</td>
              <td className="border border-gray-300 p-2 whitespace-normal">
                {t('pages.benefits.form2.existingConflict')}
              </td>
              <td className="border border-gray-300 p-2 min-w-[200px] whitespace-normal">
                {formData.description || ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signature sections */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="min-w-[180px] whitespace-normal">
            <p>{t('pages.benefits.form2.employeePosition')}</p>
          </div>
          <div className="flex-1 flex items-end flex-wrap gap-2">
            <div className="italic text-gray-500 text-sm whitespace-nowrap">
              {t('pages.benefits.personalSignature')}
            </div>
            <div className="border-b border-gray-400 flex-1 mx-2 min-w-[100px]"></div>
            <div className="whitespace-nowrap">
              {formData.managerFIO && `(${formData.managerFIO})`}
            </div>
          </div>
        </div>
      </div>

      {/* Measures taken */}
      <div className="my-8">
        <p className="mb-2 whitespace-normal">
          {t('pages.benefits.measures')}:
        </p>
        <div className="border-b border-gray-400 min-h-[40px] whitespace-normal">
          {formData.measures || ''}
        </div>
      </div>

      {/* Footer text */}
      <div className="text-sm whitespace-normal">
        <p>{t('pages.benefits.form2.registrationInfo')}</p>
      </div>
    </div>
  ));
  const generatePDF = () => {
    // Create a temporary div to hold both documents
    const tempDiv = document.createElement('div');
    const hiddenStyle = 'position: absolute; left: -9999px;';

    // Render both documents
    const root = ReactDOM.createRoot(tempDiv);
    root.render(
      <div style={{ display: 'none' }}>
        <FirstDocument ref={firstPageRef} formData={formData} />
        <SecondDocument ref={secondPageRef} formData={formData} />
      </div>
    );

    // Wait for render to complete
    setTimeout(() => {
      const firstPage = firstPageRef.current;
      const secondPage = secondPageRef.current;

      if (!firstPage || !secondPage) {
        console.error("Documents not rendered properly");
        return;
      }

      const printWindow = window.open('', '_blank');

      if (!printWindow) {
        alert("Please allow popups for this website");
        return;
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>Xabarnoma</title>
            <style>
              body { 
                font-family: Arial, sans-serif;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              td, th {
                border: 1px solid #ddd;
                padding: 8px;
              }
              .header-text {
                text-align: right;
                margin-bottom: 30px;
              }
              .title {
                text-align: center;
                font-weight: bold;
                font-size: 18px;
                margin: 20px 0;
              }
              .section-title {
                font-weight: bold;
                margin: 15px 0;
              }
              .page-break {
                page-break-before: always;
              }
            </style>
          </head>
          <body>
            ${firstPage.outerHTML}
            <div class="page-break"></div>
            ${secondPage.outerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();

      // Clean up
      root.unmount();
      tempDiv.remove();
    }, 0);
  };

  return (
    <div className="p-4 pt-12 md:pt-0">
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] whitespace-normal flex-shrink-0">
            {t('pages.benefits.title')}
          </h1>

          {/* Buttons */}
          {currentStep === 1 ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-4 md:px-6 py-2.5 bg-[#024073] text-white rounded hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base flex items-center justify-center"
            >
              <span>{t('pages.benefits.next')}</span>
              <span className="ml-1">›</span>
            </button>
          ) : (
            <button
              onClick={generatePDF}
              className="w-full sm:w-auto px-4 md:px-6 py-2.5 bg-[#024073] text-white rounded hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="whitespace-nowrap">{t('pages.benefits.generateNotification')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center space-x-2 mb-8 min-w-[280px] sm:w-[400px]">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-[#024073] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className={`flex-grow h-1 ${currentStep >= 2 ? 'bg-[#024073]' : 'bg-gray-300'}`} />
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 ${currentStep >= 2 ? 'bg-[#024073]' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
            {currentStep >= 2 ? (
              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE - Forms */}
        <div className="lg:col-span-5">
          {currentStep === 1 ? (
            <Step1Form formData={formData} handleInputChange={handleInputChange} />
          ) : (
            <Step2Form
              formData={formData}
              handleInputChange={handleInputChange}
              handleGeneratePDF={generatePDF}
            />
          )}
        </div>

        {/* RIGHT SIDE - Preview */}
        <div className="lg:col-span-7">
          {currentStep === 1 ? (
            <FirstDocument ref={firstPageRef} formData={formData} />
          ) : (
            <SecondDocument ref={secondPageRef} formData={formData} />
          )}
        </div>
      </div>


    </div>
  );
};

export default BenefitsItem;