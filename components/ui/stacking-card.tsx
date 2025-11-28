'use client';

import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';

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
  type?: 'image' | 'avatars' | 'ai-comparison';
  avatars?: Avatar[];
  features?: string[];
  aiModels?: AIModel[];
  query?: string;
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
  type?: 'image' | 'avatars' | 'ai-comparison';
  avatars?: Avatar[];
  features?: string[];
  aiModels?: AIModel[];
  query?: string;
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
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [0.6, 1]);

  return (
    <div
      ref={container}
      className='flex sticky top-0 justify-center items-center px-4 h-screen'
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex relative -top-[25%] h-[500px] w-full max-w-6xl rounded-2xl overflow-hidden origin-top shadow-2xl border border-white/10 backdrop-blur-sm`}
      >
        {/* 渐变背景层 */}
        <div 
          className='absolute inset-0 opacity-90'
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}30 50%, ${color}15 100%)`,
          }}
        />
        
        {/* 装饰性网格背景 */}
        <div className='absolute inset-0 opacity-5' style={{
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />

        {/* 内容容器 */}
        <div className='flex relative z-10 flex-col w-full h-full lg:flex-row'>
          {/* 左侧文字内容区域 */}
          <div className='flex flex-col justify-center w-full lg:w-[45%] p-8 lg:p-12 space-y-6'>
            {/* 图标装饰 */}
            <div className='flex gap-3 items-center mb-2'>
              <div 
                className='flex justify-center items-center w-12 h-12 rounded-xl border backdrop-blur-md border-white/20'
                style={{ backgroundColor: `${color}40` }}
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
                      style={{ backgroundColor: `${color}40` }}
                    >
                      <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10 3L4.5 8.5L2 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                      </svg>
                    </div>
                    <span className='text-sm lg:text-base text-white/90'>{feature}</span>
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
                  boxShadow: `0 4px 15px ${color}40`,
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
              <div className='flex relative justify-center items-center p-8 w-full h-full lg:p-12'>
                {/* 背景装饰 */}
                <div 
                  className='absolute inset-0 opacity-20'
                  style={{
                    background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`,
                  }}
                />
                
                {/* 头像容器 */}
                <div className='relative z-10 w-full max-w-lg h-full max-h-96'>
                  {avatars.map((avatar, idx) => {
                    const positions = [
                      { top: '10%', left: '20%', z: 3, rotate: -3, size: 'w-20 h-20 lg:w-24 lg:h-24' },
                      { top: '5%', left: '55%', z: 2, rotate: 5, size: 'w-24 h-24 lg:w-28 lg:h-28' },
                      { top: '2%', left: '80%', z: 4, rotate: -2, size: 'w-20 h-20 lg:w-24 lg:h-24' },
                      { top: '38%', left: '8%', z: 1, rotate: 4, size: 'w-20 h-20 lg:w-26 lg:h-26' },
                      { top: '32%', left: '45%', z: 5, rotate: -6, size: 'w-24 h-24 lg:w-32 lg:h-32' },
                      { top: '28%', left: '75%', z: 2, rotate: 2, size: 'w-20 h-20 lg:w-24 lg:h-24' },
                      { top: '62%', left: '25%', z: 3, rotate: -4, size: 'w-20 h-20 lg:w-26 lg:h-26' },
                      { top: '58%', left: '65%', z: 1, rotate: 3, size: 'w-20 h-20 lg:w-24 lg:h-24' },
                    ];
                    const pos = positions[idx % positions.length] || { top: '50%', left: '50%', z: 1, rotate: 0, size: 'w-20 h-20 lg:w-24 lg:h-24' };
                    
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
                        <div 
                          className={`overflow-hidden relative rounded-full ${pos.size}`}
                          style={{
                            border: `3px solid ${avatar.borderColor}`,
                            boxShadow: `0 0 20px ${avatar.borderColor}40`,
                          }}
                        >
                          <img 
                            src={avatar.image} 
                            alt={`Avatar ${idx + 1}`}
                            className='object-cover w-full h-full'
                          />
                        </div>
                        
                        {/* 图标（如果有） */}
                        {avatar.icon && (
                          <div 
                            className='flex absolute -right-1 -bottom-1 justify-center items-center w-6 h-6 rounded-full border-2 shadow-md lg:w-7 lg:h-7 border-white/20'
                            style={{ backgroundColor: avatar.iconColor || avatar.borderColor }}
                          >
                            <img 
                              src={avatar.icon} 
                              alt='icon'
                              className='w-3 h-3 lg:w-4 lg:h-4'
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* 装饰性光效 */}
                <div 
                  className='absolute top-1/2 right-1/4 w-64 h-64 opacity-20 blur-3xl -translate-y-1/2'
                  style={{ backgroundColor: color }}
                />
              </div>
            ) : type === 'ai-comparison' ? (
              /* AI比较布局 */
              <div className='flex relative flex-col w-full h-full backdrop-blur-sm bg-slate-900/80'>
                {/* AI模型图标行 */}
                {aiModels.length > 0 && (
                  <div className='flex gap-4 items-center p-4 border-b border-white/10 bg-slate-800/50'>
                    {aiModels.map((model, idx) => (
                      <div key={idx} className='flex overflow-hidden justify-center items-center w-9 h-9 rounded-full border transition-colors bg-white/5 border-white/10 hover:bg-white/10'>
                        <img src={model.icon} alt={model.name} className='w-6 h-6' />
                      </div>
                    ))}
                  </div>
                )}

                {/* 查询问题 */}
                {query && (
                  <div className='p-4 border-b border-white/10 bg-slate-800/30'>
                    <p className='text-sm font-medium text-white/90'>{query}</p>
                  </div>
                )}

                {/* AI响应列 */}
                <div className='flex overflow-x-auto flex-1 bg-slate-900/50'>
                  {aiModels.map((model, idx) => (
                    <div 
                      key={idx} 
                      className='flex-1 min-w-[280px] p-5 border-r border-white/10 last:border-r-0 overflow-y-auto bg-slate-900/30'
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
            ) : (
              /* 图片布局 */
              <>
                <motion.div
                  className='absolute inset-0'
                  style={{ scale: imageScale }}
                >
                  <img 
                    src={url} 
                    alt={title} 
                    className='object-cover w-full h-full' 
                  />
                  {/* 图片渐变遮罩 */}
                  <div 
                    className='absolute inset-0'
                    style={{
                      background: `linear-gradient(to left, ${color}20 0%, transparent 30%)`,
                    }}
                  />
                </motion.div>

                {/* 装饰性光效 */}
                <div 
                  className='absolute top-0 right-0 w-64 h-64 opacity-30 blur-3xl'
                  style={{ backgroundColor: color }}
                />
              </>
            )}
          </div>
        </div>

        {/* 边框光效 */}
        <div 
          className='absolute inset-0 rounded-2xl pointer-events-none'
          style={{
            boxShadow: `inset 0 0 0 1px ${color}30, 0 0 40px ${color}20`,
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
