import { useDrag } from '@use-gesture/react';

export const useSwipeGestures = (onDrag) => {
  return useDrag((state) => {
    onDrag(state);
  });
};
