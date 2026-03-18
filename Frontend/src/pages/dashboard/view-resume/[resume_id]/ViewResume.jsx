import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, []);
  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    // console.log(response.data);
    dispatch(addResumeData(response.data));
  };

  const HandleDownload = () => {
    window.print();
  };
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-white px-6 py-8 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <div id="noPrint" className="mb-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
                  Resume ready
                </p>
                <h2 className="mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-3xl">
                  Congrats! Your AI-generated resume is ready.
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Download a PDF or share a unique link with friends and family.
                </p>
              </div>

              <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  onClick={HandleDownload}
                  className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-400/50 hover:bg-blue-500"
                >
                  Download PDF
                </Button>
                <RWebShare
                  data={{
                    text: "Hello This is My resume",
                    url:
                      import.meta.env.VITE_BASE_URL +
                      "/dashboard/view-resume/" +
                      resume_id,
                    title: "Flamingos",
                  }}
                  onClick={() => toast("Resume Shared Successfully")}
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 sm:w-auto"
                  >
                    Share Link
                  </Button>
                </RWebShare>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="print-area rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
              style={{ width: "210mm", minHeight: "297mm" }}
            >
              <div className="print">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResume;
