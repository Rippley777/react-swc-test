import { useEffect, useState } from 'react';
import useGetWorldLocationItems from '../../hooks/useGetWorldLocationItems';
import useGLTFModel from '../../hooks/useGLTFModel';
import { useGLTF } from '@react-three/drei';

const WorldLocationItems = () => {
  const [items, setItems] = useState([]);
  // const { scene } = useGLTFModel('/path/to/your/model.glb'); // Replace with your model path
  // const gltf = useGLTFModel(`${API_URL}/assets/models/shiba.glb`);

  const { getWorldLocationItems, data, loadedModels, error, loading } =
    useGetWorldLocationItems();

  useEffect(() => {
    getWorldLocationItems();
  }, []);

  // const model = loadedModels[item.model_path];

  return (
    <>
      {data &&
        data?.map((item: any) => (
          <primitive
            key={item.id}
            object={loadedModels[item.model_path]?.clone()}
            position={[item.x_coordinate, item.y_coordinate, item.z_coordinate]}
          />
        ))}
      {/* <primitive
              key={item.id}
              object={loadedModels[item.model_path]?.clone()}
              position={[
                item.x_coordinate,
                item.y_coordinate,
                item.z_coordinate,
              ]}
            /> */}
    </>
  );
};

export default WorldLocationItems;
