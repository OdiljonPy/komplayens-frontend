// BenefitsItem.jsx
import React, { useState, useRef } from 'react';
import { Download, Calendar } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Page, Text, View, Document, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
// Custom font registration
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

// PDF styles
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
  infoBlock: {
    marginBottom: 15,
  },
  infoField: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center'
  },
  infoValue: {
    borderBottom: 1,
    borderColor: '#000',
    paddingBottom: 2,
    marginBottom: 4
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
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
  pageNumber: {
    position: 'absolute',
    top: 20,
    right: 30,
    fontSize: 10
  },
  secondPageSection: {
    marginBottom: 20,
  },
  secondPageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  borderBottom: {
    borderBottom: 1,
    borderColor: '#000',
    paddingBottom: 8,
    marginBottom: 15,
    minHeight: 30
  },
  infoNote: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  registrationInfo: {
    fontSize: 11,
    marginTop: 20,
  },
  signatureBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  signatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateBlock: {
    marginTop: 15,
    textAlign: 'right',
  }

});

const PDFDocument2 = ({ formData, t }) => (
  <Document>
    {/* First Page */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.mainTitle}>
        {t('pages.benefits2.documents.first.mainTitle')}
      </Text>

      <View style={styles.introText}>
        <Text>
          Men, {formData.managerFIO ? (
            <span className="bg-[#FFFF00] px-1">{formData.managerFIO}</span>
          ) : '_______________________'}
        </Text>
        <Text style={styles.infoLabel}>
          {t('pages.benefits2.documents.first.fullNameNote')}
        </Text>

        <Text style={{ marginTop: 10 }}>
          {formData.position ? (
            <span className="bg-[#FFFF00] px-1">{formData.position}</span>
          ) : '_______________________'}
        </Text>
        <Text style={styles.infoLabel}>
          {t('pages.benefits2.documents.first.positionNote')}
        </Text>

        <Text style={{ marginTop: 10 }}>
          {t('pages.benefits2.documents.first.declarationText')}
        </Text>
      </View>

      {/* Employee Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('pages.benefits2.documents.first.employeeInfoTitle')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.fullName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.passportSeries && formData.passportIssueDate ? (
                <span className="bg-[#FFFF00] px-1">
                  {`${formData.passportSeries} ${formData.passportIssueDate}`}
                </span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.passportInfo')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.jshshir ? (
                <span className="bg-[#FFFF00] px-1">{formData.jshshir}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Related Person Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('pages.benefits2.documents.first.table.header.relatedPersonInfo')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.fullName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeFIO ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativeFIO}</span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.passportInfo')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativePassport ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativePassport}</span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>3.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.pinfl')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeJSHSHIR ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativeJSHSHIR}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>

        {/* Legal Entity Information */}
        <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
          {t('pages.benefits2.documents.first.table.header.legalEntityInfo1')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.legalEntityName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.legalEntityName ? (
                <span className="bg-[#FFFF00] px-1">{formData.legalEntityName}</span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.tin')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.stir ? (
                <span className="bg-[#FFFF00] px-1">{formData.stir}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
          {t('pages.benefits2.documents.first.table.header.legalEntityInfo2')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.legalEntityName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeLegalEntityName ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativeLegalEntityName}</span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.first.table.header.tin')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeSTIR ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativeSTIR}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.introText}>
        {t('pages.benefits2.documents.first.footnote')}
      </Text>
    </Page>

    {/* Second Page */}
    <Page size="A4" style={styles.page}>
      {/* Page number */}
      <Text style={styles.pageNumber}>5</Text>

      {/* Main content */}
      <View style={styles.secondPageSection}>
        <Text style={styles.secondPageTitle}>
          {t('pages.benefits2.documents.second.section3Title')}
        </Text>
        <Text style={styles.borderBottom}>
          {formData.description ? (
            <span className="bg-[#FFFF00] px-1 block">{formData.description}</span>
          ) : '_______________________'}
        </Text>
      </View>

      <View style={styles.secondPageSection}>
        <Text style={styles.secondPageTitle}>
          {t('pages.benefits2.documents.second.section4Title')}
        </Text>
        <Text style={styles.borderBottom}>
          {formData.additionalInfo ? (
            <span className="bg-[#FFFF00] px-1 block">{formData.additionalInfo}</span>
          ) : '_______________________'}
        </Text>
        <Text style={styles.infoNote}>
          {t('pages.benefits2.documents.second.additionalInfoNote')}
        </Text>
      </View>

      {/* Signature block */}
      <View style={styles.signatureBlock}>
        <Text>{t('pages.benefits2.documents.second.employeePosition')}</Text>
        <View style={styles.signatureLine} />
        <Text>({formData.managerFIO ? (
          <span className="bg-[#FFFF00] px-1">({formData.managerFIO})</span>
        ) : '(_______________)'}</Text>
      </View>

      {/* Date block */}
      <View style={styles.dateBlock}>
        <Text>{t('pages.benefits2.documents.second.fillingDate')}</Text>
        <Text>{formData.date ? (
          <span className="bg-[#FFFF00] px-1">{formData.date}</span>
        ) : '_______________'}</Text>
      </View>

      {/* Registration info */}
      <View style={styles.registrationInfo}>
        <Text>{t('pages.benefits2.documents.second.registrationInfo')}</Text>
      </View>

      {/* Extra info section */}
      <View style={[styles.secondPageSection, { marginTop: 30 }]}>
        <Text style={styles.secondPageTitle}>
          {t('pages.benefits2.documents.second.relatedPersonTitle')}
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
          {t('pages.benefits2.documents.second.relativeInfo')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.second.idCardInfo')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.passportSeries && formData.passportIssueDate ? (
                <span className="bg-[#FFFF00] px-1">
                  {`${formData.passportSeries} ${formData.passportIssueDate}`}
                </span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.second.pinflInfo')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.jshshir ? (
                <span className="bg-[#FFFF00] px-1">{formData.jshshir}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>

        {/* Legal entities info */}
        <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
          {t('pages.benefits2.documents.second.legalEntityInfo1')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.second.legalEntityName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.legalEntityName ? (
                <span className="bg-[#FFFF00] px-1">{formData.legalEntityName}</span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.second.tin')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.stir ? (
                <span className="bg-[#FFFF00] px-1">{formData.stir}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
          {t('pages.benefits2.documents.second.legalEntityInfo2')}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCellNumber}>
              <Text>1.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.second.legalEntityName')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeLegalEntityName ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativeLegalEntityName}</span>
              ) : ''}</Text>
            </View>
          </View>
          <View style={styles.tableRowLast}>
            <View style={styles.tableCellNumber}>
              <Text>2.</Text>
            </View>
            <View style={styles.tableCellLabel}>
              <Text>{t('pages.benefits2.documents.second.tin')}</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text>{formData.relativeSTIR ? (
                <span className="bg-[#FFFF00] px-1">{formData.relativeSTIR}</span>
              ) : ''}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer note */}
      <Text style={styles.infoNote}>
        {t('pages.benefits2.documents.second.infoNote')}
      </Text>
    </Page>
  </Document>
);


const Step1Form = ({ formData, handleInputChange }) => {
  const { t } = useTranslation();

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
            {t("pages.benefits2.form1.supervisorInfo")}
          </label>
          <input
            type="text"
            name="supervisorFullName"
            value={formData.supervisorFullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t("pages.benefits2.form1.supervisorFullName")}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits2.form1.position')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits2.form1.position')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.passportSeries')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="passportSeries"
            value={formData.passportSeries}
            onChange={handlePassportSeriesChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="AA1234567"
            maxLength="9"
          />
        </div>

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.passportDate')} <span className="text-red-500">*</span>
          </label>

          <DatePicker
            selected={formData.passportIssueDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'passportIssueDate', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />

        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.jshshir')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jshshir"
            value={formData.jshshir}
            onChange={handleJSHSHIRChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.jshshir')}
            maxLength="14"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits2.form1.legalEntityName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="legalEntityName"
            value={formData.legalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits2.form1.legalEntityName')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.tin')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="stir"
            value={formData.stir}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.tin')}
          />
        </div>
      </div>

      {/* Manfaatlar To'qnashuvi Yuzaga Kelayotgan Shaxs Haqida Ma'lumot */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-medium mb-6">
          {t('pages.benefits2.form2.title')}
        </h2>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits2.form2.relativeFIO')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeFIO"
            value={formData.relativeFIO}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits2.form2.relativeFIO')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.passportSeries')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativePassport"
            value={formData.relativePassport}
            onChange={handlePassportSeriesChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder="AA1234567"
            maxLength="9"
          />
        </div>

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.passportDate')} <span className="text-red-500">*</span>
          </label>

          <DatePicker
            selected={formData.relativePassportDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().split('T')[0];
              handleInputChange({ target: { name: 'relativePassportDate', value: formattedDate } });
            }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg pl-10"
          />
          <Calendar className="w-5 h-5 text-blue-500 absolute left-3 top-[50px] -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.jshshir')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeJSHSHIR"
            value={formData.relativeJSHSHIR}
            onChange={handleJSHSHIRChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.jshshir')}
            maxLength="14"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits2.form2.legalEntityName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeLegalEntityName"
            value={formData.relativeLegalEntityName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits2.form2.legalEntityName')}
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t('pages.benefits.form1.tin')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relativeSTIR"
            value={formData.relativeSTIR}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            placeholder={t('pages.benefits.form1.tin')}
          />
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
          {t("pages.benefits2.form2.title")}
        </h2>

        <div className="relative">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits2.form2.date")}
          </label>

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
            placeholder={t("pages.benefits2.form2.descriptionPlaceholder")}
          />
          <div className="text-right text-sm text-gray-500">
            <span>{formData.description?.length || 0}</span>/460
          </div>
        </div>

        <div className="form-group">
          <label className="block text-gray-500 text-sm mb-1">
            {t("pages.benefits2.form2.additionalInfo")}
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
            rows={6}
            placeholder={t("pages.benefits2.form2.additionalInfoNote")}
          />
          <div className="text-right text-sm text-gray-500">
            <span>{formData.additionalInfo?.length || 0}</span>/460
          </div>
        </div>
      </div>
    </div>
  );
};

const FirstDocument = React.forwardRef(({ formData }, ref) => {
  const { t } = useTranslation();
  return (
    <div ref={ref} className="bg-white p-6 overflow-x-hidden min-w-[320px]">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center font-bold text-xl mb-8">
          {t("pages.benefits2.documents.first.mainTitle")}
        </h1>

        <div className="mb-8 text-justify">
          <p>
            Men, {formData.managerFIO ? (
              <span className="bg-[#FFFF00] px-1">{formData.managerFIO}</span>
            ) : '_______________________'}
          </p>
          <p className="text-sm text-gray-600 text-center">{t("pages.benefits2.documents.first.fullNameNote")}</p>

          <p className="mt-4">
            {formData.position ? (
              <span className="bg-[#FFFF00] px-1">{formData.position}</span>
            ) : '_______________________'}
          </p>
          <p className="text-sm text-gray-600 text-center">{t("pages.benefits2.documents.first.positionNote")}</p>

          <p className="mt-4">
            {t("pages.benefits2.documents.first.declarationText")}
          </p>
        </div>

        {/* 1. Xodimga oid ma'lumotlar */}
        <div className="mb-8">
          <h2 className="font-bold mb-4">{t("pages.benefits2.documents.first.employeeInfoTitle")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-8">1.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.fullName")}
                  </td>
                  <td className="border border-gray-300 p-2 min-w-[200px]">
                    {formData.passportSeries && formData.passportIssueDate ? (
                      <span className="bg-[#FFFF00] px-1">
                        {`${formData.passportSeries} ${formData.passportIssueDate}`}
                      </span>
                    ) : ''}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.passportInfo")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.jshshir ? (
                      <span className="bg-[#FFFF00] px-1">{formData.jshshir}</span>
                    ) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Aloqador shaxsga oid ma'lumotlar */}
        <div className="mb-8">
          <h2 className="font-bold mb-4">
            {t("pages.benefits2.documents.first.table.header.relatedPersonInfo")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-8">1.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.fullName")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.relativeFIO ? (
                      <span className="bg-[#FFFF00] px-1">{formData.relativeFIO}</span>
                    ) : ''}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.passportInfo")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.relativePassport ? (
                      <span className="bg-[#FFFF00] px-1">{formData.relativePassport}</span>
                    ) : ''}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">3.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.pinfl")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.relativeJSHSHIR ? (
                      <span className="bg-[#FFFF00] px-1">{formData.relativeJSHSHIR}</span>
                    ) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Yuridik shaxs ma'lumotlari */}
        <div className="mb-8">
          <h2 className="font-bold mb-4">
            {t("pages.benefits2.documents.first.table.header.legalEntityInfo1")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 w-8">1.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.legalEntityName")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.legalEntityName ? (
                      <span className="bg-[#FFFF00] px-1">{formData.legalEntityName}</span>
                    ) : ''}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2.</td>
                  <td className="border border-gray-300 p-2">
                    {t("pages.benefits2.documents.first.table.header.tin")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formData.stir ? (
                      <span className="bg-[#FFFF00] px-1">{formData.stir}</span>
                    ) : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

const SecondDocument = React.forwardRef(({ formData }, ref) => {
  const { t } = useTranslation();
  return (
    <div ref={ref} className="bg-white p-6 overflow-x-hidden min-w-[320px]">
      <div className="mx-auto max-w-4xl">
        {/* Page number */}
        <div className="text-right mb-8">
          <span>5</span>
        </div>

        {/* Description section */}
        <div className="mb-12">
          <h2 className="font-bold text-xl mb-4">
            {t("pages.benefits2.documents.second.section3Title")}
          </h2>
          <div className="border-b border-gray-300 min-h-[30px]">
            {formData.description ? (
              <span className="bg-[#FFFF00] px-1">{formData.description}</span>
            ) : '_______________________'}
          </div>
        </div>

        {/* Additional Info section */}
        <div className="mb-12">
          <h2 className="font-bold text-xl mb-4">
            {t("pages.benefits2.documents.second.section4Title")}
          </h2>
          <div className="border-b border-gray-300 min-h-[30px]">
            {formData.additionalInfo ? (
              <span className="bg-[#FFFF00] px-1">{formData.additionalInfo}</span>
            ) : '_______________________'}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {t("pages.benefits2.documents.second.additionalInfoNote")}
          </p>
        </div>

        {/* Signature block */}
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <span>{t("pages.benefits2.documents.second.employeePosition")}</span>
            </div>
            <div className="text-center italic text-gray-500">
              {t("pages.benefits2.documents.second.personalSignature")}
            </div>
            <div className="text-right">
              {formData.managerFIO ? (
                <span className="bg-[#FFFF00] px-1">({formData.managerFIO})</span>
              ) : '(_______________)'}
            </div>
          </div>
        </div>

        {/* Date block */}
        <div className="text-right mt-4">
          <p>{t("pages.benefits2.documents.second.fillingDate")}</p>
          {formData.date ? (
            <span className="bg-[#FFFF00] px-1">{formData.date}</span>
          ) : '_______________'}
        </div>

        {/* Registration info */}
        <div className="text-sm mt-8">
          <p>{t("pages.benefits2.documents.second.registrationInfo")}</p>
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

  // Add validation for Step2Form
  const isStep2Valid = () => {
    const requiredFields = [
      'date',
      'description'
    ];

    return requiredFields.every(field => formData[field] && formData[field].trim() !== '');
  };

  const generatePDF = async () => {
    if (!isStep2Valid()) {
      return;
    }

    try {
      const blob = await pdf(
        <PDFDocument2 formData={formData} t={t} />
      ).toBlob();

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

  // Add this function to check if all required fields are filled
  const isStep1Valid = () => {
    const requiredFields = [
      'position',
      'passportSeries',
      'passportIssueDate',
      'jshshir',
      'legalEntityName',
      'stir',
      'relativeFIO',
      'relativePassport',
      'relativePassportDate',
      'relativeJSHSHIR',
      'relativeLegalEntityName',
      'relativeSTIR'
    ];

    return requiredFields.every(field => formData[field] && formData[field].trim() !== '');
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

export default BenefitsItem2;