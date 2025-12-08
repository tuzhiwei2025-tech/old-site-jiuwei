'use client';

import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

interface Avatar {
  image: string;
  borderColor: string;
  icon?: string;
  iconColor?: string;
}

interface AIModel {
  name: string;
  icon: string;
  response?: string;
}

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  type?: 'image' | 'avatars' | 'ai-comparison' | 'video';
  avatars?: Avatar[];
  features?: string[];
  aiModels?: AIModel[];
  query?: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  type?: 'image' | 'avatars' | 'ai-comparison' | 'video';
  avatars?: Avatar[];
  features?: string[];
  aiModels?: AIModel[];
  query?: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  type = 'image',
  avatars = [],
  features = [],
  aiModels = [],
  query = '',
  videoUrl = '',
  videoThumbnail = '',
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // 为每个卡片定义不同的配色方案 - 基于提供的配色
  const gradientColorSchemes = [
    ["#000000", "#72b9bb", "#b5d9d9", "#8cc5b8", "#dbf4a4"], // 青绿黄配色
    ["#000000", "#ffd1bd", "#ffebe0", "#b5d9d9", "#72b9bb"], // 粉青配色
    ["#000000", "#8cc5b8", "#dbf4a4", "#ffd1bd", "#ffebe0"], // 绿粉配色
    ["#000000", "#b5d9d9", "#72b9bb", "#ffd1bd", "#ffebe0"], // 青粉配色
    ["#000000", "#ffebe0", "#ffd1bd", "#72b9bb", "#b5d9d9"], // 粉青配色
    ["#000000", "#dbf4a4", "#8cc5b8", "#b5d9d9", "#72b9bb"], // 黄绿青配色
  ];

  // 根据卡片索引选择配色方案
  const colorScheme = gradientColorSchemes[i % gradientColorSchemes.length];

  return (
    <div
      ref={container}
      className='flex sticky top-0 justify-center items-center px-4 h-screen'
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex relative -top-[25%] h-[650px] w-full max-w-7xl rounded-2xl overflow-hidden origin-top shadow-2xl border border-white/10`}
      >
        {/* MeshGradient 背景 - 完全不透明 */}
        <MeshGradient
          className='absolute inset-0 w-full h-full'
          colors={colorScheme}
          speed={0.3}
          distortion={0.8}
          swirl={0.6}
        />

        {/* 内容容器 */}
        <div className='flex relative z-10 flex-col w-full h-full lg:flex-row'>
          {/* 左侧文字内容区域 - 使用 MeshGradient 背景 */}
          <div className='flex flex-col justify-center w-full lg:w-[45%] p-8 lg:p-12 space-y-6 rounded-l-2xl relative z-10'>
            {/* 图标装饰 */}
            <div className='flex gap-3 items-center mb-2'>
              <div 
                className='flex justify-center items-center w-12 h-12 rounded-xl border backdrop-blur-md border-white/20'
                style={{ backgroundColor: `${color}60` }}
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 2L2 7L12 12L22 7L12 2Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none'/>
                  <path d='M2 17L12 22L22 17' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none'/>
                  <path d='M2 12L12 17L22 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none'/>
                </svg>
              </div>
            </div>

            {/* 标题 */}
            <motion.h2 
              className='text-3xl font-bold leading-tight text-white lg:text-4xl'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>

            {/* 描述 */}
            <motion.p 
              className='text-base leading-relaxed lg:text-lg text-white/80'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>

            {/* 功能列表 */}
            {features.length > 0 && (
              <motion.ul 
                className='pt-2 space-y-3'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {features.map((feature, idx) => (
                  <li key={idx} className='flex gap-3 items-center'>
                    <div 
                      className='flex justify-center items-center w-5 h-5 rounded-full shrink-0'
                      style={{ backgroundColor: `${color}60` }}
                    >
                      <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10 3L4.5 8.5L2 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                      </svg>
                    </div>
                    <span className='text-sm font-medium text-white lg:text-base'>{feature}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* 链接按钮 */}
            <motion.div 
              className='flex gap-3 items-center pt-4'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href={url || '#'}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex gap-2 items-center px-6 py-3 font-medium text-white rounded-full transition-all duration-300 group hover:gap-4'
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                  boxShadow: `0 4px 20px ${color}60`,
                }}
              >
                <span>了解更多</span>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 22 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='transition-transform duration-300 group-hover:translate-x-1'
                >
                  <path
                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                    fill='currentColor'
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* 右侧内容区域 */}
          <div className='relative w-full lg:w-[55%] h-full overflow-hidden'>
            {type === 'avatars' ? (
              /* 头像集合布局 */
              <div className='flex overflow-hidden relative justify-center items-center p-6 w-full h-full lg:p-10'>
                {/* 细网格背景 - 确保在最底层且清晰可见 */}
                <div 
                  className='absolute inset-0 z-0'
                  style={{
                    backgroundImage: `linear-gradient(${color}80 1px, transparent 1px), linear-gradient(90deg, ${color}80 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    opacity: 0.5,
                  }}
                />
                
                {/* 背景装饰 - 降低透明度，让网格更明显 */}
                <div 
                  className='absolute inset-0 z-0 opacity-15'
                  style={{
                    background: `radial-gradient(circle at center, ${color}60 0%, transparent 70%)`,
                  }}
                />
                
                {/* 头像容器 - 确保头像不超出容器边界 */}
                <div className='relative z-10 w-full h-full min-h-[500px] overflow-visible'>
                  {avatars.map((avatar, idx) => {
                    // 定义不同大小的头像位置：中心集合，四周发散
                    // 9个头像，重新计算位置确保完全不重叠，考虑头像实际大小（包括边框和阴影）
                    // 小头像半径约10-11px，中等约13-15px，大头像约20-22px
                    // 需要至少30-35%的间距才能确保不重叠
                    const positions = [
                      // 四周分散的头像 - 左上 (小) - 确保在边缘
                      { top: '15%', left: '15%', z: 2, rotate: -8, size: 'w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20', scale: 'small' },
                      // 中间区域 - 上中 (中) - 与中心保持30%距离
                      { top: '22%', left: '50%', z: 3, rotate: 12, size: 'w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 xl:w-26 xl:h-26', scale: 'medium' },
                      // 四周分散的头像 - 右上 (小) - 确保在边缘
                      { top: '12%', left: '85%', z: 1, rotate: -5, size: 'w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22', scale: 'small' },
                      // 中间区域 - 中左 (中) - 与中心保持30%距离
                      { top: '50%', left: '22%', z: 4, rotate: 15, size: 'w-22 h-22 sm:w-24 sm:h-24 lg:w-26 lg:h-26 xl:w-28 xl:h-28', scale: 'medium' },
                      // 中间区域 - 中心焦点 (最大)
                      { top: '50%', left: '50%', z: 5, rotate: -12, size: 'w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44', scale: 'large' },
                      // 中间区域 - 中右 (中) - 与中心保持30%距离
                      { top: '50%', left: '78%', z: 3, rotate: 8, size: 'w-22 h-22 sm:w-24 sm:h-24 lg:w-26 lg:h-26 xl:w-28 xl:h-28', scale: 'medium' },
                      // 四周分散的头像 - 右上 (小) - 更分散，避免与中右重叠
                      { top: '18%', left: '90%', z: 2, rotate: -10, size: 'w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22', scale: 'small' },
                      // 中间区域 - 下中 (中) - 与中心保持28%距离
                      { top: '78%', left: '50%', z: 4, rotate: 6, size: 'w-24 h-24 sm:w-26 sm:h-26 lg:w-28 lg:h-28 xl:w-30 xl:h-30', scale: 'medium' },
                      // 中间区域 - 中下 (第二大) - 与中心保持足够距离，避免与下中重叠
                      { top: '60%', left: '80%', z: 5, rotate: -7, size: 'w-26 h-26 sm:w-30 sm:h-30 lg:w-34 lg:h-34 xl:w-38 xl:h-38', scale: 'large' },
                    ];
                    const pos = positions[idx % positions.length] || { top: '50%', left: '50%', z: 1, rotate: 0, size: 'w-20 h-20 lg:w-24 lg:h-24', scale: 'medium' };
                    
                    return (
                      <motion.div
                        key={idx}
                        className='absolute'
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: idx * 0.1,
                        }}
                        style={{
                          top: pos.top,
                          left: pos.left,
                          transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                          zIndex: pos.z,
                        }}
                      >
                        {/* 头像圆形容器 */}
                        <motion.div 
                          className={`overflow-hidden relative rounded-full ${pos.size} cursor-pointer group`}
                          style={{
                            border: pos.scale === 'large' ? `4px solid ${avatar.borderColor}` : pos.scale === 'medium' ? `3px solid ${avatar.borderColor}` : `2px solid ${avatar.borderColor}`,
                            boxShadow: pos.scale === 'large' 
                              ? `0 0 30px ${avatar.borderColor}60, 0 0 60px ${avatar.borderColor}30, 0 0 100px ${avatar.borderColor}15`
                              : pos.scale === 'medium'
                              ? `0 0 25px ${avatar.borderColor}50, 0 0 50px ${avatar.borderColor}20`
                              : `0 0 15px ${avatar.borderColor}40, 0 0 30px ${avatar.borderColor}15`,
                          }}
                          whileHover={{ scale: 1.15, zIndex: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={avatar.image} 
                            alt={`Avatar ${idx + 1}`}
                            className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
                          />
                          {/* 悬停光效 */}
                          <div 
                            className='absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-30'
                            style={{
                              background: `radial-gradient(circle, ${avatar.borderColor} 0%, transparent 70%)`,
                            }}
                          />
                        </motion.div>
                        
                        {/* 图标（如果有） */}
                        {avatar.icon && (
                          <motion.div 
                            className={`flex absolute -right-1 -bottom-1 justify-center items-center rounded-full border-2 shadow-lg backdrop-blur-sm border-white/30 ${
                              pos.scale === 'large' ? 'w-8 h-8 lg:w-9 lg:h-9' : pos.scale === 'medium' ? 'w-6 h-6 lg:w-7 lg:h-7' : 'w-5 h-5 lg:w-6 lg:h-6'
                            }`}
                            style={{ backgroundColor: avatar.iconColor || avatar.borderColor }}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img 
                              src={avatar.icon} 
                              alt='icon'
                              className={pos.scale === 'large' ? 'w-4 h-4 lg:w-5 lg:h-5' : pos.scale === 'medium' ? 'w-3 h-3 lg:w-4 lg:h-4' : 'w-2.5 h-2.5 lg:w-3 lg:h-3'}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* 装饰性光效 */}
                <div 
                  className='absolute top-1/2 right-1/4 w-80 h-80 opacity-30 blur-3xl -translate-y-1/2'
                  style={{ backgroundColor: color }}
                />
              </div>
            ) : type === 'ai-comparison' ? (
              /* AI比较布局 */
              <div className='flex relative flex-col w-full h-full'>
                {/* AI模型图标行 */}
                {aiModels.length > 0 && (
                  <div className='flex gap-4 items-center p-4 border-b border-white/10'>
                    {aiModels.map((model, idx) => (
                      <div key={idx} className='flex overflow-hidden justify-center items-center w-9 h-9 rounded-full border transition-colors bg-white/5 border-white/10 hover:bg-white/10'>
                        <img src={model.icon} alt={model.name} className='w-6 h-6' />
                      </div>
                    ))}
                  </div>
                )}

                {/* 查询问题 */}
                {query && (
                  <div className='p-4 border-b border-white/10'>
                    <p className='text-sm font-medium text-white/90'>{query}</p>
                  </div>
                )}

                {/* AI响应列 */}
                <div className='flex overflow-x-auto flex-1'>
                  {aiModels.map((model, idx) => (
                    <div 
                      key={idx} 
                      className='flex-1 min-w-[280px] p-5 border-r border-white/10 last:border-r-0 overflow-y-auto'
                    >
                      <div className='flex items-center gap-2.5 mb-4 pb-3 border-b border-white/5'>
                        <img src={model.icon} alt={model.name} className='w-5 h-5' />
                        <span className='text-sm font-semibold text-white'>{model.name}</span>
                      </div>
                      {model.response ? (
                        <div className='text-sm leading-relaxed whitespace-pre-wrap text-white/85'>
                          {model.response}
                        </div>
                      ) : (
                        <div className='text-sm italic text-white/40'>等待响应...</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : type === 'video' ? (
              /* 视频播放器布局 */
              <div className='flex relative justify-center items-center p-8 w-full h-full lg:p-12'>
                {/* 背景装饰 */}
                <div 
                  className='absolute inset-0 opacity-20'
                  style={{
                    background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`,
                  }}
                />
                
                {/* 视频播放器容器 - 苹果风格显示器 */}
                <div className='relative z-10 w-full max-w-3xl group'>
                  {/* 显示器外框 - 苹果风格：极薄边框，圆润边角 */}
                  <div 
                    className='relative rounded-[20px] overflow-hidden'
                    style={{
                      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.15) 0%, rgba(100, 100, 100, 0.1) 50%, rgba(200, 200, 200, 0.15) 100%)',
                      boxShadow: `
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        0 0 0 2px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                        0 30px 80px rgba(0, 0, 0, 0.4),
                        0 10px 30px rgba(0, 0, 0, 0.2)
                      `,
                      padding: '3px',
                    }}
                  >
                    {/* 显示器屏幕 - 极薄边框效果 */}
                    <div className='relative overflow-hidden rounded-[18px] bg-black aspect-video' style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255, 255, 255, 0.05)' }}>
                      {/* 屏幕反光效果 - 苹果风格 */}
                      <div className='absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b opacity-30 pointer-events-none from-white/40 via-white/10 to-transparent z-10' />
                      <div className='absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br opacity-20 pointer-events-none from-white/30 to-transparent z-10' />
                      
                      {/* 视频播放器 */}
                      <div className='relative w-full h-full bg-gradient-to-br to-black from-slate-900'>
                    {videoThumbnail ? (
                      <>
                        <img 
                          src={videoThumbnail} 
                          alt={title}
                          className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
                        />
                        {/* 渐变遮罩 */}
                        <div 
                          className='absolute inset-0 opacity-60'
                          style={{
                            background: `linear-gradient(to bottom, transparent 0%, ${color}20 50%, ${color}40 100%)`,
                          }}
                        />
                        {/* 播放按钮覆盖层 - 苹果风格 */}
                        <div className='flex absolute inset-0 justify-center items-center transition-all duration-300 cursor-pointer group/play'>
                          <motion.div 
                            className='flex justify-center items-center w-20 h-20 rounded-full backdrop-blur-xl transition-all group-hover/play:scale-110'
                            style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              boxShadow: `
                                0 8px 32px rgba(0, 0, 0, 0.4),
                                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                              `,
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: `
                                0 12px 40px rgba(0, 0, 0, 0.5),
                                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                              `,
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg 
                              width='32' 
                              height='32' 
                              viewBox='0 0 24 24' 
                              fill='none' 
                              xmlns='http://www.w3.org/2000/svg'
                              className='ml-1 drop-shadow-lg'
                              style={{ color: '#ffffff', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                            >
                              <path 
                                d='M8 5V19L19 12L8 5Z' 
                                fill='currentColor'
                              />
                            </svg>
                          </motion.div>
                          {/* 播放提示文字 - 苹果风格 */}
                          <div className='absolute bottom-20 left-1/2 opacity-0 transition-opacity duration-300 -translate-x-1/2 group-hover/play:opacity-100'>
                            <span 
                              className='px-4 py-2 text-sm font-medium rounded-full backdrop-blur-xl text-white/95'
                              style={{
                                background: 'rgba(0, 0, 0, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                              }}
                            >
                              点击播放
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className='flex justify-center items-center w-full h-full'>
                        <div className='text-white/40'>视频加载中...</div>
                      </div>
                    )}
                      </div>
                    
                    {/* 视频控制栏（模拟） */}
                    <div className='absolute right-0 bottom-0 left-0 p-5 bg-gradient-to-t to-transparent opacity-0 backdrop-blur-sm transition-opacity duration-300 from-black/90 group-hover:opacity-100'>
                      <div className='flex gap-4 items-center'>
                        {/* 播放/暂停按钮 */}
                        <button 
                          className='flex justify-center items-center w-8 h-8 rounded-full transition-colors hover:bg-white/20'
                          style={{ color: color }}
                        >
                          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M6 4H10V20H6V4ZM14 4H18V20H14V4Z' />
                          </svg>
                        </button>
                        {/* 进度条 */}
                        <div className='overflow-hidden flex-1 h-1.5 rounded-full bg-white/20 cursor-pointer group/progress'>
                          <div 
                            className='relative h-full rounded-full transition-all'
                            style={{ 
                              width: '35%',
                              backgroundColor: color,
                            }}
                          >
                            {/* 进度条拖拽点 */}
                            <div 
                              className='absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 transition-opacity -translate-y-1/2 group-hover/progress:opacity-100'
                              style={{ backgroundColor: color }}
                            />
                          </div>
                        </div>
                        {/* 时间显示 */}
                        <div className='font-mono text-xs text-white/90 min-w-[80px]'>
                          1:24 / 3:45
                        </div>
                        {/* 音量控制 */}
                        <div className='flex gap-2 items-center group/volume'>
                          <button className='flex justify-center items-center w-8 h-8 rounded-full transition-colors hover:bg-white/20'>
                            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <path d='M3 9V15H7L12 20V4L7 9H3Z' fill='currentColor' className='text-white/90'/>
                              <path d='M16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.03C15.5 15.29 16.5 13.77 16.5 12Z' fill='currentColor' className='text-white/90'/>
                            </svg>
                          </button>
                          <div className='w-16 h-1 rounded-full opacity-0 transition-opacity cursor-pointer bg-white/20 group-hover/volume:opacity-100'>
                            <div 
                              className='h-full rounded-full transition-all'
                              style={{ 
                                width: '70%',
                                backgroundColor: color,
                              }}
                            />
                          </div>
                        </div>
                        {/* 全屏按钮 */}
                        <button 
                          className='flex justify-center items-center w-8 h-8 rounded-full transition-colors hover:bg-white/20'
                          style={{ color: color }}
                        >
                          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M7 14H5V19H10V17H7V14ZM17 14V17H19V19H14V14H17ZM5 10H7V7H10V5H5V10ZM19 10V5H14V7H17V10H19Z' fill='currentColor' className='text-white/90'/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                  
                  {/* 显示器品牌标识区域 - 苹果风格：极简设计 */}
                  <div 
                    className='flex justify-center items-center py-3'
                    style={{
                      background: 'linear-gradient(to bottom, rgba(60, 60, 60, 0.6) 0%, rgba(40, 40, 40, 0.8) 100%)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div 
                      className='w-12 h-0.5 rounded-full'
                      style={{
                        background: 'linear-gradient(to right, transparent, rgba(200, 200, 200, 0.3), transparent)',
                        boxShadow: '0 0 2px rgba(255, 255, 255, 0.2)',
                      }}
                    />
                  </div>
                  
                  {/* 显示器底座 - 苹果风格：简洁优雅 */}
                  <div className='flex justify-center mt-3'>
                    <div 
                      className='relative'
                      style={{
                        width: '120px',
                        height: '8px',
                      }}
                    >
                      {/* 底座主体 */}
                      <div 
                        className='absolute inset-0 rounded-full'
                        style={{
                          background: 'linear-gradient(135deg, rgba(80, 80, 80, 0.9) 0%, rgba(50, 50, 50, 0.95) 50%, rgba(80, 80, 80, 0.9) 100%)',
                          boxShadow: `
                            0 2px 8px rgba(0, 0, 0, 0.4),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                          `,
                        }}
                      />
                      {/* 底座高光 */}
                      <div 
                        className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full'
                        style={{
                          background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 装饰性光效 */}
                <div 
                  className='absolute top-1/2 right-1/4 w-80 h-80 opacity-30 blur-3xl -translate-y-1/2'
                  style={{ backgroundColor: color }}
                />
              </div>
            ) : (
              /* 图片布局 */
              <div className='overflow-hidden relative w-full h-full group'>
                <motion.div
                  className='absolute inset-0'
                  style={{ scale: imageScale }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <img 
                    src={url} 
                    alt={title} 
                    className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110' 
                  />
                  {/* 多层渐变遮罩 */}
                  <div 
                    className='absolute inset-0 opacity-60'
                    style={{
                      background: `linear-gradient(135deg, ${color}50 0%, ${color}30 30%, transparent 60%)`,
                    }}
                  />
                  <div 
                    className='absolute inset-0 opacity-40'
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${color}40 0%, transparent 50%)`,
                    }}
                  />
                  {/* 网格叠加效果 */}
                  <div 
                    className='absolute inset-0 opacity-10'
                    style={{
                      backgroundImage: `linear-gradient(${color}40 1px, transparent 1px), linear-gradient(90deg, ${color}40 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </motion.div>

                {/* 装饰性光效 - 多个 */}
                <div 
                  className='absolute top-0 right-0 w-96 h-96 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-70'
                  style={{ backgroundColor: color }}
                />
                <div 
                  className='absolute bottom-0 left-0 w-64 h-64 opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50'
                  style={{ backgroundColor: color }}
                />
                {/* 边框高光 */}
                <div
                  className='absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100'
                  style={{
                    boxShadow: `inset 0 0 0 2px ${color}60, 0 0 80px ${color}30`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 边框光效 */}
        <div 
          className='absolute inset-0 rounded-2xl pointer-events-none'
          style={{
            boxShadow: `inset 0 0 0 1px ${color}50, 0 0 60px ${color}40`,
          }}
        />
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
  isolated?: boolean;
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects = [], isolated = false }, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const content = (
    <div className='bg-gradient-to-b via-black from-slate-950 to-slate-950' ref={container}>
      <section 
        ref={ref as React.RefObject<HTMLElement> | null}
        className='relative w-full text-white' 
        style={{ minHeight: isolated ? `${projects.length * 100}vh` : undefined }}
      >
        {/* 背景装饰 */}
        <div className='overflow-hidden fixed inset-0 pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-purple-500/10' />
          <div className='absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full blur-3xl bg-blue-500/10' />
        </div>

        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project.link}
              title={project.title}
              color={project.color}
              description={project.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              type={project.type || 'image'}
              avatars={project.avatars || []}
              features={project.features || []}
              aiModels={project.aiModels || []}
              query={project.query || ''}
              videoUrl={project.videoUrl || ''}
              videoThumbnail={project.videoThumbnail || ''}
            />
          );
        })}
      </section>
    </div>
  );

  // 隔离模式：不使用 ReactLenis，直接返回内容
  if (isolated) {
    return content;
  }

  // 正常模式：使用 ReactLenis
  return (
    <ReactLenis root>
      {content}
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;
