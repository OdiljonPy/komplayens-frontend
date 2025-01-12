import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Calendar, ArrowUpDown, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner from "../assets/banners/08.png"
export default function CorruptionRisks() {
  const [selectedSort, setSelectedSort] = useState('Eng yangisi');
  const [selectedStatus, setSelectedStatus] = useState('Hammasi');
  const [selectedDate, setSelectedDate] = useState('J23 - 18.12.2024');
  const documents = [
    { id: 1, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 2, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 3, name: 'korrupsiya.pdf', size: '120 KB' },
    { id: 4, name: 'korrupsiya.pdf', size: '120 KB' },
  ];
  const tasks = [
    {
      id: 1,
      title: "So'rovnoma 1",
      startDate: "01.11.2024",
      endDate: "15.11.2024",
      status: "Faol",
      result: "Natijalar hali yuq",
      action: "Qatnashish"
    },
    {
      id: 2,
      title: "So'rovnoma 2",
      startDate: "05.11.2024",
      endDate: "10.11.2024",
      status: "Yakunlangan",
      result: "Natijalarni ko'rish",
      action: "Yakunlangan"
    },
    {
      id: 3,
      title: "So'rovnoma 3",
      startDate: "05.11.2024",
      endDate: "15.11.2024",
      status: "Faol",
      result: "Natijalar hali yuq",
      action: "Qatnashish"
    },
    {
      id: 4,
      title: "So'rovnoma 4",
      startDate: "05.11.2024",
      endDate: "15.11.2024",
      status: "Faol",
      result: "Natijalar hali yuq",
      action: "Qatnashish"
    },
    {
      id: 5,
      title: "So'rovnoma 5",
      startDate: "05.11.2024",
      endDate: "15.11.2024",
      status: "Yakunlangan",
      result: "Natijalarni ko'rish",
      action: "Yakunlangan"
    }
  ];

  return (
    <div className="w-full">
      <div className="p-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 px-4">
          <span>Bosh sahifa</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-900">Korrupsiyaviy xavf-xatarlar</span>
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959]">Korrupsiyaviy xavf-xatarlar</h1>
        </div>
        {/* Main Card */}
        <div className=" mb-6 px-4 py-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={banner}
                alt="Corruption Risks"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Korrupsiyaviy Xavf-Xatarlarni Baholash</h2>
              <p className="text-gray-600 mb-4">
                Kasbiy Odob-Axloq Qoidalari — Bu Har Bir Soha Mutaxassisining O'z Faoliyatida Amal Qilishi Lozim Bo'lgan Axloqiy Tamoyillar Va Me'yorlar To'plamidir.
              </p>
              <div className="space-y-3">
                <p className="text-gray-600">
                  - Mas'uliyatni Oshiradi: Ish Jarayonida Xatolarni Kamaytiradi Va Samaradorlikni Oshiradi.
                </p>
                <p className="text-gray-600">
                  - Ishonchni Mustahkamlaydi: Hamkasablar Va Mijozlar Orasida Ishonchli Va Professional Imidj Yaratadi.
                </p>
                <p className="text-gray-600">
                  - Ish Muhitini Yaxshilaydi: Jamoada Sog'lom Va Samimiy Muhit Shakllanishiga Hissa Qo'shadi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">{doc.name}</p>
                  <p className="text-xs text-gray-400">{doc.size}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative min-w-[200px]">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Eng yangisi</option>
              <option>Eng eskisi</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Hammasi</option>
              <option>Faol</option>
              <option>Yakunlangan</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative min-w-[200px]">
            <input
              type="text"
              value={selectedDate}
              readOnly
              className="w-full bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Table Container */}
        <div className="px-4">
          <div className="overflow-x-auto">
            <div className="bg-white rounded-lg border border-gray-200 min-w-[1000px]">
              {/* Table Header */}
              <div className="grid grid-cols-6 bg-[#F8FAFC] divide-x divide-gray-200 border-b text-sm">
                <div className="px-4 py-3">
                  <button className="flex items-center gap-2 text-gray-500 font-medium">
                    So'rovnoma nomi
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-4 py-3">
                  <span className="text-gray-500 font-medium">Boshlangan sana</span>
                </div>
                <div className="px-4 py-3">
                  <span className="text-gray-500 font-medium">Tugash sanasi</span>
                </div>
                <div className="px-4 py-3">
                  <span className="text-gray-500 font-medium">Holati</span>
                </div>
                <div className="px-4 py-3">

                  <span className="text-gray-500 font-medium">Natijalar</span>

                </div>
                <div className="px-4 py-3">
                  <span className="text-gray-500 font-medium">So'rovnomada qatnashish</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <div key={task.id} className="grid grid-cols-6 bg-white text-sm">
                    <div className="px-4 py-3">
                      <span className="text-gray-900">{task.title}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-600">{task.startDate}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-gray-600">{task.endDate}</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${task.status === 'Faol'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="px-4 py-3">
                      {task.result === 'Natijalarni ko\'rish' ? (
                        <Link
                          to={`/corruption-risks/${task.id}`}
                        >
                          <button className="px-3 py-1.5 text-sm bg-[#024072] text-white rounded-md hover:bg-[#02386A]">
                            {task.result}
                          </button>
                        </Link>
                      ) : (
                        <span className="text-gray-600">{task.result}</span>
                      )}
                    </div>
                    <div className="px-4 py-3">
                      <button className={`px-3 py-1.5 rounded-md text-sm ${task.action === 'Qatnashish'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-600'
                        }`}>
                        {task.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600">
                Oldingisi
              </button>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                <button
                  key={i}
                  className={`min-w-[32px] h-8 flex items-center justify-center rounded-md ${page === 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600">
                Keyingisi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}