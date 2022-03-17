import classNames from 'classnames';
import { DropdownItemComponent } from './types';

function DropdownItem(
  {
    item,
    hover,
    onClick,
    isHovered,
    isSelected,
    optionalLabel,
  }
  :DropdownItemComponent,
) {
  return (
    <div
      className={classNames(
        'dropdown-item',
        isHovered && 'dropdown-item_hovered',
        isSelected && 'dropdown-item_selected',
      )}
      onMouseOver={hover}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
    >
      { item[optionalLabel] }
    </div>
  );
}

export default DropdownItem;
