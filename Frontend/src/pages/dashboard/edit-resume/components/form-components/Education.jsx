import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, GraduationCap, Plus, Trash2, BookOpen, Calendar, Award, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ resumeInfo, enabledNext }) {
  const [educationalList, setEducationalList] = useState(
    resumeInfo?.education?.length > 0 ? resumeInfo.education : [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
  }, [educationalList]);

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formFields }]);
  };

  const RemoveEducation = (index) => {
    const newList = educationalList.filter((_, i) => i !== index);
    setEducationalList(newList);
  };

  const onSave = () => {
    if (educationalList.length === 0) {
      return toast.error("Please add at least one education entry");
    }
    setLoading(true);
    const data = {
      data: { education: educationalList },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => {
          toast.success("Education updated successfully!");
          if (enabledNext) enabledNext(true);
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update education");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (e, index) => {
    if (enabledNext) enabledNext(false);
    const { name, value } = e.target;
    const list = [...educationalList];
    list[index] = { ...list[index], [name]: value };
    setEducationalList(list);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-blue-900/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Education</h2>
              <p className="text-slate-500 text-sm">Add your academic background and achievements.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={AddNewEducation}
            className="h-11 px-5 rounded-xl border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Add More
          </Button>
        </div>

        <div className="space-y-10">
          <AnimatePresence>
            {educationalList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-6 rounded-3xl border border-slate-100 bg-slate-50/30"
              >
                {educationalList.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => RemoveEducation(index)}
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white border border-slate-200 text-red-500 shadow-sm hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">University / School Name</label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="universityName"
                        value={item.universityName}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="Harvard University"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Degree</label>
                    <div className="relative group">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="degree"
                        value={item.degree}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="Bachelor of Science"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Major / Field of Study</label>
                    <Input
                      name="major"
                      value={item.major}
                      className="h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                      placeholder="Computer Science"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Start Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="startDate"
                        type="date"
                        value={item.startDate}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">End Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="endDate"
                        type="date"
                        value={item.endDate}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Grade / CGPA</label>
                    <div className="relative group">
                      <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="grade"
                        value={item.grade}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="3.8 / 4.0"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-3">Description / Achievements</label>
                    <Textarea
                      name="description"
                      value={item.description}
                      className="min-h-[120px] p-4 rounded-2xl border-slate-200 bg-white focus:bg-white transition-all resize-none text-sm leading-relaxed"
                      placeholder="Relevant coursework, honors, or leadership roles..."
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
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
            Save Education
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
