import { useEffect, useState } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const useGLTFModel = (url: string): GLTF | undefined => {
  const [model, setModel] = useState<GLTF>();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf: GLTF) => {
        setModel(gltf);
      },
      undefined,
      (error: Error) => {
        console.error('An error occurred while loading the model:', error);
      },
    );
  }, [url]);

  return model;
};

export default useGLTFModel;
