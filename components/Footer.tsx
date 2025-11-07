"use client";

import Link from "next/link";

const footerLinks = {
  resources: [
    { name: "文档", href: "#docs" },
    { name: "博客", href: "#blog" },
    { name: "教育", href: "#education" },
    { name: "合作伙伴", href: "#partner" },
    { name: "服务支持", href: "#support" },
    { name: "产品路线图", href: "#roadmap" },
  ],
  company: [
    { name: "联系我们", href: "#contact" },
    { name: "服务条款", href: "#terms" },
    { name: "隐私政策", href: "#privacy" },
    { name: "Cookie 设置", href: "#cookies" },
    { name: "数据保护协议", href: "#data" },
    { name: "插件市场协议", href: "#marketplace-agreement" },
    { name: "最终用户许可协议", href: "#eula" },
    { name: "品牌规范手册", href: "#brand" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#4932cc] to-[#6b4ce6] bg-clip-text text-transparent">
                GoAgent
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              GoAgent 为 AI 应用提供从构思、开发到部署、监控的完整基础设施，帮助你的团队打造能投产并创造真正价值的 Agentic AI 解决方案。
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">资源</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">公司</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 LangGenius, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

