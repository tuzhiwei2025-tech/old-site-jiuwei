import fs from "node:fs/promises";
import path from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const outputDirectory = path.resolve("public/product-assets/models");

class NodeFileReader {
  result = null;
  onloadend = null;

  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onloadend?.();
    });
  }

  readAsDataURL(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = `data:${blob.type || "application/octet-stream"};base64,${Buffer.from(buffer).toString("base64")}`;
      this.onloadend?.();
    });
  }
}

globalThis.FileReader ??= NodeFileReader;

const materials = {
  chassis: new THREE.MeshPhysicalMaterial({ color: 0xb4a78d, metalness: 0.78, roughness: 0.38, clearcoat: 0.16 }),
  darkMetal: new THREE.MeshStandardMaterial({ color: 0x262627, metalness: 0.8, roughness: 0.31 }),
  trim: new THREE.MeshStandardMaterial({ color: 0xcfc1a2, metalness: 0.82, roughness: 0.3 }),
  grille: new THREE.MeshStandardMaterial({ color: 0x8d8068, metalness: 0.45, roughness: 0.58 }),
  vent: new THREE.MeshStandardMaterial({ color: 0x302e29, metalness: 0.55, roughness: 0.5 }),
  indicator: new THREE.MeshStandardMaterial({ color: 0xa8ffbc, emissive: 0x1da94e, emissiveIntensity: 1.25, metalness: 0.1, roughness: 0.38 }),
  port: new THREE.MeshStandardMaterial({ color: 0x111214, metalness: 0.58, roughness: 0.42 }),
};

function roundedBox(width, height, depth, radius, material, name) {
  const geometry = new RoundedBoxGeometry(width, height, depth, 1, radius);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  return mesh;
}

function box(width, height, depth, material, name) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  mesh.name = name;
  return mesh;
}

function addFrontFace(group, width, height, depth, label) {
  const frontZ = depth / 2 + 0.014;
  const grille = roundedBox(width * 0.73, height * 0.62, 0.025, 0.025, materials.grille, `${label}_FrontGrille`);
  grille.position.set(0, 0, frontZ);
  group.add(grille);

  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 34; column += 1) {
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.012, 6), materials.vent);
      hole.name = `${label}_GrilleHole_${row}_${column}`;
      hole.position.set((column - 16.5) * width * 0.0205, (row - 2) * height * 0.105, frontZ + 0.019);
      group.add(hole);
    }
  }

  const led = new THREE.Mesh(new THREE.SphereGeometry(height * 0.075, 16, 12), materials.indicator);
  led.name = `${label}_StatusLED`;
  led.position.set(-width * 0.43, height * 0.12, frontZ + 0.05);
  group.add(led);

  for (const [index, x] of [-width * 0.41, width * 0.41].entries()) {
    const handle = roundedBox(width * 0.075, height * 0.54, 0.065, 0.035, materials.trim, `${label}_FrontHandle_${index + 1}`);
    handle.position.set(x, 0, frontZ + 0.025);
    group.add(handle);
    const inset = roundedBox(width * 0.026, height * 0.34, 0.015, 0.012, materials.vent, `${label}_HandleInset_${index + 1}`);
    inset.position.set(x, 0, frontZ + 0.064);
    group.add(inset);
  }
}

function addRearFace(group, width, height, depth, label) {
  const rearZ = -depth / 2 - 0.016;
  const panel = roundedBox(width * 0.84, height * 0.52, 0.025, 0.025, materials.darkMetal, `${label}_RearPanel`);
  panel.position.set(-width * 0.02, 0, rearZ);
  group.add(panel);

  const portSizes = [[0.13, 0.09], [0.13, 0.09], [0.15, 0.11], [0.22, 0.1], [0.18, 0.08]];
  let x = -width * 0.33;
  portSizes.forEach(([portWidth, portHeight], index) => {
    const port = roundedBox(portWidth, portHeight, 0.03, 0.012, materials.port, `${label}_Port_${index + 1}`);
    port.position.set(x, 0.03, rearZ - 0.018);
    group.add(port);
    x += portWidth + width * 0.035;
  });

  const power = new THREE.Mesh(new THREE.CircleGeometry(height * 0.14, 24), materials.vent);
  power.name = `${label}_PowerSocket`;
  power.position.set(width * 0.37, 0, rearZ - 0.021);
  power.rotation.y = Math.PI;
  group.add(power);
}

function createUnit({ label, width = 3.9, height = 0.62, depth = 2.15 } = {}) {
  const group = new THREE.Group();
  group.name = label;

  const chassis = roundedBox(width, height, depth, 0.08, materials.chassis, `${label}_Chassis`);
  group.add(chassis);

  const topPanel = roundedBox(width * 0.94, 0.036, depth * 0.86, 0.025, materials.trim, `${label}_TopPanel`);
  topPanel.position.y = height / 2 + 0.018;
  group.add(topPanel);
  addFrontFace(group, width, height, depth, label);
  addRearFace(group, width, height, depth, label);

  for (const x of [-width * 0.44, width * 0.44]) {
    for (const z of [-depth * 0.4, depth * 0.4]) {
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 16), materials.darkMetal);
      foot.name = `${label}_Foot`;
      foot.position.set(x, -height / 2 - 0.045, z);
      group.add(foot);
    }
  }

  return group;
}

function createSolo() {
  const root = new THREE.Group();
  root.name = "GoAgent_Spark_Solo";
  const unit = createUnit({ label: "SparkSolo", width: 4.05, height: 0.64, depth: 2.18 });
  root.add(unit);
  return root;
}

function createCluster() {
  const root = new THREE.Group();
  root.name = "GoAgent_Spark_Cluster";
  const spacingX = 2.12;
  const spacingY = 0.7;
  const masterNode = createUnit({ label: "ClusterNode", width: 2.02, height: 0.58, depth: 2.08 });
  for (let row = 0; row < 2; row += 1) {
    for (let column = 0; column < 2; column += 1) {
      const unit = masterNode.clone(true);
      unit.name = `ClusterNode_${row + 1}_${column + 1}`;
      unit.position.set((column - 0.5) * spacingX, (0.5 - row) * spacingY, 0);
      root.add(unit);
    }
  }
  return root;
}

async function exportGLB(scene, fileName) {
  const exporter = new GLTFExporter();
  const buffer = await exporter.parseAsync(scene, { binary: true, onlyVisible: true });
  await fs.writeFile(path.join(outputDirectory, fileName), new Uint8Array(buffer));
}

await fs.mkdir(outputDirectory, { recursive: true });
await exportGLB(createSolo(), "goagent-spark-solo.glb");
await exportGLB(createCluster(), "goagent-spark-cluster.glb");

for (const name of ["goagent-spark-solo.glb", "goagent-spark-cluster.glb"]) {
  const stats = await fs.stat(path.join(outputDirectory, name));
  console.log(`${name}: ${stats.size} bytes`);
}
