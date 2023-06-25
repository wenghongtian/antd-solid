import StyleContext from '../StyleContext';
import type { KeyType } from '../Cache';
import useHMR from './useHMR';
import { useContext, Accessor, createSignal, createEffect, onCleanup, createMemo } from 'solid-js';

export default function useClientCache<CacheType>(
  prefix: string,
  keyPath: Accessor<KeyType[]>,
  cacheFn: () => CacheType,
  onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void,
): Accessor<CacheType> {
  const context = useContext(StyleContext);
  const globalCache = createMemo(() => context().cache);
  const [fullPath, setFullPath] = createSignal([prefix, ...keyPath()]);
  const [res, setRes] = createSignal<CacheType>(globalCache().get(fullPath())![1]);

  createEffect(() => {
    setFullPath([prefix, ...keyPath()]);
  });

  const HMRUpdate = useHMR();

  createEffect(() => {
    globalCache().update(fullPath(), (prevCache) => {
      const [times = 0, cache] = prevCache || [];

      // HMR should always ignore cache since developer may change it
      let tmpCache = cache;
      if (process.env.NODE_ENV !== 'production' && cache && HMRUpdate) {
        onCacheRemove?.(tmpCache, HMRUpdate);
        tmpCache = null;
      }

      const mergedCache = tmpCache || cacheFn();

      return [times + 1, mergedCache];
    });
    setRes(globalCache().get(fullPath())![1]);
  });

  onCleanup(() => {
    globalCache().update(fullPath(), (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      const nextCount = times - 1;

      if (nextCount === 0) {
        onCacheRemove?.(cache, false);
        return null;
      }

      return [times - 1, cache];
    });
  });

  return res;
}
