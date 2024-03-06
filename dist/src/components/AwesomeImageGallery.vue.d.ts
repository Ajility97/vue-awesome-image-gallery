import type { AwesomeImage } from "../types";
import type { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    alt: {
        type: StringConstructor;
        default: string;
    };
    disableZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideActiveImageOnZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
        type: PropType<AwesomeImage[]>;
        required: true;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    changed: (...args: any[]) => void;
    loaded: (...args: any[]) => void;
    resized: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    alt: {
        type: StringConstructor;
        default: string;
    };
    disableZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideActiveImageOnZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
        type: PropType<AwesomeImage[]>;
        required: true;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onChanged?: ((...args: any[]) => any) | undefined;
    onLoaded?: ((...args: any[]) => any) | undefined;
    onResized?: ((...args: any[]) => any) | undefined;
}, {
    alt: string;
    disableZoom: boolean;
    hideActiveImageOnZoom: boolean;
    scale: number;
}, {}>;
export default _default;
