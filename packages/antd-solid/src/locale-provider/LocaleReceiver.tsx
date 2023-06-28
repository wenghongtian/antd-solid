import { Accessor, JSXElement, createMemo, useContext } from 'solid-js';
import type { Locale } from '.';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';
import defaultLocaleData from './default';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps<C extends LocaleComponentName = LocaleComponentName> {
  componentName?: C;
  defaultLocale?: Locale[C] | (() => Locale[C]);
  children: (locale: NonNullable<Locale[C]>, localeCode: string, fullLocale: Locale) => JSXElement;
}

const LocaleReceiver = <C extends LocaleComponentName = LocaleComponentName>(
  props: LocaleReceiverProps<C>,
) => {
  // const { componentName = 'global' as C, defaultLocale, children } = props;
  const antLocale = useContext(LocaleContext);

  const getLocale = createMemo<NonNullable<Locale[C]>>(() => {
    const locale = props.defaultLocale || defaultLocaleData[props.componentName || 'global'];
    const localeFromContext = antLocale?.[props.componentName || 'global'] ?? {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    };
  });

  const getLocaleCode = createMemo<string>(() => {
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode!;
  });

  return children(getLocale, getLocaleCode, antLocale!);
};

export default LocaleReceiver;

export const useLocaleReceiver = <C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
  defaultLocale?: Locale[C] | (() => Locale[C]),
): [Locale[C]] => {
  const antLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);

  const getLocale = React.useMemo<NonNullable<Locale[C]>>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = antLocale?.[componentName] ?? {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  return [getLocale];
};
