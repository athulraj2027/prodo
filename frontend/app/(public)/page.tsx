"use client";
import React from "react";
import {
  Sparkles,
  Code,
  Clock,
  FolderKanban,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden bg-white dark:bg-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>

      {/* Left side: SVG illustration */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="relative group">
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-75 group-hover:scale-100 transition-transform duration-700"></div>

          {/* Image container with border */}
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800 transition-transform duration-500 group-hover:scale-105">
            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              alt="Programming illustration"
              className="w-full h-auto max-w-md bg-white rounded-2xl"
            />

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 shadow-lg animate-bounce-slow">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Live</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 shadow-lg animate-bounce-slow animation-delay-500">
              <span className="text-sm font-semibold">🚀 Powered by AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 text-center md:text-left relative z-10 gap-6">
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 animate-fade-in">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5" />
            Time Tracking
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
            <Code className="w-3.5 h-3.5" />
            DSA Mastery
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-medium backdrop-blur-sm">
            <FolderKanban className="w-3.5 h-3.5" />
            Project Manager
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
          <span className="inline-block animate-fade-in-up">
            Let us build your{" "}
          </span>
          <span className="inline-block bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-100">
            future
          </span>
          <span className="inline-block animate-fade-in-up animation-delay-200">
            ,{" "}
          </span>
          <br className="hidden md:block" />
          <span className="inline-block animate-fade-in-up animation-delay-200">
            together with{" "}
          </span>
          <span className="inline-block relative animate-fade-in-up animation-delay-300">
            <span className="relative">
               Prodo
              <Sparkles className="absolute -top-2 -right-6 w-5 h-5 md:w-6 md:h-6 text-yellow-500 animate-spin-slow" />
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 animate-fade-in-up animation-delay-400">
          Track time, master DSA, organize projects, and optimize your workflow
          — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up animation-delay-500">
          <button className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button className="px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-300 hover:border-gray-900 dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-900">
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col gap-3 mt-4 animate-fade-in animation-delay-600">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>5-minute setup</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-black"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-black"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-black"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-400 to-green-600 border-2 border-white dark:border-black"></div>
            </div>
            <span>Join 10,000+ developers already building with Prodo</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 3s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
