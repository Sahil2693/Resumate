import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, FileText } from "lucide-react";

const gradients = [
  "from-blue-600 to-cyan-500",
  "from-indigo-600 to-purple-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-amber-500",
  "from-rose-600 to-pink-500",
];

const getRandomGradient = (id) => {
  const index = id ? id.charCodeAt(id.length - 1) % gradients.length : 0;
  return gradients[index];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const gradient = getRandomGradient(resume._id);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Resume deleted successfully");
      refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative flex h-[280px] flex-col justify-between rounded-[2.5rem] border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Resume</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {resume.title}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             V3.0
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Clock className="w-3.5 h-3.5" />
            {formatDate(resume.updatedAt)}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
            className="flex-1 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs"
          >
            <FaEdit className="mr-2" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
            className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-200 transition-all"
          >
            <FaEye />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setOpenAlert(true)}
            className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            <FaTrashAlt />
          </Button>
        </div>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="rounded-[2rem] border border-slate-200 bg-white/95 backdrop-blur-xl p-8 shadow-2xl">
          <AlertDialogHeader className="space-y-4">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
              <FaTrashAlt className="w-6 h-6" />
            </div>
            <div className="text-center">
              <AlertDialogTitle className="text-2xl font-bold text-slate-900">
                Delete Resume?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 mt-2">
                This will permanently delete <span className="font-bold text-slate-700">"{resume.title}"</span>. This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-3 sm:justify-center">
            <AlertDialogCancel 
              onClick={() => setOpenAlert(false)}
              className="rounded-xl border-slate-200 px-6 font-semibold"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-xl bg-red-500 px-6 font-semibold hover:bg-red-600 text-white border-none"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Delete Resume"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

export default ResumeCard;
