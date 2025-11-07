# Dify.ai 首页复刻项目

这是一个使用 Next.js 16、Tailwind CSS 和 GSAP 动画库复刻的 Dify.ai 首页项目。

## 技术栈

- **Next.js 16** - React 框架
- **Tailwind CSS** - 实用优先的 CSS 框架
- **shadcn/ui** - 高质量 React 组件库
- **GSAP** - 强大的动画库（选择 GSAP 而非 Anime.js 的原因见下方）

## 动画库选择：GSAP vs Anime.js

### 为什么选择 GSAP？

1. **性能更优**：GSAP 在性能方面表现更出色，特别是在复杂动画和大量元素动画时
2. **功能更强大**：
   - ScrollTrigger 插件提供强大的滚动触发动画
   - Timeline 功能可以精确控制动画序列
   - 更好的浏览器兼容性
3. **更适合生产环境**：GSAP 在企业级项目中应用更广泛
4. **更好的文档和社区支持**

### Anime.js 的优势

- 更轻量级（约 17KB vs GSAP 的 ~50KB）
- 更简单的 API，学习曲线更平缓
- 适合简单的动画需求

**结论**：对于像 Dify.ai 这样需要复杂滚动动画和交互效果的现代网站，GSAP 是更好的选择。

## 项目结构

```
site/
├── app/
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   └── globals.css     # 全局样式
├── components/
│   ├── Navbar.tsx      # 导航栏
│   ├── Hero.tsx        # Hero 区域
│   ├── Features.tsx    # 特性展示
│   ├── Capabilities.tsx # 功能展示
│   ├── Ecosystem.tsx   # 生态系统
│   ├── CTA.tsx         # 行动号召
│   ├── Footer.tsx      # 页脚
│   └── ui/             # shadcn/ui 组件
└── lib/
    └── utils.ts        # 工具函数
```

## 安装和运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 主要特性

1. **响应式设计** - 完美适配移动端、平板和桌面端
2. **流畅动画** - 使用 GSAP 实现滚动触发动画和页面过渡效果
3. **现代 UI** - 使用 shadcn/ui 组件库，确保 UI 质量和一致性
4. **性能优化** - Next.js 16 的优化和代码分割
5. **SEO 友好** - 服务端渲染和元数据优化

## 组件说明

### Navbar
- 固定导航栏，滚动时添加背景模糊效果
- 响应式菜单（移动端可扩展）

### Hero
- 大标题和渐变文字效果
- GitHub Stars 徽章
- 行动号召按钮

### Features
- 四个主要特性卡片
- 滚动触发动画

### Capabilities
- 功能展示区域
- 卡片式布局

### Ecosystem
- 生态系统介绍
- 编号列表展示

### CTA
- 最终行动号召区域
- 引导用户注册或查看文档

### Footer
- 完整的页脚链接
- 资源和公司信息

## 自定义和扩展

所有组件都使用 TypeScript 编写，易于扩展和自定义。动画效果可以通过修改 GSAP 配置来调整。

## 许可证

MIT
