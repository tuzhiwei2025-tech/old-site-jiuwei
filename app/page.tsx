"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white">正在跳转...</div>
    </div>
  );
}

