import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  typedText: string;
  messagesSent: number;
  isDark: boolean;
  onStartClick: () => void;
  onDocsClick: () => void;
  onScrollDownClick: () => void;
}

export default function HeroSection({
  typedText,
  messagesSent,
  isDark,
  onStartClick,
  onDocsClick,
  onScrollDownClick,
}: HeroSectionProps) {
  const t = useTranslations('HeroSection');

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center snap-start snap-always"
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

          <div
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full mb-8 ${
              isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70 backdrop-blur-sm"
            } hover:scale-105 transition-transform duration-300`}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">{t('messagesSent', { count: messagesSent.toLocaleString() })}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              onClick={onStartClick}
            >
              {t('startNow')} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-300"
              onClick={onDocsClick}
            >
              {t('viewDocs')}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={onScrollDownClick} aria-label={t('scrollDown')}>
          <ChevronDown className="w-8 h-8 opacity-70" />
        </button>
      </div>
    </section>
  );
}
