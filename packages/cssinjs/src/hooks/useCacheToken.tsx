import hash from '@emotion/hash';
import StyleContext, { ATTR_TOKEN, CSS_IN_JS_INSTANCE } from '../StyleContext';
import type Theme from '../theme/Theme';
import { flattenToken, token2key } from '../util';
import useGlobalCache from './useGlobalCache';
import { Accessor, createMemo, useContext } from 'solid-js';

const EMPTY_OVERRIDE = {};

// Generate different prefix to make user selector break in production env.
// This helps developer not to do style override directly on the hash id.
const hashPrefix = process.env.NODE_ENV !== 'production' ? 'css-dev-only-do-not-override' : 'css';

export interface Option<DerivativeToken> {
  /**
   * Generate token with salt.
   * This is used to generate different hashId even same derivative token for different version.
   */
  salt?: string;
  override?: object;
  /**
   * Format token as you need. Such as:
   *
   * - rename token
   * - merge token
   * - delete token
   *
   * This should always be the same since it's one time process.
   * It's ok to useMemo outside but this has better cache strategy.
   */
  formatToken?: (mergedToken: any) => DerivativeToken;
}

const tokenKeys = new Map<string, number>();
function recordCleanToken(tokenKey: string) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}

function removeStyleTags(key: string, instanceId: string) {
  if (typeof document !== 'undefined') {
    const styles = document.querySelectorAll(`style[${ATTR_TOKEN}="${key}"]`);

    styles.forEach((style) => {
      if ((style as any)[CSS_IN_JS_INSTANCE] === instanceId) {
        style.parentNode?.removeChild(style);
      }
    });
  }
}

// Remove will check current keys first
function cleanTokenStyle(tokenKey: string, instanceId: string) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);

  const tokenKeyList = Array.from(tokenKeys.keys());
  const cleanableKeyList = tokenKeyList.filter((key) => {
    const count = tokenKeys.get(key) || 0;

    return count <= 0;
  });

  if (cleanableKeyList.length < tokenKeyList.length) {
    cleanableKeyList.forEach((key) => {
      removeStyleTags(key, instanceId);
      tokenKeys.delete(key);
    });
  }
}

export const getComputedToken = <DerivativeToken = object, DesignToken = DerivativeToken>(
  originToken: DesignToken,
  overrideToken: object,
  theme: Theme<any, any>,
  format?: (token: DesignToken) => DerivativeToken,
) => {
  const derivativeToken = theme.getDerivativeToken(originToken);

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    ...overrideToken,
  };

  // Format if needed
  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken);
  }

  return mergedDerivativeToken;
};

/**
 * Cache theme derivative token as global shared one
 * @param theme Theme entity
 * @param tokens List of tokens, used for cache. Please do not dynamic generate object directly
 * @param option Additional config
 * @returns Call Theme.getDerivativeToken(tokenObject) to get token
 */
export default function useCacheToken<DerivativeToken = object, DesignToken = DerivativeToken>(
  theme: Accessor<Theme<any, any>>,
  tokens: Accessor<Partial<DesignToken>[]>,
  option: Accessor<Option<DerivativeToken>> = createMemo(() => ({})),
): Accessor<[DerivativeToken & { _tokenKey: string }, string]> {
  const context = useContext(StyleContext);

  // Basic - We do basic cache here
  const mergedToken = createMemo(() => Object.assign({}, ...tokens()));
  const tokenStr = createMemo(() => flattenToken(mergedToken()));
  const overrideTokenStr = createMemo(() => flattenToken(option().override || EMPTY_OVERRIDE));

  const cachedToken = useGlobalCache<[DerivativeToken & { _tokenKey: string }, string]>(
    'token',
    createMemo(
      () => [option().salt || '', theme().id, tokenStr(), overrideTokenStr()] as KeyType[],
    ),
    () => {
      const { override = EMPTY_OVERRIDE, formatToken, salt } = option();
      const mergedDerivativeToken = getComputedToken(
        mergedToken(),
        override!,
        theme(),
        formatToken,
      );

      // Optimize for `useStyleRegister` performance
      const tokenKey = token2key(mergedDerivativeToken, salt || '');
      mergedDerivativeToken._tokenKey = tokenKey;
      recordCleanToken(tokenKey);

      const hashId = `${hashPrefix}-${hash(tokenKey)}`;
      mergedDerivativeToken._hashId = hashId; // Not used

      return [mergedDerivativeToken, hashId];
    },
    (c) => {
      // Remove token will remove all related style
      cleanTokenStyle(c[0]._tokenKey, context().cache.instanceId);
    },
  );

  return cachedToken;
}
