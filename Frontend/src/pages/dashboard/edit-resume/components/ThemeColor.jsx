import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateResumeData } from "@/Services/GlobalApi";
import { updateThisResume } from "@/Services/resumeAPI";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const [selectedColor, setSelectedColor] = useState();
  const { resume_id } = useParams();
  const onColorSelect = async (color) => {
    setSelectedColor(color);
    dispatch(
      addResumeData({
        ...resumeInfo,
        themeColor: color,
      })
    );
    const data = {
      data: {
        themeColor: color,
      },
    };
    await updateThisResume(resume_id, data)
      .then(() => {
        toast.success("Theme Color Updated");
      })
      .catch((error) => {
        toast.error("Error updating theme color");
      });
    // console.log(" COlor Data to be updated", data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-2xl border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600"
          size="sm"
        >
          {" "}
          <Palette /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-2xl border border-slate-200 bg-white/95 shadow-lg">
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Select Theme Color
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-6 w-6 rounded-full cursor-pointer border border-slate-200 shadow-sm transition-transform hover:scale-110 hover:border-slate-500 ${
                selectedColor == item ? "ring-2 ring-blue-400 ring-offset-2" : ""
              }`}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
