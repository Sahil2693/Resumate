import React, { useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion } from "framer-motion";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getResumeData(resume_id).then((data) => {
      dispatch(addResumeData(data.data));
    });
  }, [resume_id]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[5%] -left-[5%] w-[25%] h-[25%] bg-blue-100/30 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[5%] w-[25%] h-[25%] bg-indigo-100/30 blur-[100px] rounded-full"
        />
      </div>

      <div className="px-4 py-8 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          <div className="w-full">
            <ResumeForm />
          </div>
          <div className="w-full sticky top-24 h-fit hidden md:block">
            <PreviewPage />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EditResume;
