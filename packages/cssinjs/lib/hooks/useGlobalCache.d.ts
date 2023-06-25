import type { KeyType } from '../Cache';
import { Accessor } from 'solid-js';
export default function useClientCache<CacheType>(
  prefix: string,
  keyPath: Accessor<KeyType[]>,
  cacheFn: () => CacheType,
  onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void,
): Accessor<CacheType>;
