"use client";

import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Moon,
  ArrowRight,
  ChevronDown,
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
  Check,
  ExternalLink,
} from "lucide-react";

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

const phrases = [
  "下一代 ChatBot 服务平台",
  "快速、稳定、可扩展",
  "支持多种语言和框架",
  "加入我们，构建您的智能助手",
];

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1500;

const sectionsData = [
  { id: "home", name: "Home" },
  { id: "features", name: "Features" },
  { id: "pricing", name: "Pricing" },
  { id: "projects", name: "Projects" },
  { id: "contact", name: "Contact" },
];

export default function HomePage() {
  const { theme, setTheme, isDark } = useTheme();
  const messagesSent = useMessageCounter();
  const typedText = useTypewriter(phrases, TYPING_SPEED, DELETING_SPEED, PAUSE_DURATION);
  const { activeSection, assignSectionRef, scrollToSection, sectionsRef } = usePageNavigation(sectionsData.length);

  const [showApplyModal, setShowApplyModal] = useState(false);

  const features = [
    { icon: Zap, title: "一键启动", description: "零配置快速部署，几秒钟内启动您的ChatBot" },
    { icon: Clock, title: "快速响应", description: "毫秒级响应时间，提供流畅的用户体验" },
    { icon: CreditCard, title: "按需订阅", description: "灵活的订阅模式，只为您使用的功能付费" },
    { icon: Download, title: "免费更新", description: "持续的功能更新和安全补丁，完全免费" },
  ];

  const functions = [
    { icon: Globe, title: "多语言架构", description: "支持多种编程语言和框架集成" },
    { icon: Puzzle, title: "插件系统", description: "丰富的插件生态，轻松扩展功能" },
    { icon: Layers, title: "多平台聚合", description: "统一管理多个聊天平台的机器人" },
    { icon: Activity, title: "事件驱动", description: "高效的事件处理机制，响应迅速" },
    { icon: Users, title: "活跃社区", description: "庞大的开发者社区，丰富的资源支持" },
    { icon: Github, title: "开源版本", description: "完全开源，透明可信，自由定制" },
  ];

  const pricingPlans = [
    {
      name: "开源版",
      price: "¥0",
      period: "/Year",
      description: "适合个人开发者",
      features: ["无限机器人", "社区支持", "社区插件"],
      popular: false,
    },
    {
      name: "基础版",
      price: "¥1145",
      period: "/Year",
      description: "适合小型团队和初创公司",
      features: ["最多 10 个机器人", "全部插件支持", "邮件支持", "每月 10000 次API调用", "自定义域名"],
      popular: false,
    },
    {
      name: "专业版",
      price: "¥5141",
      period: "/Year",
      description: "适合成长中的企业",
      features: ["基础版的全部功能", "无限机器人", "高级分析", "优先支持", "无限API调用", "白标解决方案", "高优先级调用"],
      popular: true,
    },
    {
      name: "集群版",
      price: "¥19999",
      period: "/Year",
      description: "适合大型企业和高并发场景",
      features: ["专业版的全部功能", "企业级集群", "专属客户经理", "24/7技术支持", "定制开发", "SLA保证", "私有部署"],
      popular: false,
    },
  ];

  const openSourceProjects = [
    { name: "NoneBot", description: "现代化的 Python 异步机器人框架", url: "https://github.com/nonebot/nonebot2" },
    { name: "Koishi", description: "跨平台聊天机器人框架", url: "https://github.com/koishijs/koishi" },
    { name: "Mirai", description: "QQ机器人框架", url: "https://github.com/mamoe/mirai" },
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
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? "bg-gradient-to-r from-purple-600 to-red-600" : "bg-gradient-to-r from-purple-500 to-red-500"
              } hover:scale-110 transition-transform duration-300`}
            >
              {/* Placeholder for logo icon */}
            </div>
            <span className="text-2xl font-bold">None.Bot</span>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              {sectionsData.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`hover:text-purple-600 transition-colors relative ${
                    activeSection === index ? "text-purple-600" : ""
                  }`}
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                  {activeSection === index && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 animate-pulse"></span>
                  )}
                </button>
              ))}
            </nav>
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>
        </nav>
      </header>

      {/* Section Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {sectionsData.map((section, index) => (
          <SectionDot
            key={section.id}
            isActive={activeSection === index}
            isDark={isDark}
            onClick={() => scrollToSection(index)}
            label={`Scroll to ${section.name} section`}
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
          typedText={typedText}
          messagesSent={messagesSent}
          isDark={isDark}
          onStartClick={() => setShowApplyModal(true)}
          onDocsClick={() => window.open("https://koishi.chat", "_blank")}
          onScrollDownClick={() => scrollToSection(1)}
        />
      </div>

      <div ref={assignSectionRef(1)}>
        <FeaturesSection
          features={features}
          functions={functions}
          isDark={isDark}
          onScrollDownClick={() => scrollToSection(2)}
        />
      </div>

      <div ref={assignSectionRef(2)}>
        <PricingSection
          pricingPlans={pricingPlans}
          isDark={isDark}
          onScrollDownClick={() => scrollToSection(3)}
        />
      </div>

      <div ref={assignSectionRef(3)}>
        <OpenSourceProjectsSection
          projects={openSourceProjects}
          isDark={isDark}
          onScrollDownClick={() => scrollToSection(4)}
        />
      </div>

      <div ref={assignSectionRef(4)}>
        <FooterSection
          isDark={isDark}
          onScrollTopClick={() => scrollToSection(0)}
        />
      </div>

      <ApplySubdomainModal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} />
    </div>
  );
}
