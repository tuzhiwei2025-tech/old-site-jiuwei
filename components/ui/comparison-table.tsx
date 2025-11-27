"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonFeature {
  feature: string;
  description: string;
  icon: LucideIcon;
  ourProduct: boolean | string;
  chatgpt: boolean | string;
  otherAI: boolean | string;
}

interface ComparisonTableProps {
  features: ComparisonFeature[];
}

const renderCell = (value: boolean | string) => {
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <Check className="w-5 h-5 text-green-500" />
      </div>
    );
  } else if (value === false) {
    return (
      <div className="flex items-center justify-center">
        <X className="w-5 h-5 text-gray-300" />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500">{value}</span>
      </div>
    );
  }
};

export function ComparisonTable({ features }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#4932cc] to-[#6b4ce6]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white">
                  功能特性
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-white">
                  <div className="flex flex-col items-center gap-1">
                    <span>我们的产品</span>
                    <span className="text-xs font-normal opacity-90">专业数字员工</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-white">
                  <div className="flex flex-col items-center gap-1">
                    <span>ChatGPT</span>
                    <span className="text-xs font-normal opacity-90">通用AI助手</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-white">
                  <div className="flex flex-col items-center gap-1">
                    <span>其他AI工具</span>
                    <span className="text-xs font-normal opacity-90">通用解决方案</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[#4932cc] to-[#6b4ce6]">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {item.feature}
                          </div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderCell(item.ourProduct)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderCell(item.chatgpt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderCell(item.otherAI)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

