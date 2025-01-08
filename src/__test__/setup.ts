class MockResizeObserver {
  private callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(element: Element) {
    if (!element.classList.contains('virt-list__client')) {
      return;
    }
    // 触发一个初始的回调，提供默认尺寸
    const entry = {
      target: element,
      contentRect: {
        width: 800,
        height: 400,
      },
      borderBoxSize: [
        {
          inlineSize: 100,
          blockSize: 100,
        },
      ],
      contentBoxSize: [
        {
          inlineSize: 100,
          blockSize: 100,
        },
      ],
      devicePixelContentBoxSize: [
        {
          inlineSize: 100,
          blockSize: 100,
        },
      ],
    } as unknown as ResizeObserverEntry;

    this.callback([entry], this as unknown as ResizeObserver);
  }

  unobserve() {}

  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
