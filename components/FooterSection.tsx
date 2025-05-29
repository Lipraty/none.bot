import { ChevronDown } from "lucide-react";

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
    <li>
        <a href={href} className="hover:text-purple-600 transition-colors hover:translate-x-1 inline-block">
            {children}
        </a>
    </li>
);

interface FooterSectionProps {
  isDark: boolean;
  onScrollTopClick: () => void;
}

export default function FooterSection({ isDark, onScrollTopClick }: FooterSectionProps) {
  return (
    <section
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
                {/* Placeholder for a logo if available */}
              </div>
              <span className="text-xl font-bold">None.Bot</span>
            </div>
            <p className="opacity-60 text-sm">下一代 ChatBot 服务平台，让智能对话触手可及。</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <FooterLink href="#features">功能特性</FooterLink>
              <FooterLink href="#pricing">定价方案</FooterLink>
              <FooterLink href="#">API文档</FooterLink> 
              {/* Add more links as needed */}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">开发者</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <FooterLink href="#">贡献指南</FooterLink>
              <FooterLink href="#">GitHub</FooterLink>
              <FooterLink href="#">开发者论坛</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">支持</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <FooterLink href="#">帮助中心</FooterLink>
              <FooterLink href="#">联系支持</FooterLink>
              <FooterLink href="#">服务状态</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>
            &copy; {new Date().getFullYear()} None.Bot. All rights reserved.
            &nbsp;|&nbsp;
            <a href="/termsofservice" className="hover:text-purple-400 transition-colors">服务条款</a>
            &nbsp;|&nbsp;
            <a href="#" className="hover:text-purple-400 transition-colors">隐私政策</a>
            &nbsp;|&nbsp;认真你就输啦
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={onScrollTopClick} aria-label="Scroll to top">
          <ChevronDown className="w-8 h-8 opacity-70 rotate-180" />
        </button>
      </div>
    </section>
  );
}
