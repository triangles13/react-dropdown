import { DropdownItem } from './types';

// eslint-disable-next-line import/prefer-default-export
export function getActiveIndex(
  type: 'increment' | 'decrement',
  props: {
    items: DropdownItem[],
    actualIndex: number,
    hideChosen: boolean,
    isSelected: (item: DropdownItem) => boolean,
  },
): number {
  const {
    items, actualIndex, hideChosen, isSelected,
  } = props;
  switch (type) {
    case 'decrement':
      if (actualIndex - 1 < 0) {
        if (hideChosen && isSelected(items[items.length - 1])) {
          return getActiveIndex(type, { ...props, actualIndex: items.length - 1 });
        }
        return items.length - 1;
      }
      if (hideChosen && isSelected(items[actualIndex - 1])) {
        return getActiveIndex(type, { ...props, actualIndex: actualIndex - 1 });
      }
      return actualIndex - 1;
    case 'increment':
      if (actualIndex + 1 >= items.length) {
        if (hideChosen && isSelected(items[0])) {
          return getActiveIndex(type, { ...props, actualIndex: 0 });
        }
        return 0;
      }
      if (hideChosen && isSelected(items[actualIndex + 1])) {
        return getActiveIndex(type, { ...props, actualIndex: actualIndex + 1 });
      }
      return actualIndex + 1;
    default:
      return -1;
  }
}
