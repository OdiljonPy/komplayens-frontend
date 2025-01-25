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
        <h2 className="text-lg font-medium mb-4">Xodimga Oid Ma'lumotlar</h2>

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
            JSHSHIR
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
            Yuridik shaxsni nomi
          </label>
          <input
            type="text"
            name="legalEntityName"
            value={formData.legalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Yuridik shaxsni nomi"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            STIR
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

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Lavozim
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="123 456 789 012"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Qarindoshlar to'g'risidagi ma'lumotlar
          </label>
          <textarea
            name="relativeInfo"
            value={formData.relativeInfo}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg resize-none"
            rows={4}
            maxLength={460}
          />
          <div className="text-right text-sm text-gray-500">
            {(formData.relativeInfo || '').length}/460
          </div>
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Xodimlar to'g'risidagi ma'lumotlar
          </label>
          <textarea
            name="employeeInfo"
            value={formData.employeeInfo}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg resize-none"
            rows={4}
            maxLength={460}
          />
          <div className="text-right text-sm text-gray-500">
            {(formData.employeeInfo || '').length}/460
          </div>
        </div>
      </div>

      {/* Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium mb-4">
          Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            F.I.O <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="conflictPersonFIO"
            value={formData.conflictPersonFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Familiya, ism, otasining ismi"
          />
        </div>
      </div>
    </div>
  );
};

const Step2Form = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium mb-4">
          Manfaatlar To'qnashuvi To'g'risidagi Axborot
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            To'ldirilgan sana <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

const BenefitsItem3 = () => {
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
    <div ref={ref} className="bg-white p-4 md:p-6 rounded-lg shadow-sm min-w-[320px] max-w-full overflow-x-auto">
      {/* Header section */}
      <div className="text-center mb-6 max-w-3xl mx-auto">
        <h1 className="font-bold text-base md:text-lg mb-1 whitespace-normal">
          Алоқадор шахсларнинг эҳтимолий манфаатлар тўқнашуви
        </h1>
        <h1 className="font-bold text-base md:text-lg mb-1 whitespace-normal">
          тўғрисидаги
        </h1>
        <h1 className="font-bold text-lg md:text-xl whitespace-normal">
          ДЕКЛАРАЦИЯ
        </h1>
      </div>

      {/* Introduction text */}
      <div className="mb-6 text-sm md:text-base">
        <p className="whitespace-normal">
          Мен {formData.managerFIO ? (
            <span className="inline">
              <span className="bg-[#FFFF00] px-1">{formData.managerFIO}</span>
            </span>
          ) : '________________'},
          ушбу декларацияда алоқадор шахс сифатида ўзим ва ходим (ишга кирaётган номзоднинг)
          эҳтимолий манфаатлар тўқнашувига оид қуйидаги маълумотларни маълум қиламан:
        </p>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mb-6 min-w-[600px]">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 align-top w-12">1.</td>
              <td className="border border-gray-300 p-2 whitespace-normal">
                <div className="break-words">
                  Ходимга алоқадор жисмоний шахснинг шахсий идентификация рақами (ЖШШИР)
                </div>
              </td>
              <td className="border border-gray-300 p-2 min-w-[200px]">
                {formData.jshshir ? (
                  <span className="bg-[#FFFF00] px-1 break-all">{formData.jshshir}</span>
                ) : ''}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 align-top">3.</td>
              <td className="border border-gray-300 p-2 whitespace-normal">
                <div className="break-words">
                  Ходимга алоқадор юридик шахснинг номи
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {formData.legalEntityName ? (
                  <span className="bg-[#FFFF00] px-1 break-words">{formData.legalEntityName}</span>
                ) : ''}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 align-top">4.</td>
              <td className="border border-gray-300 p-2 whitespace-normal">
                <div className="break-words">
                  Ходимга алоқадор солиқ тўловчининг идентификация рақами (СТИР)
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {formData.stir ? (
                  <span className="bg-[#FFFF00] px-1 break-all">{formData.stir}</span>
                ) : ''}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 align-top">5.</td>
              <td className="border border-gray-300 p-2 whitespace-normal">
                <div className="break-words">
                  Ходимнинг Ф.И.О. ва лавозими
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {formData.position ? (
                  <span className="bg-[#FFFF00] px-1 break-words">{formData.position}</span>
                ) : ''}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 align-top">6.</td>
              <td className="border border-gray-300 p-2">
                <div className="whitespace-normal break-words">
                  Жисмоний шахснинг ходим билан қариндошлиги тўғрисидаги маълумотлар
                </div>
                <div className="italic text-sm mt-1 whitespace-normal break-words">
                  (ота-оналар, ака-укалар, опа-сингиллар, ўғиллар, қизлар, эр-хотинлар,
                  шунингдек эр-хотинларнинг ота-оналари, ака-укалари, опа-сингиллари ва фарзандлари)
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {formData.relativeInfo ? (
                  <span className="bg-[#FFFF00] px-1 break-words">{formData.relativeInfo}</span>
                ) : ''}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 align-top">7.</td>
              <td className="border border-gray-300 p-2">
                <div className="whitespace-normal break-words">
                  Юридик шахснинг ходим билан алоқадорлиги тўғрисидаги маълумотлар
                </div>
                <div className="italic text-sm mt-1 whitespace-normal break-words">
                  (ходим ва унинг яқин қариндошлари қайси юридик шахснинг устав фонди (устав капитали)
                  акцияларига ёки улушларига эгалик қилса ёхуд бошқарув органининг раҳбари ёки аъзоси бўлса,
                  ўша юридик шахс)
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {formData.legalEntityInfo ? (
                  <span className="bg-[#FFFF00] px-1 break-words">{formData.legalEntityInfo}</span>
                ) : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signature section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8">
        <div className="whitespace-nowrap">Алоқадор шахс</div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-center">
            <div className="whitespace-nowrap">Шахсий имзо ёки электрон</div>
            <div className="whitespace-nowrap">рақамли имзоси</div>
          </div>
          {(formData.signature || formData.signDate) ? (
            <div className="bg-[#FFFF00] px-1 break-words max-w-full">
              {formData.signature}<br />
              {formData.signDate}
            </div>
          ) : null}
        </div>
      </div>

      {/* Footer text */}
      <div className="mt-8 text-sm whitespace-normal break-words">
        Эҳтимолий манфаатлар тўқнашуви аниқланган ҳолатлар Манфаатлар тўқнашувини
        ҳисобга олиш реестрида рўйхатга олинган санаси ва рақами: 20___ йил "___"
        "___________"; реестр рақами № ______.
      </div>
    </div>
  ));

  const SecondDocument = React.forwardRef(({ formData }, ref) => (
    <div ref={ref} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <h1 className="font-bold text-lg mb-1">
          Алоқадор шахсларнинг эҳтимолий манфаатлар тўқнашуви
        </h1>
        <h1 className="font-bold text-lg mb-1">
          тўғрисидаги
        </h1>
        <h1 className="font-bold text-xl">
          ДЕКЛАРАЦИЯ
        </h1>
      </div>

      <div className="mb-6">
        <p className="text-base">
          Мен _________________________, ушбу декларацияда алоқадор шахс
          <span className="text-sm">(фамилияси, исми ва шарифи)</span>
        </p>
        <p className="text-base">
          сифатида ўзим ва ходим (ишга кирaётган номзоднинг) эҳтимолий
          манфаатлар тўқнашувига оид қуйидаги маълумотларни маълум қиламан:
        </p>
      </div>

      {/* Same table structure as FirstDocument but without values */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        {/* ... table content same as FirstDocument but without values ... */}
      </table>

      <div className="flex justify-between items-start mt-8">
        <div>Алоқадор шахс</div>
        <div className="flex items-center gap-4">
          <div>
            <div>Шахсий имзо ёки электрон</div>
            <div>рақамли имзоси</div>
          </div>
          <div className="text-right">
            <div>(Ф.И.О.)</div>
            <div>Тўлдирилган сана 20___ йил "___" _______</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm">
        Эҳтимолий манфаатлар тўқнашуви аниқланган ҳолатлар Манфаатлар тўқнашувини
        ҳисобга олиш реестрида рўйхатга олинган санаси ва рақами: 20___ йил "___"
        "___________"; реестр рақами № ______.
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

export default BenefitsItem3;