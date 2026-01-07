import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";


const FlowWind = () => {
  const pointsRef = useRef();

  const count = 4500;

  // base positions – wide, flat volume (like a sheet of charged air)
  const basePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 6;   // wide horizontally
      const y = (Math.random() - 0.5) * 2;   // medium height
      const z = (Math.random() - 0.5) * 2.5; // some depth
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  // mutable positions we animate each frame
  const positions = useMemo(() => {
    // start equal to base
    return new Float32Array(basePositions);
  }, [basePositions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!pointsRef.current) return;

    const freq1 = 1.2;
    const freq2 = 0.9;
    const freq3 = 0.7;

    const ampMain = 0.45;
    const ampSecondary = 0.25;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x0 = basePositions[i3];
      const y0 = basePositions[i3 + 1];
      const z0 = basePositions[i3 + 2];

      // flow field – "wind patterns"
      const dx =
        ampMain * Math.sin(y0 * freq1 + t * 1.1) +
        ampSecondary * Math.sin((z0 + t * 0.8) * freq3);

      const dy =
        0.25 * Math.cos(x0 * freq2 - t * 0.9) +
        0.15 * Math.sin((z0 * 1.3 + t * 0.6));

      const dz = 0.15 * Math.sin(x0 * 0.9 + t * 0.7);

      positions[i3] = x0 + dx;
      positions[i3 + 1] = y0 + dy;
      positions[i3 + 2] = z0 + dz;
    }

    // tell three.js the positions changed
    const attr = pointsRef.current.geometry.attributes.position;
    attr.needsUpdate = true;

    // slight global sway so the whole layer breathes
    pointsRef.current.position.x = Math.sin(t * 0.25) * 0.2;
    pointsRef.current.position.y = Math.cos(t * 0.18) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#22c55e"          // same green as lightning
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <Suspense fallback={null}>
          {/* dark, neutral background so green wind sits behind everything */}
          <color attach="background" args={["#01080F"]} />
          <FlowWind />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
