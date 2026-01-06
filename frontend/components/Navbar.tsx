"use client";
import React from "react";
import { motion } from "motion/react";
import {
  Moon,
  Sun,
  LogIn,
  UserPlus,
  Grip,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { PUBLIC_NAV_ITEMS, AUTH_NAV_ITEMS } from "@/lib/constants/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [theme, setTheme] = React.useState("light");
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <motion.div
        className={`
          fixed top-10 z-50
          cursor-grab active:cursor-grabbing
          rounded-sm backdrop-blur-md
          border-2 
          transition-all duration-500 ease-in-out
          hover:scale-110 hover:shadow-lg
          shadow-md
          ${
            theme === "light"
              ? "bg-white/90 border-gray-200 text-gray-900"
              : "bg-black/90 border-gray-800 text-white"
          }
          ${
            isCollapsed
              ? "left-0 -translate-x-[calc(100%-4rem)]"
              : "left-1/2 -translate-x-1/2"
          }
        `}
      >
        {/* Drag indicator - only show when not collapsed */}
        {!isCollapsed && (
          <div
            className={`
            absolute -left-7 top-1/2 -translate-y-1/2
            w-5 h-5 rounded-full flex items-center justify-center
            transition-all duration-300
            ${
              theme === "light"
                ? "bg-gray-100 text-gray-400"
                : "bg-gray-900 text-gray-600"
            }
          `}
          >
            <Grip className="w-3 h-3" />
          </div>
        )}

        <div className="flex items-center">
          {/* Collapse/Expand Toggle Button */}

          <button
            onClick={toggleCollapse}
            className={`
              shrink-0 p-3 rounded-full
              transition-all duration-300
              ${
                theme === "light"
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-gray-800 text-gray-400"
              }
             
            `}
            aria-label={isCollapsed ? "Expand navbar" : "Collapse navbar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          {/* Main navbar content */}
          <div
            className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
          `}
          >
            <ul className="flex gap-1 items-center px-3 py-2">
              {/* Logo */}
              <li className="mr-4 ml-2">
                <Link
                  href="/"
                  className={`
                    font-extrabold text-base tracking-tight whitespace-nowrap
                    transition-all duration-300 hover:scale-110
                  `}
                >
                  prodo.
                </Link>
              </li>

              {/* Navigation Items */}
              {PUBLIC_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                      transition-all duration-300
                      ${
                        theme === "light"
                          ? "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                          : "hover:bg-gray-800 text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Divider before auth */}

              <SignedIn>
                {AUTH_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link href={`/${item.link}`}>
                      <button
                        className={`
                      px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                      transition-all duration-300
                      ${
                        theme === "light"
                          ? "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                          : "hover:bg-gray-800 text-gray-300 hover:text-white"
                      }
                    `}
                      >
                        {item.label}
                      </button>
                    </Link>
                  </li>
                ))}
                <li
                  className={`
                w-px h-6 ml-6 mr-2
                ${theme === "light" ? "bg-gray-300" : "bg-gray-700"}
              `}
                />
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button
                    className={`
                        flex items-center gap-1.5 px-4 py-2 rounded-full
                        text-sm font-semibold whitespace-nowrap
                        transition-all duration-300
                        ${
                          theme === "light"
                            ? "hover:bg-gray-100 text-gray-700"
                            : "hover:bg-gray-800 text-gray-300"
                        }
                        
                      `}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button
                    className={`
                        flex items-center gap-1.5 px-4 py-2 rounded-full
                        text-sm font-semibold whitespace-nowrap
                        transition-all duration-300`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Auth Buttons */}
              <li>
                <div className="flex items-center gap-2"></div>
              </li>

              {/* Divider before theme toggle */}
              <li
                className={`
                w-px h-6 mx-2
                ${theme === "light" ? "bg-gray-300" : "bg-gray-700"}
              `}
              />
              <li>
                <button
                  onClick={toggleTheme}
                  className={`
                    p-2 rounded-full mr-1
                    transition-all duration-300
                    ${
                      theme === "light"
                        ? "hover:bg-gray-100 text-gray-700"
                        : "hover:bg-gray-800 text-gray-400"
                    }
                  `}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
      <div
        className={`fixed inset-0 -z-10 ${
          theme === "light" ? "bg-white" : "bg-black"
        }`}
      >
        {PUBLIC_NAV_ITEMS.map((item) => (
          <section
            key={item.id}
            id={item.id}
            className={`
              min-h-screen flex items-center justify-center
              ${theme === "light" ? "text-gray-900" : "text-white"}
            `}
          >
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">{item.label}</h2>
              <p
                className={`text-lg ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {isCollapsed
                  ? "👈 Click the arrow to expand navbar"
                  : "Click the arrow to collapse →"}
              </p>
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        [draggable="true"] {
          user-select: none;
          -webkit-user-drag: element;
        }
      `}</style>
    </>
  );
};

export default Navbar;
