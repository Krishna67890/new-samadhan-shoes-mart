import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
  PerspectiveCamera,
  Html,
  Float,
  BakeShadows,
  AdaptiveDpr,
  Text,
  MeshDistortMaterial,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

function Model({ url, onPointerOver, ...props }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useMemo(() => {
    if (scene) {
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          if (obj.material) {
            obj.material.envMapIntensity = 1.5;
            obj.material.roughness = 0.4;
            obj.material.metalness = 0.5;
            // Optimize textures if they are heavy
            if (obj.material.map) obj.material.map.anisotropy = 8;
          }
        }
      });

      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 0.4 / maxDim;
      scene.scale.setScalar(scale);
    }
  }, [scene]);

  return scene ? (
    <primitive
      ref={modelRef}
      object={scene}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver && onPointerOver(e.object.name);
      }}
      {...props}
    />
  ) : null;
}

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-2"></div>
        <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Initializing 3D...</span>
      </div>
    </Html>
  );
};

// Annotation component for material inspection
function Annotation({ position, title, description, visible }) {
  return (
    <Html
      position={position}
      distanceFactor={8}
      occlude
      style={{
        transition: 'all 0.5s',
        opacity: visible ? 1 : 0,
        transform: `scale(${visible ? 1 : 0.5})`,
        pointerEvents: 'none'
      }}
    >
      <div className="whitespace-nowrap bg-black/80 backdrop-blur-xl border border-[#d4af37]/30 p-4 rounded-2xl shadow-2xl">
        <h4 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</h4>
        <p className="text-white/60 text-[9px] font-medium leading-tight italic">{description}</p>
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#d4af37] rotate-45" />
      </div>
    </Html>
  );
}

const AtelierStage = () => {
  return (
    <>
      {/* Cinematic Grid */}
      <gridHelper args={[20, 40, 0xffffff, 0x333333]} position={[0, -0.22, 0]} rotation={[0, 0, 0]} opacity={0.05} transparent />

      {/* Luxury Lighting */}
      <Environment preset="studio" intensity={0.8} />
      <spotLight
        position={[10, 20, 10]}
        angle={0.15}
        penumbra={1}
        intensity={3}
        castShadow
        color="#d4af37"
        shadow-mapSize={[2048, 2048]}
      />
      <rectAreaLight
        width={10}
        height={10}
        intensity={2}
        color="#ffffff"
        position={[-5, 5, 5]}
        lookAt={[0, 0, 0]}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
    </>
  );
};

const ShoeViewer = ({ modelUrl, autoRotate = true }) => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  // Combine hover and touch/click selection for mobile compatibility
  const activePart = hoveredPart || selectedPart;

  return (
    <div className="w-full h-full min-h-[500px] relative bg-transparent group overflow-hidden rounded-[3rem]">
      {/* Atelier Overlay UI */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Atelier View v2.0</span>
        </div>
        <h3 className="text-[#d4af37] font-editorial text-2xl font-black uppercase tracking-tighter">Material Inspection</h3>
      </div>

      {/* Dynamic Part Info */}
      {activePart && (
        <div className="absolute top-8 right-8 z-20 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl animate-in fade-in slide-in-from-right-4 duration-500">
          <span className="text-[8px] font-black uppercase tracking-widest text-white/40 block mb-1">Component Detected</span>
          <p className="text-white text-xs font-bold uppercase">{activePart.replace(/_/g, ' ')}</p>
          <button
            className="mt-2 text-[8px] text-[#d4af37] uppercase font-bold tracking-widest lg:hidden"
            onClick={() => setSelectedPart(null)}
          >
            Clear Selection
          </button>
        </div>
      )}

      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 0.8], fov: 35 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={<Loader />}>
          <AtelierStage />

          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float
              speed={1.5}
              rotationIntensity={0.2}
              floatIntensity={0.5}
            >
               <Model
                 url={modelUrl}
                 onPointerOver={(name) => setHoveredPart(name)}
                 onPointerOut={() => setHoveredPart(null)}
                 onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPart(e.object.name === selectedPart ? null : e.object.name);
                 }}
               />

               {/* Material Hotspots - Generic positions for demo, usually mapped to model nodes */}
               <Annotation
                 position={[0.2, 0.1, 0.1]}
                 title="Full-Grain Leather"
                 description="Selective hides with natural breathable pores."
                 visible={activePart?.includes('Upper') || activePart === 'Leather'}
               />
               <Annotation
                 position={[0, -0.15, 0.2]}
                 title="High-Traction Outsole"
                 description="Anti-skid rubber compound for superior grip."
                 visible={activePart?.includes('Sole') || activePart === 'Bottom'}
               />
            </Float>
          </PresentationControls>

          <ContactShadows
            position={[0, -0.22, 0]}
            opacity={0.4}
            scale={2.5}
            blur={2.4}
            far={1.2}
            color="#000000"
          />

          <BakeShadows />
          <AdaptiveDpr pixelated />
        </Suspense>

        {/* OrbitControls enableZoom is kept for desktop scroll-zoom,
            but we disable rotate to let PresentationControls handle it globally */}
        <OrbitControls
          enableRotate={false}
          enablePan={false}
          enableZoom={true}
          minDistance={0.5}
          maxDistance={1.5}
          makeDefault
        />
      </Canvas>


      {/* Interaction Help */}
      <div className="absolute bottom-8 right-8 z-20">
         <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/30 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <span>Scroll to Zoom</span>
            <div className="w-px h-3 bg-white/20" />
            <span>Drag to Rotate</span>
         </div>
      </div>
    </div>
  );
};

export default ShoeViewer;

// Preload common model to optimize initial paint
// useGLTF.preload('/assets/models/elite_boot.glb');
