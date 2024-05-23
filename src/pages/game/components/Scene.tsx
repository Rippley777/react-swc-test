import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Plane, Environment } from '@react-three/drei';

import Character from './Character';
import ThirdPersonCamera from './ThirdPersonCamera';
import useTextureFromApi from '../hooks/useTextureFromApi';
import { API_URL } from '../../../api';

type SceneProps = {
  userStartingLocation: { x: number; y: number; z: number } | null;
};

const Scene: React.FC<SceneProps> = ({ userStartingLocation }) => {
  const startingLocation = userStartingLocation
    ? new THREE.Vector3(
        userStartingLocation.x,
        userStartingLocation.y,
        userStartingLocation.z,
      )
    : new THREE.Vector3(0, 0, 0);

  const characterRef = useRef<THREE.Mesh>(null);
  const characterPosition = startingLocation;
  useEffect(() => {
    const test = characterRef.current?.position.copy(characterPosition);
    console.log({ test });
  }, [characterRef]);

  const textureUrl = `${API_URL}/assets/textures/grass.jpg`;

  // Load the texture using the custom hook
  const { texture, loading }: any = useTextureFromApi(textureUrl);
  if (texture) {
    console.log('Texture loaded:', texture);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(70, 70); // Adjust the scale as needed
  } else {
    console.log('Texture not loaded yet or failed to load');
  }

  if (loading) return <div>Loading...</div>;
  return (
    <Canvas>
      {/* <Environment background blur={0} preset="park" ground /> */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sky sunPosition={[100, 20, 100]} />
      <Character ref={characterRef} position={characterPosition} />
      {/* <ThirdPersonCamera character={characterRef} /> */}
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        args={[200, 200]}
        receiveShadow
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Plane>
      <OrbitControls enabled={false} />
    </Canvas>
  );
};

export default Scene;
