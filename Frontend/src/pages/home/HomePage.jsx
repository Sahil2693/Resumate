import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import {
  FaGithub,
  FaCircle,
  FaInfoCircle,
  FaRobot,
  FaMagic,
  FaRocket,
  FaEdit,
  FaDownload,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import { motion } from "framer-motion";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    window.open("https://github.com/Sahil2693", "_blank");
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message,
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <FaMagic className="w-6 h-6 text-blue-500" />,
      title: "AI Powered",
      description:
        "Generate professional summaries and job descriptions using Google Gemini AI.",
    },
    {
      icon: <FaEdit className="w-6 h-6 text-purple-500" />,
      title: "Easy Editing",
      description:
        "Live preview as you edit your details, experience, and skills.",
    },
    {
      icon: <FaRocket className="w-6 h-6 text-amber-500" />,
      title: "Quick Export",
      description:
        "Download your professional resume in seconds with our optimized layouts.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header user={user} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-200/30 blur-[120px] rounded-full"
          />
        </div>

        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-full mx-auto text-center md:w-11/12 xl:w-9/12"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center justify-center mb-5 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 mr-2 rounded-full bg-blue-600 animate-pulse"></span>
              Trusted by <span className="mx-1 font-bold">5000+ Students</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-7xl"
            >
              <span>Your Next</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">
                  Big Break Starts
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-blue-100/50 -z-10"
                />
              </span>{" "}
              <br className="hidden md:block" />
              <span>with a Better Resume</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-10 text-lg text-slate-600 md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Craft a professional resume in minutes with the power of AI. Let
              ResuMate handle the formatting while you focus on landing your
              dream job.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 group"
                onClick={hadnleGetStartedClick}
              >
                <FaRobot className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Get Started Free
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleClick}
                className="w-full sm:w-auto px-8 py-6 text-lg border-slate-200 hover:bg-slate-50 rounded-2xl transition-all hover:scale-105"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full mx-auto mt-10 md:w-10/12"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between px-4 bg-slate-50 border-b border-slate-100 h-12">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="px-3 py-1 bg-white rounded-md border border-slate-200 text-[10px] text-slate-400 font-medium">
                    resumate.app/dashboard
                  </div>
                  <FaInfoCircle className="text-slate-300" />
                </div>
                <img
                  className="w-full h-auto object-cover"
                  src={heroSnapshot}
                  alt="ResuMate Dashboard"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Powerful features to help you build a resume that stands out to
              recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50/50 relative">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl mb-4">
              How it Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Get your professional resume ready in 3 simple steps.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Sign up and start your first resume project in seconds.",
                icon: <FaEdit className="w-5 h-5" />,
              },
              {
                step: "02",
                title: "Fill Details",
                desc: "Enter your experience, education, and let AI help with summaries.",
                icon: <FaRobot className="w-5 h-5" />,
              },
              {
                step: "03",
                title: "Download",
                desc: "Pick a theme and download your resume as a high-quality PDF.",
                icon: <FaDownload className="w-5 h-5" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex-1 flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 group-hover:rotate-6 transition-transform">
                    {item.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center text-xs font-bold text-blue-600">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  ResuMate
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Building careers, one resume at a time.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClick}
                  className="text-slate-600 hover:text-blue-600"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  System Online
                </div>
              </div>
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} ResuMate. Developed by Sahil
                Kamti
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
