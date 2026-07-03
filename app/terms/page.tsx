import { LegalPage } from "@/components/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS"
      title="服务条款"
      intro="本条款适用于用户通过官网咨询、预约演示或试用九维图灵相关产品与服务的基本场景。"
      sections={[
        {
          title: "服务范围",
          body: "九维图灵可围绕 GoAgent AIPC、企业私有化部署、数字员工定制、企业知识库和行业解决方案提供咨询、演示、实施和技术支持。",
        },
        {
          title: "用户义务",
          body: "用户应保证提交的联系信息和业务资料真实、合法，并对自身上传、导入或授权处理的数据内容拥有相应权利。",
        },
        {
          title: "交付约定",
          body: "涉及私有化部署、模型配置、知识库建设、API 对接和数字员工定制的项目，应以正式商务合同、技术方案和验收标准为准。",
        },
      ]}
    />
  );
}
