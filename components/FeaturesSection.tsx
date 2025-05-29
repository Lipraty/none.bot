import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { ElementType } from "react";
import { useTranslations } from 'next-intl';

interface FeatureItem {
  icon: ElementType;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
  functions: FeatureItem[];
  isDark: boolean;
  onScrollDownClick: () => void;
}

export default function FeaturesSection({
  features,
  functions,
  isDark,
  onScrollDownClick,
}: FeaturesSectionProps) {
  const t = useTranslations('FeaturesSection');

  return (
    <section
      id="features"
      className="relative h-screen flex items-center justify-center snap-start snap-always"
    >
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
            {t('title')}
          </h2>
          {/* <p className="text-xl opacity-80">为什么选择 None.Bot？</p> */}
          {/* This subtitle seems to be missing from the initial translation files, 
              If needed, it can be added as FeaturesSection.whyChooseUs or similar key */}
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
            {t('subtitle')}
          </h3>
          {/* <p className="text-lg opacity-80">全面的功能支持，满足各种场景需求</p> */}
           {/* This subtitle also seems to be missing from the initial translation files,
               If needed, it can be added as FeaturesSection.comprehensiveSupport or similar key */}
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
        <button onClick={onScrollDownClick} aria-label={t('scrollDown')}>
          <ChevronDown className="w-8 h-8 opacity-70" />
        </button>
      </div>
    </section>
  );
}
