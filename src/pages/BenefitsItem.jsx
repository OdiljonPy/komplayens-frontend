import React, { useState, useRef } from 'react';
import { Download, ChevronRight } from 'lucide-react';

const BenefitsItem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    managerFIO: '',
    employeeFIO: '',
    passportSeries: '',
    passportIssueDate: '',
    jshshir: '',
    phoneNumber: '',
    relativeFIO: '',
    legalEntityName: '',
    stir: '',
    legalEntityName2: '',
    stir2: ''
  });

  const documentRef = useRef(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleDownload = async () => {
    const element = documentRef.current;
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: 10,
      filename: 'xabarnoma.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(element).save();
  };
  const Document = () => (
    <div ref={documentRef} className="bg-white p-6">
      <div className="text-right mb-8 text-sm">
        <p>га</p>
        <p className="break-words max-w-[300px] ml-auto">
          {formData.managerFIO || '(бевосита раҳбарнинг лавозими ва Ф.И.О.)'}
        </p>
        <p className="mt-4">дан</p>
        <p className="break-words max-w-[300px] ml-auto">
          {formData.employeeFIO || '(ходимнинг лавозими ва Ф.И.О.)'}
        </p>
      </div>

      <h1 className="text-center font-bold text-xl mb-6">
        Мавжуд манфаатлар тўқнашуви тўғрисидаги
        ХАБАРНОМА
      </h1>

      <p className="mb-6 text-sm">
        Мен ушбу хабарномада ўзим ва менга алоқадор шахсларнинг мавжуд
        манфаатлар тўқнашувига оид қуйидаги маълумотлар тўғрисида хабар бераман:
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="font-bold mb-4">1. Ходимга оид маълумотлар</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 w-8">1.</td>
                <td className="border border-gray-300 p-2">
                  Идентификация ID-картаси ёки биометрик паспорт маълумотлари (серияси, рақами, берилган санаси)
                </td>
                <td className="border border-gray-300 p-2">
                  {`${formData.passportSeries} ${formData.passportIssueDate}`}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">2.</td>
                <td className="border border-gray-300 p-2">
                  Жисмоний шахснинг шахсий идентификация рақами (ЖШШИР) (мавжуд бўлган тақдирда)
                </td>
                <td className="border border-gray-300 p-2">{formData.jshshir}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="font-bold mb-4">2. Алоқадор шахсларга оид маълумотлар*</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 w-8">1.</td>
                <td className="border border-gray-300 p-2">Фамилия, исми, отасининг исми</td>
                <td className="border border-gray-300 p-2">{formData.relativeFIO}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">2.</td>
                <td className="border border-gray-300 p-2">Юридик шахснинг номи</td>
                <td className="border border-gray-300 p-2">{formData.legalEntityName}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">3.</td>
                <td className="border border-gray-300 p-2">
                  Солиқ тўловчининг идентификация рақами (СТИР)
                </td>
                <td className="border border-gray-300 p-2">{formData.stir}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            Ходим қайси юридик шахснинг устав фонди (устав капитали) акцияларига ёки улушларига эгалик қилса ёхуд унда бошқарув органининг раҳбари ёки аъзоси бўлса, ўша юридик шахсга оид маълумотлар
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 w-8">1.</td>
                <td className="border border-gray-300 p-2">Юридик шахснинг номи</td>
                <td className="border border-gray-300 p-2">{formData.legalEntityName2}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">2.</td>
                <td className="border border-gray-300 p-2">
                  Солиқ тўловчининг идентификация рақами (СТИР)
                </td>
                <td className="border border-gray-300 p-2">{formData.stir2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" p-4">

      <div className="mb-6">
        <h1 className="text-2xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">Manfaatlar to‘qnashuvi</h1>
      </div>

      {/* Steps and Button Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        {/* Steps */}
        <div className="flex items-center space-x-2 min-w-[280px] sm:w-140px]">
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
        </div>

        {/* Next Button */}
        <button
          className="px-6 py-2 text-[#024073] border border-[#024073] rounded hover:bg-blue-50 w-full sm:w-auto"
        >
          {currentStep === 3 ? 'Yuborish' : 'Keyingisi'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE - Input Forms (40%) */}
        <div className="lg:col-span-5 space-y-6 rounded-[12px]">
          {/* First Card */}
          <div className="bg-white p-6 rounded-[12px] shadow-sm space-y-4">
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Familiya, ism, otasining ismi"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Passport seriyasi va raqami"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-1">
                Passport berilgan sanasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="passportIssueDate"
                value={formData.passportIssueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Passport berilgan sanasi"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 456 789 012"
                maxLength="14"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-1">
                Lavozim
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 456 789 012"
              />
            </div>
          </div>

          {/* Second Card */}
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
                name="employeeFIO"
                value={formData.employeeFIO}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Familiya, ism, otasining ismi"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-1">
                Passport seriyasi va raqami <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="passportSeries2"
                value={formData.passportSeries2}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Passport seriyasi va raqami"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-1">
                Passport berilgan sanasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="passportIssueDate2"
                value={formData.passportIssueDate2}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Passport berilgan sanasi"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-500 text-sm mb-1">
                JSHSHIR <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jshshir2"
                value={formData.jshshir2}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 456 789 012"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="STIR"
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-[#024072] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Yuklab olish
          </button>
        </div>

        {/* RIGHT SIDE - Document Preview (60%) */}
        <div className="lg:col-span-7">
          <Document />
        </div>
      </div>
    </div>

  );
};

export default BenefitsItem;