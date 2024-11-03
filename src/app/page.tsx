"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const MallScene = () => {
  return (
    <mesh>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Virtual Mall</h1>
      <div className="w-full h-96">
        {/* Ensure the Canvas component only runs on the client */}
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <MallScene />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
