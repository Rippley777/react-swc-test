import React, {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useUpdateUserLocation from '../hooks/useUpdateUserLocation';
import useGLTFModel from '../hooks/useGLTFModel';
import { API_URL } from '../../../api';

type CharacterProps = {
  position: THREE.Vector3;
};

type MoveFlags = {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
};

const Character = React.forwardRef(({ position }: CharacterProps, ref: any) => {
  const characterRef = useRef<THREE.Mesh>(null);
  const gltf = useGLTFModel(`${API_URL}/assets/models/shiba.glb`);
  const speed = 0.1;
  const { updateUserLocation } = useUpdateUserLocation();
  const [rotationState, setRotationState] = useState(0);
  const { camera } = useThree();
  const [isFirstPerson, setIsFirstPerson] = useState(false);
  const moveFlags = useRef<MoveFlags>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  const targetRotation = useRef(new THREE.Quaternion());
  const rotationSpeed = 0.1;

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveFlags.current.moveForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveFlags.current.moveLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveFlags.current.moveBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveFlags.current.moveRight = true;
        break;
      case 'KeyP':
        setIsFirstPerson((prev) => !prev);
        break;
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveFlags.current.moveForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveFlags.current.moveLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveFlags.current.moveBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveFlags.current.moveRight = false;
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame(() => {
    if (characterRef.current) {
      let positionUpdated = false;
      const newPosition = characterRef.current.position.clone();
      const direction = new THREE.Vector3();

      if (moveFlags.current.moveForward) {
        direction.set(0, 0, -1);
        newPosition.add(direction.clone().multiplyScalar(speed));
        positionUpdated = true;
      }
      if (moveFlags.current.moveBackward) {
        direction.set(0, 0, 1);
        newPosition.add(direction.clone().multiplyScalar(speed));
        positionUpdated = true;
      }
      if (moveFlags.current.moveLeft) {
        direction.set(-1, 0, 0);
        newPosition.add(direction.clone().multiplyScalar(speed));
        positionUpdated = true;
      }
      if (moveFlags.current.moveRight) {
        direction.set(1, 0, 0);
        newPosition.add(direction.clone().multiplyScalar(speed));
        positionUpdated = true;
      }
      if (positionUpdated) {
        const lookAtPosition = new THREE.Vector3().addVectors(
          characterRef.current.position,
          direction,
        );
        characterRef.current.position.copy(lookAtPosition);
        targetRotation.current.copy(characterRef.current.quaternion);

        characterRef.current.quaternion.slerp(
          targetRotation.current,
          rotationSpeed,
        );

        characterRef.current.position.copy(newPosition);
        if (isFirstPerson) {
          camera.position.set(
            newPosition.x,
            newPosition.y + 1.5, // Adjust to head height
            newPosition.z,
          );
          camera.lookAt(
            newPosition.x + Math.sin(characterRef.current.rotation.y),
            newPosition.y + 1.5,
            newPosition.z + Math.cos(characterRef.current.rotation.y),
          );
        } else {
          camera.position.set(
            newPosition.x,
            newPosition.y + 5,
            newPosition.z + 10,
          );
          camera.lookAt(newPosition);
        }
        // Throttle or debounce the updateUserLocation call as needed
        // updateUserLocation('1', {
        //   x: newPosition.x,
        //   y: newPosition.y,
        //   z: newPosition.z,
        // });
      }
    }
  });

  return gltf ? (
    <primitive ref={characterRef} object={gltf.scene} position={position} />
  ) : null;
});

export default Character;
