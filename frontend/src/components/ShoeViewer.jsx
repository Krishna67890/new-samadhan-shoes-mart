import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
  PerspectiveCamera,
  Html,
  Float
} from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, ...props }) {
  const { scene } = useGLTF(url, true); // Added true to allow error handling
  const modelRef = useRef();

  React.useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 0.3 / maxDim;
      scene.scale.setScalar(scale);
    }
  }, [scene]);

  return scene ? <primitive ref={modelRef} object={scene} {...props} /> : null;
}

// Simple Error Boundary for 3D
class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#111]/50 border border-white/10 rounded-3xl p-10 text-center">
          <div>
            <p className="text-[#8B0000] font-black text-xs uppercase tracking-widest mb-2">3D_RENDER_PAUSED</p>
            <p className="text-white/40 text-[10px] font-medium">Please add 'elite_boot.glb' to public/assets/models/ to activate 360° view.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ShoeViewer = ({ modelUrl, autoRotate = true }) => {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <ThreeErrorBoundary>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 0.8]} fov={40} />
          <Suspense fallback={<Html center className="text-[#8B0000] font-mono text-xs uppercase tracking-widest">Initialising_Vault...</Html>}>
            <Environment preset="city" intensity={0.6} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
               <Model url={modelUrl} />
            </Float>
            <ContactShadows position={[0, -0.15, 0]} opacity={0.4} scale={1.5} blur={2.5} far={0.8} />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} autoRotate={autoRotate} autoRotateSpeed={0.5} makeDefault />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
};

export default ShoeViewer;
