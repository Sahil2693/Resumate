import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2, Plus, Briefcase, Calendar, MapPin, Building2, Save } from "lucide-react";
import RichTextEditor from "@/components/custom/RichTextEditor";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummary: "",
};

function Experience({ resumeInfo, enabledNext, enabledPrev }) {
  const [experienceList, setExperienceList] = React.useState(
    resumeInfo?.experience?.length > 0 ? resumeInfo.experience : [formFields]
  );
  const [loading, setLoading] = React.useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, experience: experienceList }));
  }, [experienceList]);

  const addExperience = () => {
    setExperienceList([...experienceList, { ...formFields }]);
  };

  const removeExperience = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);
    setExperienceList(newList);
  };

  const handleChange = (e, index) => {
    if (enabledNext) enabledNext(false);
    if (enabledPrev) enabledPrev(false);
    const { name, value } = e.target;
    const list = [...experienceList];
    list[index] = { ...list[index], [name]: value };
    setExperienceList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...experienceList];
    list[index] = { ...list[index], [name]: value };
    setExperienceList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: { experience: experienceList },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => {
          toast.success("Experience updated successfully!");
          if (enabledNext) enabledNext(true);
          if (enabledPrev) enabledPrev(true);
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update experience");
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
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Professional Experience</h2>
              <p className="text-slate-500 text-sm">Add your previous job roles and responsibilities.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            className="h-11 px-5 rounded-xl border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Add More
          </Button>
        </div>

        <div className="space-y-10">
          <AnimatePresence>
            {experienceList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-6 rounded-3xl border border-slate-100 bg-slate-50/30"
              >
                {experienceList.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(index)}
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white border border-slate-200 text-red-500 shadow-sm hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Job Title</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="title"
                        value={item.title}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="Software Engineer"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Company Name</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="companyName"
                        value={item.companyName}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="Google"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Location (City)</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="city"
                        value={item.city}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="San Francisco"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">State</label>
                    <Input
                      name="state"
                      value={item.state}
                      className="h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                      placeholder="California"
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

                  <div className="col-span-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-3">Work Summary & Achievements</label>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden focus-within:border-blue-500 transition-all">
                      <RichTextEditor
                        index={index}
                        defaultValue={item.workSummary}
                        onRichTextEditorChange={(value) => handleRichTextEditor(value, "workSummary", index)}
                      />
                    </div>
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
            Save Experience
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
