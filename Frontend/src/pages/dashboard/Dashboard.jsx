import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { motion } from "framer-motion";
import { Sparkles, LayoutGrid } from "lucide-react";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] bg-blue-100/40 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-100/40 blur-[100px] rounded-full"
        />
      </div>

      <div className="px-6 py-12 md:px-16 lg:px-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" />
              Workspace
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Resumes
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-lg">
              Manage your AI-crafted resumes and track your career progress in
              one place.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-2 bg-slate-100 rounded-xl">
              <LayoutGrid className="w-5 h-5 text-slate-600" />
            </div>
            <div className="pr-4 border-r border-slate-100">
              <span className="text-sm font-bold text-slate-900">
                {resumeList.length}
              </span>
              <span className="text-xs text-slate-500 ml-1">Total</span>
            </div>
            <div className="pr-2">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                Active
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={item}>
            <AddResume />
          </motion.div>
          {resumeList.length > 0 &&
            resumeList.map((resume) => (
              <motion.div key={resume._id} variants={item}>
                <ResumeCard resume={resume} refreshData={fetchAllResumeData} />
              </motion.div>
            ))}
        </motion.div>

        {resumeList.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center py-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white/50 backdrop-blur-sm"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No resumes found
            </h3>
            <p className="text-slate-500 mb-8">
              Click the "Create new resume" card to start your journey.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
