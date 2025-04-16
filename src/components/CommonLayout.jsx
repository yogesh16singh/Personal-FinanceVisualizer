"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { LuPanelRightClose } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import LoadingScreen from "./Loading";
function CommonLayout({ children }) {
  const [minimized, setMinimized] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  const isNotFoundPage = !(
    pathname.includes("/transactions") ||
    pathname.includes("/category") ||
    pathname == "/"
  );
  const title = pathname.includes("transactions")
    ? "Transactions"
    : pathname.includes("category")
    ? "Category "
    : "Dashboard";

  const toggleOpen = () => {
    console.log("Hello World");
    setOpen(!open);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isVisible ? (
        <LoadingScreen />
      ) : (
        <div className="flex h-screen w-screen bg-gray-100">
          <Sidebar
            minimized={minimized}
            setOpen={setOpen}
            open={open}
            toggleMinimize={() => setMinimized(!minimized)}
          />
          {!isNotFoundPage ? (
            <div className="h-full w-full  overflow-y-auto  max-w-full">
              <main className="flex-1 lg:p-6 md:p-4 px-3 max-w-full py-6 h-fullrelative">
                <div className="flex items-center justify-start mb-6">
                  {!open && (
                    <span
                      className="lg:hidden cursor-pointer"
                      onClick={toggleOpen}
                    >
                      <LuPanelRightClose
                        className="text-blue-800 font-bold mr-4 md:text-[36px] text-[24px]"
                        // size={36}
                      />
                    </span>
                  )}
                  <motion.h1
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-start bg-gradient-to-r text-transparent bg-clip-text`}
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #1E3A8A, #1F2937)",
                      backgroundSize: "200% 200%",
                    }}
                  >
                    {title}
                  </motion.h1>
                </div>
                {children}
              </main>
              <Footer />
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </>
  );
}

export default CommonLayout;
