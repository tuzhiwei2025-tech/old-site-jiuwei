"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  title: string;
  links: Array<{ label: string; href: string }>;
}

interface FooterTapedProps {
  links: FooterLink[];
  className?: string;
}

export function FooterTaped({ links, className }: FooterTapedProps) {
  return (
    <footer className={cn("relative bg-[#EEF2FF] border-t border-[#E0E7FF]", className)}>
      {/* Taped effect */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#C6D2FF]/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {links.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-[#6A7282] uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#7C86FF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-[#E0E7FF]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} GoAgent. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#7C86FF] transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-[#7C86FF] transition-colors">
                服务条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

