// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { Page, Text, View, Document, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Font registratsiyasi
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const Step1Form = ({ formData, handleInputChange }) => {
  const handlePassportSeriesChange = (name, e) => {
    const value = e.target.value.toUpperCase();
    const letters = value.slice(0, 2).replace(/[^A-Z]/g, '');
    const numbers = value.slice(2).replace(/[^0-9]/g, '');
    const formattedValue = `${letters}${numbers}`.slice(0, 9);
    handleInputChange({
      target: {
        name: name,
        value: formattedValue
      }
    });
  };

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
    <div className="space-y-8">
      {/* Xodimga Oid Ma'lumotlar */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-6">Xodimga Oid Ma'lumotlar</h2>

        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              F.I.O <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="managerFIO"
              value={formData.managerFIO}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Familiya, ism, otasining ismi"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Pasport seriyasi va raqami <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="passportSeries"
              value={formData.passportSeries}
              onChange={e => {
                handlePassportSeriesChange('passportSeries', e)
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Pasport seriyasi va raqami"
              maxLength="9"
            />
          </div>

          <div className="form-group relative ">
            <label className="block text-sm text-gray-500 mb-1">
              Pasport berilgan sanasi <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => {
                const formattedDate = date.toISOString().split('T')[0];
                handleInputChange({ target: { name: 'date', value: formattedDate } });
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg pl-10"
              placeholderText="Pasport berilgan sanasi"
            />
            <Calendar className="absolute left-2 top-[42px] transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              JSHSHIR <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="jshshir"
              value={formData.jshshir}
              onChange={handleJSHSHIRChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="123 456 789 012"
              maxLength="14"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Lavozimi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Lavozimi"
            />
          </div>

          {/* Rahbar ma'lumotlari */}
          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Raxbarning F.I.O <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="supervisorFIO"
              value={formData.supervisorFIO}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Familiya, ism, otasining ismi"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Raxbarning lavozimi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="supervisorPosition"
              value={formData.supervisorPosition}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Lavozimi"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Yuridik shaxsni nomi
            </label>
            <input
              type="text"
              name="legalEntityName2"
              value={formData.legalEntityName2}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Yuridik shaxsni nomi"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              STIR
            </label>
            <input
              type="text"
              name="stir2"
              value={formData.stir2}
              onChange={handleSTIRChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="STIR"
              maxLength="9"
            />
          </div>
        </div>
      </div>

      {/* Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-6">Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot</h2>

        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              F.I.O <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="relativeFIO"
              value={formData.relativeFIO}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Familiya, ism, otasining ismi"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Pasport seriyasi va raqami <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="relativePassport"
              value={formData.relativePassport}
              onChange={e => {
                handlePassportSeriesChange('relativePassport', e)
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Pasport seriyasi va raqami"
            />
          </div>
          <div className="form-group relative">
            <label className="block text-sm text-gray-500 mb-1">
              Pasport berilgan sanasi <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={formData.passportIssueDate}
              onChange={(date) => {
                const formattedDate = date.toISOString().split('T')[0];
                handleInputChange({ target: { name: 'passportIssueDate', value: formattedDate } });
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg pl-10"
              placeholderText="Pasport berilgan sanasi"
            />
            <Calendar className="absolute left-2 top-[42px] transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              JSHSHIR <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="relativeJSHSHIR"
              value={formData.relativeJSHSHIR}
              onChange={handleJSHSHIRChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="123 456 789 012"
              maxLength="14"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              Yuridik shaxsni nomi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="legalEntityName1"
              value={formData.legalEntityName1}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="Yuridik shaxsni nomi"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm text-gray-500 mb-1">
              STIR <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="stir1"
              value={formData.stir1}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              placeholder="STIR"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step2Form.jsx
const Step2Form = ({ formData, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">
          Мавжуд манфаатлар тўқнашуви бўйича маълумот
        </h2>

        <div className="form-group">
          <label className="block text-sm text-gray-500 mb-1">
            Мавжуд манфаатлар тўқнашуви тўғрисида маълумот <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg min-h-[100px]"
            placeholder="Манфаатлар тўқнашуви тўғрисида маълумот киритинг"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm text-gray-500 mb-1">
            Манфаатлар тўқнашувини тартибга солиш бўйича кўрилган чора <span className="text-red-500">*</span>
          </label>
          <textarea
            name="measures"
            value={formData.measures}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg min-h-[100px]"
            placeholder="Кўрилган чоралар ҳақида маълумот киритинг"
          />
        </div>
      </div>
    </div>
  );
};

const FirstDocument = ({ formData }) => (
  <div className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px] font-serif" style={{ fontSize: '0.9rem' }}>
    {/* Header */}
    <div className="text-right mb-8">
      <div>
        <div className="flex justify-end">
          <div className="border-b border-black mt-1 pb-2">
            {formData.supervisorPosition} {formData.supervisorFIO}
          </div>
          <div className="border-b border-black ml-2">га</div>
        </div>
        <div className="text-xs mt-1">(бевосита раҳбарнинг лавозими ва Ф.И.О.)</div>
      </div>

      <div className="mt-4">
        <div className="flex justify-end">
          <div className="border-b border-black mt-1 pb-2" style={{ minWidth: "200px" }}>
            {formData.position} {formData.managerFIO}
          </div>
          <div className="border-b border-black ml-2">дан</div>
        </div>
        <div className="text-xs mt-1">(ходимнинг лавозими ва Ф.И.О.)</div>
      </div>
    </div>

    {/* Title */}
    <div className="text-center mb-6">
      <h1 className="font-bold mb-2">Мавжуд манфаатлар тўқнашуви тўғрисидаги</h1>
      <h1 className="font-bold">ХАБАРНОМА</h1>
    </div>

    {/* Introduction text */}
    <p className="mb-6 text-justify">
      Мен ушбу хабарномада ўзим ва менга алоқадор шахсларнинг мавжуд манфаатлар тўқнашувига оид қуйидаги маълумотлар тўғрисида хабар бераман:
    </p>

    {/* Employee Information Section */}
    <div className="mb-6">
      <h2 className="font-bold mb-4">1. Ходимга оид маълумотлар</h2>
      <table className="w-full border-collapse border border-black" >
        <tbody>
          <tr>
            <td className="border border-black p-2 w-8 align-top">1.</td>
            <td className="border border-black p-2" style={{ width: "60%" }}>
              Идентификация ID-картаси ёки биометрик паспорт маълумотлари (серияси, рақами, берилган санаси)
            </td>
            <td className="border border-black p-2" style={{ width: "30%" }}>
              {formData.passportSeries} {formData.passportIssueDate}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2">2.</td>
            <td className="border border-black p-2">
              Жисмоний шахснинг шахсий идентификация рақами (ЖШШИР)
            </td>
            <td className="border border-black p-2">{formData.jshshir}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Related Person Information */}
    <div className="mb-6">
      <h2 className="font-bold mb-4">2. Алоқадор шахсларга оид маълумотлар*</h2>

      {/* Qarindosh ma'lumotlari */}
      <table className="w-full border-collapse border border-black mb-6" >
        <tbody>
          <tr>
            <td colSpan="3" className="border border-black p-2 text-center font-bold">
              Ходимнинг яқин қариндошига оид маълумотлар
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 w-8">1.</td>
            <td className="border border-black p-2">Фамилия, исми, отасининг исми</td>
            <td className="border border-black p-2">{formData.relativeFIO}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">2.</td>
            <td className="border border-black p-2">
              Идентификация ID-картаси ёки биометрик паспорт маълумотлари
            </td>
            <td className="border border-black p-2">{formData.relativePassport}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">3.</td>
            <td className="border border-black p-2">ЖШШИР</td>
            <td className="border border-black p-2">{formData.relativeJSHSHIR}</td>
          </tr>
        </tbody>
      </table>

      {/* Xodim yuridik shaxs ma'lumotlari */}
      <table className="w-full border-collapse border border-black mb-6" >
        <tbody>
          <tr>
            <td colSpan="3" className="border border-black p-2 text-center font-bold">
              Ходим қайси юридик шахснинг устав фонди (устав капитали) акцияларига ёки улушларига эгалик қилса ёхуд унда бошқаруv органининг раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 w-8">1.</td>
            <td className="border border-black p-2">Юридик шахснинг номи</td>
            <td className="border border-black p-2">{formData.legalEntityName2}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">2.</td>
            <td className="border border-black p-2">СТИР</td>
            <td className="border border-black p-2">{formData.stir2}</td>
          </tr>
        </tbody>
      </table>

      {/* Qarindosh yuridik shaxs ma'lumotlari */}
      <table className="w-full border-collapse border border-black" >
        <tbody>
          <tr>
            <td colSpan="3" className="border border-black p-2 text-center font-bold">
              Ходимнинг яқин қариндоши қайси юридик шахснинг устав фонди (устав капитали) акцияларига ёки улушларига эгалик қилса ёхуд унда бошқаруv органининг раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 w-8">1.</td>
            <td className="border border-black p-2">Юридик шахснинг номи</td>
            <td className="border border-black p-2">{formData.legalEntityName1}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">2.</td>
            <td className="border border-black p-2">СТИР</td>
            <td className="border border-black p-2">{formData.stir1}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const SecondDocument = React.forwardRef(({ formData }, ref) => (
  <div ref={ref} className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px] font-serif" style={{ fontSize: '0.9rem' }}>
    {/* Izoh matni */}
    <p className="text-sm mb-6 text-justify">
      *Ходим унга алоқадор шахсларнинг (ходимнинг яқин қариндошлари ёки ходимнинг яқин қариндошлари устав фонди (устав капитали) акцияларига ёки улушларига эгалик қиладиган ёхуд бошқаруv органи раҳбари ёки аъзоси бўлган юридик шахс) идентификация ID-картаси (биометрик паспорти), ЖШШИР, СТИР бўйича маълумотларни олиш имкониятига эга бўлмаса, у томонидан тегишли позицияларда "маълумотга эга эмасман" деб изоҳ кўрсатилиши мумкин.
    </p>

    {/* 3-bo'lim */}
    <h2 className="font-bold mb-3">3. Мавжуд манфаатлар тўқнашуви бўйича маълумот</h2>

    <table className="w-full border-collapse border border-black mb-6" >
      <tbody>
        <tr>
          <td className="border border-black p-2 w-8">1.</td>
          <td className="border border-black p-2">
            Мавжуд манфаатлар тўқнашуви тўғрисида маълумот
          </td>
          <td className="border border-black p-2">
            {formData.description}
          </td>
        </tr>
      </tbody>
    </table>

    {/* Imzo qismi */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>Ходимнинг лавозими</div>
        <div className="italic">Шахсий имзо ёки электрон рақамли имзоси</div>
        <div className="border-b border-black" style={{ minWidth: "180px" }}>
          {formData.managerFIO}
        </div>
      </div>
      <div className="text-right">
        Тўлдирилган сана 20___ йил "___" ________
      </div>
    </div>

    {/* Rahbar qismi */}
    <div className="mb-3 text-center font-bold">
      Ходимнинг бевосита раҳбари
    </div>

    <div className="mb-6">
      <p className="mb-4">
        Мавжуд манфаатлар тўқнашувини тартибга солиш бўйича кўрилган чора:
      </p>
      <div className="border-b border-black mb-4">
        {formData.measures}
      </div>
    </div>

    {/* Rahbar imzosi */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>Ходимнинг бевосита<br />раҳбарининг лавозими</div>
        <div className="italic">Шахсий имзо ёки электрон<br />рақамли имзоси</div>
        <div className="border-b border-black" style={{ minWidth: "180px" }}>
          {formData.supervisorFIO}
        </div>
      </div>
      <div className="text-right">
        Тўлдирилган сана 20___ йил "___" ________
      </div>
    </div>

    {/* Ro'yxat raqami */}
    <p className="text-justify" style={{ fontSize: '0.85rem' }}>
      Мавжуд манфаатлар тўқнашуви аниқланган ҳолатлар Манфаатлар тўқнашувини ҳисобга олиш реестрида рўйхатга олинган санаси ва тартиб рақами: 20___ йил "___" ____________ "-_______________-сон.
    </p>
  </div>
));

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
    console.log(name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setCurrentStep(2);

  const isStep1Valid = () => {
    const requiredFields = [
      'supervisorFIO',
      'supervisorPosition',
      'managerFIO',
      'position',
      'passportSeries',
      'passportIssueDate',
      'jshshir',
      'relativeFIO',
      'relativePassport',
      'relativeJSHSHIR'
    ];

    return requiredFields.every(field => formData[field]?.trim());
  };

  const isStep2Valid = () => {
    const requiredFields = ['description', 'measures'];
    return requiredFields.every(field => formData[field]?.trim());
  };

  const generatePDF = async () => {
    if (!isStep2Valid()) return;

    try {
      const doc = new jsPDF('p', 'mm', 'a4');

      // Birinchi sahifani generatsiya qilish
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!firstPageRef.current) {
        console.error('First page reference not found');
        return;
      }

      const options = {
        scale: 1.3,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: firstPageRef.current.offsetWidth,
        windowHeight: firstPageRef.current.offsetHeight,
        margin: [5, 5, 5, 5]
      };

      // First page
      const firstCanvas = await html2canvas(firstPageRef.current, options);
      const firstImgData = firstCanvas.toDataURL('image/png');

      const firstImgProps = doc.getImageProperties(firstImgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 10;
      const pdfHeight = (firstImgProps.height * pdfWidth) / firstImgProps.width;

      doc.addImage(firstImgData, 'PNG', 5, 5, pdfWidth, pdfHeight);

      // Ikkinchi sahifani generatsiya qilish
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Ikkinchi ref mavjudligini tekshirish
      if (!secondPageRef.current) {
        console.error('Second page reference not found');
        return;
      }

      const secondCanvas = await html2canvas(secondPageRef.current, options);
      const secondImgData = secondCanvas.toDataURL('image/png');

      doc.addPage();

      const secondImgProps = doc.getImageProperties(secondImgData);
      const secondPdfHeight = (secondImgProps.height * pdfWidth) / secondImgProps.width;

      doc.addImage(secondImgData, 'PNG', 5, 5, pdfWidth, secondPdfHeight);

      // PDF ni ochish
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');

    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      // Har qanday holatda birinchi sahifaga qaytish
      setCurrentStep(1);
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
              <button
                onClick={handleNext}
                disabled={!isStep1Valid()}
                className={`w-full sm:w-auto px-4 md:px-6 py-2.5 text-white rounded transition-colors duration-200 text-sm md:text-base flex items-center justify-center ${isStep1Valid() ? 'bg-[#024073] hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                <span>{t('pages.benefits.next')}</span>
                <span className="ml-1">›</span>
              </button>
            ) : (
              <button
                onClick={generatePDF}
                disabled={!isStep2Valid()}
                className={`w-full sm:w-auto px-4 md:px-6 py-2.5 text-white rounded transition-colors duration-200 text-sm md:text-base flex items-center justify-center gap-2 ${isStep2Valid() ? 'bg-[#024073] hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
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
              <Step2Form formData={formData} handleInputChange={handleInputChange} />
            )}
          </div>

          {/* RIGHT SIDE - Preview */}
          <div className="lg:col-span-7">
            {currentStep === 1 ? (
              <div ref={firstPageRef}>
                <FirstDocument formData={formData} />
              </div>
            ) : (
              <div ref={secondPageRef}>
                <SecondDocument formData={formData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsItem;