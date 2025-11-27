"use client";

import { useCallback, useEffect, useRef, useMemo } from "react";
import ReactFlow, {
  Background,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  MarkerType,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { Zap, Users, CheckCircle2, Share2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { getAllAgents } from "@/lib/agentData";
import { Agent } from "@/types/agent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 新配色方案 - 更现代专业
const colors = {
  parallel: {
    primary: "#6366F1", // 靛蓝色 - 社交媒体/创意
    secondary: "#818CF8",
    light: "#EEF2FF",
    gradient: "from-indigo-50 to-purple-50",
  },
  serial: {
    primary: "#0EA5E9", // 天蓝色 - 商务/专业
    secondary: "#38BDF8",
    light: "#E0F2FE",
    gradient: "from-sky-50 to-blue-50",
  },
};

// 任务场景配置
const taskScenarios = {
  parallel: {
    title: "社交媒体内容发布",
    task: "为新产品发布准备多平台营销内容",
  },
  serial: {
    title: "季度报告制作流程",
    task: "制作2025年Q1季度业务分析报告",
  },
};

// 自定义节点数据类型
interface CustomNodeData {
  agent: Agent;
  color: {
    primary: string;
    secondary: string;
    light: string;
    gradient: string;
  };
}

// 创建自定义节点组件
const CustomNode = ({ data, selected }: { data: CustomNodeData; selected: boolean }) => {
  const { agent, color } = data;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-xl border-2 transition-all duration-300 ${
        selected
          ? "border-opacity-100 shadow-xl scale-105"
          : "border-opacity-70 hover:border-opacity-100 hover:shadow-lg"
      }`}
      style={{
        background: "white",
        borderColor: color.primary,
        minWidth: "180px",
      }}
    >
      {/* 顶部 Handle - 用于接收连接 */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: color.primary,
          width: 12,
          height: 12,
          border: `2px solid white`,
        }}
      />
      
      <div className="p-4">
        {/* Avatar */}
        <div className="flex gap-3 items-center mb-3">
          <div
            className="overflow-hidden w-12 h-12 rounded-full border-2 shadow-sm shrink-0"
            style={{ borderColor: color.primary }}
          >
            {agent.avatar ? (
              <img
                src={agent.avatar}
                alt={agent.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className="flex justify-center items-center w-full h-full text-lg font-bold text-white"
                style={{ backgroundColor: color.primary }}
              >
                {agent.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {agent.name}
            </h4>
            <p className="text-xs text-gray-600 truncate">{agent.title}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm"
          style={{
            backgroundColor: `${color.light}`,
            color: color.primary,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: color.primary }}
          />
          工作中
        </div>
      </div>
      
      {/* 底部 Handle - 用于发送连接 */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: color.primary,
          width: 12,
          height: 12,
          border: `2px solid white`,
        }}
      />
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function TeamWorkflowAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRevealRef = useRef<VerticalCutRevealRef>(null);
  const descRevealRef = useRef<VerticalCutRevealRef>(null);
  const agents = getAllAgents();

  // 硬编码获取用于展示的角色
  const newsReporter = agents.find((a) => a.code === "news_reporter");
  const wechatWriter = agents.find((a) => a.code === "wechat_writer");
  const weiboWriter = agents.find((a) => a.code === "weibo_writer");
  const xiaohongshuWriter = agents.find((a) => a.code === "xiaohongshu_writer");
  const excelGenerator = agents.find((a) => a.code === "excel_generator");
  const reportGenerator = agents.find((a) => a.code === "report_generator");
  const presentationGenerator = agents.find((a) => a.code === "presentation_generator");

  // 并行任务流程节点 - 全部硬编码
  const parallelNodes: Node[] = useMemo(() => {
    const spacing = 350; // 水平间距
    const startX = 600 - ((4 - 1) * spacing) / 2;

    const nodes: Node[] = [
      // 任务开始节点
      {
        id: "parallel-start",
        type: "input",
        position: { x: 600, y: 0 },
        data: {
          label: (
            <div className="flex flex-col gap-2 items-center p-3">
              <div
                className="flex justify-center items-center w-12 h-12 rounded-full shadow-lg"
                style={{ backgroundColor: colors.parallel.primary }}
              >
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">任务开始</span>
            </div>
          ),
        },
        style: {
          background: "white",
          border: `2px solid ${colors.parallel.primary}`,
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      },
      // 节点1: news_reporter
      {
        id: "parallel-news_reporter",
        type: "custom",
        position: { x: startX + 0 * spacing, y: 200 },
        data: {
          agent: newsReporter,
          color: colors.parallel,
        },
        style: {
          background: "white",
        },
      },
      // 节点2: wechat_writer
      {
        id: "parallel-wechat_writer",
        type: "custom",
        position: { x: startX + 1 * spacing, y: 200 },
        data: {
          agent: wechatWriter,
          color: colors.parallel,
        },
        style: {
          background: "white",
        },
      },
      // 节点3: weibo_writer
      {
        id: "parallel-weibo_writer",
        type: "custom",
        position: { x: startX + 2 * spacing, y: 200 },
        data: {
          agent: weiboWriter,
          color: colors.parallel,
        },
        style: {
          background: "white",
        },
      },
      // 节点4: xiaohongshu_writer
      {
        id: "parallel-xiaohongshu_writer",
        type: "custom",
        position: { x: startX + 3 * spacing, y: 200 },
        data: {
          agent: xiaohongshuWriter,
          color: colors.parallel,
        },
        style: {
          background: "white",
        },
      },
      // 协同整合节点
      {
        id: "parallel-collaborate",
        position: { x: 600, y: 400 },
        data: {
          label: (
            <div className="flex flex-col gap-2 items-center p-3">
              <div
                className="flex justify-center items-center w-12 h-12 rounded-full shadow-lg"
                style={{ backgroundColor: colors.parallel.secondary }}
              >
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">协同整合</span>
            </div>
          ),
        },
        style: {
          background: "white",
          border: `2px solid ${colors.parallel.secondary}`,
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      },
      // 任务完成节点
      {
        id: "parallel-end",
        type: "output",
        position: { x: 600, y: 640 },
        data: {
          label: (
            <div className="flex flex-col gap-2 items-center p-3">
              <div
                className="flex justify-center items-center w-12 h-12 rounded-full shadow-lg"
                style={{ backgroundColor: colors.parallel.primary }}
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">任务完成</span>
            </div>
          ),
        },
        style: {
          background: "white",
          border: `2px solid ${colors.parallel.primary}`,
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      },
    ];

    return nodes;
  }, [newsReporter, wechatWriter, weiboWriter, xiaohongshuWriter]);

  // 并行任务流程边 - 全部硬编码
  const parallelEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [
      // 从开始到节点1: news_reporter
      {
        id: "e-parallel-start-news_reporter",
        source: "parallel-start",
        target: "parallel-news_reporter",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.primary,
          width: 20,
          height: 20,
        },
      },
      // 从开始到节点2: wechat_writer
      {
        id: "e-parallel-start-wechat_writer",
        source: "parallel-start",
        target: "parallel-wechat_writer",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.primary,
          width: 20,
          height: 20,
        },
      },
      // 从开始到节点3: weibo_writer
      {
        id: "e-parallel-start-weibo_writer",
        source: "parallel-start",
        target: "parallel-weibo_writer",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.primary,
          width: 20,
          height: 20,
        },
      },
      // 从开始到节点4: xiaohongshu_writer
      {
        id: "e-parallel-start-xiaohongshu_writer",
        source: "parallel-start",
        target: "parallel-xiaohongshu_writer",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.primary,
          width: 20,
          height: 20,
        },
      },
      // 从节点1到协同节点
      {
        id: "e-parallel-news_reporter-collaborate",
        source: "parallel-news_reporter",
        target: "parallel-collaborate",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.secondary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.secondary,
          width: 20,
          height: 20,
        },
      },
      // 从节点2到协同节点
      {
        id: "e-parallel-wechat_writer-collaborate",
        source: "parallel-wechat_writer",
        target: "parallel-collaborate",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.secondary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.secondary,
          width: 20,
          height: 20,
        },
      },
      // 从节点3到协同节点
      {
        id: "e-parallel-weibo_writer-collaborate",
        source: "parallel-weibo_writer",
        target: "parallel-collaborate",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.secondary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.secondary,
          width: 20,
          height: 20,
        },
      },
      // 从节点4到协同节点
      {
        id: "e-parallel-xiaohongshu_writer-collaborate",
        source: "parallel-xiaohongshu_writer",
        target: "parallel-collaborate",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.secondary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.secondary,
          width: 20,
          height: 20,
        },
      },
      // 从协同节点到结束
      {
        id: "e-parallel-collaborate-end",
        source: "parallel-collaborate",
        target: "parallel-end",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.parallel.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.parallel.primary,
          width: 20,
          height: 20,
        },
      },
    ];

    return edges;
  }, []);

  // 串行任务流程节点 - 全部硬编码
  const serialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [
      // 任务开始节点
      {
        id: "serial-start",
        type: "input",
        position: { x: 400, y: 0 },
        data: {
          label: (
            <div className="flex flex-col gap-2 items-center p-3">
              <div
                className="flex justify-center items-center w-12 h-12 rounded-full shadow-lg"
                style={{ backgroundColor: colors.serial.primary }}
              >
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">任务开始</span>
            </div>
          ),
        },
        style: {
          background: "white",
          border: `2px solid ${colors.serial.primary}`,
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      },
      // 节点1: report_generator
      {
        id: "serial-report_generator",
        type: "custom",
        position: { x: 400, y: 180 },
        data: {
          agent: reportGenerator,
          color: colors.serial,
        },
        style: {
          background: "white",
        },
      },
      // 节点2: excel_generator
      {
        id: "serial-excel_generator",
        type: "custom",
        position: { x: 400, y: 330 },
        data: {
          agent: excelGenerator,
          color: colors.serial,
        },
        style: {
          background: "white",
        },
      },
      // 节点3: presentation_generator
      {
        id: "serial-presentation_generator",
        type: "custom",
        position: { x: 400, y: 500 },
        data: {
          agent: presentationGenerator,
          color: colors.serial,
        },
        style: {
          background: "white",
        },
      },
      // 任务完成节点
      {
        id: "serial-end",
        type: "output",
        position: { x: 400, y: 720 },
        data: {
          label: (
            <div className="flex flex-col gap-2 items-center p-3">
              <div
                className="flex justify-center items-center w-12 h-12 rounded-full shadow-lg"
                style={{ backgroundColor: colors.serial.primary }}
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">任务完成</span>
            </div>
          ),
        },
        style: {
          background: "white",
          border: `2px solid ${colors.serial.primary}`,
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      },
    ];

    return nodes;
  }, [reportGenerator, excelGenerator, presentationGenerator]);

  // 串行任务流程边 - 全部硬编码
  const serialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [
      // 从开始到节点1: report_generator
      {
        id: "e-serial-start-report_generator",
        source: "serial-start",
        target: "serial-report_generator",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.serial.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.serial.primary,
          width: 20,
          height: 20,
        },
      },
      // 从节点1到节点2: report_generator → excel_generator
      {
        id: "e-serial-report_generator-excel_generator",
        source: "serial-report_generator",
        target: "serial-excel_generator",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.serial.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.serial.primary,
          width: 20,
          height: 20,
        },
      },
      // 从节点2到节点3: excel_generator → presentation_generator
      {
        id: "e-serial-excel_generator-presentation_generator",
        source: "serial-excel_generator",
        target: "serial-presentation_generator",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.serial.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.serial.primary,
          width: 20,
          height: 20,
        },
      },
      // 从节点3到结束: presentation_generator → serial-end
      {
        id: "e-serial-presentation_generator-end",
        source: "serial-presentation_generator",
        target: "serial-end",
        type: "smoothstep",
        animated: true,
        style: { 
          stroke: colors.serial.primary, 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.serial.primary,
          width: 20,
          height: 20,
        },
      },
    ];

    return edges;
  }, []);

  const [parallelNodesState, setParallelNodes, onParallelNodesChange] = useNodesState([]);
  const [parallelEdgesState, setParallelEdges, onParallelEdgesChange] = useEdgesState([]);

  const [serialNodesState, setSerialNodes, onSerialNodesChange] = useNodesState([]);
  const [serialEdgesState, setSerialEdges, onSerialEdgesChange] = useEdgesState([]);

  const onParallelConnect = useCallback(
    (params: Connection) => setParallelEdges((eds) => addEdge(params, eds)),
    [setParallelEdges]
  );

  const onSerialConnect = useCallback(
    (params: Connection) => setSerialEdges((eds) => addEdge(params, eds)),
    [setSerialEdges]
  );

  // 确保 nodes 和 edges 同步更新
  useEffect(() => {
    if (parallelNodes.length > 0) {
      setParallelNodes(parallelNodes);
    }
  }, [parallelNodes, setParallelNodes]);

  useEffect(() => {
    if (parallelEdges.length > 0) {
      setParallelEdges(parallelEdges);
    }
  }, [parallelEdges, setParallelEdges]);

  useEffect(() => {
    if (serialNodes.length > 0) {
      setSerialNodes(serialNodes);
    }
  }, [serialNodes, setSerialNodes]);

  useEffect(() => {
    if (serialEdges.length > 0) {
      setSerialEdges(serialEdges);
    }
  }, [serialEdges, setSerialEdges]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          titleRevealRef.current?.startAnimation();
          setTimeout(() => descRevealRef.current?.startAnimation(), 300);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden relative py-24 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <VerticalCutReveal
              ref={titleRevealRef}
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              autoStart={false}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
              }}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              智能团队协作
            </VerticalCutReveal>
            <br />
            <span className="bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#0EA5E9] bg-clip-text text-transparent">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.12}
                staggerFrom="first"
                autoStart={false}
                transition={{
                  type: "spring",
                  stiffness: 190,
                  damping: 22,
                }}
                containerClassName="inline-block"
                wordLevelClassName="inline-block"
              >
                流程化协同，效率倍增
              </VerticalCutReveal>
            </span>
          </h2>
          <div className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
            <VerticalCutReveal
              ref={descRevealRef}
              splitBy="words"
              staggerDuration={0.08}
              staggerFrom="first"
              autoStart={false}
              transition={{
                type: "spring",
                stiffness: 190,
                damping: 22,
              }}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              多个数字员工各司其职，通过智能工作流自动协同，从任务分配到结果整合，全程自动化，让团队协作变得前所未有的高效
            </VerticalCutReveal>
          </div>
        </div>

        {/* 两个流程图并排展示 */}
        <div className="grid grid-cols-1 gap-8 mb-16 w-full lg:grid-cols-2">
          {/* 并行任务流程 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden bg-white rounded-2xl border-2 shadow-xl"
            style={{ borderColor: colors.parallel.light }}
          >
            {/* 任务标题区域 */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
              <div className="flex gap-3 items-center">
                <div
                  className="flex justify-center items-center w-10 h-10 rounded-xl shadow-md shrink-0"
                  style={{ backgroundColor: colors.parallel.primary }}
                >
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 truncate">
                    {taskScenarios.parallel.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {taskScenarios.parallel.task}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="h-[600px] w-full">
              <ReactFlow
                nodes={parallelNodesState}
                edges={parallelEdgesState}
                onNodesChange={onParallelNodesChange}
                onEdgesChange={onParallelEdgesChange}
                onConnect={onParallelConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50"
                defaultEdgeOptions={{
                  animated: true,
                  type: "smoothstep",
                  style: { 
                    strokeWidth: 3,
                    stroke: colors.parallel.primary,
                  },
                }}
                connectionLineStyle={{ 
                  strokeWidth: 3,
                  stroke: colors.parallel.primary,
                }}
                edgesUpdatable={false}
                edgesFocusable={true}
                proOptions={{ hideAttribution: true }}
                snapToGrid={false}
                snapGrid={[15, 15]}
                deleteKeyCode={null}
                multiSelectionKeyCode={null}
              >
                <Background color="#C7D2FE" gap={20} size={1} style={{ opacity: 0.3 }} />
              </ReactFlow>
            </div>
          </motion.div>

          {/* 串行任务流程 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden bg-white rounded-2xl border-2 shadow-xl"
            style={{ borderColor: colors.serial.light }}
          >
            {/* 任务标题区域 */}
            <div className="px-6 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border-b">
              <div className="flex gap-3 items-center">
                <div
                  className="flex justify-center items-center w-10 h-10 rounded-xl shadow-md shrink-0"
                  style={{ backgroundColor: colors.serial.primary }}
                >
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 truncate">
                    {taskScenarios.serial.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {taskScenarios.serial.task}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="h-[600px] w-full">
              <ReactFlow
                nodes={serialNodesState}
                edges={serialEdgesState}
                onNodesChange={onSerialNodesChange}
                onEdgesChange={onSerialEdgesChange}
                onConnect={onSerialConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50"
                defaultEdgeOptions={{
                  animated: true,
                  type: "smoothstep",
                  style: { 
                    strokeWidth: 3,
                    stroke: colors.serial.primary,
                  },
                }}
                connectionLineStyle={{ 
                  strokeWidth: 3,
                  stroke: colors.serial.primary,
                }}
                edgesUpdatable={false}
                edgesFocusable={true}
                proOptions={{ hideAttribution: true }}
                snapToGrid={false}
                snapGrid={[15, 15]}
              >
                <Background color="#BAE6FD" gap={20} size={1} style={{ opacity: 0.3 }} />
              </ReactFlow>
            </div>
          </motion.div>
        </div>

        {/* 特性说明 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "智能分配",
              description: "根据任务特性自动分配给最合适的数字员工，确保高效执行",
              color: colors.parallel.primary,
            },
            {
              icon: Users,
              title: "灵活协作",
              description: "支持并行和串行两种工作模式，适应不同业务场景需求",
              color: colors.serial.primary,
            },
            {
              icon: CheckCircle2,
              title: "自动整合",
              description: "智能整合各员工的工作成果，生成完整、高质量的输出",
              color: "#8B5CF6",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 text-center rounded-xl border-2 backdrop-blur-sm transition-all duration-300 bg-white/80 hover:shadow-lg"
                style={{ borderColor: feature.color + "30" }}
              >
                <div
                  className="flex justify-center items-center mx-auto mb-4 w-12 h-12 rounded-xl shadow-md"
                  style={{ backgroundColor: feature.color }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
