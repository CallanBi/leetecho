import { createCmdKey } from '@milkdown/core';
import {
  EditorState,
  EditorView,
  liftListItem,
  MarkType,
  redo,
  setBlockType,
  sinkListItem,
  TextSelection,
  undo,
  wrapIn,
} from '@milkdown/prose';

import { CmdKey, commandsCtx, Ctx, ThemeColor, ThemeIcon } from '@milkdown/core';
import type { Color, Icon } from '@milkdown/design-system';

export type ButtonConfig<T = any> = {
  type: 'button';
  icon: Icon;
  active?: (view: EditorView) => boolean;
  key: CmdKey<T> | string;
  options?: T;
} & CommonConfig;

type SelectOptions = {
  id: string;
  text: string;
};

export type SelectConfig<T = any> = {
  type: 'select';
  text: string;
  options: SelectOptions[];
  active?: (view: EditorView) => string;
  onSelect: (id: string, view: EditorView) => [key: CmdKey<T> | string, info?: T];
} & CommonConfig;

export type CommonConfig = {
  disabled?: (view: EditorView) => boolean;
};

export type ConfigItem = SelectConfig | ButtonConfig;

export type Config = Array<Array<ConfigItem>>;

const hasMark = (state: EditorState, type: MarkType): boolean => {
  if (!type) return false;
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    return !!type.isInSet(state.storedMarks || $from.marks());
  }
  return state.doc.rangeHasMark(from, to, type);
};

export const SelectParent = createCmdKey('SelectParent');

export const menuConfig: Config = [
  // [
  //     {
  //         type: 'select',
  //         text: 'Heading',
  //         options: [
  //             { id: '1', text: 'Large Heading' },
  //             { id: '2', text: 'Medium Heading' },
  //             { id: '3', text: 'Small Heading' },
  //             { id: '0', text: 'Plain Text' },
  //         ],
  //         disabled: (view) => {
  //             const { state } = view;
  //             const setToHeading = (level: number) => setBlockType(state.schema.nodes.heading, { level })(state);
  //             return (
  //                 !(view.state.selection instanceof TextSelection) ||
  //                 !(setToHeading(1) || setToHeading(2) || setToHeading(3))
  //             );
  //         },
  //         onSelect: (id) => (id ? ['TurnIntoHeading', Number(id)] : ['TurnIntoText', null]),
  //     },
  // ],
  [
    {
      type: 'button',
      icon: 'undo',
      key: 'Undo',
      disabled: (view) => {
        return !undo(view.state);
      },
    },
    {
      type: 'button',
      icon: 'redo',
      key: 'Redo',
      disabled: (view) => {
        return !redo(view.state);
      },
    },
  ],
  [
    {
      type: 'button',
      icon: 'bold',
      key: 'ToggleBold',
      active: (view) => hasMark(view.state, view.state.schema.marks.strong),
      disabled: (view) => !view.state.schema.marks.strong,
    },
    {
      type: 'button',
      icon: 'italic',
      key: 'ToggleItalic',
      active: (view) => hasMark(view.state, view.state.schema.marks.em),
      disabled: (view) => !view.state.schema.marks.em,
    },
    {
      type: 'button',
      icon: 'strikeThrough',
      key: 'ToggleStrikeThrough',
      active: (view) => hasMark(view.state, view.state.schema.marks.strike_through),
      disabled: (view) => !view.state.schema.marks.strike_through,
    },
  ],
  [
    {
      type: 'button',
      icon: 'bulletList',
      key: 'WrapInBulletList',
      disabled: (view) => {
        const { state } = view;
        return !wrapIn(state.schema.nodes.bullet_list)(state);
      },
    },
    {
      type: 'button',
      icon: 'orderedList',
      key: 'WrapInOrderedList',
      disabled: (view) => {
        const { state } = view;
        return !wrapIn(state.schema.nodes.ordered_list)(state);
      },
    },
    {
      type: 'button',
      icon: 'taskList',
      key: 'TurnIntoTaskList',
      disabled: (view) => {
        const { state } = view;
        return !wrapIn(state.schema.nodes.task_list_item)(state);
      },
    },
    {
      type: 'button',
      icon: 'liftList',
      key: 'LiftListItem',
      disabled: (view) => {
        const { state } = view;
        return !liftListItem(state.schema.nodes.list_item)(state);
      },
    },
    {
      type: 'button',
      icon: 'sinkList',
      key: 'SinkListItem',
      disabled: (view) => {
        const { state } = view;
        return !sinkListItem(state.schema.nodes.list_item)(state);
      },
    },
  ],
  [
    {
      type: 'button',
      icon: 'link',
      key: 'ToggleLink',
      active: (view) => hasMark(view.state, view.state.schema.marks.link),
    },
    {
      type: 'button',
      icon: 'image',
      key: 'InsertImage',
    },
    {
      type: 'button',
      icon: 'table',
      key: 'InsertTable',
    },
    {
      type: 'button',
      icon: 'code',
      key: 'TurnIntoCodeFence',
    },
  ],
  [
    {
      type: 'button',
      icon: 'quote',
      key: 'WrapInBlockquote',
    },
    {
      type: 'button',
      icon: 'divider',
      key: 'InsertHr',
    },
    {
      type: 'button',
      icon: 'select',
      key: SelectParent,
    },
  ],
];
