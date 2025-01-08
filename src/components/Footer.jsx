import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logos/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#2A2A2A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 mb-4" />
          </Link>
          <h2 className="text-center text-xl font-medium max-w-md">
            Korrupsiyaviy omillarni profilaktika qilish platformasi
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:grid grid-cols-5 gap-8 text-sm max-w-5xl mx-auto">
          <div className="text-start">
            <Link to="/educational-materials" className="block mb-4 hover:text-blue-400">O'quv-uslubiy materiallar</Link>
            <Link to="/corruption-risks" className="block hover:text-blue-400">Korrupsiyaviy xavf-xatarlar</Link>
          </div>
          <div className="text-start">
            <Link to="/news" className="block mb-4 hover:text-blue-400">Xabar berish</Link>
            <Link to="/benefits" className="block hover:text-blue-400">Manfaatlar to'qnashuvi</Link>
          </div>
          <div className="text-start">
            <Link to="/operations" className="block mb-4 hover:text-blue-400">Amaliyot</Link>
            <Link to="/resources" className="block hover:text-blue-400">Targ'ibot va foydali axborotlar</Link>
          </div>
          <div className="text-start">
            <Link to="/status" className="block mb-4 hover:text-blue-400">Halollik testi</Link>
            <Link to="/compliance" className="block hover:text-blue-400">Komplayens ofitserlar</Link>
          </div>
          <div className="text-start">
            <Link to="/violations" className="block mb-4 hover:text-blue-400">Yangiliklar</Link>
            <Link to="/announcements" className="block hover:text-blue-400">E'lonlar</Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden space-y-4 text-sm text-start ">
          <div className='space-y-2'>
            <Link to="/educational-materials" className="block hover:text-blue-400">O'quv-uslubiy materiallar</Link>
            <Link to="/corruption-risks" className="block hover:text-blue-400">Korrupsiyaviy xavf-xatarlar</Link>
          </div>
          <div className='space-y-2'>
            <Link to="/news" className="block hover:text-blue-400">Xabar berish</Link>
            <Link to="/benefits" className="block hover:text-blue-400">Manfaatlar to'qnashuvi</Link>
          </div>
          <div className='space-y-2'>
            <Link to="/operations" className="block hover:text-blue-400">Amaliyot</Link>
          </div>
          <div className='space-y-2'>
            <Link to="/status" className="block hover:text-blue-400">Halollik testi</Link>
            <Link to="/compliance" className="block hover:text-blue-400">Komplayens ofitserlar</Link>
          </div>
          <div className='space-y-2'>
            <Link to="/violations" className="block hover:text-blue-400">Yangiliklar</Link>
            <Link to="/announcements" className="block hover:text-blue-400">E'lonlar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;