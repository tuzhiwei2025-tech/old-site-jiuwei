"use client";

import { useRef } from "react";
import { LogoCloud } from "@/components/ui/logo-cloud-4";

// 使用文本logo，因为图片可能不存在
const partners = [
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='20' font-weight='bold' fill='%23333'%3EVOLVO%3C/text%3E%3C/svg%3E", alt: "VOLVO" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='20' font-weight='bold' fill='%23333'%3EYum!%3C/text%3E%3C/svg%3E", alt: "Yum!" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='20' font-weight='bold' fill='%23333'%3ERICOH%3C/text%3E%3C/svg%3E", alt: "RICOH" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='16' font-weight='bold' fill='%23333'%3EThermo Fisher%3C/text%3E%3C/svg%3E", alt: "Thermo Fisher SCIENTIFIC" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='20' font-weight='bold' fill='%23333'%3EANKER%3C/text%3E%3C/svg%3E", alt: "ANKER" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext x='10' y='25' font-family='Arial' font-size='20' font-weight='bold' fill='%23333'%3E価格.com%3C/text%3E%3C/svg%3E", alt: "価格.com" },
];

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            信任我们的企业客户
          </p>
        </div>
        <LogoCloud logos={partners} />
      </div>
    </section>
  );
}
