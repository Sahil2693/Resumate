import React from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, User, Briefcase, MapPin, Phone, Mail, Save } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enabledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e) => {
    if (enabledNext) enabledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = {
      data: Object.fromEntries(formData.entries())
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Personal details saved successfully!");
        if (enabledNext) enabledNext(true);
      } catch (error) {
        toast.error(error.message || "Failed to save details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-blue-900/5">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Personal Details</h2>
          <p className="text-slate-500 text-sm">Start with your basic information to make a great first impression.</p>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">First Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="firstName"
                defaultValue={resumeInfo?.firstName}
                required
                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                placeholder="John"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="lastName"
                defaultValue={resumeInfo?.lastName}
                required
                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                placeholder="Doe"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Professional Job Title</label>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="jobTitle"
                defaultValue={resumeInfo?.jobTitle}
                required
                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                placeholder="Senior Full Stack Developer"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Address</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="address"
                defaultValue={resumeInfo?.address}
                required
                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                placeholder="123 Tech Street, Silicon Valley, CA"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="phone"
                defaultValue={resumeInfo?.phone}
                required
                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                placeholder="+1 (555) 000-0000"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                name="email"
                type="email"
                defaultValue={resumeInfo?.email}
                required
                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                placeholder="john.doe@example.com"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
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
            Save Details
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
