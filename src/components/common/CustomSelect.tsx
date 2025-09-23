// components/CustomSelect.tsx
import type { ReactNode, RefObject } from "react";
import { Select, SelectItem } from "@heroui/react";
import type { Key } from "@react-types/shared";

export interface SelectItem {
  key: string;
  label: string;
  disabled?: boolean;
  value: any;
}

export interface ValidationResult {
  isInvalid: boolean;
  errorMessage?: string;
}

export type RenderValueFunction = (items: SelectItem[]) => ReactNode;

export interface SelectProps {
  children?: ReactNode[];
  items?: SelectItem[];
  selectedKeys?: "all" | Iterable<Key>;
  disabledKeys?: Iterable<Key>;
  defaultSelectedKeys?: "all" | Iterable<Key>;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  placeholder?: string;
  labelPlacement?: "inside" | "outside" | "outside-left";
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
  startContent?: ReactNode;
  endContent?: ReactNode;
  selectorIcon?: ReactNode;
  scrollRef?: RefObject<HTMLElement>;
  spinnerRef?: RefObject<HTMLElement>;
  maxListboxHeight?: number;
  itemHeight?: number;
  isVirtualized?: boolean;
  fullWidth?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isMultiline?: boolean;
  isInvalid?: boolean;
  isClearable?: boolean;
  validationState?: "valid" | "invalid";
  showScrollIndicators?: boolean;
  autoFocus?: boolean;
  disallowEmptySelection?: boolean;
  disableAnimation?: boolean;
  disableSelectorIconRotation?: boolean;
  hideEmptyContent?: boolean;
  popoverProps?: any; // You can create a specific interface for PopoverProps if needed
  listboxProps?: any; // You can create a specific interface for ListboxProps if needed
  scrollShadowProps?: any; // You can create a specific interface for ScrollShadowProps if needed
  classNames?: Partial<Record<"base" | "label" | "trigger" | "mainWrapper" | "innerWrapper" | "selectorIcon" | "value" | "listboxWrapper" | "listbox" | "popoverContent" | "helperWrapper" | "description" | "errorMessage", string>>;
  selectionMode?: "single" | "multiple";
  
  // Events
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onSelectionChange?: (keys: "all" | (Set<Key> & {anchorKey?: string; currentKey?: string})) => void;
  onClear?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  renderValue?: RenderValueFunction;
  
  className?: string;
}

export default function CustomSelect({
  children,
  items = [],
  selectionMode = "single",
  selectedKeys,
  disabledKeys,
  defaultSelectedKeys,
  variant = "flat",
  color = "default",
  size = "md",
  radius,
  placeholder = "Select an option",
  labelPlacement = "inside",
  label,
  description,
  errorMessage,
  startContent,
  endContent,
  selectorIcon,
  scrollRef,
  spinnerRef,
  maxListboxHeight = 256,
  itemHeight = 32,
  isVirtualized,
  fullWidth = true,
  isOpen,
  defaultOpen,
  isRequired = false,
  isDisabled = false,
  isMultiline = false,
  isInvalid = false,
  isClearable = false,
  validationState,
  showScrollIndicators = true,
  autoFocus = false,
  disallowEmptySelection = false,
  disableAnimation = true,
  disableSelectorIconRotation = false,
  hideEmptyContent = false,
  popoverProps,
  listboxProps,
  scrollShadowProps,
  classNames,
  onClose,
  onOpenChange,
  onSelectionChange,
  onClear,
  onChange,
  renderValue,
  className = ""
}: SelectProps) {
  
  // If children are provided, use them, otherwise generate SelectItems from items array
  const renderSelectItems = () => {
    if (children) {
      return children;
    }
    
    return items.map((item: SelectItem) => (
      <SelectItem 
        key={item.key} 
        textValue={item.label}
        isDisabled={item.disabled}
      >
        {item.label}
      </SelectItem>
    ));
  };

  return (
    <Select
      // Basic props
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      label={label}
      description={description}
      errorMessage={errorMessage}
      startContent={startContent}
      endContent={endContent}
      selectorIcon={selectorIcon}
      
      // Selection props
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      disabledKeys={disabledKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      
      // Layout props
      fullWidth={fullWidth}
      isMultiline={isMultiline}
      maxListboxHeight={maxListboxHeight}
      itemHeight={itemHeight}
      isVirtualized={isVirtualized}
      
      // State props
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isClearable={isClearable}
      validationState={validationState}
      
      // Behavior props
      showScrollIndicators={showScrollIndicators}
      autoFocus={autoFocus}
      disallowEmptySelection={disallowEmptySelection}
      disableAnimation={disableAnimation}
      disableSelectorIconRotation={disableSelectorIconRotation}
      hideEmptyContent={hideEmptyContent}
      
      // Refs
      scrollRef={scrollRef}
      spinnerRef={spinnerRef}
      
      // Additional component props
      popoverProps={popoverProps}
      listboxProps={listboxProps}
      scrollShadowProps={scrollShadowProps}
      classNames={classNames}
      
      // Events
      onClose={onClose}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
      onClear={onClear}
      onChange={onChange}
      renderValue={
        renderValue
          ? (selectedItems => {
              // Map SelectedItems<object> to SelectItem[]
              const mappedItems = Array.isArray(selectedItems)
                ? selectedItems.map((item: any) => {
                    // Try to find the matching SelectItem from items by key
                    const found = items.find(i => i.key === item.key);
                    return found || {
                      key: item.key,
                      label: item.textValue ?? String(item.key),
                      value: item.key,
                      disabled: item.isDisabled
                    };
                  })
                : [];
              return renderValue(mappedItems);
            })
          : undefined
      }
      
      className={className}
    >
      {renderSelectItems()}
    </Select>
  );
}