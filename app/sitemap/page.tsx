import { LegalPage } from "@/components/LegalPage";

export default function SitemapPage() {
  return (
    <LegalPage
      eyebrow="SITEMAP"
      title="网站地图"
      intro="快速访问 GoAgent AIPC 官网的核心页面、产品资料、技术架构、应用案例与法务信息。"
      sections={[
        {
          title: "核心页面",
          body: "首页 /home，产品矩阵 /product，应用案例 /cases，新闻动态 /news，联系咨询 /home#contact。",
        },
        {
          title: "法务页面",
          body: "法律声明 /legal，服务条款 /terms，隐私政策 /privacy，网站地图 /sitemap。",
        },
        {
          title: "主要内容",
          body: "产品矩阵包含面向个人及小微团队的 AI机顶盒、云地协同的消费级 AIPC，以及面向中大型企业的全栈私有化 AIPC 方案。",
        },
      ]}
    />
  );
}
