import * as React from 'react';
import { IResizableOption, directionGroupMap, windowEventTypes } from './types';
export type { IResizableOption } from './types';
import { getPositionFromMouseOrTouch, reducer, resizableActions } from './reducer';

export default function useResizable(option: IResizableOption) {
  const ref = React.useRef<HTMLElement & HTMLDivElement>(null);
  const [state, actions] = React.useReducer(reducer, option);
  const group = directionGroupMap[state.direction];

  const handleStartMove = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      actions({
        type: 'start',
        payload: {
          position: getPositionFromMouseOrTouch(group, event.nativeEvent),
        },
      });
    },
    [group, resizableActions['start']],
  );

  React.useEffect(() => {
    if (!option.size && ref.current) {
      actions({
        type: 'init',
        payload: {
          size: group === 'vertical' ? ref.current.offsetHeight : ref.current.offsetWidth,
        },
      });
    }
  }, [option.size, group]);

  React.useEffect(() => {
    const dispatchEvent = (event: MouseEvent | TouchEvent) => {
      if (event.type.includes('move')) {
        actions({
          type: 'move',
          payload: {
            position: getPositionFromMouseOrTouch(group, event),
          },
        });
      } else {
        actions({
          type: 'end',
          payload: {},
        });
      }
    };

    if (state.isMove) {
      windowEventTypes.forEach((type) => window.addEventListener(type, dispatchEvent));
      document.body.style.userSelect = 'none';
      document.body.style.cursor = group === 'vertical' ? 'row-resize' : 'col-resize';
    }

    return () => {
      windowEventTypes.forEach((type) => window.removeEventListener(type, dispatchEvent));
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [state.isMove, group]);

  return {
    ref,
    size: state.size,
    handler: handleStartMove,
  };
}
