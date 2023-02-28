import { useState, useEffect } from 'react';

interface IProps {
  initialDirection?: string;
  thresholdPixels?: number;
  off?: boolean;
}

export const useScrollDirection = ({
  initialDirection = 'up',
  thresholdPixels = 10,
  off = true,
}: IProps) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);
  const [scrollY, setScrollY] = useState(0);
  const SCROLL_UP = 'up';
  const SCROLL_DOWN = 'down';

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.pageYOffset;

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }
      setScrollY(currentScrollY);
      setScrollDir(currentScrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off
      ? window.addEventListener('scroll', onScroll)
      : setScrollDir(initialDirection);

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return { scrollDir, scrollY };
};
