// RobotCanvas.jsx (or in your existing canvas file)
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Robot = ({ isMobile }) => {
  // 👇 use your actual path under /public
  const robot = useGLTF("./robot/scene.gltf"); // or "./ai-but-dandy/scene.gltf" etc.

  return (
    <mesh>
      <hemisphereLight intensity={0.25} groundColor="black" />
      <spotLight
        position={[-15, 40, 20]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      <primitive
        object={robot.scene}
        // 🔹 MUCH smaller than before
        scale={isMobile ? 0.02 : 0.03}
        // x,   y (down is negative),   z (more negative = farther away)
        position={isMobile ? [0, -2.2, -4] : [0, -2.5, -5]}
        rotation={[0, Math.PI / 8, 0]}
      />
    </mesh>
  );
};

const RobotCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.2, 8], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}       // turn on zoom while tweaking
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Robot isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default RobotCanvas;
