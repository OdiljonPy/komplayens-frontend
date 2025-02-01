// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



const FirstDocument = React.forwardRef(({ formData }, ref) => (
  <div ref={ref} className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px] font-serif" style={{ fontSize: '0.9rem' }}>
    {/* Title */}
    <div className="text-center mb-6">
      <h1 className="font-bold mb-2">Алоқадор шахсларнинг эҳтимолий манфаатлар тўқнашуви тўғрисидаги</h1>
      <h1 className="font-bold">ДЕКЛАРАЦИЯ</h1>
    </div>

    {/* Introduction text */}
    <p className="mb-6 text-justify">
      Мен <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.managerFIO}</span>, ушбу декларацияда алоқадор шахс сифатида
      ўзим ва ходим (ишга кираётган номзоднинг) эҳтимолий манфаатлар тўқнашувига оид қуйидаги маълумотларни маълум қиламан:
    </p>

    {/* Table */}
    <table className="w-full border-collapse border border-black mb-6">
      <tbody>
        <tr>
          <td className="border border-black p-2 w-12">1.</td>
          <td className="border border-black p-2">
            Ходимга алоқадор жисмоний шахснинг шахсий идентификация рақами (ЖШШИР)
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.jshshir}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">3.</td>
          <td className="border border-black p-2">
            Ходимга алоқадор юридик шахснинг номи
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.legalEntityName}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">4.</td>
          <td className="border border-black p-2">
            Ходимга алоқадор солиқ тўловчининг идентификация рақами (СТИР)
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.stir}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">5.</td>
          <td className="border border-black p-2">
            Ходимнинг Ф.И.О. ва лавозими
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.position} {formData.managerFIO}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">6.</td>
          <td className="border border-black p-2">
            <div>
              Жисмоний шахснинг ходим билан қариндошлиги тўғрисидаги маълумотлар
            </div>
            <div className="italic text-sm mt-1">
              (ота-онаси, ака-укалар, опа-сингиллар, ўғил-қизлар, эр-хотин, шунингдек эр-хотиннинг ота-онаси, ака-укалари, опа-сингиллари ва ўғил-қизлари)
            </div>
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.relativeInfo}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">7.</td>
          <td className="border border-black p-2">
            <div>
              Юридик шахснинг ходим билан алоқадорлиги тўғрисидаги маълумотлар
            </div>
            <div className="italic text-sm mt-1">
              (ходим ва унинг яқин қариндошлари таъсис этган ёки юридик шахснинг устав фонди (устав капитали)да иштирок этаётган юридик шахслар ҳақида маълумот, бундай шахсларнинг раҳбари ёки аъзоси бўлса, уни юридик шахс)
            </div>
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.employeeInfo}</span>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Signature section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8">
      <div className="whitespace-nowrap">Алоқадор шахс</div>
      <div className="flex items-center gap-4">
        <div className="italic whitespace-nowrap">Шахсий имзо ёки электрон рақамли имзоси</div>
        <div className="border-b border-black min-w-[180px] text-center pb-2">
          <span className="highlight bg-[#FFFF00] px-1 pb-4">{formData.managerFIO}</span>
        </div>
      </div>
    </div>
    <div className="text-right mt-2">
      <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.date}</span>
    </div>

    {/* Registration info */}
    <div className="mt-8 text-sm">
      Эҳтимолий манфаатлар тўқнашуви аниқланган ходимлар Манфаатлар тўқнашувини
      ҳисобга олиш реестрида рўйхатга олинган санаси ва рақами: 20___ йил "___" _______;
      реестр рақами № _______.
    </div>
  </div>
));

const Step1Form = ({ formData, handleInputChange }) => {

  // JSHSHIR inputi uchun handler
  const handleJSHSHIRChange = (e) => {
    const { name, value } = e.target;
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 14);
    handleInputChange({
      target: {
        name,
        value: numbers
      }
    });
  };

  // STIR inputi uchun handler
  const handleSTIRChange = (e) => {
    const { name, value } = e.target;
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 9);
    handleInputChange({
      target: {
        name,
        value: numbers
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Xodimga Oid Ma'lumotlar */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium mb-4">
          Xodimga Oid Ma'lumotlar
        </h2>

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
            onChange={handleJSHSHIRChange}
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
            onChange={handleSTIRChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="STIR"
            maxLength="9"
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
            placeholder="Lavozimni kiriting"
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
            placeholder="Qarindoshlar to'g'risidagi ma'lumotlarni kiriting"
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
            placeholder="Xodimlar to'g'risidagi ma'lumotlarni kiriting"
          />
          <div className="text-right text-sm text-gray-500">
            {(formData.employeeInfo || '').length}/460
          </div>
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

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            To'ldirilgan sana <span className="text-red-500">*</span>
          </label>

          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={(date) => {
              handleInputChange({
                target: {
                  name: 'date',
                  value: date ? date.toISOString().split('T')[0] : ''
                }
              });
            }}
            dateFormat="dd.MM.yyyy"
            placeholderText="DD.MM.YYYY"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const SecondDocument = React.forwardRef(({ formData }, ref) => (
  <div ref={ref} className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px] font-serif" style={{ fontSize: '0.9rem' }}>
    {/* Title */}
    <div className="text-center mb-6">
      <h1 className="font-bold mb-2">Алоқадор шахсларнинг эҳтимолий манфаатлар тўқнашуви</h1>
      <h1 className="font-bold mb-2">тўғрисидаги</h1>
      <h1 className="font-bold">ДЕКЛАРАЦИЯ</h1>
    </div>

    {/* Introduction text */}
    <div className="mb-8">
      <div className="flex items-baseline gap-2">
        <span>Мен</span>
        <div className="flex-1 border-b border-black min-h-[24px] relative pb-2">
          <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.managerFIO}</span>
          <div className="absolute -bottom-4 left-0 right-0 text-center text-[10px]">
            (фамилияси, исми ва шарифи)
          </div>
        </div>
      </div>
      <p className="mt-6">
        сифатида ўзим ва ходим (ишга кираётган номзоднинг) эҳтимолий манфаатлар тўқнашувига оид қуйидаги маълумотларни маълум қиламан:
      </p>
    </div>

    {/* Table */}
    <table className="w-full border-collapse border border-black mb-8">
      <tbody>
        <tr>
          <td className="border border-black p-2 w-12">1.</td>
          <td className="border border-black p-2">
            Ходимга алоқадор жисмоний шахснинг шахсий идентификация рақами (ЖШШИР)
          </td>
          <td className="border border-black p-2 min-w-[200px]">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.jshshir}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">3.</td>
          <td className="border border-black p-2">
            Ходимга алоқадор юридик шахснинг номи
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.legalEntityName}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">4.</td>
          <td className="border border-black p-2">
            Ходимга алоқадор солиқ тўловчининг идентификация рақами (СТИР)
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.stir}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">5.</td>
          <td className="border border-black p-2">
            Ходимнинг Ф.И.О. ва лавозими
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.position} {formData.managerFIO}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">6.</td>
          <td className="border border-black p-2">
            <div>
              Жисмоний шахснинг ходим билан қариндошлиги тўғрисидаги маълумотлар
            </div>
            <div className="italic text-sm mt-1">
              (ота-онаси, ака-укалар, опа-сингиллар, ўғил-қизлар, эр-хотин, шунингдек эр-хотиннинг ота-онаси, ака-укалари, опа-сингиллари ва фарзандлари)
            </div>
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.relativeInfo}</span>
          </td>
        </tr>
        <tr>
          <td className="border border-black p-2">7.</td>
          <td className="border border-black p-2">
            <div>
              Юридик шахснинг ходим билан алоқадорлиги тўғрисидаги маълумотлар
            </div>
            <div className="italic text-sm mt-1">
              (ходим ва унинг яқин қариндошлари таъсис этган ёки юридик шахснинг устав фонди (устав капитали)да иштирок этаётган юридик шахслар ҳақида маълумот, бундай шахсларнинг раҳбари ёки аъзоси бўлса, уша юридик шахс)
            </div>
          </td>
          <td className="border border-black p-2">
            <span className="highlight bg-[#FFFF00] px-1 pb-2">{formData.employeeInfo}</span>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Signature section */}
    <div className="flex justify-between items-start mt-8">
      <div>Алоқадор шахс</div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-4">
          <div className="italic text-sm">Шахсий имзо ёки электрон рақамли имзоси</div>
          <div className="border-b border-black min-w-[200px]"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">(Ф.И.О.)</div>
          <div className="text-sm">
            Тўлдирилган сана 20{formData.date ? new Date(formData.date).getFullYear().toString().slice(2) : '___'} йил "{formData.date ? new Date(formData.date).getDate().toString().padStart(2, '0') : '___'}" {formData.date ? new Date(formData.date).toLocaleString('default', { month: 'short' }) : '___'}
          </div>
        </div>
      </div>
    </div>

    {/* Registration info */}
    <div className="mt-8 text-sm">
      Эҳтимолий манфаатлар тўқнашуви аниқланган ходимлар Манфаатлар тўқнашувини
      ҳисобга олиш реестрида рўйхатга олинган санаси ва рақами: 20___ йил "___" _______
      "_______________"; реестр рақами № _______.
    </div>
  </div>
));

const BenefitsItem3 = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const firstPageRef = useRef(null);
  const secondPageRef = useRef(null);

  const [formData, setFormData] = useState({
    managerFIO: '',
    jshshir: '',
    legalEntityName: '',
    stir: '',
    position: '',
    relativeInfo: '',
    employeeInfo: '',
    description: '',
    additionalInfo: '',
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

  // Step 1 validatsiyasi
  const isStep1Valid = () => {
    const requiredFields = [
      'managerFIO',
      'jshshir',
      'legalEntityName',
      'stir',
      'position',
      'relativeInfo',
      'employeeInfo'
    ];
    return requiredFields.every(field => formData[field]?.trim());
  };

  // Step 2 validatsiyasi
  const isStep2Valid = () => {
    const requiredFields = ['date', 'description'];
    return requiredFields.every(field => formData[field] && formData[field].trim() !== '');
  };

  const generatePDF = async () => {
    try {
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 100));

      const doc = new jsPDF('p', 'mm', 'a4');
      const options = {
        scale: 1.3,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
        margin: [5, 5, 5, 5]
      };

      // Birinchi sahifani generatsiya qilish
      if (firstPageRef.current) {
        // Background'larni o'chirish
        const firstHighlights = firstPageRef.current.querySelectorAll('.highlight');
        firstHighlights.forEach(el => {
          el.classList.remove('highlight');
          el.classList.remove('bg-[#FFFF00]');
        });

        const firstCanvas = await html2canvas(firstPageRef.current, options);
        const firstImgData = firstCanvas.toDataURL('image/png');
        const pdfWidth = doc.internal.pageSize.getWidth() - 10;
        const pdfHeight = (firstCanvas.height * pdfWidth) / firstCanvas.width;
        doc.addImage(firstImgData, 'PNG', 5, 5, pdfWidth, pdfHeight);

        // Background'larni qaytarish
        firstHighlights.forEach(el => {
          el.classList.add('highlight');
          el.classList.add('bg-[#FFFF00]');
        });
      }

      // Ikkinchi sahifaga o'tish
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Ikkinchi sahifani generatsiya qilish
      if (secondPageRef.current) {
        // Background'larni o'chirish
        const secondHighlights = secondPageRef.current.querySelectorAll('.highlight');
        secondHighlights.forEach(el => {
          el.classList.remove('highlight');
          el.classList.remove('bg-[#FFFF00]');
        });

        const secondCanvas = await html2canvas(secondPageRef.current, options);
        const secondImgData = secondCanvas.toDataURL('image/png');
        const pdfWidth = doc.internal.pageSize.getWidth() - 10;
        const pdfHeight = (secondCanvas.height * pdfWidth) / secondCanvas.width;
        doc.addPage();
        doc.addImage(secondImgData, 'PNG', 5, 5, pdfWidth, pdfHeight);

        // Background'larni qaytarish
        secondHighlights.forEach(el => {
          el.classList.add('highlight');
          el.classList.add('bg-[#FFFF00]');
        });
      }

      // PDF ni download qilish va yangi tabda ochish
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Download qilish
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = 'declaration.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Yangi tabda ochish
      window.open(pdfUrl, '_blank');

      // URL ni tozalash
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 1000); // Vaqtni ko'paytirdik chunki endi ikkita operatsiya bajariladi

    } catch (error) {
      console.error('PDF generation error:', error);
      const allHighlights = document.querySelectorAll('.highlight');
      allHighlights.forEach(el => {
        el.classList.add('highlight');
        el.classList.add('bg-[#FFFF00]');
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 md:px-0 pt-12 md:pt-0">
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] whitespace-normal flex-shrink-0">
              {t('pages.benefits.title')}
            </h1>

            {/* Buttons */}
            {currentStep === 1 ? (
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!isStep1Valid()}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white
                    ${isStep1Valid()
                      ? 'bg-[#024073] hover:bg-[#024073]/90'
                      : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Keyingisi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#024073] text-[#024073]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Orqaga
                </button>
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#024073] text-white"
                >
                  <Download size={16} />
                  Yuklab olish
                </button>
              </div>
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
              <Step2Form formData={formData} handleInputChange={handleInputChange} />
            )}
          </div>

          {/* RIGHT SIDE - Preview */}
          <div className="lg:col-span-7">
            {currentStep === 1 ? (
              <div>
                <FirstDocument ref={firstPageRef} formData={formData} />
              </div>
            ) : (
              <div>
                <SecondDocument ref={secondPageRef} formData={formData} />
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default BenefitsItem3;