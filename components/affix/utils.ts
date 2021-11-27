
export type BindElement = HTMLElement | Window | null | undefined;
export type Rect = ClientRect | DOMRect;


export function getTargetRect(target: BindElement): ClientRect {
    return target !== window
      ? (target as HTMLElement).getBoundingClientRect()
      : ({ top: 0, bottom: window.innerHeight } as ClientRect);
  }
  
  export function getFixedTop(
    targetRect: Rect,
    offsetTop: number | undefined,
  ) {
    if (offsetTop !== undefined && targetRect.top) {
      return offsetTop + targetRect.top;
    }
    return undefined;
  }
  
  export function getFixedBottom(
    targetRect: Rect,
    offsetBottom: number | undefined,
  ) {
    if (offsetBottom !== undefined && targetRect.bottom ) {
      const targetBottomOffset = window.innerHeight - targetRect.bottom;
      return offsetBottom + targetBottomOffset;
    }
    return undefined;
  }
  