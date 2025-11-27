"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  logo: string;
  href?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  title?: string;
  className?: string;
}

export function LogoCloud({ logos, title, className }: LogoCloudProps) {
  return (
    <div className={cn("py-16 bg-gradient-to-b from-[#EEF2FF] to-white", className)}>
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">我们与这些优秀的企业合作</p>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center justify-center p-4 bg-white rounded-xl border border-[#E0E7FF] hover:border-[#7C86FF] hover:shadow-lg transition-all duration-300"
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </a>
              ) : (
                <div className="w-full h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
