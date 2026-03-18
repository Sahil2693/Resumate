import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PersonalDeatailPreview from "./preview-components/PersonalDeatailPreview";
import SummeryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  return (
    <div
      className="h-full min-h-[800px] rounded-[2rem] border-x border-b border-slate-200 bg-white p-12 shadow-2xl shadow-blue-900/10 border-t-[24px] transition-all duration-500 overflow-y-auto"
      style={{
        borderColor: resumeData?.themeColor || "#2563eb",
      }}
    >
      <PersonalDeatailPreview resumeInfo={resumeData} />
      <SummeryPreview resumeInfo={resumeData} />
      {resumeData?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeData} />}
      {resumeData?.projects?.length > 0 && <ProjectPreview resumeInfo={resumeData} />}
      {resumeData?.education?.length > 0 && <EducationalPreview resumeInfo={resumeData} />}
      {resumeData?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeData} />}
    </div>
  );
}

export default PreviewPage;
