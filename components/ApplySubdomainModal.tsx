import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useApplySubdomainForm } from "@/hooks/useApplySubdomainForm";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ApplySubdomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplySubdomainModal({ isOpen, onClose }: ApplySubdomainModalProps) {
  const t = useTranslations('ApplySubdomainModal');
  const tFooter = useTranslations('FooterSection'); // For "Terms of Service"

  const {
    subdomain,
    setSubdomain,
    recordType,
    setRecordType,
    pointsTo,
    setPointsTo,
    agreeToTerms,
    setAgreeToTerms,
    handleSubmit,
    resetForm,
  } = useApplySubdomainForm("i@lonay.me");

  const handleFormSubmit = () => {
    const success = handleSubmit();
    if (success) {
      onClose(); // Close modal on successful mailto attempt
      // resetForm(); // Reset form is now handled by the hook or can be called here if preferred
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      resetForm(); // Reset form when modal is closed (e.g. by Escape key or clicking outside)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
      <DialogContent className="sm:max-w-[525px] allow-scroll">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            <ul className="pl-5 space-y-2">
              <li>{t('rule1')}</li>
              <li>{t('rule2')}</li>
              <li>{t('rule3')}</li>
              <li>{t('rule4')}</li>
              <li>{t('rule5')}</li>
              <li>{t('rule6')}</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subdomain">{t('subdomainLabel')}</Label>
            <div className="flex items-center">
              <Input
                id="subdomain"
                placeholder={t('subdomainPlaceholder')}
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="rounded-r-none"
              />
              <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                {t('subdomainSuffix')}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordType">{t('recordTypeLabel')}</Label>
            <Select value={recordType} onValueChange={setRecordType}>
              <SelectTrigger id="recordType">
                <SelectValue placeholder={t('recordTypePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">{t('recordTypeA')}</SelectItem>
                <SelectItem value="AAAA">{t('recordTypeAAAA')}</SelectItem>
                <SelectItem value="CNAME">{t('recordTypeCNAME')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pointsTo">{t('pointsToLabel')}</Label>
            <Input
              id="pointsTo"
              placeholder={t('pointsToPlaceholder')}
              value={pointsTo}
              onChange={(e) => setPointsTo(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(Boolean(checked))}
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              {t('agreeToTermsLabelPart1')}
              <Link href="/termsofservice" passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600">
                  {tFooter('termsOfService')}
                </a>
              </Link>
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t('closeButton')}</Button>
          <Button onClick={handleFormSubmit} disabled={!agreeToTerms || !subdomain || !pointsTo}>
            {t('submitButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
