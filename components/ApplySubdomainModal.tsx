import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useApplySubdomainForm } from "@/hooks/useApplySubdomainForm";
import Link from 'next/link';

interface ApplySubdomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplySubdomainModal({ isOpen, onClose }: ApplySubdomainModalProps) {
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
          <DialogTitle>认真你就输啦，但是你可以免费申请一个子域名。</DialogTitle>
          <DialogDescription>
            <ul className="pl-5 space-y-2">
              <li>子域名只能包含字母、数字和连字符。</li>
              <li>子域名必须是唯一的，不能与已有的子域名冲突。</li>
              <li>子域名解析服务仅提供 A、AAAA、CNAME 记录解析。</li>
              <li>子域名所指向内容必须是开源聊天机器人框架相关项目有关联的生态的页面、API等。</li>
              <li>子域名不得与官方保留字、官方插件和非私域市场插件同名。</li>
              <li>该域名未进行 IPC 备案，不保证解析到中国大陆境内的服务商 IP 地址时可能的阻断。</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subdomain">子域名</Label>
            <div className="flex items-center">
              <Input
                id="subdomain"
                placeholder="yourname"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="rounded-r-none"
              />
              <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                .none.bot
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordType">解析方式</Label>
            <Select value={recordType} onValueChange={setRecordType}>
              <SelectTrigger id="recordType">
                <SelectValue placeholder="选择解析方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A (地址记录)</SelectItem>
                <SelectItem value="AAAA">AAAA (IPv6 地址记录)</SelectItem>
                <SelectItem value="CNAME">CNAME (别名记录)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pointsTo">指向 (IP地址/域名)</Label>
            <Input
              id="pointsTo"
              placeholder="例如: 192.168.1.1 或 example.com"
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
              我已阅读并同意
              <Link href="/termsofservice" passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600">
                  服务条款
                </a>
              </Link>
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>算了</Button>
          <Button onClick={handleFormSubmit} disabled={!agreeToTerms || !subdomain || !pointsTo}>
            申请一个！
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
