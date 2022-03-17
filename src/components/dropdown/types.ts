export interface DropdownItem {
  [key: string]: any
}

export interface DropdownComponent {
  items: DropdownItem[],
  values: DropdownItem[],
  search: string,
  onChange: (updatedItems: DropdownItem[]) => void,
  onInput: (value: string) => void,
  optionalId?: string,
  optionalLabel?: string,
  hideChosen?: boolean,
  isLoading?: boolean,
}

export interface DropdownItemComponent {
  item: DropdownItem,
  isHovered: boolean,
  isSelected: boolean,
  hover: () => void,
  onClick: () => void,
  optionalLabel: string,
}
