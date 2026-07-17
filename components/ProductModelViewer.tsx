"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type ProductModelViewerProps = {
  model: string;
  productName: string;
};

function ProductModel({ model }: Pick<ProductModelViewerProps, "model">) {
  const { scene } = useGLTF(model);
  const modelScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    modelScene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
    });
  }, [modelScene]);

  return <primitive object={modelScene} position={[0, -0.15, 0]} rotation={[-0.04, -0.52, 0]} />;
}

export function ProductModelViewer({ model, productName }: ProductModelViewerProps) {
  return (
    <div className="product-model-viewer" aria-label={`${productName} 三维模型，可拖动旋转并缩放`}>
      <Canvas
        shadows
        camera={{ fov: 30, position: [5.8, 3.2, 7.4] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#f5f5f7"]} />
        <hemisphereLight args={["#ffffff", "#69707a", 2]} />
        <directionalLight castShadow intensity={3.1} position={[4, 7, 5]} shadow-mapSize={[1024, 1024]} />
        <directionalLight intensity={1.35} position={[-5, 2, -4]} />
        <Suspense fallback={null}>
          <ProductModel model={model} />
          <Environment resolution={128}>
            <Lightformer intensity={2.4} position={[0, 5, -4]} scale={[8, 4, 1]} />
            <Lightformer intensity={1.8} position={[5, 1, 2]} rotation-y={Math.PI / 2} scale={[5, 3, 1]} />
            <Lightformer intensity={1.2} position={[-5, 0, 1]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
          </Environment>
          <ContactShadows position={[0, -1.08, 0]} opacity={0.38} scale={7} blur={2.5} far={3.5} />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={5.1}
          maxDistance={10.5}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.75}
          rotateSpeed={0.52}
          zoomSpeed={0.68}
        />
      </Canvas>
    </div>
  );
}
