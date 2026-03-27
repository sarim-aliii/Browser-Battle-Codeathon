import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Preloader } from "../components/ui/Preloader";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Hero } from "../components/home/Hero";
import { InfoHub } from "../components/home/InfoHub";
import { Leadership } from "../components/home/Leadership";
import { Stats } from "../components/home/Stats";
import { CampusMap } from "../components/campus/CampusMap";
import { FAQSection } from "../components/home/FAQSection";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { ErrorBoundary } from "../components/ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useGSAP(() => {
    // Only initialize scroll animations after the preloader finishes
    if (isLoading) return;

    // Select all direct children with the reveal-section class
    const sections = gsap.utils.toArray(".reveal-section") as HTMLElement[];

    sections.forEach((section) => {
      gsap.fromTo(section,
        { 
          opacity: 0, 
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%", // Trigger when the top of the section is 85% down the viewport
            toggleActions: "play none none reverse", // Plays forward on enter, reverses on leave backwards
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [isLoading] });

  return (
    <div ref={containerRef}>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
          <TopBar />
          <Header />
          
          <main className="flex-grow overflow-hidden">
            <ErrorBoundary sectionName="Hero section">
              <Hero />
            </ErrorBoundary>

            <div className="reveal-section">
              <ErrorBoundary sectionName="Information Hub">
                <InfoHub />
              </ErrorBoundary>
            </div>

            <div className="reveal-section">
              <ErrorBoundary sectionName="Campus Map">
                <CampusMap />
              </ErrorBoundary>
            </div>

            <div className="reveal-section">
              <ErrorBoundary sectionName="Leadership section">
                <Leadership />
              </ErrorBoundary>
            </div>

            <div className="reveal-section">
              <ErrorBoundary sectionName="Statistics">
                <Stats />
              </ErrorBoundary>
            </div>

            <div className="reveal-section">
              <ErrorBoundary sectionName="FAQ section">
                <FAQSection />
              </ErrorBoundary>
            </div>
          </main>

          <Footer />
          <AIChatbot />
        </div>
      )}
    </div>
  );
}