import { useMemo, RefObject } from 'react';

type CallbackType = ((event: Event) => void) | null;
type AddClickOutsideFunc = (callback: CallbackType) => void;
type RemoveClickOutsideFunc = () => void;
type UseClickOutsideHook = [AddClickOutsideFunc, RemoveClickOutsideFunc];

export default (el: RefObject<HTMLElement>): UseClickOutsideHook => useMemo(() => {
  let memorizedCallback = null as CallbackType;
  function removeClickOutside() {
    if (!memorizedCallback) {
      return;
    }
    window.removeEventListener('pointerdown', memorizedCallback);
    memorizedCallback = null;
  }
  function addClickOutside(callback: CallbackType) {
    removeClickOutside();
    if (!el?.current || !callback) {
      return;
    }
    const listener = (event: Event) => {
      if (!event || el.current === event.target || event.composedPath().includes(el.current!)) {
        return;
      }

      callback(event);
    };
    window.addEventListener('pointerdown', listener);
    memorizedCallback = listener;
  }

  return [addClickOutside, removeClickOutside];
}, [el]);
