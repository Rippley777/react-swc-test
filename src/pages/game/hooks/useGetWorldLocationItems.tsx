import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import api from '../api';

type Item = {
  id: number;
  x_coordinate: number;
  y_coordinate: number;
  z_coordinate: number;
  model_path: string;
};

const useGetWorldLocationItems = () => {
  const [data, setData] = useState<Item[] | null>(null);
  const [filteredData, setFilteredData] = useState<Item[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadedModels, setLoadedModels] = useState<{ [key: string]: any }>({});

  const characterPosition = useSelector(
    (state: RootState) => state.character.sessionInfo.location,
  );

  const RADIUS = 40;

  // useEffect(() => {
  //   if (characterPosition && data && data.length > 0) {
  //     const characterPositionVector = new THREE.Vector2(
  //       characterPosition.x,
  //       characterPosition.z,
  //     ); // Assuming a 2D plane (x, z)
  //     const newFilteredItems = data.filter((item: Item) => {
  //       const itemPosition = new THREE.Vector2(
  //         item.x_coordinate,
  //         item.z_coordinate,
  //       );
  //       const distance = characterPositionVector.distanceTo(itemPosition);
  //       return distance <= RADIUS;
  //     });

  //     setFilteredData(newFilteredItems);
  //   }
  // }, [data, characterPosition]);

  useEffect(() => {
    const loadModels = async () => {
      if (filteredData && filteredData.length > 0) {
        const uniqueModelPaths = [
          ...new Set(filteredData.map((item: Item) => item.model_path)),
        ];
        const models: { [key: string]: any } = {};

        for (const path of uniqueModelPaths) {
          const gltf = await useGLTF(path);
          models[path] = gltf.scene;
        }

        setLoadedModels(models);
      }
    };

    loadModels();
  }, [filteredData]);

  const getWorldLocationItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/locations/world-locations');
      setData(response.data);
    } catch (err: any) {
      setError(err.response ? err.response.data : 'Error getting world items');
    } finally {
      setLoading(false);
    }
  };

  // const renderedItems =
  //   filteredData?.map((item: Item) => (
  //     <primitive
  //       key={item.id}
  //       object={loadedModels[item.model_path]?.clone()}
  //       position={[item.x_coordinate, item.y_coordinate, item.z_coordinate]}
  //     />
  //   )) || [];

  return { getWorldLocationItems, loadedModels, data, error, loading };
};

export default useGetWorldLocationItems;
