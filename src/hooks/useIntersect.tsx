import { useState, useRef, useEffect, MutableRefObject } from 'react';

interface IntersectProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export const useIntersect = (
  { root = null, rootMargin, threshold = 0 }: IntersectProps,
  onEndReached: (() => void) | undefined
) => {
  const [node, setNode] = useState<Element | null>(null);
  const observer: MutableRefObject<IntersectionObserver | null> = useRef(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onEndReached) {
          onEndReached();
        }
      },
      { root, rootMargin, threshold }
    );

    const { current: currentObserver } = observer;
    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode];
};
