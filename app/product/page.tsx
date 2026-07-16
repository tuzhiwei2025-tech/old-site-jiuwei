import { ArrowUpRight, Box, Cpu, Network, ShieldCheck } from "lucide-react";
import { AppleSubpageShell } from "@/components/AppleSubpageShell";

const products = [
  {
    href: "/product/box",
    name: "AI机顶盒",
    label: "Cloud 云轻盒 / Mix 轻终端",
    desc: "用纯云端或本地知识库加云端模型两种版本，为个人与轻团队提供进入 AIOS 的轻量入口。",
    image: "/product-assets/cloud-clean-cutout.png",
    secondaryImage: "/product-assets/mix-front-clean-cutout.png",
    Icon: Box,
    tone: "bg-white text-[#1d1d1f]",
    specs: ["Cloud 云轻盒", "Mix 轻终端", "个人到 1-2 人", "数字员工工作台"],
    links: [
      ["查看 AI机顶盒", "/product/box"],
    ],
  },
  {
    href: "/product/solo",
    name: "AIPC 消费级产品",
    label: "GoAgent Spark Solo 工作站 / GoAgent Spark Cluster 集群",
    desc: "从单机工作站到中小团队私有算力池，为个人与团队提供全量本地部署的 AIOS 工作方式。",
    image: "/消费级.jpg",
    secondaryImage: "/product-assets/spark-cluster-cutout.png",
    Icon: Cpu,
    tone: "bg-[#f5f5f7] text-[#1d1d1f]",
    specs: ["Spark Solo 工作站", "Spark Cluster 集群", "本地私有部署", "个人到中小团队"],
    links: [
      ["Spark Solo 工作站", "/product/solo"],
      ["Spark Cluster 集群", "/product/cluster"],
    ],
  },
  {
    href: "/product/enterprise",
    name: "AIPC 企业级产品",
    label: "8卡及以上服务器定制化方案",
    desc: "面向大型集团与政企客户，按业务规模、合规要求和并发需求定制 8 卡及以上本地化硬件集群。",
    image: "/product-assets/enterprise-server-clean-cutout.png",
    Icon: Network,
    tone: "bg-[#1d1d1f] text-white",
    specs: ["8 卡及以上服务器", "定制化集群", "本地化部署", "安全管控与集成"],
    links: [
      ["查看定制化方案", "/product/enterprise"],
    ],
  },
];

const deployment = [
  ["轻量起步", "AI机顶盒", "Cloud 云轻盒与 Mix 轻终端，让个人和轻团队以合适的资料边界进入 AIOS。"],
  ["本地算力", "Spark Solo 与 Spark Cluster", "从个人工作站到中小团队私有算力池，覆盖不同规模的本地 AIOS 协作。"],
  ["企业定制", "8卡及以上服务器方案", "面向大型集团与政企客户，按合规、并发和系统集成需求定制部署。"],
] as const;

export default function ProductPage() {
  return (
    <AppleSubpageShell
      eyebrow="Product"
      title="三类产品，覆盖不同规模的 AIPC 落地方式。"
      intro="从轻量启动到本地私有算力，再到 8 卡及以上服务器定制化方案，GoAgent 为不同阶段提供明确入口。"
      ctaLabel="咨询部署方案"
    >
      <section className="bg-[#f5f5f7] px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-4">
          {products.map(({ Icon, image, secondaryImage, links, ...product }) => (
            <article key={product.name} className={`overflow-hidden rounded-[34px] p-8 md:p-10 ${product.tone}`}>
              <div className="grid min-h-[480px] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div className={`relative grid h-[320px] place-items-center overflow-hidden rounded-[28px] ${product.name === "AIPC 企业级产品" ? "bg-white/[0.08]" : "bg-white"} md:h-[420px]`}>
                  {image ? (
                    <div className={`grid h-full w-full ${secondaryImage ? "grid-cols-2" : "grid-cols-1"} place-items-center`}>
                      <img src={image} alt="" className="h-full w-full object-contain p-7 md:p-10" />
                      {secondaryImage && <img src={secondaryImage} alt="" className="h-full w-full object-contain p-7 md:p-10" />}
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center text-white/72">
                      <Network className="size-12" />
                      <span className="text-sm font-bold tracking-[0.16em]">VISUAL ASSET PENDING</span>
                    </div>
                  )}
                </div>
                <div>
                  <Icon className={`size-8 ${product.name === "AIPC 企业级产品" ? "text-white/70" : "text-[#0071e3]"}`} />
                  <p className={`mt-10 text-sm font-bold uppercase tracking-[0.18em] ${product.name === "AIPC 企业级产品" ? "text-white/52" : "text-[#86868b]"}`}>{product.label}</p>
                  <h2 className="mt-4 text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl">{product.name}</h2>
                  <p className={`mt-6 text-xl font-medium leading-9 ${product.name === "AIPC 企业级产品" ? "text-white/68" : "text-[#6e6e73]"}`}>{product.desc}</p>
                  <div className="mt-9 flex flex-wrap gap-2">
                    {product.specs.map((spec) => (
                      <span key={spec} className={`rounded-full px-4 py-2 text-sm font-bold ${product.name === "AIPC 企业级产品" ? "bg-white/10 text-white" : "bg-white text-[#1d1d1f]"}`}>{spec}</span>
                    ))}
                  </div>
                  <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                    {links.map(([label, href]) => (
                      <a key={href} href={href} className={`inline-flex items-center gap-2 text-sm font-bold ${product.name === "AIPC 企业级产品" ? "text-white" : "text-[#0071e3]"}`}>
                        {label}
                        <ArrowUpRight className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#86868b]">Deployment path</p>
            <h2 className="mt-4 text-balance text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl">从一人工作，到组织协同。</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {deployment.map(([scope, device, desc], index) => {
              const Icon = [Box, Cpu, ShieldCheck][index];
              return (
                <article key={scope} className="min-h-[300px] rounded-[30px] bg-[#f5f5f7] p-7">
                  <Icon className="size-8 text-[#0071e3]" />
                  <p className="mt-14 text-sm font-bold text-[#86868b]">{scope}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">{device}</h3>
                  <p className="mt-5 text-base font-medium leading-7 text-[#6e6e73]">{desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </AppleSubpageShell>
  );
}
