import { createContext } from 'solid-js';
import type { Locale } from '.';

export type LocaleContextProps = Locale & { exist?: boolean };

const LocaleContext = createContext<LocaleContextProps>();

export default LocaleContext;
