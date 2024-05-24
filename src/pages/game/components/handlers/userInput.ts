import { MutableRefObject, KeyboardEvent as ReactKeyboardEvent } from 'react';

export type MoveFlags = {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
};

export const onCharacterKeyDown = (
  event: ReactKeyboardEvent,
  moveFlags: MutableRefObject<MoveFlags>,
  invalidate: (frames?: number | undefined) => void,
) => {
  let shouldInvalidate = false;
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveFlags.current.moveForward = true;
      shouldInvalidate = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveFlags.current.moveLeft = true;
      shouldInvalidate = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveFlags.current.moveBackward = true;
      shouldInvalidate = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveFlags.current.moveRight = true;
      shouldInvalidate = true;
      break;
    case 'KeyP':
      setIsFirstPerson((prev) => !prev);
      shouldInvalidate = true;
      break;
  }
  if (shouldInvalidate) invalidate();
};

const onCharacterKeyUp = (event: ReactKeyboardEvent) => {
  let shouldInvalidate = false;
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveFlags.current.moveForward = false;
      shouldInvalidate = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveFlags.current.moveLeft = false;
      shouldInvalidate = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveFlags.current.moveBackward = false;
      shouldInvalidate = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveFlags.current.moveRight = false;
      shouldInvalidate = true;
      break;
  }
  if (shouldInvalidate) invalidate();
};
