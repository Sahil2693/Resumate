import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Award, Plus, Trash2, Save, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

function Skills({ resumeInfo, enabledNext }) {
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState(
    resumeInfo?.skills?.length > 0 ? resumeInfo.skills : [{ name: "", rating: 0 }]
  );
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
  }, [skillsList]);

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  };

  const RemoveSkills = (index) => {
    const newList = skillsList.filter((_, i) => i !== index);
    setSkillsList(newList);
  };

  const handleChange = (index, key, value) => {
    if (enabledNext) enabledNext(false);
    const list = [...skillsList];
    list[index] = { ...list[index], [key]: value };
    setSkillsList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: { skills: skillsList },
    };

    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => {
          toast.success("Skills updated successfully!");
          if (enabledNext) enabledNext(true);
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update skills");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-blue-900/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
              <p className="text-slate-500 text-sm">Add your strongest skills and rate your confidence.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={AddNewSkills}
            className="h-11 px-5 rounded-xl border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Skill
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {skillsList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/30 p-4 hover:border-blue-200 hover:bg-white transition-all"
              >
                <div className="flex-1 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Skill Name</label>
                  <Input
                    className="h-10 rounded-xl border-slate-200 bg-white focus:bg-white transition-all text-sm font-medium"
                    placeholder="e.g. React.js"
                    defaultValue={item.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col items-center gap-1.5 pt-4">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={item.rating}
                    onChange={(v) => handleChange(index, "rating", v)}
                  />
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                    Level {item.rating}
                  </span>
                </div>

                {skillsList.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => RemoveSkills(index)}
                    className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-end mt-10">
          <Button
            onClick={onSave}
            disabled={loading}
            className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            {loading ? (
              <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Skills
          </Button>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] text-white flex items-center gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Sparkles className="w-24 h-24" />
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Pro Tip: Balance your Skills</h3>
          <p className="text-white/80 text-sm max-w-md">Aim for a mix of technical (hard) skills and interpersonal (soft) skills to stand out to recruiters.</p>
        </div>
      </div>
    </div>
  );

export default Skills;
