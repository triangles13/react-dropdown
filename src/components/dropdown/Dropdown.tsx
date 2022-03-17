import './dropdown.scss';
import {
  useState,
  useReducer,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import useClickOutside from '../../helpers/useClickOutside';
import useGlobalKeydown from '../../helpers/useGlobalKeydown';
import DropdownItemComponent from './DropdownItem';
import { DropdownItem, DropdownComponent } from './types';
import { getActiveIndex } from './helpers';

Dropdown.defaultProps = {
  optionalLabel: 'label',
  optionalId: 'id',
  hideChosen: false,
  isLoading: false,
};
function Dropdown(
  {
    items,
    values,
    onChange,
    onInput,
    search,
    optionalLabel = Dropdown.defaultProps.optionalLabel,
    optionalId = Dropdown.defaultProps.optionalId,
    hideChosen = Dropdown.defaultProps.hideChosen,
    isLoading = Dropdown.defaultProps.isLoading,
  }
  : DropdownComponent,
) {
  const [dropdownState, setDropdownState] = useState(false);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);
  const [addClickOutside, removeClickOutside] = useClickOutside(dropdownRef);
  const [activeIndexState, activeIndexDispatch] = useReducer((
    actualIndex: number,
    action: {
      type: 'increment' | 'decrement' | 'set',
      value?: number
    },
  ): number => {
    if (items.length === values.length) {
      return -1;
    }
    switch (action.type) {
      case 'increment':
      case 'decrement':
        return getActiveIndex(
          action.type,
          {
            items,
            actualIndex,
            hideChosen,
            isSelected,
          },
        );
      case 'set':
        return action.value!;
      default:
        return actualIndex;
    }
  }, -1);
  const toggleItem = (item: DropdownItem) => {
    const updatedValues = [...values];
    const index = values.findIndex((value) => value[optionalId] === item[optionalId]);
    if (~index) {
      updatedValues.splice(index, 1);
    } else {
      updatedValues.push(item);
    }
    onChange(updatedValues);
    setDropdownState(false);
  };
  const [initKeydown, removeKeydown] = useGlobalKeydown((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        if (items[activeIndexState]) {
          toggleItem(items[activeIndexState]);
        }

        return;
      case 'Tab':
      case 'Escape':
        setDropdownState(false);

        return;
      // управление стрелочкми вверх/вниз
      case 'ArrowUp':
        activeIndexDispatch({ type: 'decrement' });

        return;
      case 'ArrowDown':
        activeIndexDispatch({ type: 'increment' });

        return;
    }
  }, [values, activeIndexState, items]);
  function isSelected(item: DropdownItem) {
    return !!(item && values.find((value) => item[optionalId] === value[optionalId]));
  }
  // Проработал момент, чтобы активный элемент всегда был видимым для пользователя
  useEffect(() => {
    if (activeIndexState < 0) {
      return;
    }
    const activeElementPosition = (
      (listRef.current! as HTMLElement).children[activeIndexState] as HTMLElement
    ).offsetTop;
    const scrollPosition = (listRef.current! as HTMLElement).scrollTop;
    if (
      activeElementPosition < scrollPosition
      || activeElementPosition > (listRef.current! as HTMLElement).offsetHeight + scrollPosition
    ) {
      (listRef.current! as HTMLElement).children[activeIndexState].scrollIntoView();
    }
  }, [activeIndexState]);
  function closeDropdown() {
    activeIndexDispatch({ type: 'set', value: -1 });
    removeClickOutside();
    removeKeydown();
  }
  function openDropdown() {
    addClickOutside(() => setDropdownState(false));
    initKeydown();
  }
  useEffect(() => {
    if (dropdownState) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }, [dropdownState]);
  return (
    <div
      ref={dropdownRef}
      className={classNames(
        'dropdown',
        dropdownState && 'dropdown_active',
      )}
    >
      <div className="dropdown__value">
        {
          values.map((item) => (
            <div
              className="dropdown__value-item"
              key={item[optionalId]}
            >
              { item[optionalLabel] }
              <span
                className="dropdown__value-delete"
                onClick={() => toggleItem(item)}
                role="button"
              >
                close
              </span>
            </div>
          ))
        }
        <input
          className="dropdown__field"
          type="text"
          onClick={() => setDropdownState(!dropdownState)}
          onChange={(event) => onInput(event.target.value)}
          value={search}
        />
      </div>
      { dropdownState && (
        <div
          className="dropdown__list"
          ref={listRef}
        >
          {
            !isLoading && items.map((item, index) => (
              <div
                key={item[optionalId]}
                style={{
                  display: hideChosen && isSelected(item) ? 'none' : undefined,
                }}
              >
                <DropdownItemComponent
                  item={item}
                  onClick={() => toggleItem(item)}
                  hover={() => activeIndexDispatch({ type: 'set', value: index })}
                  isHovered={activeIndexState === index}
                  isSelected={isSelected(item)}
                  optionalLabel={optionalLabel}
                />
              </div>
            ))
          }
          {
            isLoading && (
              <div className="dropdown__loader">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="32"
                    fill="none"
                    strokeDasharray="50.26548245743669 50.26548245743669"
                    strokeWidth={8}
                  >
                    <animateTransform
                      attributeName="transform"
                      dur="1s"
                      keyTimes="0;1"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 50 50;360 50 50"
                    />
                  </circle>
                </svg>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

export default Dropdown;
