export type ObserverItemProps = {
    resizeObserver: ResizeObserver;
};
declare const useObserverItem: (props: ObserverItemProps) => {
    itemRefEl: import("vue-demi").Ref<null, null>;
};
declare const ObserverItem: import("vue-demi").DefineComponent<import("vue-demi").ExtractPropTypes<{
    resizeObserver: {
        type: {
            new (callback: ResizeObserverCallback): ResizeObserver;
            prototype: ResizeObserver;
        };
        require: boolean;
    };
    id: {
        type: (StringConstructor | NumberConstructor)[];
        require: boolean;
    };
}>, {
    itemRefEl: import("vue-demi").Ref<null, null>;
}, {}, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
    resizeObserver: {
        type: {
            new (callback: ResizeObserverCallback): ResizeObserver;
            prototype: ResizeObserver;
        };
        require: boolean;
    };
    id: {
        type: (StringConstructor | NumberConstructor)[];
        require: boolean;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue-demi").ComponentProvideOptions, true, {}, any>;
export { ObserverItem, useObserverItem };
