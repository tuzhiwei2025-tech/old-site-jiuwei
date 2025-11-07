"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";

interface ImgSphereProps {
  imageUrl: string;
  radius?: number;
  speed?: number;
  className?: string;
}

function Sphere({ imageUrl, radius = 1, speed = 0.5 }: { imageUrl: string; radius: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.error("Failed to load texture:", err);
        setError(true);
      }
    );
  }, [imageUrl]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  if (error || !texture) {
    return null;
  }

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function SphereCanvas({ imageUrl, radius = 1, speed = 0.5 }: ImgSphereProps) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Sphere imageUrl={imageUrl} radius={radius} speed={speed} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={speed} />
      </Suspense>
    </Canvas>
  );
}

// 动态导入以避免SSR问题
const CanvasComponent = dynamic(() => Promise.resolve(SphereCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
      <div className="w-8 h-8 border-4 border-[#4932cc] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function ImgSphere({ imageUrl, radius = 1, speed = 0.5, className = "" }: ImgSphereProps) {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 预检查图片是否可以加载（仅在客户端）
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onerror = () => {
        setHasError(true);
      };
      img.onload = () => {
        setHasError(false);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  // 服务端渲染时显示占位符
  if (!mounted) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center bg-gradient-to-br from-[#4932cc]/10 to-[#6b4ce6]/10 rounded-full`}>
        <div className="w-8 h-8 border-4 border-[#4932cc] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 如果图片加载失败，显示fallback
  if (hasError) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center bg-gradient-to-br from-[#4932cc]/10 to-[#6b4ce6]/10 rounded-full overflow-hidden`}>
        <img
          src={imageUrl}
          alt="Avatar"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            setHasError(true);
            // 如果图片仍然加载失败，显示占位符
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className} relative`}>
      <CanvasComponent imageUrl={imageUrl} radius={radius} speed={speed} />
    </div>
  );
}

