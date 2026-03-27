import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: "admissions",
    title: "Admissions",
    items: [
      {
        question: "What are the application deadlines for the Fall semester?",
        answer: "The early action deadline is November 1st, and the regular decision deadline is January 15th. Transfer application deadlines vary by program."
      },
      {
        question: "Is financial aid available for international students?",
        answer: "Yes, we offer a limited number of merit-based scholarships and need-based financial aid packages for international applicants. Please check the Financial Aid office website for specific forms and deadlines."
      },
      {
        question: "Can I schedule a campus tour?",
        answer: "Absolutely! We offer guided campus tours Monday through Friday, and select Saturdays. You can book a tour through our Admissions portal."
      }
    ]
  },
  {
    id: "academics",
    title: "Academics",
    items: [
      {
        question: "How do I declare or change my major?",
        answer: "Students can declare or change their major by submitting a 'Change of Major' form through the student portal, subject to approval from the academic advisor of the new department."
      },
      {
        question: "What is the typical class size?",
        answer: "Our student-to-faculty ratio is 15:1. While introductory lectures may have up to 100 students, upper-level seminars typically have fewer than 20 students."
      },
      {
        question: "Are there opportunities for undergraduate research?",
        answer: "Yes, we strongly encourage undergraduate research. Students can apply for summer research grants or work directly with faculty members on ongoing projects during the academic year."
      }
    ]
  },
  {
    id: "campus-life",
    title: "Campus Life",
    items: [
      {
        question: "Is housing guaranteed for all four years?",
        answer: "Housing is guaranteed for freshmen and sophomores. Juniors and seniors participate in a housing lottery, though many choose to live in off-campus apartments nearby."
      },
      {
        question: "What dining options are available on campus?",
        answer: "We have three main dining halls, several cafes, and a food court offering diverse options including vegan, vegetarian, halal, and allergen-free stations."
      },
      {
        question: "How many student organizations are there?",
        answer: "We have over 200 active student organizations, ranging from academic and professional societies to cultural groups, performing arts, and club sports."
      }
    ]
  }
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0].id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (question: string) => {
    setOpenItems(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };

  const currentCategoryData = faqData.find(c => c.id === activeCategory);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about admissions, academics, and life on campus.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Category Navigation */}
          <div className="lg:w-1/4">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 lg:gap-1 sticky top-24">
              {faqData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-4 text-left rounded-xl font-medium transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {currentCategoryData?.items.map((item, idx) => {
                  const isOpen = openItems[item.question] || false;
                  return (
                    <div 
                      key={idx} 
                      className={`border rounded-2xl overflow-hidden transition-colors ${
                        isOpen 
                          ? "border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/10" 
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(item.question)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className={`font-semibold text-lg pr-8 ${isOpen ? "text-indigo-900 dark:text-indigo-100" : "text-slate-900 dark:text-white"}`}>
                          {item.question}
                        </span>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rotate-180" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
