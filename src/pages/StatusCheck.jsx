

import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, X, ChevronLeft } from 'lucide-react';
import bank_logo from "../assets/icons/bank.png";
import file_icon from "../assets/icons/file-check.png";

const TestSelection = ({ onNext }) => {
  const tests = [
    { id: 1, name: "Test turi" },
    { id: 2, name: "Test turi" },
    { id: 3, name: "Test turi" },
    { id: 4, name: "Test turi" },
    { id: 5, name: "Test turi" },
    { id: 6, name: "Test turi" },
    { id: 7, name: "Test turi" },
    { id: 8, name: "Test turi" },
  ];

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md px-4">
          <input
            type="text"
            placeholder="Tashkilotni qidirish"
            className="w-full p-4 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4">
        {tests.map((test) => (
          <div
            key={test.id}
            className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#E6F4FF] rounded-[50%] flex items-center justify-center flex-shrink-0">
                <img src={bank_logo} alt="Bank icon" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{test.name}</h3>
                <button onClick={onNext} className="text-[#024073] text-sm hover:underline mt-2">
                  Tanlash
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const SelectionModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-4 sm:p-8 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute right-4 sm:right-8 top-4 sm:top-8">
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 border-l-4 border-[#024073] pl-3">Tanlang</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="bg-white rounded-xl p-4 sm:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow border"
            onClick={() => onSelect("member")}
          >
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <img src={file_icon} alt="Bank icon" className="w-8 h-8" />
            </div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Men davlat tashkilotiga a'zoman</h4>
            <span className="text-blue-600 text-sm underline">Tanlash</span>
          </div>
          <div
            className="bg-white rounded-xl p-4 sm:p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow border"
            onClick={() => onSelect("non-member")}
          >
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <img src={file_icon} alt="Bank icon" className="w-8 h-8" />
            </div>
            <h4 className="font-medium mb-2 text-sm sm:text-base">Men davlat tashkilotiga a'zo emasman</h4>
            <span className="text-blue-600 text-sm underline">Tanlash</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const questions = [
  {
    id: 1,
    text: "Korrupsiyaning asosiy ko'rinishlari nimalardan iborat?",
    options: ["Poraxo'rlik", "Vakolatlarni suiiste'mol qilish", "Davlat mablag'larini talon-toroj qilish"],
  },
  {
    id: 2,
    text: "Davlat xizmatchilarining manfaatlar to'qnashuvi nima?",
    options: ["Shaxsiy manfaat", "Rasmiy vazifalar", "Qarama-qarshilik holati"],
  },
  {
    id: 3,
    text: "Korrupsiyaga qarshi kurashish qonunchiligining asosiy tamoyillari?",
    options: ["Qonuniylik", "Fuqarolar huquqlari ustuvorligi", "Ochiqlik va shaffoflik"],
  },
  {
    id: 4,
    text: "Korrupsiyaviy xatti-harakatlar to'g'risida xabar berish tartibi?",
    options: ["Yozma murojaat", "Ishonch telefoni", "Elektron platforma"],
  },
  {
    id: 5,
    text: "Davlat xizmatchilarining kasbiy odob-axloq qoidalari?",
    options: ["Xolislik", "Adolatlilik", "Mas'uliyatlilik"],
  },
  {
    id: 6,
    text: "Korrupsiyaga qarshi kurashishning asosiy yo'nalishlari?",
    options: ["Profilaktika", "Huquqni muhofaza qilish", "Xalqaro hamkorlik"],
  },
  {
    id: 7,
    text: "Korrupsiyaga qarshi monitoring nima?",
    options: ["Ma'lumotlarni yig'ish", "Tahlil qilish", "Baholash"],
  },
  {
    id: 8,
    text: "Davlat xizmatchilarining daromadlarini deklaratsiya qilish tartibi?",
    options: ["Yillik deklaratsiya", "Elektron shaklda", "Belgilangan muddatda"],
  },
  {
    id: 9,
    text: "Korrupsiyaga qarshi kurashish bo'yicha davlat siyosati?",
    options: ["Milliy strategiya", "Davlat dasturi", "Yo'l xaritasi"],
  },
  {
    id: 10,
    text: "Korrupsiyaga qarshi ekspertiza nima?",
    options: ["Hujjatlarni o'rganish", "Tahlil qilish", "Xulosa berish"],
  }
];
const TestQuestions = ({ onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(14 * 60);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex + 1]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowQuestionGrid(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex + 1];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="px-4">
      {/* Steps and Navigation Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">Halollik Test</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${step <= 2 ? 'bg-[#024073] text-white' : 'bg-gray-200'}`}>
                  {step <= 2 ? '✓' : ''}
                </div>
                {step < 3 && (
                  <div className={`w-12 sm:w-20 h-1 ${step === 1 ? 'bg-[#024073]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 sm:px-6 py-2 border rounded-md text-[#024073] w-full sm:w-auto"
              >
                ‹ Oldingisi
              </button>
            )}
            <button
              onClick={isLastQuestion ? onFinish : handleNext}
              className="px-4 sm:px-6 py-2 border rounded-md bg-[#024073] text-white w-full sm:w-auto"
              style={{
                backgroundColor: isLastQuestion ? 'orange' : '#024073',
                color: 'white',
                borderColor: isLastQuestion ? 'orange' : '#024073',
              }}
            >
              {isLastQuestion ? 'Tugatish' : 'Keyingisi ›'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Question */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl mb-8">
            {currentQuestionIndex + 1}. {currentQuestion.text}
          </h3>
          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 relative cursor-pointer p-3 hover:bg-gray-50 rounded"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex + 1}`}
                  checked={selectedAnswer === idx}
                  onChange={() => handleAnswerSelect(idx)}
                  className="w-4 h-4 border-2 border-gray-300"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Side - Status Card */}
        <div className="w-full lg:w-64">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                Qolgan vaqt: {formatTime(timeLeft)}
              </div>
              <button
                onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                className="lg:hidden text-blue-600"
              >
                {showQuestionGrid ? 'Yashirish' : "Ko'rsatish"}
              </button>
            </div>
            <div className={`grid grid-cols-5 gap-1 ${showQuestionGrid ? 'block' : 'hidden lg:grid'}`}>
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  onClick={() => handleQuestionClick(i)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-sm cursor-pointer
                    ${i === currentQuestionIndex ? 'bg-blue-600 text-white' :
                      answers[i + 1] !== undefined ? 'bg-blue-100 text-blue-600' :
                        'text-gray-600 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestResults = ({ answers, questions }) => {
  const correctAnswers = Object.entries(answers).filter(([_, value]) => value === 1).length;
  const percentage = Math.round((correctAnswers / questions.length) * 100);

  return (
    <div className="px-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">Halollik Testi</h1>
        </div>
        <div className="flex gap-4">
          <button className="px-4 sm:px-6 py-2 bg-white border rounded hover:bg-gray-50 w-full sm:w-auto">
            ‹ Oldingisi
          </button>
          <button className="px-4 sm:px-6 py-2 bg-[#024073] text-white rounded w-full sm:w-auto">
            Keyingisi ›
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Questions Results - Left Side */}
        <div className="flex-1 space-y-8">
          {questions.map((question, index) => {
            const selectedAnswerIdx = answers[index + 1];
            const isCorrect = selectedAnswerIdx === 1;

            return (
              <div key={index} className="space-y-3">
                <h3 className="text-base sm:text-lg">
                  {index + 1}. {question.text}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedAnswerIdx === idx;
                    const isCorrectAnswer = idx === 1;

                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            checked={isSelected}
                            readOnly
                            className="w-4 h-4"
                          />
                          {isSelected && (
                            <div className={`absolute -left-0.5 -top-0.5 w-5 h-5 rounded-full border-2 
                              ${isCorrectAnswer ? 'border-green-500' : 'border-red-500'}`}
                            />
                          )}
                        </div>
                        <span className={`text-sm sm:text-base ${isSelected ? (isCorrectAnswer ? 'text-green-600' : 'text-red-500') : ''}`}>
                          {option}
                          {isSelected && (
                            <span className="ml-2 text-sm sm:text-base italic">
                              {isCorrectAnswer ? "To'g'ri" : "Noto'g'ri"}
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {!isCorrect && (
                  <div className="bg-[#F3FFF3] p-4 rounded-md">
                    <div className="text-green-600 font-medium mb-2">
                      To'g'ri javob: {question.options[1]}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {question.options[1]} — bu shaxs yoki tashkilot tomonidan ularga berilgan rasmiy
                      vakolatlarni noto'g'ri yoki noqonuniy maqsadlarda qo'llash jarayoni. Ushbu harakat odatda shaxsiy
                      manfaat ko'zlash yoki o'z vakolat doirasidan chetga chiqib, qonun yoki qoidalarni buzish orqali
                      amalga oshiriladi.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Results Card - Right Side */}
        <div className="w-full lg:w-64">
          <div className="sticky top-8">
            <div className="bg-white p-6 rounded-lg mb-6">
              <div className="text-right mb-4">
                <div className="text-sm text-gray-500">To'g'ri javob</div>
                <div className="text-2xl font-bold">{percentage}%</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }, (_, i) => {
                  const questionNumber = i + 1;
                  const isAnswered = answers[questionNumber] !== undefined;
                  const isCorrect = answers[questionNumber] === 1;

                  let bgColorClass = 'bg-gray-100 text-gray-600';
                  if (isAnswered) {
                    bgColorClass = isCorrect
                      ? 'bg-[#F3FFF3] text-green-600'
                      : 'bg-[#FFF3F3] text-red-500';
                  }

                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center rounded text-xs ${bgColorClass}`}
                    >
                      {questionNumber}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCheck = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentStep === 1) {
      setShowModal(true);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  return (
    <div className="w-full px-4 py-8 ">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 overflow-x-auto whitespace-nowrap">
        <span>Bosh sahifa</span>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="text-[#024073]">Halollik testi</span>
      </div>

      {currentStep === 1 && (
        <>
          <div className="mb-6">
            <h1 className="text-xl font-bold border-l-4 border-[#024072] pl-3 text-[#595959] mb-4">Halollik Test</h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
            <div className="flex items-center space-x-2 min-w-[280px] sm:w-[400px]">
              {[1, 2, 3].map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 ${currentStep >= step ? 'bg-[#024073]' : 'bg-gray-300'} 
                      rounded-full flex items-center justify-center`}
                    >
                      {currentStep >= step ? (
                        <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  {index < 2 && (
                    <div className={`flex-grow h-1 ${currentStep > step ? 'bg-[#024073]' : 'bg-gray-300'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-2 text-[#024073] border border-[#024073] rounded hover:bg-blue-50 w-full sm:w-auto"
            >
              {currentStep === 3 ? 'Yuborish' : 'Keyingisi'}
            </button>
          </div>
        </>
      )}

      {currentStep === 1 && <TestSelection onNext={handleNext} />}
      {currentStep === 2 && (
        <TestQuestions
          currentQuestion={currentQuestion}
          selectedAnswer={answers[currentQuestion + 1]}
          onAnswerSelect={handleAnswerSelect}
          onFinish={() => {
            setCurrentStep(3);
          }}
        />
      )}
      {currentStep === 3 && <TestResults answers={answers} questions={questions} />}

      <SelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={() => {
          setShowModal(false);
          setCurrentStep(2);
        }}
      />
    </div>
  );
};

export default StatusCheck;