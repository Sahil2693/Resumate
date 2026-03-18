import React from "react";
import { useState } from "react";
import { CopyPlus, Loader, Plus, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "")
      return console.log("Please add a title to your resume");
    const data = {
      data: {
        title: resumetitle,
        themeColor: "#000000",
      },
    };
    createNewResume(data)
      .then((res) => {
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumetitle || loading) return;
    createResume();
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50 p-6 transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5"
        onClick={() => setOpenDialog(true)}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-blue-100/50 blur-xl group-hover:bg-blue-200/50 transition-colors" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 group-hover:rotate-6 transition-transform">
              <Plus className="h-8 w-8" />
            </div>
            <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400 text-white shadow-lg">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">Create New Resume</h3>
          <p className="text-sm text-slate-500 max-w-[180px]">
            Start building your career with AI-powered suggestions.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Quick Start
        </div>
      </motion.div>

      <Dialog open={isDialogOpen}>
        <DialogContent
          className="max-w-md rounded-[2.5rem] border-none bg-white/95 backdrop-blur-xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CopyPlus className="h-8 w-8" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900">
                  New Resume
                </DialogTitle>
                <DialogDescription className="text-slate-500 mt-2">
                  Give your resume a title to get started. You can change this later.
                </DialogDescription>
              </div>
            </DialogHeader>
            
            <div className="mt-8">
              <Input
                className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-6 text-base font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                type="text"
                placeholder="e.g. Senior Software Engineer"
                autoFocus
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value.trimStart())}
              />
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                className="flex-1 h-12 rounded-2xl font-bold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!resumetitle || loading}
                className="flex-[2] h-12 rounded-2xl bg-blue-600 font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
