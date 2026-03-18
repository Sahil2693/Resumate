import React, { useEffect } from "react";

import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { Sparkles } from "lucide-react";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode == 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="printHeader"
      className="sticky top-0 z-50 flex bg-white/80 backdrop-blur-xl border-b border-slate-200/50 justify-between px-10 py-5 shadow-sm items-center transition-all duration-300"
    >
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none">
            ResuMate
          </h2>
          <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
            AI Builder
          </span>
        </div>
      </Link>
      {user ? (
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-blue-600"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            My Resumes
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-blue-600 text-white hover:bg-blue-500 rounded-xl"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button className="bg-blue-600 hover:bg-blue-500 rounded-xl px-6">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
