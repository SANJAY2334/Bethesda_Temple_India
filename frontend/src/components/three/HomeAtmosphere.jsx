import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Sparkles } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function CrossSilhouette() {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.08
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.42) * 0.08
  })

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={group} position={[0.35, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.26, 3.2, 0.16]} />
          <meshStandardMaterial color="#fff9d2" roughness={0.58} metalness={0.05} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.74, 0]}>
          <boxGeometry args={[1.48, 0.22, 0.16]} />
          <meshStandardMaterial color="#fff9d2" roughness={0.58} metalness={0.05} />
        </mesh>
        <mesh position={[0, -1.72, -0.08]}>
          <cylinderGeometry args={[0.85, 1.25, 0.38, 64]} />
          <meshStandardMaterial color="#8cc0eb" transparent opacity={0.28} />
        </mesh>
      </group>
    </Float>
  )
}

function LightRays() {
  const rays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => ({
        x: -4 + index * 1.25,
        y: 1.7 + Math.sin(index) * 0.4,
        rot: -0.45 + index * 0.025,
        opacity: 0.08 + index * 0.012,
      })),
    [],
  )

  return (
    <group>
      {rays.map((ray) => (
        <mesh key={ray.x} position={[ray.x, ray.y, -2]} rotation={[0, 0, ray.rot]}>
          <planeGeometry args={[0.18, 7.6]} />
          <meshBasicMaterial
            color="#fff9d2"
            transparent
            opacity={ray.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig({ mouse }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 0.45, 0.035)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.1 + mouse.current.y * 0.28, 0.035)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ mouse }) {
  return (
    <>
      <color attach="background" args={['#f8f2d5']} />
      <fog attach="fog" args={['#fff9d2', 5, 13]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[1.4, 4.5, 2.6]} intensity={2.15} color="#fff9d2" castShadow />
      <pointLight position={[-2.8, 1.2, 2.8]} intensity={1.4} color="#8cc0eb" />
      <LightRays />
      <Sparkles count={72} scale={[7, 4, 4]} size={2.6} speed={0.18} opacity={0.42} color="#ffffff" />
      <CrossSilhouette />
      <mesh position={[0, -2.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.8, 96]} />
        <meshStandardMaterial color="#ffebcc" transparent opacity={0.46} />
      </mesh>
      <CameraRig mouse={mouse} />
    </>
  )
}

export function HomeAtmosphere() {
  const mouse = useRef({ x: 0, y: 0 })

  if (typeof window !== 'undefined' && !supportsWebGL()) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_24%,rgba(255,255,255,0.86),transparent_18rem),linear-gradient(135deg,#fff9d2,#bfddf0)]" />
    )
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(event) => {
        mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2
        mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 2
      }}
    >
      <Canvas
        dpr={[1, 1.65]}
        shadows
        camera={{ position: [0, 0.2, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense
          fallback={
            <Html center>
              <span className="text-sm text-[#526679]">Preparing atmosphere</span>
            </Html>
          }
        >
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
