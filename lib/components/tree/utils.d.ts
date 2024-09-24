export declare const isScrollElement: (element: HTMLElement) => boolean;
/**
 * 从当前节点向上查找所有的滚动元素
 * @param container 当前节点
 * @param top 查找到 top 节点就终止，不再继续查找
 * @returns
 */
export declare const getScrollElements: (container: HTMLElement, top?: HTMLElement) => HTMLElement[];
export declare const getScrollParentElement: (container: HTMLElement, top?: HTMLElement) => HTMLElement | undefined;
export declare const isSiblingElement: (a: Element, b: Element) => boolean;
export declare const findAncestorWithClass: (element: Element, className: string) => HTMLElement | null;
export declare function getPrevSibling(element: Element): Element | undefined;
export declare function getNextSibling(element: Element): Element | undefined;
