import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';

const useDebouncedEffect = (
  effect: () => void,
  deps: any[],
  delay: number = 300,
) => {
  const callback = useRef(effect);
  const debounceFn = useRef(
    debounce(() => {
      callback.current();
    }, delay),
  );

  useEffect(() => {
    callback.current = effect;
  }, [effect]);

  useEffect(() => {
    debounceFn.current();
    return debounceFn.current.cancel;
  }, deps);
};

export default useDebouncedEffect;
