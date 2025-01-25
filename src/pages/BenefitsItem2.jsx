// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

const Step1Form = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      {/* Xodimga Oid Ma'lumotlar */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">Xodimga Oid Ma'lumotlar</h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            F.I.O <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="managerFIO"
            value={formData.managerFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Familiya, ism, otasining ismi"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Lavozim <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Lavozim"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Passport seriyasi va raqami <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="passportSeries"
            value={formData.passportSeries}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Passport seriyasi va raqami"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Passport berilgan sanasi <span className="text-red-500">*</span>
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
            JSHSHIR <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jshshir"
            value={formData.jshshir}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="123 456 789 012"
            maxLength="14"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Yuridik shaxsning nomi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="legalEntityName"
            value={formData.legalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Yuridik shaxsning nomi"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            STIR <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="stir"
            value={formData.stir}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="STIR"
          />
        </div>
      </div>

      {/* Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">
          Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            F.I.O <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeFIO"
            value={formData.relativeFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Familiya, ism, otasining ismi"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Passport seriyasi va raqami <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativePassport"
            value={formData.relativePassport}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Passport seriyasi va raqami"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Passport berilgan sanasi <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="relativePassportDate"
            value={formData.relativePassportDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            JSHSHIR <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeJSHSHIR"
            value={formData.relativeJSHSHIR}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="123 456 789 012"
            maxLength="14"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Yuridik shaxsning nomi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeLegalEntityName"
            value={formData.relativeLegalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Yuridik shaxsning nomi"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            STIR <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeSTIR"
            value={formData.relativeSTIR}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="STIR"
          />
        </div>
      </div>
    </div>
  );
};

// Step2Form.jsx
const Step2Form = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">
          Manfaatlar To'qnashuvi To'g'risidagi Axborot
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Sana <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Manfaatlar to'qnashuvi tafsifi <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            rows={6}
            placeholder="Manfaatlar to'qnashuvi tafsifi"
          />
          <div className="text-right text-sm text-gray-500">
            <span>{formData.description?.length || 0}</span>/460
          </div>
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Qo'shimcha ma'lumot <span className="text-red-500">*</span>
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            rows={6}
            placeholder="Qo'shimcha ma'lumot"
          />
          <div className="text-right text-sm text-gray-500">
            <span>{formData.additionalInfo?.length || 0}</span>/460
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitsItem2 = () => {
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

  const FirstDocument = React.forwardRef(({ formData }, ref) => (
    <div ref={ref} className="bg-white p-6 overflow-x-hidden min-w-[320px]">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center font-bold text-xl mb-8">
          ХОДИМНИНГ ЭҲТИМОЛИЙ МАНФААТЛАР ТЎҚНАШУВИ ТЎҒРИСИДАГИ ДЕКЛАРАЦИЯСИ
        </h1>

        <div className="mb-8 text-justify">
          <p>
            Мен, {formData.managerFIO || '_______________________'} ушбу
          </p>
          <p className="text-sm text-gray-600 text-center">(фамилияси, исми, отасининг исми ва унинг лавозими)</p>

          <p className="mt-4">
            {formData.position || '_______________________'}
          </p>
          <p className="text-sm text-gray-600 text-center">(филиалнинг ҳабул қилиниётганда бошқа ишга ўтказилаётганда)</p>

          <p className="mt-4">
            тўлдираётган декларацияда ўзим ва менга алоқадор шахсларнинг эҳтимолий
            манфаатлар тўқнашувига оид қуйидаги маълумотларни ошкор қиламан:
          </p>
        </div>

        {/* 1. Xodimga oid ma'lumotlar */}
        <div className="mb-8">
          <h2 className="font-bold mb-4">1. Ходимга оид маълумотлар</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-8">1.</td>
                  <td className="border border-gray-300 p-2">
                    Идентификация ID-картаси ёки биометрик паспорт маълумотлари (серияси, рақами, берилган санаси)
                  </td>
                  <td className="border border-gray-300 p-2 min-w-[200px]">
                    {formData.passportSeries} {formData.passportIssueDate}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2.</td>
                  <td className="border border-gray-300 p-2">
                    Жисмоний шахснинг шахсий идентификация рақами (ЖШШИР) (мавжуд бўлган тақдирда)
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.jshshir}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Aloqador shaxsga oid ma'lumotlar */}
        <div className="mb-8">
          <h2 className="font-bold mb-4">2. Алоқадор шахсга оид маълумотлар*</h2>

          {/* First subtable */}
          <div className="mb-6">
            <p className="font-medium mb-2 border-b border-gray-300 pb-2">
              Ходимнинг яқин қариндошига оид маълумотлар
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 w-8">1.</td>
                    <td className="border border-gray-300 p-2">
                      Фамилия, исми, отасининг исми
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativeFIO}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2.</td>
                    <td className="border border-gray-300 p-2">
                      Идентификация ID-картаси ёки биометрик паспорт маълумотлари
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativePassport}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">3.</td>
                    <td className="border border-gray-300 p-2">
                      ЖШШИР
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativeJSHSHIR}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Second subtable */}
          <div className="mb-6">
            <p className="font-medium mb-2 border-b border-gray-300 pb-2 text-sm">
              Ходим қайси юридик шахснинг устав фонди (устав капитали) акцияларига эга улушларига малик қилса ёки бошқарув органлари раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 w-8">1.</td>
                    <td className="border border-gray-300 p-2">
                      Юридик шахснинг номи
                    </td>
                    <td className="border border-gray-300 p-2">{formData.legalEntityName}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2.</td>
                    <td className="border border-gray-300 p-2">
                      СТИР
                    </td>
                    <td className="border border-gray-300 p-2">{formData.stir}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Third subtable */}
          <div>
            <p className="font-medium mb-2 border-b border-gray-300 pb-2 text-sm">
              Ходимнинг яқин қариндоши қайси юридик шахснинг устав фонди (устав капитали) акцияларига эга улушларига малик қилса ёки бошқарув органлари раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 w-8">1.</td>
                    <td className="border border-gray-300 p-2">
                      Юридик шахснинг номи
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativeLegalEntityName}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2.</td>
                    <td className="border border-gray-300 p-2">
                      СТИР
                    </td>
                    <td className="border border-gray-300 p-2">{formData.relativeSTIR}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-sm text-gray-600 text-justify">
          *Ходим унга алоқадор шахсларнинг идентификация ID-картаси (биометрик паспорти), ЖШШИР, СТИР бўйича маълумотларни олиш имкониятига эга бўлмаса, у томонидан тегишли позицияларда "маълумотга эга эмасман" деб изоҳ кўрсатилиши мумкин
        </p>
      </div>
    </div>
  ));

  // SecondDocument.jsx
  const SecondDocument = React.forwardRef(({ formData }, ref) => (
    <div ref={ref} className="bg-white p-6 overflow-x-hidden min-w-[320px]">
      <div className="mx-auto max-w-4xl">
        {/* Page number */}
        <div className="text-right mb-8">
          <span>5</span>
        </div>

        {/* Section 3 */}
        <div className="mb-12">
          <h2 className="font-bold text-xl mb-4">
            3. Эҳтимолий манфаатлар тўқнашуви тўғрисидаги маълумот
          </h2>
          <div className="border-b border-gray-300">
            {formData.description || '________________________________________'}
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-12">
          <h2 className="font-bold text-xl mb-4">
            4. Эҳтимолий манфаатлар тўқнашуви тўғрисидаги декларацияда кўрсатилиши керак бўлган маълумотлардан ташқари қўшимча маълумотлар (агар мавжуд бўлса)
          </h2>
          <div className="border-b border-gray-300">
            {formData.additionalInfo || '________________________________________'}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            (ходим томонидан манфаатлар тўқнашуви вазияти сифатида баҳоланадиган бошқа ҳолатлар кўрсатилади)
          </p>
        </div>

        {/* Signature section */}
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <span>Ходимнинг лавозими</span>
            </div>
            <div className="text-center italic text-gray-500">
              Шахсий имзо ёки электрон рақамли имзоси
            </div>
            <div className="text-right">
              ({formData.managerFIO || '_______________'})
            </div>
          </div>
          <div className="text-right mt-4">
            <p>Тўлдирилган сана 20___ йил "___" ___________</p>
          </div>
        </div>

        {/* Registry note */}
        <div className="text-sm">
          <p>
            Эҳтимолий манфаатлар тўқнашуви аниқланган ҳолатлар Манфаатлар тўқнашувини ҳисобга олиш реестрида рўйхатга олинган санаси ва рақами: 20___ йил "___" "___________" -сон.
          </p>
        </div>
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

export default BenefitsItem2;