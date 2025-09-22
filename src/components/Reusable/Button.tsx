import React, { forwardRef,  } from 'react';
import type{ ButtonHTMLAttributes } from 'react';

// Define button variants and sizes as constants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINED: 'outlined',
  TEXT: 'text',
} as const;

export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large',
} as const;

// Type definitions
export type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS];
export type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Button content */
  children: React.ReactNode;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// Style configurations for different variants
const variantStyles = {
  [BUTTON_VARIANTS.PRIMARY]: {
    default: {
      backgroundColor: '#007AFF',
      color: 'white',
      border: '1px solid #007AFF',
    },
    hover: {
      backgroundColor: '#0056CC',
      color: 'white',
    },
  },
  [BUTTON_VARIANTS.SECONDARY]: {
    default: {
      backgroundColor: '#F2F2F7',
      color: '#000000',
      border: '1px solid #F2F2F7',
    },
    hover: {
      backgroundColor: '#E5E5EA',
      color: '#000000',
    },
  },
  [BUTTON_VARIANTS.OUTLINED]: {
    default: {
      backgroundColor: 'transparent',
      color: '#007AFF',
      border: '1px solid #007AFF',
    },
    hover: {
      backgroundColor: '#007AFF',
      color: 'white',
    },
  },
  [BUTTON_VARIANTS.TEXT]: {
    default: {
      backgroundColor: 'transparent',
      color: '#007AFF',
      border: '1px solid transparent',
    },
    hover: {
      backgroundColor: '#F2F2F7',
      color: '#007AFF',
    },
  },
};

const sizeStyles = {
  [BUTTON_SIZES.SMALL]: {
    padding: '8px 16px',
    fontSize: '14px',
    minHeight: '32px',
  },
  [BUTTON_SIZES.MEDIUM]: {
    padding: '12px 24px',
    fontSize: '16px',
    minHeight: '44px',
  },
  [BUTTON_SIZES.LARGE]: {
    padding: '16px 32px',
    fontSize: '18px',
    minHeight: '52px',
  },
  [BUTTON_SIZES.EXTRA_LARGE]: {
    padding: '20px 40px',
    fontSize: '20px',
    minHeight: '60px',
  },
};

// Loading spinner component
const LoadingIndicator: React.FC<{ size: number }> = ({ size }) => (
  <>
    <style>
      {`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <div
      style={{
        width: size,
        height: size,
        border: '2px solid transparent',
        borderTop: '2px solid currentColor',
        borderRadius: '50%',
        animation: 'rotate 1s linear infinite',
      }}
      role="progressbar"
      aria-label="Loading"
    />
  </>
);

// Main Button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = BUTTON_VARIANTS.OUTLINED,
      size = BUTTON_SIZES.MEDIUM,
      disabled = false,
      isLoading = false,
      fullWidth = false,
      className = '',
      onClick,
      'aria-label': ariaLabel,
      'data-testid': testId,
      ...htmlAttributes
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [isPressed, setIsPressed] = React.useState<boolean>(false);

    // Get styles based on variant and size
    const currentVariantStyles = variantStyles[variant];
    const currentSizeStyles = sizeStyles[size];
    const activeStyles = isHovered ? currentVariantStyles.hover : currentVariantStyles.default;

    // Handle click with loading and disabled states
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (disabled || isLoading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // Handle mouse events
    const handleMouseEnter = (): void => setIsHovered(true);
    const handleMouseLeave = (): void => {
      setIsHovered(false);
      setIsPressed(false);
    };
    const handleFocus = (): void => setIsFocused(true);
    const handleBlur = (): void => setIsFocused(false);
    const handleMouseDown = (): void => setIsPressed(true);
    const handleMouseUp = (): void => setIsPressed(false);

    // Determine if button is interactive
    const isInteractive = !disabled && !isLoading;

    // Base button styles
    const buttonStyles: React.CSSProperties = {
      // Layout
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: fullWidth ? '100%' : 'auto',
      minHeight: currentSizeStyles.minHeight,
      padding: currentSizeStyles.padding,
      
      // Typography
      fontSize: currentSizeStyles.fontSize,
      fontWeight: '500',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.2',
      textAlign: 'center',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      
      // Appearance
      backgroundColor: activeStyles.backgroundColor,
      color: activeStyles.color,
      border: activeStyles.border,
      borderRadius: '50px',
      
      // Interactions
      cursor: isInteractive ? 'pointer' : 'not-allowed',
      outline: 'none',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      
      // Transitions
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      
      // States
      opacity: disabled ? 0.6 : 1,
      transform: isPressed ? 'scale(0.98)' : isFocused ? 'scale(1.02)' : 'scale(1)',
      boxShadow: isFocused 
        ? `0 0 0 3px ${activeStyles.color}33` 
        : '0 1px 3px rgba(0, 0, 0, 0.1)',
    };

    // Loading indicator size based on button size
    const indicatorSize = size === BUTTON_SIZES.SMALL ? 14 : 
                         size === BUTTON_SIZES.MEDIUM ? 16 : 
                         size === BUTTON_SIZES.LARGE ? 18 : 20;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={buttonStyles}
        className={className}
        aria-label={ariaLabel}
        aria-disabled={disabled || isLoading}
        data-testid={testId}
        {...htmlAttributes}
      >
        {isLoading && <LoadingIndicator size={indicatorSize} />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;