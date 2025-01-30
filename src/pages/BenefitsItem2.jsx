// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Step1Form = ({ formData, handleInputChange }) => {

  // Passport seriyasi uchun handler
  const handlePassportSeriesChange = (e) => {
    const { name, value } = e.target;
    const upperValue = value.toUpperCase();
    const letters = upperValue.slice(0, 2).replace(/[^A-Z]/g, '');
    const numbers = upperValue.slice(2).replace(/[^0-9]/g, '');

    const formattedValue = `${letters}${numbers}`.slice(0, 9);

    handleInputChange({
      target: {
        name,
        value: formattedValue
      }
    });
  };

  // JSHSHIR inputlari uchun handler
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
            Pasport seriyasi va raqami <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="passportSeries"
            value={formData.passportSeries}
            onChange={handlePassportSeriesChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Pasport seriyasi va raqami"
            maxLength="9"
          />
        </div>

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            Pasport berilgan sanasi <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.passportIssueDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'passportIssueDate', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
            placeholderText="Pasport berilgan sanasi"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
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
            Yuridik shaxsni nomi <span className="text-red-500">*</span>
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
            Pasport seriyasi va raqami <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativePassport"
            value={formData.relativePassport}
            onChange={handlePassportSeriesChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Pasport seriyasi va raqami"
            maxLength="9"
          />
        </div>

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            Pasport berilgan sanasi <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.relativePassportDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'relativePassportDate', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
            placeholderText="Pasport berilgan sanasi"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            JSHSHIR <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeJSHSHIR"
            value={formData.relativeJSHSHIR}
            onChange={handleJSHSHIRChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="123 456 789 012"
            maxLength="14"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            Yuridik shaxsni nomi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeLegalEntityName"
            value={formData.relativeLegalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="Yuridik shaxsni nomi"
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

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            Sana <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'date', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
            placeholderText="19.01.2025"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
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
            Qo'shimcha ma'lumot
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

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            To'ldirilgan sana <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.filledDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'filledDate', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
            placeholderText="19.01.2025"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const FirstDocument = ({ formData }) => (
  <div className="bg-white p-4 md:p-6 overflow-x-hidden min-w-[320px] font-serif" style={{ fontSize: '0.9rem' }}>
    {/* Title */}
    <div className="text-center mb-6">
      <h1 className="font-bold text-lg">
        Ходимнинг эҳтимолий манфаатлар тўқнашуви тўғрисидаги
      </h1>
      <h1 className="font-bold text-lg">
        ДЕКЛАРАЦИЯСИ
      </h1>
    </div>

    {/* Introduction text */}
    <div className="mb-6">
      <div className="flex items-baseline mb-2">
        <div className="mr-2">Мен,</div>
        <div className="border-b border-black flex-grow text-center pb-2">
          {formData.managerFIO}
        </div>
        <div className="ml-2">ушбу</div>
      </div>
      <div className="text-center text-xs">
        (фамилияси, исми, отасининг исми ва унинг лавозими)
      </div>

      <div className="border-b border-black w-full mb-2 text-center pb-2">
        {formData.position}
      </div>
      <div className="text-center text-xs mb-4">
        (йиллик/ишга қабул қилинаётганда/бошқа ишга ўтказилаётганда)
      </div>

      <p className="text-justify">
        тўлдираётган декларацияда ўзим ва менга алоқадор шахсларнинг эҳтимолий манфаатлар тўқнашувига оид қуйидаги маълумотларни ошкор қиламан:
      </p>
    </div>

    {/* Employee Information Section */}
    <div className="mb-6">
      <h2 className="font-bold mb-3">1. Ходимга оид маълумотлар</h2>
      <table className="w-full border-collapse border border-black" style={{ maxWidth: "650px", margin: "0 auto" }}>
        <tbody>
          <tr>
            <td className="border border-black p-2 w-8">1.</td>
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
      <h2 className="font-bold mb-3">
        2. Алоқадор шахсга оид маълумотлар*
      </h2>
      <table className="w-full border-collapse border border-black mb-4" style={{ maxWidth: "650px", margin: "0 auto" }}>
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
            <td className="border border-black p-2">{formData.relativePassport} {formData.relativePassportDate}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">3.</td>
            <td className="border border-black p-2">
              Жисмоний шахснинг шахсий идентификация рақами (ЖШШИР)
            </td>
            <td className="border border-black p-2">{formData.relativeJSHSHIR}</td>
          </tr>
        </tbody>
      </table>

      {/* Legal Entity Information */}
      <table className="w-full border-collapse border border-black mb-4" style={{ maxWidth: "650px", margin: "0 auto" }}>
        <tbody>
          <tr>
            <td colSpan="3" className="border border-black p-2 text-center font-bold">
              Ходим қайси юридик шахснинг устав фонди (устав капитали) акцияларига ёки улушларига эгалик қилса ёхуд унда бошқарув органининг раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 w-8">1.</td>
            <td className="border border-black p-2">Юридик шахснинг номи</td>
            <td className="border border-black p-2">{formData.legalEntityName}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">2.</td>
            <td className="border border-black p-2">
              Солиқ тўловчининг идентификация рақами (СТИР)
            </td>
            <td className="border border-black p-2">{formData.stir}</td>
          </tr>
        </tbody>
      </table>

      {/* Relative's Legal Entity Information */}
      <table className="w-full border-collapse border border-black" style={{ maxWidth: "650px", margin: "0 auto" }}>
        <tbody>
          <tr>
            <td colSpan="3" className="border border-black p-2 text-center font-bold">
              Ходимнинг яқин қариндоши қайси юридик шахснинг устав фонди (устав капитали) акцияларига ёки улушларига эгалик қилса ёхуд унда бошқарув органининг раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 w-8">1.</td>
            <td className="border border-black p-2">Юридик шахснинг номи</td>
            <td className="border border-black p-2">{formData.relativeLegalEntityName}</td>
          </tr>
          <tr>
            <td className="border border-black p-2">2.</td>
            <td className="border border-black p-2">
              Солиқ тўловчининг идентификация рақами (СТИР)
            </td>
            <td className="border border-black p-2">{formData.relativeSTIR}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Footnote */}
    <div className="text-xs text-justify" style={{ fontSize: '0.7rem' }}>
      *Ходим унга алоқадор шахсларнинг (ходимнинг яқин қариндошлари ёки ходимнинг яқин қариндошлари устав фонди (устав капитали) акцияларига ёки улушларига эгалик қиладиган ёхуд бошқарув органи раҳбари ёки аъзоси бўлган юридик шахс) идентификация ID-картаси (биометрик паспорти), ЖШШИР, СТИР бўйича маълумотларни олиш имкониятига эга бўлмаса, у томонидан тегишли позицияларда "маълумотга эга эмасман" деб изоҳ кўрсатилиши мумкин.
    </div>
  </div>
);

const SecondDocument = React.forwardRef(({ formData }, ref) => {

  // Matn uzunligiga qarab qatorlarni hisoblash
  const getTextLines = (text, maxWidth = 90) => {
    if (!text) return ['_______________________'];

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    // Agar matn yo'q yoki qisqa bo'lsa, kamida bitta chiziq ko'rsatish
    return lines.length ? lines : ['_______________________'];
  };

  // Description va additionalInfo uchun qatorlarni olish
  const descriptionLines = getTextLines(formData.description);
  const additionalInfoLines = getTextLines(formData.additionalInfo);

  // Sanani formatlash uchun funksiya
  const formatDate = (dateString) => {
    if (!dateString) return { year: '___', day: '___', month: '________' };

    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2); // oxirgi 2 raqam
    const day = date.getDate().toString().padStart(2, '0');
    const months = [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const month = months[date.getMonth()];

    return { year, day, month };
  };

  const date = formatDate(formData.date);
  const filledDate = formatDate(formData.filledDate);

  return (
    <div ref={ref} className="bg-white p-6 overflow-x-hidden min-w-[320px] font-serif">
      <div className="mx-auto max-w-4xl">
        {/* Page number */}
        <div className="text-right mb-8">
          <span>5</span>
        </div>

        {/* Description section */}
        <div className="mb-12">
          <h2 className="font-bold mb-4">
            3. Эҳтимолий манфаатлар тўқнашуви тўғрисидаги маълумот
          </h2>
          {descriptionLines.map((line, index) => (
            <div key={index} className="border-b border-gray-300 min-h-[30px] mb-2">
              {line}
            </div>
          ))}
        </div>

        {/* Additional Info section */}
        <div className="mb-12">
          <h2 className="font-bold mb-4">
            4. Эҳтимолий манфаатлар тўқнашуви тўғрисидаги декларацияда кўрсатилиши керак бўлган маълумотлардан ташқари қўшимча маълумотлар (агар мавжуд бўлса)
          </h2>
          {additionalInfoLines.map((line, index) => (
            <div key={index} className="border-b border-gray-300 min-h-[30px] mb-2">
              {line}
            </div>
          ))}
          <div className="text-xs text-gray-600 mt-2 text-center">
            (ходим томонидан манфаатлар тўқнашуви вазияти сифатида баҳоланадиган бошқа ҳолатлар кўрсатилади)
          </div>
        </div>

        {/* Signature block */}
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              Ходимнинг лавозими
            </div>
            <div className="text-center italic">
              Шахсий имзо ёки электрон рақамли имзоси
            </div>
            <div className="text-right">
              {formData.managerFIO ? (
                <span>({formData.managerFIO})</span>
              ) : '(_______________)'}
            </div>
          </div>
          <div className="text-right mt-4">
            Тўлдирилган сана 20{filledDate.year} йил "{filledDate.day}" {filledDate.month}
          </div>
        </div>

        {/* Registration info */}
        <div className="text-sm mt-8">
          <p>
            Эҳтимолий манфаатлар тўқнашуви аниқланган ҳолатлар Манфаатлар тўқнашувини ҳисобга олиш реестрида рўйхатга олинган санаси ва рақами: 20{date.year} йил "{date.day}" {date.month} "-_______________"; реестр рақами ______-сон.
          </p>
        </div>
      </div>
    </div>
  );
});

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
    date: '',
    filledDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setCurrentStep(2);

  const isStep2Valid = () => {
    const requiredFields = ['date', 'description'];
    return requiredFields.every(field => formData[field] && formData[field].trim() !== '');
  };

  const generatePDF = async () => {
    if (!isStep2Valid()) return;

    try {
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 100));

      const doc = new jsPDF('p', 'mm', 'a4');

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
      if (firstPageRef.current) {
        const firstCanvas = await html2canvas(firstPageRef.current, options);
        const firstImgData = firstCanvas.toDataURL('image/png');

        const imgProps = doc.getImageProperties(firstImgData);
        const pdfWidth = doc.internal.pageSize.getWidth() - 10;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(firstImgData, 'PNG', 5, 5, pdfWidth, pdfHeight);
      }

      // Second page
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 100));

      if (secondPageRef.current) {
        const secondCanvas = await html2canvas(secondPageRef.current, options);
        const secondImgData = secondCanvas.toDataURL('image/png');

        const imgProps = doc.getImageProperties(secondImgData);
        const pdfWidth = doc.internal.pageSize.getWidth() - 10;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addPage();
        doc.addImage(secondImgData, 'PNG', 5, 5, pdfWidth, pdfHeight);
      }

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');

    } catch (error) {
      console.error('PDF generation error:', error);
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
                className={`w-full sm:w-auto px-4 md:px-6 py-2.5 text-white rounded transition-colors duration-200 text-sm md:text-base flex items-center justify-center
                ${isStep2Valid()
                    ? 'bg-[#024073] hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <span>{t('pages.benefits.next')}</span>
                <span className="ml-1">›</span>
              </button>
            ) : (
              <button
                onClick={generatePDF}
                disabled={!isStep2Valid()}
                className={`w-full sm:w-auto px-4 md:px-6 py-2.5 text-white rounded transition-colors duration-200 text-sm md:text-base flex items-center justify-center gap-2
                ${isStep2Valid()
                    ? 'bg-[#024073] hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'}`}
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

export default BenefitsItem2;