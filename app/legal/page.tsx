import { LegalPage } from "@/components/LegalPage";

export default function LegalStatementPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="法律声明"
      intro="本页面用于说明九维图灵（上海）科技有限公司官网内容、商标、产品资料与访问行为相关的基本规则。"
      sections={[
        {
          title: "网站内容",
          body: "官网展示的 GoAgent AIPC、AIOS、GoData、模型路由、SmartStorage 等产品信息来自公司公开材料，具体功能、交付范围和服务边界以双方正式合同或订单为准。",
        },
        {
          title: "知识产权",
          body: "网站中的文字、界面、图形、产品名称、技术方案说明和品牌标识受相关法律保护。未经授权，不得复制、改编、传播或用于商业宣传。",
        },
        {
          title: "责任限制",
          body: "官网资料仅用于产品介绍和商务沟通参考。因网络环境、第三方服务或用户自行操作导致的访问异常，九维图灵将在合理范围内协助处理。",
        },
      ]}
    />
  );
}
