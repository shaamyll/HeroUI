import React, { forwardRef, useState, useMemo } from 'react';
import type { ButtonHTMLAttributes } from 'react';

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
  /** Custom color for the button (hex format) */
  color?: string;
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
  /** Loading text to show when isLoading is true */
  loadingText?: string;
}

// Standardized focus ring color for better accessibility
const FOCUS_RING_COLOR = '#2684FF';

// Helper function to normalize hex color (handle shorthand)
const normalizeHex = (hex: string): string => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    return '#' + cleanHex.split('').map(char => char + char).join('');
  }
  return '#' + cleanHex.padStart(6, '0');
};

// Helper function to validate and parse hex color
const parseHexColor = (hex: string): { r: number; g: number; b: number } | null => {
  try {
    const normalized = normalizeHex(hex);
    const num = parseInt(normalized.slice(1), 16);
    if (isNaN(num)) return null;
    
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  } catch {
    return null;
  }
};

// Helper function to convert RGB back to hex
const rgbToHex = (r: number, g: number, b: number): string => {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Helper function to darken a hex color with better error handling
const darkenColor = (hex: string, amount: number = 20): string => {
  const parsed = parseHexColor(hex);
  if (!parsed) return hex; // Return original if parsing fails
  
  return rgbToHex(
    parsed.r - amount,
    parsed.g - amount,
    parsed.b - amount
  );
};

// Helper function to lighten a hex color with better error handling
const lightenColor = (hex: string, amount: number = 90): string => {
  const parsed = parseHexColor(hex);
  if (!parsed) return hex; // Return original if parsing fails
  
  return rgbToHex(
    parsed.r + amount,
    parsed.g + amount,
    parsed.b + amount
  );
};

// Function to generate variant styles based on color (memoized)
const getVariantStyles = (color: string) => {
  return {
    [BUTTON_VARIANTS.PRIMARY]: {
      default: {
        backgroundColor: color,
        color: 'white',
        border: `1px solid ${color}`,
      },
      hover: {
        backgroundColor: darkenColor(color),
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
        color: color,
        border: `1px solid ${color}`,
      },
      hover: {
        backgroundColor: color,
        color: 'white',
      },
    },
    [BUTTON_VARIANTS.TEXT]: {
      default: {
        backgroundColor: 'transparent',
        color: color,
        border: '1px solid transparent',
      },
      hover: {
        backgroundColor: lightenColor(color),
        color: color,
      },
    },
  };
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

// CSS-in-JS styles to avoid inline style performance issues
const buttonCSS = `
  .button-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.2;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 50px;
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .button-base:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .button-base:not(:disabled) {
    cursor: pointer;
  }

  .button-base:focus-visible {
    transform: scale(1.02);
    box-shadow: 0 0 0 3px ${FOCUS_RING_COLOR}66, 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .button-pressed {
    transform: scale(0.98);
  }

  .button-full-width {
    width: 100%;
  }

  @keyframes button-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .button-loading-spinner {
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: button-spin 1s linear infinite;
  }
`;

// Loading spinner component with better sizing
const LoadingIndicator: React.FC<{ size: number }> = ({ size }) => (
  <div
    className="button-loading-spinner"
    style={{
      width: size,
      height: size,
    }}
    role="progressbar"
    aria-label="Loading"
  />
);

// Main Button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = BUTTON_VARIANTS.OUTLINED,
      size = BUTTON_SIZES.MEDIUM,
      color = '#007AFF',
      disabled = false,
      isLoading = false,
      fullWidth = false,
      className = '',
      onClick,
      loadingText,
      'aria-label': ariaLabel,
      'data-testid': testId,
      type, // Extract type to handle user override
      ...htmlAttributes
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isPressed, setIsPressed] = useState<boolean>(false);

    // Memoize expensive computations
    const variantStyles = useMemo(() => getVariantStyles(color), [color]);
    const currentVariantStyles = variantStyles[variant];
    const currentSizeStyles = sizeStyles[size];
    
    // Memoize active styles
    const activeStyles = useMemo(() => {
      return isHovered ? currentVariantStyles.hover : currentVariantStyles.default;
    }, [isHovered, currentVariantStyles]);

    // Memoize button styles
    const buttonStyles = useMemo((): React.CSSProperties => ({
      minHeight: currentSizeStyles.minHeight,
      padding: currentSizeStyles.padding,
      fontSize: currentSizeStyles.fontSize,
      backgroundColor: activeStyles.backgroundColor,
      color: activeStyles.color,
      border: activeStyles.border,
    }), [currentSizeStyles, activeStyles]);

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
    const handleMouseDown = (): void => setIsPressed(true);
    const handleMouseUp = (): void => setIsPressed(false);

    // Loading indicator size based on button size
    const indicatorSize = useMemo(() => {
      switch (size) {
        case BUTTON_SIZES.SMALL: return 14;
        case BUTTON_SIZES.MEDIUM: return 16;
        case BUTTON_SIZES.LARGE: return 18;
        case BUTTON_SIZES.EXTRA_LARGE: return 20;
        default: return 16;
      }
    }, [size]);

    // Determine button content based on loading state
    const buttonContent = useMemo(() => {
      if (isLoading) {
        return (
          <>
            <LoadingIndicator size={indicatorSize} />
            {loadingText || 'Loading...'}
          </>
        );
      }
      return children;
    }, [isLoading, indicatorSize, loadingText, children]);

    // Build className
    const buttonClassName = useMemo(() => {
      const classes = ['button-base'];
      if (fullWidth) classes.push('button-full-width');
      if (isPressed) classes.push('button-pressed');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [fullWidth, isPressed, className]);

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: buttonCSS }} />
        <button
          ref={ref}
          type={type || 'button'} // Allow user override of type
          disabled={disabled || isLoading}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={buttonStyles}
          className={buttonClassName}
          aria-label={ariaLabel}
          aria-disabled={disabled || isLoading}
          aria-busy={isLoading}
          data-testid={testId}
          {...htmlAttributes}
        >
          {buttonContent}
        </button>
      </>
    );
  }
);

Button.displayName = 'Button';

export default Button;