import { useState } from 'react';

export function useApplySubdomainForm(initialEmail = "i@lonay.me") {
  const [subdomain, setSubdomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [pointsTo, setPointsTo] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const resetForm = () => {
    setSubdomain("");
    setRecordType("A");
    setPointsTo("");
    setAgreeToTerms(false);
  };

  const handleSubmit = () => {
    if (!agreeToTerms) {
      alert("请同意服务条款后再提交。");
      return false;
    }

    // Basic validation for subdomain format (optional, can be enhanced)
    if (!/^[a-zA-Z0-9-]+$/.test(subdomain)) {
        alert("子域名只能包含字母、数字和连字符。");
        return false;
    }
    if (!pointsTo) {
        alert("“指向”字段不能为空。");
        return false;
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

    const mailtoLink = `mailto:${initialEmail}?subject=${encodeURIComponent(
      `子域名申请 - ${subdomain}`
    )}&body=${encodeURIComponent(formattedBody)}`;

    try {
        window.location.href = mailtoLink;
        // It's hard to know if mailto succeeded, so we assume it did for form reset.
        // The parent component should handle closing the modal.
        return true; // Indicate success or attempt
    } catch (error) {
        console.error("Failed to open mailto link:", error);
        alert("无法打开邮件客户端。请手动发送邮件。");
        return false;
    }
  };

  return {
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
  };
}
