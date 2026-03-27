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

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow">
        <ErrorBoundary sectionName="Hero section">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Information Hub">
          <InfoHub />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Campus Map">
          <CampusMap />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Leadership section">
          <Leadership />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Statistics">
          <Stats />
        </ErrorBoundary>
        <ErrorBoundary sectionName="FAQ section">
          <FAQSection />
        </ErrorBoundary>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}

