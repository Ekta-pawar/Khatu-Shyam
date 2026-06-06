import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function SpinningRings() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    r1.current.rotation.x = t * 0.25;
    r1.current.rotation.y = t * 0.15;
    r2.current.rotation.x = -t * 0.18;
    r2.current.rotation.z = t * 0.22;
    r3.current.rotation.y = t * 0.30;
    r3.current.rotation.x = t * 0.08;
  });

  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[2.2, 0.018, 8, 120]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.0, 0.012, 8, 120]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh ref={r3} rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[3.8, 0.008, 8, 120]} />
        <meshStandardMaterial color="#B9F2FF" metalness={0.9} roughness={0.1} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function SacredOrb() {
  const outer = useRef();
  const inner = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    outer.current.rotation.x = t * 0.4;
    outer.current.rotation.y = t * 0.25;
    inner.current.rotation.x = -t * 0.3;
    inner.current.rotation.z = t * 0.2;
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#D4AF37" wireframe metalness={1} roughness={0} transparent opacity={0.7} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#FFD700" emissive="#D4AF37" emissiveIntensity={0.8} transparent opacity={0.6} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFD700" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const pts = useRef();
  const count = 250;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    pts.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#D4AF37" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function ThreeDBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#D4AF37" intensity={1.5} />
        <pointLight position={[-5, -5, 3]} color="#B9F2FF" intensity={0.5} />
        <Stars radius={40} depth={60} count={800} factor={3} saturation={0} fade speed={0.8} />
        <SacredOrb />
        <SpinningRings />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
