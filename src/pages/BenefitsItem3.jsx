// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Page, Text, View, Document, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';

// Add Font registration
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

// Add PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  mainTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold'
  },
  introText: {
    marginBottom: 20,
    lineHeight: 1.4,
    textAlign: 'justify'
  },
  table: {
    width: '100%',
    marginBottom: 15,
    border: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#000'
  },
  tableRowLast: {
    flexDirection: 'row'
  },
  tableCellNumber: {
    width: '5%',
    borderRight: 1,
    borderRightColor: '#000',
    padding: 4,
    fontSize: 10
  },
  tableCellLabel: {
    width: '45%',
    borderRight: 1,
    borderRightColor: '#000',
    padding: 4,
    fontSize: 10
  },
  tableCellValue: {
    width: '50%',
    padding: 4,
    fontSize: 10
  },
  signature: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  pageNumber: {
    position: 'absolute',
    top: 20,
    right: 30,
    fontSize: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    borderBottom: 1,
    borderColor: '#000',
    paddingBottom: 8,
    marginBottom: 15,
    minHeight: 30,
  },
  noteText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  signatureLine: {
    flex: 1,
    borderBottom: 1,
    borderColor: '#000',
    marginHorizontal: 10,
  },
  dateSection: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  registrationInfo: {
    fontSize: 11,
    marginTop: 20,
  },
  signatureBlock: {
    alignItems: 'center',
  },
});

// Add PDF Document component
const PDFDocument3 = ({ formData, t }) => (
  <Document>
    {/* First Page */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.mainTitle}>
        {t('pages.benefits3.documents2.mainTitle')}
      </Text>

      <Text style={styles.mainTitle}>
        {t('pages.benefits3.documents2.declarationText')}
      </Text>

      <View style={styles.introText}>
        <Text>
          {t('pages.benefits3.documents2.introText')} {formData.managerFIO}
          {t('pages.benefits3.documents2.purposeText')}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCellNumber}>
            <Text>1.</Text>
          </View>
          <View style={styles.tableCellLabel}>
            <Text>{t('pages.benefits3.documents2.table.header.pinfl')}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formData.jshshir}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCellNumber}>
            <Text>3.</Text>
          </View>
          <View style={styles.tableCellLabel}>
            <Text>{t('pages.benefits3.documents2.table.header.legalEntityName')}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formData.legalEntityName}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCellNumber}>
            <Text>4.</Text>
          </View>
          <View style={styles.tableCellLabel}>
            <Text>{t('pages.benefits3.documents2.table.header.tin')}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formData.stir}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCellNumber}>
            <Text>5.</Text>
          </View>
          <View style={styles.tableCellLabel}>
            <Text>{t('pages.benefits3.documents2.table.header.position')}</Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formData.position}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCellNumber}>
            <Text>6.</Text>
          </View>
          <View style={styles.tableCellLabel}>
            <Text>
              {t('pages.benefits3.documents2.table.header.relativeInfo')}
              {'\n'}
              <Text style={styles.noteText}>
                {t('pages.benefits3.documents2.table.header.relativeInfoNote')}
              </Text>
            </Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formData.relativeInfo}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCellNumber}>
            <Text>7.</Text>
          </View>
          <View style={styles.tableCellLabel}>
            <Text>
              {t('pages.benefits3.documents2.table.header.legalEntityInfo')}
              {'\n'}
              <Text style={styles.noteText}>
                {t('pages.benefits3.documents2.table.header.legalEntityInfoNote')}
              </Text>
            </Text>
          </View>
          <View style={styles.tableCellValue}>
            <Text>{formData.legalEntityInfo}</Text>
          </View>
        </View>
      </View>

      <View style={styles.signature}>
        <Text>{t('pages.benefits3.documents2.relatedPerson')}</Text>
        <View style={styles.signatureBlock}>
          <Text>{t('pages.benefits3.documents2.signature.title')}</Text>
          <Text>{t('pages.benefits3.documents2.signature.subtitle')}</Text>
        </View>
        <Text>{formData.managerFIO}</Text>
      </View>

      <Text style={styles.registrationInfo}>
        {t('pages.benefits3.documents2.registrationInfo')}
      </Text>
    </Page>

    {/* Second Page */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageNumber}>5</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('pages.benefits3.documents2.section3Title')}
        </Text>
        <Text style={styles.contentText}>
          {formData.description || '_________________'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('pages.benefits3.documents2.section4Title')}
        </Text>
        <Text style={styles.contentText}>
          {formData.additionalInfo || '_________________'}
        </Text>
        <Text style={styles.noteText}>
          {t('pages.benefits3.documents2.additionalInfoNote')}
        </Text>
      </View>

      <View style={styles.signatureSection}>
        <Text>{t('pages.benefits3.documents2.employeePosition')}</Text>
        <View style={styles.signatureLine} />
        <Text>({formData.managerFIO || '_______________'})</Text>
      </View>

      <View style={styles.dateSection}>
        <Text>{t('pages.benefits3.documents2.fillingDate')}</Text>
        <Text>{formData.date || '_______________'}</Text>
      </View>

      <Text style={styles.registrationInfo}>
        {t('pages.benefits3.documents2.registrationInfo')}
      </Text>
    </Page>
  </Document>
);

const Step1Form = ({ formData, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Xodimga Oid Ma'lumotlar */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium mb-4">
          {t("pages.benefits3.Step1Form.employeeInfo")}
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.first.fullName")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="managerFIO"
            value={formData.managerFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t("pages.benefits3.documents.first.fullNameNote")}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.first.table.header.pinfl")}
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
            {t("pages.benefits3.documents.first.table.header.legalEntityName")}
          </label>
          <input
            type="text"
            name="legalEntityName"
            value={formData.legalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t("pages.benefits3.documents.first.table.header.legalEntityName")}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.first.table.header.tin")}
          </label>
          <input
            type="text"
            name="stir"
            value={formData.stir}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t("pages.benefits3.documents.first.table.header.tin")}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.first.table.header.position")}
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t("pages.benefits3.documents.first.table.header.position")}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.first.relativeInfo")}
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
            {t("pages.benefits3.documents.first.table.header.relatedPersonInfo")}
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
          {t("pages.benefits3.documents.first.relatedPersonTitle")}
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.first.fullName")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="conflictPersonFIO"
            value={formData.conflictPersonFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t("pages.benefits3.documents.first.fullNameNote")}
          />
        </div>
      </div>
    </div>
  );
};

const Step2Form = ({ formData, handleInputChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium mb-4">
          {t("pages.benefits3.documents.second.section3Title")}
        </h2>

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits3.documents.second.fillingDate")} <span className="text-red-500">*</span>
          </label>
          {/* <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          /> */}
          <DatePicker
            selected={formData.date}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'date', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
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

  // Add validation check for required fields
  const isStep1Valid = () => {
    return formData.managerFIO?.trim() && formData.conflictPersonFIO?.trim();
  };

  // Add validation check for Step 2
  const isStep2Valid = () => {
    return formData.date?.trim();
  };

  const FirstDocument = React.forwardRef(({ formData }, ref) => (
    <div ref={ref} className="bg-white p-4 md:p-6 rounded-lg shadow-sm min-w-[320px] max-w-full overflow-x-auto">
      {/* Header section */}
      <div className="text-center mb-6 max-w-3xl mx-auto">
        <h1 className="font-bold text-base md:text-lg mb-1 whitespace-normal">
          {t('pages.benefits3.documents2.mainTitle')}
        </h1>
        <h1 className="font-bold text-lg md:text-xl whitespace-normal">
          {t('pages.benefits3.documents2.declarationText')}
        </h1>
      </div>

      {/* Introduction text */}
      <div className="mb-6 text-sm md:text-base">
        <p className="whitespace-normal">
          {t('pages.benefits3.documents2.introText')} {formData.managerFIO ? (
            <span className="inline">
              <span className="bg-[#FFFF00] px-1">{formData.managerFIO}</span>
            </span>
          ) : '________________'},
          {t('pages.benefits3.documents2.purposeText')}
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
                  {t('pages.benefits3.documents2.table.header.pinfl')}
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
                  {t('pages.benefits3.documents2.table.header.legalEntityName')}
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
                  {t('pages.benefits3.documents2.table.header.tin')}
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
                  {t('pages.benefits3.documents2.table.header.position')}
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
                  {t('pages.benefits3.documents2.table.header.relativeInfo')}
                </div>
                <div className="italic text-sm mt-1 whitespace-normal break-words">
                  {t('pages.benefits3.documents2.table.header.relativeInfoNote')}
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
                  {t('pages.benefits3.documents2.table.header.legalEntityInfo')}
                </div>
                <div className="italic text-sm mt-1 whitespace-normal break-words">
                  {t('pages.benefits3.documents2.table.header.legalEntityInfoNote')}
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
        <div className="whitespace-nowrap">{t('pages.benefits3.documents2.relatedPerson')}</div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-center">
            <div className="whitespace-nowrap">{t('pages.benefits3.documents2.signature.title')}</div>
            <div className="whitespace-nowrap">{t('pages.benefits3.documents2.signature.subtitle')}</div>
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
        {t('pages.benefits3.documents2.registrationInfo')}
      </div>
    </div>
  ));

  const SecondDocument = React.forwardRef(({ formData }, ref) => (
    <div ref={ref} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <h1 className="font-bold text-lg mb-1">
          {t('pages.benefits3.documents2.mainTitle')}
        </h1>
        <h1 className="font-bold text-lg mb-1">
          {t('pages.benefits3.documents2.declarationText')}
        </h1>
      </div>

      <div className="mb-6">
        <p className="text-base">
          {t('pages.benefits3.documents2.introText')} {formData.managerFIO ? (
            <span className="text-sm">(фамилияси, исми ва шарифи)</span>
          ) : '________________'},
          {t('pages.benefits3.documents2.purposeText')}
        </p>
      </div>

      {/* Same table structure as FirstDocument but without values */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        {/* ... table content same as FirstDocument but without values ... */}
      </table>

      <div className="flex justify-between items-start mt-8">
        <div>{t('pages.benefits3.documents2.relatedPerson')}</div>
        <div className="flex items-center gap-4">
          <div>
            <div>{t('pages.benefits3.documents2.signature.title')}</div>
            <div>{t('pages.benefits3.documents2.signature.subtitle')}</div>
          </div>
          <div className="text-right">
            <div>(Ф.И.О.)</div>
            <div>Тўлдирилган сана 20___ йил "___" _______</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm">
        {t('pages.benefits3.documents2.registrationInfo')}
      </div>
    </div>
  ));

  // Update generatePDF function
  const generatePDF = async () => {
    if (!isStep2Valid()) {
      return;
    }

    try {
      const blob = await pdf(
        <PDFDocument3 formData={formData} t={t} />
      ).toBlob();

      saveAs(blob, 'xabarnoma.pdf');
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
                disabled={!isStep1Valid()}
                className={`w-full sm:w-auto px-4 md:px-6 py-2.5 text-white rounded transition-colors duration-200 text-sm md:text-base flex items-center justify-center
                ${isStep1Valid()
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
              <FirstDocument ref={firstPageRef} formData={formData} />
            ) : (
              <SecondDocument ref={secondPageRef} formData={formData} />
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default BenefitsItem3;