import { LegalPage } from "@/components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY"
      title="隐私政策"
      intro="九维图灵重视企业与个人信息安全。本页面说明官网咨询和产品服务中可能涉及的信息处理原则。"
      sections={[
        {
          title: "信息收集",
          body: "当用户通过官网提交咨询、预约演示或发起商务沟通时，我们可能收集姓名、公司、联系方式、业务需求和产品使用意向等必要信息。",
        },
        {
          title: "使用目的",
          body: "相关信息仅用于需求沟通、方案确认、产品演示、合同履约和售后支持。未经授权，不会将用户业务资料用于无关用途。",
        },
        {
          title: "安全保护",
          body: "GoAgent AIPC 支持本地化部署、企业知识库权限管理和操作审计等能力，帮助企业在可控边界内使用数字员工和 AIOS 能力。",
        },
      ]}
    />
  );
}
