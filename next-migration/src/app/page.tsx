"use client";

import Navbar from "@/components/Navbar";
import TourCards from "@/components/TourCards";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-[100] w-12 h-12 bg-white border border-gray-100 shadow-xl flex items-center justify-center text-ink hover:text-crimson hover:scale-110 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
    >
      <ChevronUp size={20} />
    </button>
  );
}

export default function Home() {
  return (
    <main className="relative bg-white selection:bg-crimson selection:text-white overflow-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <div className="pt-20" id="tours">
        <TourCards />
      </div>
      <ScrollToTop />
    </main>
  );
}
