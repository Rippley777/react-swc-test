import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ThirdPersonCamera: React.FC<{
  character: React.RefObject<THREE.Mesh>;
}> = ({ character }) => {
  const camera = useThree((state) => state.camera);
  const cameraOffset = new THREE.Vector3(0, 5, -10);

  useFrame(() => {
    if (character.current) {
      const characterPosition = character.current.position.clone();
      const newCameraPosition = characterPosition.add(cameraOffset);
      camera.position.lerp(newCameraPosition, 0.1);
      camera.lookAt(character.current.position);
    }
  });

  return null;
};

export default ThirdPersonCamera;
