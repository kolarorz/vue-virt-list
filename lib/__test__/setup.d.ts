declare class MockResizeObserver {
    private callback;
    constructor(callback: ResizeObserverCallback);
    observe(element: Element): void;
    unobserve(): void;
    disconnect(): void;
}
