import { IResizableState, directionCalcMap, ResizeDirectionGroup, ResizableActionType } from './types';
import * as React from 'react';

function eventIsTouch(event: Event): event is TouchEvent {
  return event.type.includes('touch');
}

export function getPositionFromMouseOrTouch(direction: ResizeDirectionGroup, event: MouseEvent | TouchEvent) {
  if (eventIsTouch(event)) {
    return direction === 'vertical' ? event.touches[0].screenY : event.touches[0].screenX;
  } else {
    return direction === 'vertical' ? event.screenY : event.screenX;
  }
}

export const resizableActions = {
  init(state: IResizableState, payload: { size: number }): IResizableState {
    return {
      ...state,
      size: payload.size,
    };
  },
  start(state: IResizableState, payload: { position: number }): IResizableState {
    return {
      ...state,
      isMove: true,
      position: payload.position,
      initSize: state.size,
    };
  },
  move(state: IResizableState, payload: { position: number }): IResizableState {
    if (!state.isMove || state.position === undefined || state.initSize === undefined) {
      return state;
    }
    const calc = directionCalcMap[state.direction];
    let size = state.initSize + (payload.position - state.position) * calc;
    if (state.maxSize && size > state.maxSize) {
      size = state.maxSize;
    }
    if (state.minSize && size < state.minSize) {
      size = state.minSize;
    }
    return {
      ...state,
      size,
    };
  },
  end(state: IResizableState): IResizableState {
    return {
      ...state,
      isMove: false,
      initSize: undefined,
    };
  },
};

export const reducer: React.Reducer<IResizableState, ResizableActionType> = (state, action) => {
  const { type, payload } = action;
  return resizableActions[type](state, payload as unknown as { size: number; position: number });
};
