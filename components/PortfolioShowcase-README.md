# 作品集展示组件 - GSAP 实现

基于 Pinterest 视频中的网站设计，使用 **GSAP** 实现的现代化作品集展示页面。

## 视频中的网站特点

根据视频分析，该网站包含以下关键部分和动画效果：

### 1. SERVICES 部分
- 大标题 "SERVICES"
- 描述文字
- 滚动视差效果

### 2. ABOUT ME 部分
- 大标题 "ABOUT ME"
- 3D 形状元素（白色星形、紫色菱形）
- 彩色标签栏

### 3. GET IN TOUCH / CONTACT 部分
- 3D Blob 形状（紫色/粉色渐变）
- 大标题 "GET IN TOUCH" 或 "TOUCH"
- 邮箱输入框和发送按钮
- "Mr.GoGo TURNER" 名称
- 触摸栏样式的彩色图标
- 联系信息（SOCIAL 和 CONTACT）

## GSAP 动画实现

### 滚动触发动画 (ScrollTrigger)

```typescript
// 标题从下方淡入
gsap.fromTo(
  titleRef.current,
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 75%",
      toggleActions: "play none none none",
    },
  }
);
```

### 视差滚动效果

```typescript
// Blob 视差动画
gsap.to(blobRef.current, {
  y: -100,
  scale: 1.1,
  rotation: 15,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom",
    end: "bottom top",
    scrub: 1, // 平滑跟随滚动
  },
});
```

### 逐个元素动画

```typescript
// 触摸栏图标逐个出现
Array.from(icons).forEach((icon, index) => {
  gsap.fromTo(
    icon,
    { opacity: 0, scale: 0, rotation: -180 },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      delay: index * 0.1, // 延迟递增
      ease: "back.out(1.7)",
    }
  );
});
```

### 悬停交互动画

```typescript
icon.addEventListener("mouseenter", () => {
  gsap.to(icon, {
    scale: 1.2,
    y: -10,
    duration: 0.3,
    ease: "power2.out",
  });
});
```

### 持续动画（呼吸效果）

```typescript
// Blob 呼吸动画
gsap.to(blobRef.current, {
  scale: 1.05,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});
```

## 技术栈

- **GSAP 3**: 动画库
- **ScrollTrigger**: 滚动触发插件
- **React**: UI 框架
- **Next.js**: 服务端渲染
- **Tailwind CSS**: 样式框架

## 关键动画效果

### 1. 标题动画
- **clipPath 展开**: 从中心向四周展开
- **淡入 + 上移**: 从下方淡入并上移
- **缩放**: 从 0.8 缩放到 1

### 2. 3D Blob 动画
- **滚动视差**: 跟随滚动移动和旋转
- **呼吸效果**: 持续缩放动画
- **CSS 渐变**: 多层渐变创建 3D 效果

### 3. 触摸栏图标
- **逐个出现**: 延迟递增的动画
- **旋转进入**: 从 -180 度旋转到 0
- **弹性效果**: 使用 `back.out` 缓动函数
- **悬停交互**: 缩放和上移

### 4. 文字动画
- **淡入**: opacity 从 0 到 1
- **位移**: y 轴移动
- **延迟**: 错开时间创建层次感

## 使用方法

### 基本使用

```tsx
import PortfolioShowcase from "@/components/PortfolioShowcase";

export default function Page() {
  return <PortfolioShowcase />;
}
```

### 访问示例

访问 `/demo` 查看完整效果。

## 性能优化

1. **GSAP Context**: 使用 `gsap.context()` 管理所有动画，便于清理
2. **ScrollTrigger 清理**: 组件卸载时自动清理所有 ScrollTrigger 实例
3. **条件渲染**: 只在元素存在时创建动画
4. **硬件加速**: GSAP 自动使用 transform 属性，利用 GPU 加速

## 自定义配置

### 调整动画速度

```typescript
// 修改 duration
duration: 1.2, // 改为 0.8 加快速度

// 修改延迟
delay: index * 0.1, // 改为 0.05 减少延迟
```

### 调整触发点

```typescript
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top 75%", // 改为 "top 80%" 更早触发
  toggleActions: "play none none none",
}
```

### 调整视差强度

```typescript
gsap.to(blobRef.current, {
  y: -100, // 改为 -50 减少移动距离
  scale: 1.1, // 改为 1.05 减少缩放
  rotation: 15, // 改为 10 减少旋转
});
```

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- 移动端: ✅ 支持（性能可能略低）

## 扩展建议

1. **添加更多部分**: 项目展示、技能列表等
2. **鼠标跟随**: Blob 跟随鼠标移动
3. **页面过渡**: 使用 GSAP 实现页面切换动画
4. **3D 效果增强**: 使用 CSS 3D transforms 增强视觉效果
5. **响应式优化**: 移动端的动画调整

