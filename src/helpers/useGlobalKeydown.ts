import { useMemo } from 'react';

let currentCallback = null as ((event: KeyboardEvent) => void) | null;
let isInitialized = false;

export default (callback: ((event: KeyboardEvent) => void), deps: any[]) => useMemo(() => {
  function removeKeydownListener() {
    isInitialized = false;
    if (!currentCallback) {
      return;
    }
    window.removeEventListener('keydown', currentCallback);
  }
  function initKeydownListener() {
    removeKeydownListener();
    currentCallback = callback;
    isInitialized = true;
    window.addEventListener('keydown', currentCallback);
  }
  if (isInitialized) {
    initKeydownListener();
  } else {
    removeKeydownListener();
  }

  return [initKeydownListener, removeKeydownListener];
}, deps);
