import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { useTranslations } from 'next-intl';

interface OpenSourceProjectFromData {
  nameKey: string;
  descriptionKey: string;
  url: string;
}

interface OpenSourceProjectsSectionProps {
  onScrollDownClick: () => void;
}

const OpenSourceProjectsSection = ({
  onScrollDownClick,
}: OpenSourceProjectsSectionProps) => {
  const t = useTranslations('OpenSourceProjectsSection');

  const projectData: OpenSourceProjectFromData[] = [
    {
      nameKey: 'projectNoneBotName',
      descriptionKey: 'projectNoneBotDescription',
      url: 'https://nonebot.dev/',
    },
    {
      nameKey: 'projectKoishiName',
      descriptionKey: 'projectKoishiDescription',
      url: 'https://koishi.chat/',
    },
    {
      nameKey: 'projectMiraiName',
      descriptionKey: 'projectMiraiDescription',
      url: 'https://github.com/mamoe/mirai',
    },
  ];

  const projects = projectData.map(p => ({
    name: t(p.nameKey),
    description: t(p.descriptionKey),
    url: p.url,
  }));

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center justify-center snap-start snap-always"
    >
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`border-0 transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 hover:-rotate-1`}
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
                  {t('learnMore')}
                </Button>
              </CardFooter>
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
};

export default OpenSourceProjectsSection;
