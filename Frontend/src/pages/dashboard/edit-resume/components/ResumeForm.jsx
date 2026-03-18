import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import { motion, AnimatePresence } from "framer-motion";

function ResumeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enabledNext, setEnabledNext] = useState(true);
  const [enabledPrev, setEnabledPrev] = useState(true);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    if (currentIndex === 0) {
      setEnabledPrev(false);
    } else {
      setEnabledPrev(true);
    }

    if (currentIndex === 5) {
      setEnabledNext(false);
    } else {
      setEnabledNext(true);
    }
  }, [currentIndex]);

  const steps = [
    { name: "Personal", component: PersonalDetails },
    { name: "Summary", component: Summary },
    { name: "Experience", component: Experience },
    { name: "Projects", component: Project },
    { name: "Education", component: Education },
    { name: "Skills", component: Skills },
  ];

  const CurrentStepComponent = steps[currentIndex].component;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-4 rounded-[2rem] border border-slate-200/60 shadow-sm sticky top-24 z-10 md:static">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100"
            >
              <HomeIcon className="w-5 h-5" />
            </Button>
          </Link>
          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />
          <ThemeColor resumeInfo={resumeInfo} />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 rounded-xl border border-blue-100/50">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Step
            </span>
            <span className="text-sm font-black text-blue-700">
              {currentIndex + 1}
            </span>
            <span className="text-[10px] font-bold text-blue-400">
              / {steps.length}
            </span>
          </div>

          <div className="flex gap-2">
            {currentIndex > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="h-10 px-4 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold"
                disabled={!enabledPrev}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Prev
              </Button>
            )}

            <Button
              size="sm"
              className={`h-10 px-6 rounded-xl transition-all font-bold shadow-lg shadow-blue-500/20 ${
                currentIndex === 5
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={!enabledNext && currentIndex !== 5}
              onClick={() => {
                if (currentIndex < 5) {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              {currentIndex === 5 ? "Finish" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
        />
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <CurrentStepComponent
              resumeInfo={resumeInfo}
              enabledNext={setEnabledNext}
              enabledPrev={setEnabledPrev}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ResumeForm;
