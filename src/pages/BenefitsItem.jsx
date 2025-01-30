// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { saveAs } from 'file-saver';



import { Page, Text, View, Document, StyleSheet, Font, pdf } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});


// PDF Component
const PDFDocument = ({ formData, t }) => {
  // Custom styles for PDF
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 11,
      fontFamily: 'Roboto',
      backgroundColor: '#fff'
    },
    header: {
      textAlign: 'right',
      marginBottom: 30
    },
    headerText: {
      marginBottom: 5,
      fontSize: 11
    },
    mainTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      textTransform: 'uppercase'
    },
    introText: {
      fontSize: 11,
      marginBottom: 20,
      lineHeight: 1.4
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 10,
      borderBottom: 1,
      borderBottomColor: '#999',
      paddingBottom: 5
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
    tableCell: {
      padding: 5,
      fontSize: 10
    },
    tableCellNumber: {
      width: '5%',
      borderRight: 1,
      borderRightColor: '#000',
      padding: 5,
      fontSize: 10
    },
    tableCellLabel: {
      width: '45%',
      borderRight: 1,
      borderRightColor: '#000',
      padding: 5,
      fontSize: 10
    },
    tableCellValue: {
      width: '50%',
      padding: 5,
      fontSize: 10
    },
    signatureSection: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    signatureLeft: {
      width: '30%'
    },
    signatureMiddle: {
      width: '40%',
      borderBottom: 1,
      borderBottomColor: '#000',
      marginHorizontal: 10
    },
    signatureRight: {
      width: '30%',
      textAlign: 'right'
    },
    measures: {
      marginTop: 20,
      marginBottom: 20
    },
    measuresTitle: {
      marginBottom: 10
    },
    measuresContent: {
      borderBottom: 1,
      borderBottomColor: '#000',
      paddingBottom: 10,
      minHeight: 40
    }
  });

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('pages.benefits.form1.to')}</Text>
          <Text style={styles.headerText}>{formData.supervisorPosition}</Text>
          <Text style={styles.headerText}>{formData.supervisorFIO}</Text>
          <Text style={[styles.headerText, { marginTop: 15 }]}>{t('pages.benefits.form1.from')}</Text>
          <Text style={styles.headerText}>{formData.position}</Text>
          <Text style={styles.headerText}>{formData.managerFIO}</Text>
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>XABARNOMA</Text>

        {/* Introduction text */}
        <Text style={styles.introText}>
          {t('pages.benefits.form1.introText')}
        </Text>

        {/* Employee Information */}
        <Text style={styles.sectionTitle}>
          {t('pages.benefits.employeeInfo')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.employeeTable.idCardInfo')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{`${formData.passportSeries} ${formData.passportIssueDate}`}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.employeeTable.pinfl')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.jshshir}</Text>
            </View>
          </View>
        </View>

        {/* Relative Information */}
        <Text style={styles.sectionTitle}>
          {t('pages.benefits.relativeInfo')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.relativeTable.fullName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeFIO}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.relativeTable.idCardInfo')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativePassport}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>3.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.relativeTable.pinfl')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeJSHSHIR}</Text>
            </View>
          </View>
        </View>

        {/* Legal Entity 1 Information */}
        <Text style={styles.sectionTitle}>
          {t('pages.benefits.form1.tables.legalEntity1.title')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.legalEntity1.name')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.legalEntityName1}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.legalEntity1.tin')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.stir1}</Text>
            </View>
          </View>
        </View>

        {/* Legal Entity 2 Information */}
        <Text style={styles.sectionTitle}>
          {t('pages.benefits.form1.tables.legalEntity2.title')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.legalEntity2.name')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.legalEntityName2}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form1.tables.legalEntity2.tin')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.stir2}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        {/* Info note */}
        <Text style={styles.introText}>
          {t('pages.benefits.form2.infoNote')}
        </Text>

        {/* Conflict Info Title */}
        <Text style={styles.mainTitle}>
          {t('pages.benefits.form2.conflictInfo')}
        </Text>

        {/* Conflict Description Table */}
        <View style={styles.table}>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits.form2.existingConflict')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.description || ''}</Text>
            </View>
          </View>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureLeft}>
            <Text>{t('pages.benefits.form2.employeePosition')}</Text>
          </View>
          <View style={styles.signatureMiddle} />
          <View style={styles.signatureRight}>
            <Text>{formData.managerFIO ? `(${formData.managerFIO})` : ''}</Text>
          </View>
        </View>

        {/* Measures Section */}
        <View style={styles.measures}>
          <Text style={styles.measuresTitle}>
            {t('pages.benefits.measures')}:
          </Text>
          <Text style={styles.measuresContent}>
            {formData.measures || ''}
          </Text>
        </View>

        {/* Registration Info */}
        <Text>
          {t('pages.benefits.form2.registrationInfo')}
        </Text>
      </Page>
    </Document>
  );
};

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

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-2">
            {t('pages.benefits.form1.passportDate')} <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.passportIssueDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'passportIssueDate', value: formattedDate } });
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            calendarClassName="custom-calendar"
            showPopperArrow={false}
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
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

  const isStep2Valid = () => {
    const requiredFields = ['description', 'measures'];
    return requiredFields.every(field => formData[field]?.trim());
  };

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
          disabled={!isStep2Valid()}
          className={`px-6 py-2.5 text-white rounded-lg transition-colors flex items-center gap-2 ${isStep2Valid() ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          <Download className="w-4 h-4 md:w-5 md:h-5" />
          <span>{t('pages.benefits.generateNotification')}</span>
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
  const generatePDF = async () => {
    try {
      const blob = await pdf(<PDFDocument formData={formData} t={t} />).toBlob();
      saveAs(blob, 'xabarnoma.pdf');

      const pdfUrl = URL.createObjectURL(blob);

      // Open PDF in new tab
      window.open(pdfUrl, '_blank');

      // Clean up the object URL after the window is loaded
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 100);
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
              <Step2Form
                formData={formData}
                handleInputChange={handleInputChange}
                handleGeneratePDF={() => generatePDF}  // Funksiya reference sifatida berish
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

export default BenefitsItem;