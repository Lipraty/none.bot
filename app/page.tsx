"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Bot,
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
  Moon,
  Sun,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

// Constants for typewriter effect
const phrases = [
  "下一代 ChatBot 服务平台，让智能对话触手可及。",
  "强大、灵活、异步的聊天机器人框架，为您的创意赋能。",
  "轻松构建、部署并管理您的智能对话机器人。",
  "连接主流聊天平台，拓展您的服务边界。",
  "开发者友好，插件丰富，生态完善，激发无限可能。"
];
const TYPING_SPEED = 100;
const DELETING_SPEED = 66;
const PAUSE_DURATION = 2000;

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [messagesSent, setMessagesSent] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const scrolling = useRef(false)
  const scrollTimeoutDuration = 1000

  // Modal State
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [subdomain, setSubdomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [pointsTo, setPointsTo] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);


  // Typewriter state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle auto-switching themes
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleThemeChange);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    // Simulate real-time messages sent count
    const interval = setInterval(() => {
      setMessagesSent((prev) => {
        const change = Math.floor(Math.random() * 200000) - 100000 // Fluctuate by +/- 100k
        return Math.max(100000, prev + change) // Ensure it stays above 100k
      })
    }, 3000)

    // Initial count
    setMessagesSent(Math.floor(Math.random() * 900000) + 100000) // Initial random value between 100k and 1M

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Handle deleting
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length - 1));
        }, DELETING_SPEED);
      } else {
        // Finished deleting
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    } else {
      // Handle typing
      if (typedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        }, TYPING_SPEED);
      } else {
        // Finished typing, pause then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrolling.current) return

      const currentScrollPos = window.scrollY
      const windowHeight = window.innerHeight

      if (windowHeight === 0 || sectionsRef.current.length === 0) return;
      
      let currentSectionIndex = Math.floor((currentScrollPos + windowHeight / 2) / windowHeight);
      currentSectionIndex = Math.max(0, Math.min(sectionsRef.current.length - 1, currentSectionIndex));


      if (currentSectionIndex !== activeSection) {
        setActiveSection(currentSectionIndex)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (scrolling.current) return

      const direction = e.deltaY > 0 ? 1 : -1
      const currentActiveSection = activeSection; 
      const nextSection = Math.max(0, Math.min(sectionsRef.current.length - 1, currentActiveSection + direction))

      if (nextSection !== currentActiveSection) {
        scrolling.current = true; 
        setActiveSection(nextSection)
        const targetSectionEl = sectionsRef.current[nextSection];
        if (targetSectionEl) {
          targetSectionEl.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            scrolling.current = false
          }, scrollTimeoutDuration);
        } else {
          scrolling.current = false; 
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [activeSection, scrollTimeoutDuration])

  // Removed the problematic useEffect that scrolled on activeSection change

  const scrollToSection = (index: number) => {
    // If already on the target section and not currently scrolling, do nothing.
    if (index === activeSection && !scrolling.current) {
      return
    }
    // If a scroll is already in progress, ignore new requests to prevent conflicts.
    if (scrolling.current) {
      return
    }

    scrolling.current = true
    setActiveSection(index)
    const targetSectionEl = sectionsRef.current[index]
    if (targetSectionEl) {
      targetSectionEl.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        scrolling.current = false
      }, scrollTimeoutDuration)
    } else {
      scrolling.current = false // Release lock if target element not found
    }
  }

  const features = [
    { icon: Zap, title: "一键启动", description: "零配置快速部署，几秒钟内启动您的ChatBot" },
    { icon: Clock, title: "快速响应", description: "毫秒级响应时间，提供流畅的用户体验" },
    { icon: CreditCard, title: "按需订阅", description: "灵活的订阅模式，只为您使用的功能付费" },
    { icon: Download, title: "免费更新", description: "持续的功能更新和安全补丁，完全免费" },
  ]

  const functions = [
    { icon: Globe, title: "多语言架构", description: "支持多种编程语言和框架集成" },
    { icon: Puzzle, title: "插件系统", description: "丰富的插件生态，轻松扩展功能" },
    { icon: Layers, title: "多平台聚合", description: "统一管理多个聊天平台的机器人" },
    { icon: Activity, title: "事件驱动", description: "高效的事件处理机制，响应迅速" },
    { icon: Users, title: "活跃社区", description: "庞大的开发者社区，丰富的资源支持" },
    { icon: Github, title: "开源版本", description: "完全开源，透明可信，自由定制" },
  ]

  const handleApplySubdomain = () => {
    if (!agreeToTerms) {
      // Optionally, show an alert or message that terms must be agreed to.
      console.log("Please agree to the terms of service.");
      return;
    }

    const formData = {
      subdomain,
      recordType,
      pointsTo,
      timestamp: new Date().toISOString(),
    };

    const jsonData = JSON.stringify(formData, null, 2);
    const formattedBody = `
子域名申请详情：

子域名：${subdomain}
解析方式：${recordType}
指向：${pointsTo}
申请时间：${new Date().toLocaleString()}

--- JSON Data ---
${jsonData}
    `.trim();

    const mailtoLink = `mailto:i@lonay.me?subject=${encodeURIComponent(
      `子域名申请 - ${subdomain}`
    )}&body=${encodeURIComponent(formattedBody)}`;

    window.location.href = mailtoLink;
    setShowApplyModal(false);
    // Reset form fields after submission
    setSubdomain("");
    setRecordType("A");
    setPointsTo("");
    setAgreeToTerms(false);
  };

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
  ]

  const openSourceProjects = [
    { name: "NoneBot", description: "现代化的 Python 异步机器人框架", url: "https://github.com/nonebot/nonebot2" },
    { name: "Koishi", description: "跨平台聊天机器人框架", url: "https://github.com/koishijs/koishi" },
    { name: "Mirai", description: "QQ机器人框架", url: "https://github.com/mamoe/mirai" },
  ]

  const sections = ["home", "features", "pricing", "projects", "contact"]

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
            </div>
            <span className="text-2xl font-bold">None.Bot</span>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(index)}
                  className={`hover:text-purple-600 transition-colors relative ${
                    activeSection === index ? "text-purple-600" : ""
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === index && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 animate-pulse"></span>
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <Switch checked={isDark} onCheckedChange={setIsDark} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </nav>
      </header>

      {/* Section Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? "bg-purple-600 scale-125"
                : isDark
                  ? "bg-white/30 hover:bg-white/70"
                  : "bg-gray-400/30 hover:bg-gray-400/70"
            }`}
            aria-label={`Scroll to ${sections[index]} section`}
          ></button>
        ))}
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated gradient orbs */}
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

      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative h-screen flex items-center justify-center snap-start snap-always"
        id="home"
      >
        <div className="container mx-auto px-4 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent animate-gradient-x">
              None.Bot
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-80 min-h-[3.5rem] md:min-h-[4rem]">
              {typedText}
              <span className="opacity-75 animate-pulse ml-0.5">|</span>
            </p>

            {/* Online Bots Counter */}
            <div
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full mb-8 ${
                isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"
              } hover:scale-105 transition-transform duration-300`}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">当前发送消息数: {messagesSent.toLocaleString()}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                onClick={() => setShowApplyModal(true)}
              >
                立即开始 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open("https://koishi.chat", "_blank")}
              >
                查看文档
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection(1)} aria-label="Scroll to features">
            <ChevronDown className="w-8 h-8 opacity-70" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        id="features"
        className="relative h-screen flex items-center justify-center snap-start snap-always"
      >
        <div className="container mx-auto px-4 py-20 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
              核心特性
            </h2>
            <p className="text-xl opacity-80">为什么选择 None.Bot？</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`text-center border-0 ${
                  isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"
                } hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:bg-opacity-100`}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      isDark
                        ? "bg-gradient-to-r from-purple-600 to-red-600"
                        : "bg-gradient-to-r from-purple-500 to-red-500"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="opacity-80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
              强大功能
            </h3>
            <p className="text-lg opacity-80">全面的功能支持，满足各种场景需求</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {functions.map((func, index) => (
              <Card
                key={index}
                className={`border-0 ${isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"} 
                hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:bg-opacity-100`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isDark
                          ? "bg-gradient-to-r from-purple-600 to-red-600"
                          : "bg-gradient-to-r from-purple-500 to-red-500"
                      } transition-transform duration-300 hover:scale-110`}
                    >
                      <func.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{func.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="opacity-80">{func.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection(2)} aria-label="Scroll to pricing">
            <ChevronDown className="w-8 h-8 opacity-70" />
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        id="pricing"
        className="relative h-screen flex items-center justify-center snap-start snap-always"
      >
        <div className="container mx-auto px-4 py-20 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
              选择适合的方案
            </h2>
            <p className="text-xl opacity-80">灵活的定价，满足不同规模的需求</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 ${plan.popular ? "ring-2 ring-purple-500 scale-105" : ""} ${
                  isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"
                } hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:bg-opacity-100`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-red-600 text-white">
                    最受欢迎
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-60">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white"
                        : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                    } transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "开源版" ? "免费开始" : "立即订阅"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection(3)} aria-label="Scroll to projects">
            <ChevronDown className="w-8 h-8 opacity-70" />
          </button>
        </div>
      </section>

      {/* Open Source Projects */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        id="projects"
        className="relative h-screen flex items-center justify-center snap-start snap-always"
      >
        <div className="container mx-auto px-4 py-20 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
              开源项目导航
            </h2>
            <p className="text-xl opacity-80">探索优秀的开源 ChatBot 项目</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openSourceProjects.map((project, index) => (
              <Card
                key={index}
                className={`border-0 transition-all duration-300 cursor-pointer ${
                  isDark
                    ? "bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    : "bg-white/70 backdrop-blur-sm hover:bg-white/90"
                } hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 hover:-rotate-1`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="opacity-80 text-sm">{project.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start hover:bg-purple-500/10 transition-colors"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    查看项目
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection(4)} aria-label="Scroll to contact">
            <ChevronDown className="w-8 h-8 opacity-70" />
          </button>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        id="contact"
        className="relative h-screen flex items-center justify-center snap-start snap-always"
      >
        <div className="container mx-auto px-4 py-12 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
              联系我们
            </h2>
            <p className="text-xl opacity-80">加入 None.Bot 社区，开启智能对话新时代</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDark
                      ? "bg-gradient-to-r from-purple-600 to-red-600"
                      : "bg-gradient-to-r from-purple-500 to-red-500"
                  } hover:scale-110 transition-transform duration-300`}
                >
                </div>
                <span className="text-xl font-bold">None.Bot</span>
              </div>
              <p className="opacity-60 text-sm">下一代 ChatBot 服务平台，让智能对话触手可及。</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    功能特性
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    定价方案
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    API文档
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    更新日志
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">开发者</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    开发文档
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    SDK下载
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    示例代码
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    开源项目
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">支持</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    帮助中心
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    社区论坛
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    联系我们
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
                    服务状态
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>
              &copy; {new Date().getFullYear()} Powered by <a href="https://github.com/Lipraty">Lipraty</a>. All rights reserved.
              &nbsp;|&nbsp;
              <a href="#" className="hover:text-purple-600 transition-colors ml-1">
                隐私政策
              </a>
              &nbsp;|&nbsp;
              <a href="#" className="hover:text-purple-600 transition-colors ml-1">
                服务条款
              </a>
              &nbsp;|&nbsp;认真你就输啦
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection(0)} aria-label="Scroll to top">
            <ChevronDown className="w-8 h-8 opacity-70 rotate-180" />
          </button>
        </div>
      </section>

      {/* Apply Subdomain Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>认真你就输啦，但是你可以申请一个子域名</DialogTitle>
            <DialogDescription className="pt-2">
              <h4 className="font-semibold mb-2">注意事项：</h4>
              <ul className="list-decimal list-inside text-sm space-y-1">
                <li>申请的子域名必须是小写字母、数字与 - 组成。</li>
                <li>不保证因中国大陆 IPC 备案导致的屏蔽。</li>
                <li>申请的域名将会在 15 个工作日内完成审核并生效。</li>
                <li>不得用于违反中华人民共和国的法律法规的用途。</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subdomain">
                子域名
              </Label>
              <Input
                id="subdomain"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="例如：mysite"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="recordType">
                解析方式
              </Label>
              <Select value={recordType} onValueChange={setRecordType}>
                <SelectTrigger>
                  <SelectValue placeholder="选择解析方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A (IPv4 地址)</SelectItem>
                  <SelectItem value="AAAA">AAAA (IPv6 地址)</SelectItem>
                  <SelectItem value="CNAME">CNAME (别名)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pointsTo">
                指向
              </Label>
              <Input
                id="pointsTo"
                value={pointsTo}
                onChange={(e) => setPointsTo(e.target.value)}
                placeholder="例如：192.168.1.1 或 example.com"
              />
            </div>
            <div className="items-top flex space-x-2 justify-start">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  我已阅读并同意 <Link href={"/termsofservice"} className="text-purple-600 hover:underline">使用条款</Link>
                </label>
                <p className="text-xs text-muted-foreground">
                  您必须同意我们的使用条款才能继续。
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)}>取消</Button>
            <Button type="submit" onClick={handleApplySubdomain} disabled={!agreeToTerms}>
              申请子域名
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
