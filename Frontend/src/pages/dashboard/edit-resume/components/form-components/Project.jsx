import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Rocket, Code2, Save, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import SimpeRichTextEditor from "@/components/custom/SimpeRichTextEditor";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

const formFields = {
  projectName: "",
  techStack: "",
  projectSummary: "",
};

function Project({ resumeInfo, enabledNext, enabledPrev }) {
  const [projectList, setProjectList] = useState(
    resumeInfo?.projects?.length > 0 ? resumeInfo.projects : [formFields]
  );
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, projects: projectList }));
  }, [projectList]);

  const addProject = () => {
    setProjectList([...projectList, { ...formFields }]);
  };

  const removeProject = (index) => {
    const newList = projectList.filter((_, i) => i !== index);
    setProjectList(newList);
  };

  const handleChange = (e, index) => {
    if (enabledNext) enabledNext(false);
    if (enabledPrev) enabledPrev(false);
    const { name, value } = e.target;
    const list = [...projectList];
    list[index] = { ...list[index], [name]: value };
    setProjectList(list);
  };

  const handleRichTextEditor = (value, name, index) => {
    const list = [...projectList];
    list[index] = { ...list[index], [name]: value };
    setProjectList(list);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: { projects: projectList },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => {
          toast.success("Projects updated successfully!");
          if (enabledNext) enabledNext(true);
          if (enabledPrev) enabledPrev(true);
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update projects");
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
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Key Projects</h2>
              <p className="text-slate-500 text-sm">Showcase impact-driven projects with tech stack and outcomes.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addProject}
            className="h-11 px-5 rounded-xl border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        </div>

        <div className="space-y-10">
          <AnimatePresence>
            {projectList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-6 rounded-3xl border border-slate-100 bg-slate-50/30"
              >
                {projectList.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(index)}
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white border border-slate-200 text-red-500 shadow-sm hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Project Name</label>
                    <div className="relative group">
                      <Rocket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="projectName"
                        value={item.projectName}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="ResuMate AI Builder"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Tech Stack</label>
                    <div className="relative group">
                      <Code2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        name="techStack"
                        value={item.techStack}
                        className="pl-11 h-12 rounded-xl border-slate-200 bg-white focus:bg-white transition-all"
                        placeholder="React, Node.js, MongoDB"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 block mb-3">Project Summary</label>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden focus-within:border-blue-500 transition-all">
                      <SimpeRichTextEditor
                        index={index}
                        defaultValue={item.projectSummary}
                        onRichTextEditorChange={(value) => handleRichTextEditor(value, "projectSummary", index)}
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
            Save Projects
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Project;
