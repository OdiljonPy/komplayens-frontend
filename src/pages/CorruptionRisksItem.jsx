// import React from 'react'

// function CorruptionRisksItem() {
//   const results = [
//     {
//       question: "Davlat xaridlari jarayonida qabul qilingan ichki tartib-qoidalar va siyosatlar mavjudmi?",
//       answers: [
//         "Ha, aniq belgilangan va hujjatlashtirilgan 45% (45 kishi)",
//         "Qisman mavjud, lekin ba’zi qoidalar noma’q 30% (30 kishi)",
//         "Yo‘q, bunday tartib-qoidalar ishlab chiqilmagan 25% (25 kishi)"
//       ]
//     },
//     // Add more results as needed
//   ];

//   return (
//     <div className="p-4">
//       <h1 className="text-lg md:text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">Korrupsiyaviy xavf-xatarlar</h1>
//       <h2 className="text-md font-semibold mb-2">Natijalar</h2>
//       <p className="mb-4">So‘rovda: {results.length * 25} kishi ishtirok etdi</p>
//       {results.map((result, index) => (
//         <div key={index} className="bg-white rounded-lg shadow-sm p-4 mb-4">
//           <h3 className="font-bold">{index + 1}. {result.question}</h3>
//           <ul className="list-disc pl-5">
//             {result.answers.map((answer, idx) => (
//               <li key={idx} className="mt-1">{answer}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default CorruptionRisksItem

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CorruptionRisksItem = () => {
  return (
    <div className="w-full p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Bosh sahifa</span>
        <ChevronRight className="h-4 w-4" />
        <Link to="/corruption-risks">
          <span>Korrupsiyaviy xavf-xatarlar</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-blue-500">Natijalar</span>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">Natijalar</h1>
      <div className="mb-8 text-lg">
        So'rovda: <span className="font-medium">125</span> kishi ishtirok etdi
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {[1, 2, 3].map((questionNumber) => (
          <div key={questionNumber} className="space-y-4">
            <h2 className="text-gray-800">
              {questionNumber}. Davlat xaridlari jarayonida qabul qilingan ichki tartib-qoidalar va siyosatlar mavjudmi?
            </h2>
            <div className="space-y-2">
              <div>
                Ha, aniq belgilangan va hujjatlashtirilgan 45% (45 kishi)
              </div>
              <div>
                Qisman mavjud, lekin ba'zi qoidalar noaniq 30% (30 kishi)
              </div>
              <div>
                Yo'q, bunday tartib-qoidalar ishlab chiqilmagan 25% (25 kishi)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorruptionRisksItem;