export type ResizeDirection = 'left' | 'right' | 'up' | 'down' | 'top' | 'bottom';
export type ResizeDirectionGroup = 'horizontal' | 'vertical';

export interface IResizableOption {
  direction: ResizeDirection;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

export interface IResizableState extends IResizableOption {
  position?: number;
  initSize?: number;
  isMove?: boolean;
}

export const directionGroupMap: Record<ResizeDirection, ResizeDirectionGroup> = {
  left: 'horizontal',
  right: 'horizontal',
  up: 'vertical',
  down: 'vertical',
  top: 'vertical',
  bottom: 'vertical',
};

export const directionCalcMap: Record<ResizeDirection, number> = {
  left: -1,
  right: 1,
  up: -1,
  down: 1,
  top: -1,
  bottom: 1,
};

export const windowEventTypes = ['mousemove', 'touchmove', 'mouseup', 'touchend'];

export type ResizableActionType = {
  type: 'init' | 'start' | 'move' | 'end';
  payload: { size: number } | { position: number } | Record<string, never>;
};
