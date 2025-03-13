import React, { useState } from "react";

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "Appointment?",
      answer:
        "You can book an appointment through our app by selecting the desired date and time with your preferred doctor.",
    },
    {
      question: "Account and Login",
      answer:
        "If you experience any issues logging in, ensure you have the correct credentials or reset your password through the app.",
    },
    {
      question: "Medical Records",
      answer:
        "You can access your medical records through the app by logging in and navigating to the 'Medical Records' section.",
    },
    {
      question: "Security and Privacy",
      answer:
        "We implement strong security measures, including data encryption and secure login, to protect your personal information.",
    },
    {
      question: "Payment and Billing",
      answer:
        "You can view and manage your payment options directly in the app, ensuring secure and easy transactions for your appointments.",
    },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="">
      <section className="">
        <h2 className="text-start font-semibold mb-4">
          Frequently Asked Questions(FAQs)
        </h2>
        <div className="w-full">
          <div className="mx-auto w-full max-w-5xl border  rounded-lg bg-white">
            {faqs.map((faq, index) => (
              <div key={index} className=" border-[#0A071B]/10">
                <button
                  className="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-sm  text-slate-800 focus:outline-none p-5"
                  onClick={() => toggleAnswer(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className={`mt-1.5 md:mt-0 flex-shrink-0 transition-transform duration-200 ${
                      expandedIndex === index ? "rotate-180" : ""
                    } text-lg`}
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                  </svg>
                </button>
                {expandedIndex === index && (
                  <div className="answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
