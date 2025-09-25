// components/CustomInput.tsx
import type { ReactNode, RefObject } from "react";
import { Input } from "@heroui/react";

export interface ValidationResult {
  isInvalid: boolean;
  errorMessage?: string;
}

export type ValidationError = string | null | undefined;

export interface InputProps {
  children?: ReactNode;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
  validate?: (value: string) => ValidationError | true | null | undefined;
  validationBehavior?: "native" | "aria";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  type?: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left";
  fullWidth?: boolean;
  isClearable?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  baseRef?: RefObject<HTMLDivElement>;
  disableAnimation?: boolean;
  classNames?: Partial<Record<'base' | 'label' | 'inputWrapper' | 'innerWrapper' | 'mainWrapper' | 'input' | 'clearButton' | 'helperWrapper' | 'description' | 'errorMessage', string>>;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export default function CustomInput({
  children,
  variant = "flat",
  color = "default",
  size = "md",
  radius,
  label,
  value,
  defaultValue,
  placeholder,
  description,
  errorMessage,
  validate,
  validationBehavior = "native",
  minLength,
  maxLength,
  pattern,
  type = "text",
  startContent,
  endContent,
  labelPlacement = "inside",
  fullWidth = true,
  isClearable = false,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
  isInvalid = false,
  baseRef,
  disableAnimation = false,
  classNames,
  onChange,
  onClear,
  onFocus,
  onBlur,
  className = ""
}: InputProps) {
  
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Input
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      label={label}
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined} 
      placeholder={placeholder}
      description={description}
      errorMessage={errorMessage}
      validate={validate} // Uncomment if needed for your use case
      validationBehavior={validationBehavior}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      type={type}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
      fullWidth={fullWidth}
      isClearable={isClearable}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      // ref={baseRef} // Uncomment if needed for your use case
      disableAnimation={disableAnimation}
      classNames={classNames}
      onValueChange={handleChange}
      onClear={onClear}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
    >
      {children}
    </Input>
  );
}