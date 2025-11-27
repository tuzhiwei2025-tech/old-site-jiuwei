import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins?.push(
        codeInspectorPlugin({
          bundler: "webpack",
          editor: "cursor",
          showSwitch: true, // 在页面显示开关按钮
          disableLaunchEditor: false,
          // 启用更详细的调试信息
          // 这些选项可以帮助定位更多元素
          exclude: [], // 不排除任何文件
          include: [], // 包含所有文件
        }) as any
      );
    }
    return config;
  },
  // 添加空的 turbopack 配置以避免警告
  turbopack: {},
  // 配置 headers 以允许必要的脚本执行（仅在开发环境）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
              : "script-src 'self'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
