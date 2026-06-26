'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'GoAgent如何从AI工具升级为数字员工？',
            answer: 'GoAgent依托统一编排引擎，让多个数字员工像真实团队一样协同完成复杂业务链条，从单点工具跃升为数字员工团队。',
        },
        {
            id: 'item-2',
            question: 'Skills Hub能带来什么能力？',
            answer: 'Skills Hub通过Function Call调用采集处理、文档解析、提示词优化、知识库检索、代码转Office和ECharts制表等技能。',
        },
        {
            id: 'item-3',
            question: 'GoData向量知识库解决什么问题？',
            answer: 'GoData作为模型的长期记忆与专业大脑，支持稠密向量检索、稀疏词项匹配和多向量交互，知识更新从天级缩短至分钟级。',
        },
        {
            id: 'item-4',
            question: 'Prompt Genius适合普通用户吗？',
            answer: '适合。它能自动识别潜在意图、补全任务细节，无需用户掌握Prompt工程知识，并通过本地推理降低敏感信息外流风险。',
        },
        {
            id: 'item-5',
            question: 'Memory OS为什么重要？',
            answer: 'Memory OS让Agent在复杂任务中保持方向感，通过短期、中期、长期和跨会话记忆，让工作伙伴懂延续、会成长。',
        },
    ]

    return (
        <section className="py-16 bg-muted md:py-24">
            <div className="px-4 mx-auto max-w-5xl md:px-6">
                <div>
                    <h2 className="text-4xl font-semibold text-foreground">常见问题</h2>
                    <p className="mt-4 text-lg text-muted-foreground text-balance">围绕GoAgent的数字员工、技能仓库、知识库、提示词优化和记忆系统快速了解核心能力。</p>
                </div>

                <div className="mt-12">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-foreground/5 rounded-(--radius) w-full border border-transparent px-8 py-3 shadow ring-1">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dotted">
                                <AccordionTrigger className="text-base text-black cursor-pointer hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-gray-600">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="mt-6 text-muted-foreground">
                        想进一步了解企业落地方案？联系
                        <Link
                            href="#"
                            className="font-medium text-primary hover:underline">
                            GoAgent团队
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
