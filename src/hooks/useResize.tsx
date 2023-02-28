import { useState, useEffect } from 'react';

export const useResize = () => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight);
    setContainerWidth(window.innerWidth);

    function resizeEvent() {
      setContainerHeight(window.innerHeight ?? 0);
      setContainerWidth(window.innerWidth ?? 0);
    }
    const onResize = () => {
      window.requestAnimationFrame(resizeEvent);
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return { width: containerWidth, height: containerHeight };
};

export default useResize;
