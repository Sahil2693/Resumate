import React, { useState } from "react";
import { Sparkles, LoaderCircle, Save, Quote, Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

function Summary({ resumeInfo, enabledNext, enabledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    if (enabledNext) enabledNext(false);
    if (enabledPrev) enabledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summary },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => {
          toast.success("Summary updated successfully!");
          if (enabledNext) enabledNext(true);
          if (enabledPrev) enabledPrev(true);
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update summary");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const selectSummery = (selectedSummary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: selectedSummary,
      })
    );
    setSummary(selectedSummary);
    setAiGenerateSummeryList(null);
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo?.jobTitle) {
      toast.error("Please add a job title first!");
      setLoading(false);
      return;
    }
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const respText = result.response.text();
      setAiGenerateSummeryList(JSON.parse(respText));
      toast.success("AI suggestions generated!");
    } catch (error) {
      toast.error("AI service error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Professional Summary</h2>
            <p className="text-slate-500 text-sm">Add a short, high-impact overview tailored to your target role.</p>
          </div>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Summary</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={GenerateSummeryFromAI}
                className="h-9 px-4 rounded-xl border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs"
              >
                {loading ? (
                  <LoaderCircle className="w-3.5 h-3.5 animate-spin mr-2" />
                ) : (
                  <Zap className="w-3.5 h-3.5 mr-2" />
                )}
                Generate with AI
              </Button>
            </div>
            <Textarea
              name="summary"
              required
              value={summary}
              placeholder="e.g. Results-driven Software Engineer with 5+ years of experience..."
              className="min-h-[180px] p-6 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all resize-none text-base leading-relaxed"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              {loading ? (
                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              Save Summary
            </Button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {aiGeneratedSummeryList && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-32 h-32" />
            </div>
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              AI Recommendations
            </h3>
            
            <div className="space-y-4">
              {aiGeneratedSummeryList?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectSummery(item?.summery || item?.summary)}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-lg">
                      {item?.experience_level}
                    </span>
                    <Plus className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                    {item?.summery || item?.summary}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Summary;
