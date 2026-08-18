import { Canvas } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import { Suspense } from 'react';

function EMSBox() {
    return (
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
            <RoundedBox args={[2, 2.8, 0.6]} radius={0.08} smoothness={4}>
                <meshStandardMaterial
                    color="#6B21A8"
                    metalness={0.4}
                    roughness={0.3}
                />
            </RoundedBox>

            {/* Texte EMS gravé sur la face avant */}
            <Text
                position={[0, 0.5, 0.32]}
                fontSize={0.45}
                color="white"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
            >
                EMS
            </Text>

            <Text
                position={[0, 0.1, 0.32]}
                fontSize={0.09}
                color="#d8b4fe"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.05}
            >
                ENTERPRISE MANAGEMENT SUITE
            </Text>

            <Text
                position={[0, -0.9, 0.32]}
                fontSize={0.14}
                color="white"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
            >
                Business
            </Text>
        </Float>
    );
}

export default function Box3D() {
    return (
        <div className="w-full h-[380px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 3, 3]} intensity={1.2} />
                <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#a855f7" />
                <Suspense fallback={null}>
                    <EMSBox />
                </Suspense>
            </Canvas>
        </div>
    );
}