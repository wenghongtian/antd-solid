import type * as CSS from 'csstype';
import type { Theme, Transformer } from '..';
import type Cache from '../Cache';
import type Keyframes from '../Keyframes';
import type { Linter } from '../linters';
import type { HashPriority } from '../StyleContext';
import { JSXElement, Accessor } from 'solid-js';
declare const SKIP_CHECK = "_skip_check_";
declare const MULTI_VALUE = "_multi_value_";
export type CSSProperties = Omit<CSS.PropertiesFallback<number | string>, 'animationName'> & {
    animationName?: CSS.PropertiesFallback<number | string>['animationName'] | Keyframes;
};
export type CSSPropertiesWithMultiValues = {
    [K in keyof CSSProperties]: CSSProperties[K] | Extract<CSSProperties[K], string>[] | {
        [SKIP_CHECK]?: boolean;
        [MULTI_VALUE]?: boolean;
        value: CSSProperties[K] | CSSProperties[K][];
    };
};
export type CSSPseudos = {
    [K in CSS.Pseudos]?: CSSObject;
};
type ArrayCSSInterpolation = CSSInterpolation[];
export type InterpolationPrimitive = null | undefined | boolean | number | string | CSSObject;
export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation | Keyframes;
export type CSSOthersObject = Record<string, CSSInterpolation>;
export interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {
}
export declare function normalizeStyle(styleStr: string): string;
export interface ParseConfig {
    hashId?: string;
    hashPriority?: HashPriority;
    layer?: string;
    path?: string;
    transformers?: Transformer[];
    linters?: Linter[];
}
export interface ParseInfo {
    root?: boolean;
    injectHash?: boolean;
    parentSelectors: string[];
}
export declare const parseStyle: (interpolation: CSSInterpolation, config?: ParseConfig, { root, injectHash, parentSelectors }?: ParseInfo) => [parsedStr: string, effectStyle: Record<string, string>];
/**
 * Register a style to the global style sheet.
 */
export default function useStyleRegister(info: Accessor<{
    theme: Theme<any, any>;
    token: any;
    path: string[];
    hashId?: string;
    layer?: string;
    nonce?: string | (() => string);
}>, styleFn: () => CSSInterpolation): (node: JSXElement) => import("solid-js").JSX.Element;
export declare function extractStyle(cache: Cache, plain?: boolean): string;
export {};
