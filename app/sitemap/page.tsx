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
          body: "首页 /home，产品矩阵 /product，技术架构 /technology，应用案例 /cases，联系咨询 /home#contact。",
        },
        {
          title: "法务页面",
          body: "法律声明 /legal，服务条款 /terms，隐私政策 /privacy，网站地图 /sitemap。",
        },
        {
          title: "主要内容",
          body: "产品矩阵包含 AI机顶盒 Cloud 云轻盒与 Mix 轻终端、AIPC 消费级 Spark Solo 工作站与 Spark Cluster 集群，以及 8卡及以上服务器企业定制化方案。",
        },
      ]}
    />
  );
}
