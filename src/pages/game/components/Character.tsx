import React, {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
  useRef,
  forwardRef,
} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useUpdateUserLocation from '../hooks/useUpdateUserLocation';
import useGLTFModel from '../hooks/useGLTFModel';
import { API_URL } from '../../../api';
import { useDispatch } from 'react-redux';
import { setCharacterLocation } from '../../../store/reducers/character';
import useDebouncedEffect from '../hooks/useDebounce';
import { debounce } from 'lodash';

type CharacterProps = {
  position: THREE.Vector3;
};

type MoveFlags = {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
};

const Character = forwardRef<THREE.Mesh, CharacterProps>(
  ({ position }, ref) => {
    const characterRef = useRef<THREE.Mesh>(null);
    const gltf = useGLTFModel(`${API_URL}/assets/models/shiba.glb`);
    const speed = 0.1;
    const { updateUserLocation } = useUpdateUserLocation();
    const { camera, invalidate } = useThree();
    const [isFirstPerson, setIsFirstPerson] = useState(false);
    const [cameraPositionUpdated, setCameraPositionUpdated] = useState(false);
    const dispatch = useDispatch();
    const moveFlags = useRef<MoveFlags>({
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
    });

    const debouncedUpdateUserLocation = debounce((position) => {
      updateUserLocation('1', position);
      dispatch(setCharacterLocation(position));
    }, 300); //

    const onKeyDown = (event: ReactKeyboardEvent) => {
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
          setCameraPositionUpdated(true);
          break;
      }
      invalidate();
    };

    const onKeyUp = (event: ReactKeyboardEvent) => {
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
      invalidate();
    };

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     if (characterRef.current) {
    //       const position = {
    //         x: characterRef.current.position.x,
    //         y: characterRef.current.position.y,
    //         z: characterRef.current.position.z,
    //       };
    //       updateUserLocation('1', position);
    //       dispatch(setCharacterLocation(position));
    //     }
    //   }, 2000); // Adjust the interval as needed

    //   return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
      window.addEventListener('keydown', onKeyDown as unknown as EventListener);
      window.addEventListener('keyup', onKeyUp as unknown as EventListener);

      return () => {
        window.removeEventListener(
          'keydown',
          onKeyDown as unknown as EventListener,
        );
        window.removeEventListener(
          'keyup',
          onKeyUp as unknown as EventListener,
        );
      };
    }, []);

    useFrame(() => {
      if (characterRef.current) {
        let positionUpdated = false;
        const newPosition = characterRef.current.position.clone();
        const direction = new THREE.Vector3();

        if (moveFlags.current.moveForward) {
          direction.z -= 1;
          positionUpdated = true;
        }
        if (moveFlags.current.moveBackward) {
          direction.z += 1;
          positionUpdated = true;
        }
        if (moveFlags.current.moveLeft) {
          direction.x -= 1;
          positionUpdated = true;
        }
        if (moveFlags.current.moveRight) {
          direction.x += 1;
          positionUpdated = true;
        }

        if (positionUpdated) {
          direction.normalize();
          newPosition.add(direction.clone().multiplyScalar(speed));

          // Reverse the direction for correct orientation
          const reversedDirection = direction.clone().negate();
          const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, -1), // Default forward direction
            reversedDirection,
          );

          characterRef.current.quaternion.slerp(targetQuaternion, 0.2);
          characterRef.current.position.copy(newPosition);

          if (isFirstPerson) {
            camera.position.set(
              newPosition.x,
              newPosition.y + 1.5, // Adjust to head height
              newPosition.z,
            );
            camera.lookAt(
              newPosition.x + direction.x,
              newPosition.y + 1.5,
              newPosition.z + direction.z,
            );
          } else {
            const thirdPersonOffset = new THREE.Vector3(0, 5, 10);
            const cameraPosition = new THREE.Vector3().addVectors(
              newPosition,
              thirdPersonOffset,
            );
            camera.position.copy(cameraPosition);
            camera.lookAt(newPosition);
          }

          debouncedUpdateUserLocation({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z,
          });
        }

        if (cameraPositionUpdated) {
          if (isFirstPerson) {
            const headPosition = new THREE.Vector3(
              characterRef.current.position.x,
              characterRef.current.position.y + 1.5,
              characterRef.current.position.z,
            );
            camera.position.copy(headPosition);
            camera.lookAt(headPosition.clone().add(direction));
          } else {
            const thirdPersonOffset = new THREE.Vector3(0, 3, 5);
            const cameraPosition = new THREE.Vector3().addVectors(
              characterRef.current.position,
              thirdPersonOffset,
            );
            camera.position.copy(cameraPosition);
            camera.lookAt(characterRef.current.position);
          }
          setCameraPositionUpdated(false);
        }
      }
    });

    return gltf ? (
      <primitive ref={characterRef} object={gltf.scene} position={position} />
    ) : null;
  },
);

export default Character;
