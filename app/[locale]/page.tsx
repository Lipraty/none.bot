"use client";

import { useState } from "react";
import {
  Zap,
  Clock,
  CreditCard,
  Download,
  Globe,
  Puzzle,
  Layers,
  Activity,
  Users,
  Github,
  Menu, // Added Menu icon
} from "lucide-react";
import { useTranslations } from "next-intl";

// Hooks
import { useTheme } from "@/hooks/useTheme";
import { useMessageCounter } from "@/hooks/useMessageCounter";
import { useTypewriter } from "@/hooks/useTypewriter";
import { usePageNavigation } from "@/hooks/usePageNavigation";

// Components
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionDot from "@/components/SectionDot";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import OpenSourceProjectsSection from "@/components/OpenSourceProjectsSection";
import FooterSection from "@/components/FooterSection";
import ApplySubdomainModal from "@/components/ApplySubdomainModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1500;

export default function HomePage() {
  const t = useTranslations("HomePage");
  const tHero = useTranslations("HeroSection");
  const tFeatures = useTranslations("FeaturesSection");
  const tPricing = useTranslations("PricingSection");
  const tOpenSource = useTranslations("OpenSourceProjectsSection");

  const sectionsData = [
    { id: "home", name: t("navHome") },
    { id: "features", name: t("navFeatures") },
    { id: "pricing", name: t("navPricing") },
    { id: "projects", name: t("navProjects") },
    { id: "contact", name: t("navContact") },
  ];

  const { theme, setTheme, isDark } = useTheme();
  const messagesSent = useMessageCounter();

  // 从翻译文件中获取 phrases
  const heroPhrases = [
    tHero("phrases.0"),
    tHero("phrases.1"),
    tHero("phrases.2"),
    tHero("phrases.3"),
    tHero("phrases.4"),
  ];
  const typedText = useTypewriter(heroPhrases, TYPING_SPEED, DELETING_SPEED, PAUSE_DURATION);
  const { activeSection, assignSectionRef, scrollToSection, sectionsRef } = usePageNavigation(sectionsData.length);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  const features = [
    { icon: Zap, title: tFeatures("feature1Title"), description: tFeatures("feature1Description") },
    { icon: Clock, title: tFeatures("feature2Title"), description: tFeatures("feature2Description") },
    { icon: CreditCard, title: tFeatures("feature3Title"), description: tFeatures("feature3Description") },
    { icon: Download, title: tFeatures("feature4Title"), description: tFeatures("feature4Description") },
  ];

  const functions = [
    { icon: Globe, title: tFeatures("function1Title"), description: tFeatures("function1Description") },
    { icon: Puzzle, title: tFeatures("function2Title"), description: tFeatures("function2Description") },
    { icon: Layers, title: tFeatures("function3Title"), description: tFeatures("function3Description") },
    { icon: Activity, title: tFeatures("function4Title"), description: tFeatures("function4Description") },
    { icon: Users, title: tFeatures("function5Title"), description: tFeatures("function5Description") },
    { icon: Github, title: tFeatures("function6Title"), description: tFeatures("function6Description") },
  ];

  const pricingPlans = [
    {
      name: tPricing("planOpenSourceTitle"),
      price: tPricing("planOpenSourcePrice"),
      period: tPricing("planOpenSourcePeriod"),
      description: tPricing("planOpenSourceDescription"),
      features: [
        tPricing("planOpenSourceFeature1"),
        tPricing("planOpenSourceFeature2"),
        tPricing("planOpenSourceFeature3"),
      ],
      popular: false,
    },
    {
      name: tPricing("planBasicTitle"),
      price: tPricing("planBasicPrice"),
      period: tPricing("planBasicPeriod"),
      description: tPricing("planBasicDescription"),
      features: [
        tPricing("planBasicFeature1"),
        tPricing("planBasicFeature2"),
        tPricing("planBasicFeature3"),
        tPricing("planBasicFeature4"),
        tPricing("planBasicFeature5"),
      ],
      popular: false,
    },
    {
      name: tPricing("planProTitle"),
      price: tPricing("planProPrice"),
      period: tPricing("planProPeriod"),
      description: tPricing("planProDescription"),
      features: [
        tPricing("planProFeature1"),
        tPricing("planProFeature2"),
        tPricing("planProFeature3"),
        tPricing("planProFeature4"),
        tPricing("planProFeature5"),
        tPricing("planProFeature6"),
        tPricing("planProFeature7"),
      ],
      popular: true,
    },
    {
      name: tPricing("planClusterTitle"),
      price: tPricing("planClusterPrice"),
      period: tPricing("planClusterPeriod"),
      description: tPricing("planClusterDescription"),
      features: [
        tPricing("planClusterFeature1"),
        tPricing("planClusterFeature2"),
        tPricing("planClusterFeature3"),
        tPricing("planClusterFeature4"),
        tPricing("planClusterFeature5"),
        tPricing("planClusterFeature6"),
        tPricing("planClusterFeature7"),
      ],
      popular: false,
    },
  ];

  const openSourceProjects = [
    { name: tOpenSource("projectNoneBotName"), description: tOpenSource("projectNoneBotDescription"), url: "https://github.com/nonebot/nonebot2" },
    { name: tOpenSource("projectKoishiName"), description: tOpenSource("projectKoishiDescription"), url: "https://github.com/koishijs/koishi" },
    { name: tOpenSource("projectMiraiName"), description: tOpenSource("projectMiraiDescription"), url: "https://github.com/mamoe/mirai" },
  ];

  return (
    <div
      className={`transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-red-900 text-white"
          : "bg-gradient-to-br from-purple-50 via-red-50 to-purple-100 text-gray-900"
      }`}
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-md bg-opacity-70">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? "bg-gradient-to-r from-purple-600 to-red-600" : "bg-gradient-to-r from-purple-500 to-red-500"
              } hover:scale-110 transition-transform duration-300`}
            >
              {/* Placeholder for logo icon */}
            </div>
            <span className="text-2xl font-bold">{t("headerBrand")}</span>
          </div>

          {/* Desktop Navigation & Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {sectionsData.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`hover:text-purple-600 transition-colors relative ${
                    activeSection === index ? "text-purple-600" : ""
                  }`}
                >
                  {section.name}
                  {activeSection === index && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 animate-pulse"></span>
                  )}
                </button>
              ))}
            </nav>
            <LanguageSwitcher />
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t("toggleNavigation")}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 relative z-50"
            >
              <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 transition-all">
                <span className={`block h-0.5 w-6 rounded-full bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-6 rounded-full bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-6 rounded-full bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div 
          className={`md:hidden fixed inset-0 z-40 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className={`absolute top-[4.5rem] left-0 right-0 bg-gradient-to-br from-purple-600/95 to-red-600/95 transition-all duration-500 ease-in-out transform ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            <nav className="flex flex-col p-4">
              {sectionsData.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(index);
                    setIsMobileMenuOpen(false); // Close menu on item click
                  }}
                  className={`w-full px-6 py-4 text-left text-white text-xl font-medium rounded-lg mb-2 transition-all duration-300 backdrop-blur-sm ${
                    activeSection === index
                      ? 'bg-white/20 shadow-lg'
                      : 'hover:bg-white/10'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  {section.name}
                </button>
              ))}
            </nav>
            <div className={`flex justify-around items-center py-4 mt-4 border-t border-white/20`}>
              <LanguageSwitcher />
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>
        
      </header>

      {/* Section Navigation Dots - Potentially hide on very small screens or adjust styling */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex-col space-y-4 hidden sm:flex">
        {sectionsData.map((section, index) => (
          <SectionDot
            key={section.id}
            isActive={activeSection === index}
            isDark={isDark}
            onClick={() => scrollToSection(index)}
            label={t("sectionDotLabel", { sectionName: section.name })}
          />
        ))}
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-red-600/20 blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      <div ref={assignSectionRef(0)}>
        <HeroSection
          {...{ typedText, messagesSent, isDark, onStartClick: () => setShowApplyModal(true), onDocsClick: () => window.open("https://koishi.chat"), onScrollDownClick: () => scrollToSection(1) }}
        />
      </div>

      <div ref={assignSectionRef(1)}>
        <FeaturesSection
          {...{ features, functions, isDark, onScrollDownClick: () => scrollToSection(2) }}
        />
      </div>

      <div ref={assignSectionRef(2)}>
        <PricingSection
          {...{ pricingPlans, isDark, onScrollDownClick: () => scrollToSection(3) }}
        />
      </div>

      <div ref={assignSectionRef(3)}>
        <OpenSourceProjectsSection
          {...{ projects: openSourceProjects, isDark, onScrollDownClick: () => scrollToSection(4) }}
        />
      </div>

      <div ref={assignSectionRef(4)}>
        <FooterSection
          {...{ isDark, onScrollTopClick: () => scrollToSection(0) }}
        />
      </div>

      <ApplySubdomainModal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} />
    </div>
  );
}
