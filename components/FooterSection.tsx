import { ChevronDown } from "lucide-react";
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('FooterSection');
  const tNav = useTranslations('HomePage'); // For navigation items like 'Features', 'Pricing'

  return (
    <section
      id="contact"
      className="relative h-screen flex items-center justify-center snap-start snap-always"
    >
      <div className="container mx-auto px-4 py-12 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent inline-block">
            {t('contactUsTitle')}
          </h2>
          <p className="text-xl opacity-80">{t('contactUsSubtitle')}</p>
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
              <span className="text-xl font-bold">{tNav('headerBrand')}</span>
            </div>
            <p className="opacity-60 text-sm">{t('platformDescription')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('productTitle')}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <FooterLink href="#features">{tNav('navFeatures')}</FooterLink>
              <FooterLink href="#pricing">{tNav('navPricing')}</FooterLink>
              <FooterLink href="#">{t('apiDocs')}</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('developerTitle')}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <FooterLink href="#">{t('contributionGuide')}</FooterLink>
              <FooterLink href="#">{t('github')}</FooterLink>
              <FooterLink href="#">{t('developerForum')}</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('supportTitle')}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <FooterLink href="#">{t('helpCenter')}</FooterLink>
              <FooterLink href="#">{t('contactSupport')}</FooterLink>
              <FooterLink href="#">{t('serviceStatus')}</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>
            {t('copyright', { year: new Date().getFullYear() })}
            &nbsp;|&nbsp;
            <a href="/termsofservice" className="hover:text-purple-400 transition-colors">{t('termsOfService')}</a>
            &nbsp;|&nbsp;
            <a href="#" className="hover:text-purple-400 transition-colors">{t('privacyPolicy')}</a>
            {/* Removed the hardcoded joke text */}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={onScrollTopClick} aria-label={t('backToTop')}>
          <ChevronDown className="w-8 h-8 opacity-70 rotate-180" />
        </button>
      </div>
    </section>
  );
}
