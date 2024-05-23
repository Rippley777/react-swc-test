import { useState, useEffect } from 'react';
import * as THREE from 'three';

const useTextureFromApi = (url: string) => {
  const [texture, setTexture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTexture = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const loader = new THREE.TextureLoader();

        loader.load(objectUrl, (loadedTexture) => {
          setTexture(loadedTexture as any);
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching texture:', error);
        setLoading(false);
      }
    };

    fetchTexture();
  }, [url]);

  return { texture, loading };
};

export default useTextureFromApi;
