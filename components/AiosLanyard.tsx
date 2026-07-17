"use client";

import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./HomepageExperience.module.css";

const CARD_MODEL = "/homepage-experience/assets/lanyard/card.glb";
const LANYARD_TEXTURE = "/homepage-experience/assets/lanyard/lanyard.png";
const FRONT_CARD = "/homepage-experience/assets/lanyard/wang-front.svg";

type CardModel = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

function LanyardBand() {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const jointOne = useRef<RapierRigidBody>(null!);
  const jointTwo = useRef<RapierRigidBody>(null!);
  const jointThree = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  const { nodes, materials } = useGLTF(CARD_MODEL) as unknown as CardModel;
  const strapTexture = useTexture(LANYARD_TEXTURE);
  const frontTexture = useTexture(FRONT_CARD);
  const configuredStrapTexture = useMemo(() => {
    const texture = strapTexture.clone();
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [strapTexture]);

  const baseMap = materials.base?.map;
  const cardMap = useMemo(() => {
    if (!baseMap || !frontTexture.image) return baseMap;

    const baseImage = baseMap.image as HTMLImageElement | HTMLCanvasElement | undefined;
    const frontImage = frontTexture.image as HTMLImageElement | HTMLCanvasElement | undefined;
    if (!baseImage || !frontImage || !baseImage.width || !baseImage.height) return baseMap;

    const canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    const context = canvas.getContext("2d");
    if (!context) return baseMap;

    context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    const target = { x: 0, y: 0, width: canvas.width * 0.5, height: canvas.height * 0.755 };
    const scale = Math.max(target.width / frontImage.width, target.height / frontImage.height);
    const width = frontImage.width * scale;
    const height = frontImage.height * scale;
    context.save();
    context.beginPath();
    context.rect(target.x, target.y, target.width, target.height);
    context.clip();
    context.drawImage(frontImage, target.x + (target.width - width) / 2, target.y + (target.height - height) / 2, width, height);
    context.restore();

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [baseMap, frontTexture]);

  const lineGeometry = useMemo(() => new MeshLineGeometry(), []);
  const lineMaterial = useMemo(() => {
    const material = new MeshLineMaterial({
        color: new THREE.Color("white"),
        lineWidth: 1,
        map: configuredStrapTexture,
        repeat: new THREE.Vector2(-4, 1),
        resolution: new THREE.Vector2(1000, 1000),
        useMap: 1,
      });
    material.depthTest = false;
    material.transparent = true;
    return material;
  }, [configuredStrapTexture]);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  );
  const point = useMemo(() => new THREE.Vector3(), []);
  const angle = useMemo(() => new THREE.Vector3(), []);
  const rotation = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);

  useRopeJoint(fixed, jointOne, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(jointOne, jointTwo, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(jointTwo, jointThree, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(jointThree, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    return () => {
      lineGeometry.dispose();
      lineMaterial.dispose();
      configuredStrapTexture.dispose();
      if (cardMap !== baseMap) cardMap?.dispose();
    };
  }, [baseMap, cardMap, configuredStrapTexture, lineGeometry, lineMaterial]);

  useEffect(() => {
    if (!hovered) return;
    const cursor = dragged ? "grabbing" : "grab";
    document.body.style.cursor = cursor;
    return () => {
      document.body.style.cursor = "";
    };
  }, [dragged, hovered]);

  useFrame((state, delta) => {
    const cardBody = card.current;
    const fixedBody = fixed.current;
    const one = jointOne.current;
    const two = jointTwo.current;
    const three = jointThree.current;
    if (!cardBody || !fixedBody || !one || !two || !three) return;

    if (dragged) {
      point.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      direction.copy(point).sub(state.camera.position).normalize();
      point.add(direction.multiplyScalar(state.camera.position.length()));
      const viewport = state.viewport.getCurrentViewport(state.camera, point);
      // Keep the physical card inside the Canvas when it is dragged to an edge.
      const horizontalLimit = Math.max(1.2, viewport.width / 2 - 1.35);
      const verticalLimit = Math.max(1.6, viewport.height / 2 - 1.65);
      point.x = THREE.MathUtils.clamp(point.x - dragged.x, -horizontalLimit, horizontalLimit) + dragged.x;
      point.y = THREE.MathUtils.clamp(point.y - dragged.y, -verticalLimit, verticalLimit) + dragged.y;
      [cardBody, one, two, three, fixedBody].forEach((body) => body.wakeUp());
      cardBody.setNextKinematicTranslation({ x: point.x - dragged.x, y: point.y - dragged.y, z: point.z - dragged.z });
    }

    [one, two].forEach((body) => {
      const bodyWithLerp = body as RapierRigidBody & { lerped?: THREE.Vector3 };
      if (!bodyWithLerp.lerped) bodyWithLerp.lerped = new THREE.Vector3().copy(body.translation());
      const distance = Math.max(0.1, Math.min(1, bodyWithLerp.lerped.distanceTo(body.translation())));
      bodyWithLerp.lerped.lerp(body.translation(), delta * distance * 50);
    });

    const first = one as RapierRigidBody & { lerped: THREE.Vector3 };
    const second = two as RapierRigidBody & { lerped: THREE.Vector3 };
    curve.points[0].copy(three.translation());
    curve.points[1].copy(second.lerped);
    curve.points[2].copy(first.lerped);
    curve.points[3].copy(fixedBody.translation());
    lineGeometry.setPoints(curve.getPoints(20));

    angle.copy(cardBody.angvel());
    rotation.copy(cardBody.rotation());
    cardBody.setAngvel({ x: angle.x, y: angle.y - rotation.y * 0.25, z: angle.z }, true);
  });

  const beginDrag = (event: ThreeEvent<PointerEvent>) => {
    const cardBody = card.current;
    if (!cardBody) return;
    event.stopPropagation();
    (event.target as unknown as { setPointerCapture?: (pointerId: number) => void } | null)?.setPointerCapture?.(event.pointerId);
    setDragged(new THREE.Vector3().copy(event.point).sub(point.copy(cardBody.translation())));
  };

  const endDrag = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target as unknown as { releasePointerCapture?: (pointerId: number) => void } | null)?.releasePointerCapture?.(event.pointerId);
    setDragged(false);
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody type="fixed" colliders={false} ref={fixed} />
        <RigidBody colliders={false} angularDamping={4} linearDamping={4} position={[0.5, 0, 0]} ref={jointOne}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody colliders={false} angularDamping={4} linearDamping={4} position={[1, 0, 0]} ref={jointTwo}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody colliders={false} angularDamping={4} linearDamping={4} position={[1.5, 0, 0]} ref={jointThree}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody colliders={false} angularDamping={4} linearDamping={4} position={[2, 0, 0]} ref={card} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            position={[0, -1.2, -0.05]}
            scale={2.25}
            onPointerDown={beginDrag}
            onPointerOut={() => setHovered(false)}
            onPointerOver={() => setHovered(true)}
            onPointerUp={endDrag}
          >
            <mesh geometry={nodes.card?.geometry}>
              <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0.15} map={cardMap ?? undefined} metalness={0.8} roughness={0.9} />
            </mesh>
            <mesh geometry={nodes.clip?.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp?.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}

export function AiosLanyard() {
  return (
    <div className={styles.lanyardCanvas}>
      <Canvas
        camera={{ fov: 20, position: [0, 0, 24] }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -40, 0]} timeStep={1 / 50}>
            <LanyardBand />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer color="white" intensity={2} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer color="white" intensity={3} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer color="white" intensity={3} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer color="white" intensity={10} position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(CARD_MODEL);
