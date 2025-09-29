import React, { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { HomeIcon } from "lucide-react";
import Dock from '../ui/Dock'; // Import your Dock component
import type { DockItemData } from '../ui/Dock';
import DotGrid from "../DotGrid";
import ErrorBoundary from './ErrorBoundary';
import { clsx } from 'clsx';

// SSR-safe utility functions
const isSSR = typeof window === 'undefined';
const isDocumentAvailable = typeof document !== 'undefined';
const isNavigatorAvailable = typeof navigator !== 'undefined';

// Safe window access
const safeWindow = isSSR ? null : window;
const safeDocument = isDocumentAvailable ? document : null;
const safeNavigator = isNavigatorAvailable ? navigator : null;

// Safe URL validation for bgImage
const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    // Allow data URLs, blob URLs, and same-origin URLs
    return urlObj.protocol === 'data:' || 
           urlObj.protocol === 'blob:' || 
           urlObj.protocol === 'https:' ||
           (urlObj.protocol === 'http:' && urlObj.hostname === 'localhost');
  } catch {
    return false;
  }
};

interface Tab {
  id: string;
  name: string;
  icon?: React.ReactNode;
  path: string;
  isActive?: boolean;
}

interface ActionButton {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  permissions?: string[];
}

interface DashboardHeaderProps {
  // Basic header info
  title: string;
  subtitle: string;

  // Tabs configuration - now converted to dock items
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;

  // Action buttons
  actionButtons?: ActionButton[];

  // Mobile configuration
  showMobileNav?: boolean;
  mobileBreakpoint?: number;

  // Mobile floating buttons
  mobileFloatingButtons?: ActionButton[];

  // User permissions (optional)
  userPermissions?: string[];

  // Styling
  bgColor?: string;
  bgImage?: string; // Should be a safe URL (validated internally)
  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;

  // Additional content (like brand selector)
  additionalContent?: React.ReactNode;

  // Dock configuration
  dockProps?: {
    distance?: number;
    panelHeight?: number;
    baseItemSize?: number;
    dockHeight?: number;
    magnification?: number;
    spring?: {
      mass?: number;
      stiffness?: number;
      damping?: number;
    };
    offsetTop?: number; // Negative margin to lift dock (default: -96px = -mt-24)
  };

  // DotGrid configuration
  dotGridConfig?: {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    shockRadius?: number;
    shockStrength?: number;
    resistance?: number;
    returnDuration?: number;
    opacity?: number;
    enabled?: boolean;
  };
}

// Simple Mobile Navigation (kept for mobile fallback)
const SimpleMobileNav: React.FC<{
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-40">
      <div className="flex justify-around">
        {tabs.slice(0, 5).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
              activeTab === tab.id
                ? 'text-violet-600 bg-violet-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.icon}
            <span className="mt-1 truncate max-w-12">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Permission wrapper component
const PermissionWrapper: React.FC<{
  userPermissions: string[];
  requiredPermissions: string[];
  children: React.ReactNode;
}> = ({ userPermissions, requiredPermissions, children }) => {
  const hasPermission = requiredPermissions.length === 0 ||
    requiredPermissions.some(permission => userPermissions.includes(permission));

  return hasPermission ? <>{children}</> : null;
};

// Reusable Action Button component (memoized for performance)
const ActionButtonComponent = memo<{
  button: ActionButton;
  userPermissions: string[];
  className?: string;
  onClick?: () => void;
  role?: string;
}>(({ button, userPermissions, className, onClick, role }) => {
  const handleClick = useCallback(() => {
    button.onClick();
    onClick?.();
  }, [button.onClick, onClick]);

  return (
    <PermissionWrapper
      userPermissions={userPermissions}
      requiredPermissions={button.permissions || []}
    >
      <button
        type="button"
        onClick={handleClick}
        className={className}
        aria-label={button.label}
        role={role}
      >
        {button.icon}
        {button.label}
      </button>
    </PermissionWrapper>
  );
});

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  actionButtons = [],
  showMobileNav = true,
  mobileBreakpoint = 768,
  mobileFloatingButtons = [],
  userPermissions = [],
  bgColor = "bg-violet-950",
  bgImage,
  headerClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  additionalContent,
  dockProps = {},
  dotGridConfig = {
    dotSize: 2,
    gap: 9,
    baseColor: '#FAF5F7',
    activeColor: '#FAF5F7',
    proximity: 100,
    shockRadius: 250,
    shockStrength: 5,
    resistance: 750,
    returnDuration: 1.5,
    opacity: 0.2,
    enabled: true
  }
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Check mobile breakpoint and device capabilities
  useEffect(() => {
    // Skip if we're on the server (SSR)
    if (isSSR || !safeWindow) {
      return;
    }

    const checkMobile = () => {
      setIsMobile(safeWindow!.innerWidth < mobileBreakpoint);
    };

    const checkDeviceCapabilities = () => {
      if (!safeWindow || !safeNavigator) return;
      
      // Detect low-power devices
      const isLowPower = 
        // Check for reduced motion preference
        safeWindow.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        // Check for low-end mobile devices (basic heuristics)
        (safeNavigator.hardwareConcurrency && safeNavigator.hardwareConcurrency <= 2) ||
        // Check for slow connection (with proper type checking)
        ('connection' in safeNavigator && (safeNavigator as any).connection?.effectiveType === 'slow-2g');
      
      setIsLowPowerDevice(isLowPower);
    };

    checkMobile();
    checkDeviceCapabilities();
    
    safeWindow.addEventListener('resize', checkMobile);
    return () => safeWindow.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  // Handle mobile action menu
  useEffect(() => {
    // Skip if we're on the server (SSR)
    if (isSSR || !safeDocument) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      
      // Check if target is an HTMLElement before calling closest
      if (!target || !(target instanceof HTMLElement)) {
        return;
      }

      if (
        isActionMenuOpen &&
        !target.closest('#mobile-action-menu') &&
        !target.closest('#mobile-fab')
      ) {
        setIsActionMenuOpen(false);
      }
    };

    safeDocument.addEventListener('mousedown', handleClickOutside);
    return () => {
      safeDocument.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionMenuOpen]);

  const toggleActionMenu = useCallback(() => {
    setIsActionMenuOpen(!isActionMenuOpen);
  }, [isActionMenuOpen]);

  // Handle keyboard navigation and focus trap for mobile action menu
  useEffect(() => {
    if (!isActionMenuOpen || isSSR || !safeDocument) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsActionMenuOpen(false);
        fabRef.current?.focus();
        return;
      }

      // Focus trap: keep focus within the menu
      if (event.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab
          if (safeDocument.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (safeDocument.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    safeDocument.addEventListener('keydown', handleKeyDown);
    
    // Focus first menu item when menu opens
    const firstMenuItem = menuRef.current?.querySelector('button[role="menuitem"]') as HTMLElement;
    firstMenuItem?.focus();

    return () => {
      safeDocument.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActionMenuOpen]);

  // Filter action buttons based on permissions (memoized)
  const getFilteredButtons = useCallback((buttons: ActionButton[]) => {
    return buttons.filter(button => {
      if (!button.permissions || button.permissions.length === 0) return true;
      return button.permissions.some(permission => userPermissions.includes(permission));
    });
  }, [userPermissions]);

  const filteredActionButtons = useMemo(() => getFilteredButtons(actionButtons), [actionButtons, getFilteredButtons]);
  const filteredMobileButtons = useMemo(() => getFilteredButtons(mobileFloatingButtons), [mobileFloatingButtons, getFilteredButtons]);

  // Convert tabs to dock items with text labels (memoized for performance)
  const dockItems: DockItemData[] = useMemo(() => 
    tabs.map(tab => ({
      icon: (
        <div className="flex items-center">
          {tab.icon || <HomeIcon size={20} />}
         <span className="ml-2 text-sm font-black">{tab.name}</span>
        </div>
      ),
      label: tab.name,
      onClick: () => onTabChange(tab.id),
      className: clsx(
        activeTab === tab.id ? 'bg-white/20 ring-2 ring-white/50' : 'hover:bg-white/15'
      )
    })), [tabs, activeTab, onTabChange]
  );

  const headerStyle = useMemo(() => {
    if (bgImage && isValidImageUrl(bgImage)) {
      return { 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      };
    }
    return {};
  }, [bgImage]);

  return (
    <div className="mb-8 pt-8">
      {/* Main Header without dock */}
      <div
        style={headerStyle}
        className={`relative flex flex-col items-center justify-between overflow-hidden rounded-xl ${bgColor} text-white transition-all duration-300 ease-in-out ${headerClassName} py-2 h-[190px] max-w-7xl mx-auto`}
      >

        {/* DotGrid Background Animation */}
        {dotGridConfig.enabled && !isLowPowerDevice && (
          <div
            className="absolute inset-0 pointer-events-none -m-4"
            style={{ opacity: dotGridConfig.opacity }}
          >
            <ErrorBoundary
              fallback={<div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-200 opacity-20" />}
            >
              <DotGrid
                dotSize={dotGridConfig.dotSize}
                gap={dotGridConfig.gap}
                baseColor={dotGridConfig.baseColor}
                activeColor={dotGridConfig.activeColor}
                proximity={dotGridConfig.proximity}
                shockRadius={dotGridConfig.shockRadius}
                shockStrength={dotGridConfig.shockStrength}
                resistance={dotGridConfig.resistance}
                returnDuration={dotGridConfig.returnDuration}
                className="absolute inset-0"
              />
            </ErrorBoundary>
          </div>
        )}

        {/* Header Content */}
        <div className="relative flex w-full flex-col items-center justify-between p-2 sm:p-1 sm:flex-row z-10">
          {/* Title Section */}
          <div className="flex-1 text-center sm:text-left px-4">
            <h1 className={`mb-1 mt-2 text-2xl font-bold sm:text-3xl ${titleClassName}`}>
              {title}
            </h1>
            <p className={`text-white/90 ${subtitleClassName}`}>
              {subtitle}
            </p>
          </div>

          {/* Additional Content (like brand selector) */}
          {additionalContent && (
            <div className="relative z-30 flex w-full items-center justify-center md:w-auto">
              {additionalContent}
            </div>
          )}

          {/* Desktop Action Buttons */}
          {filteredActionButtons.length > 0 && (
            <div 
              className="hidden lg:flex gap-3 relative z-20 px-4"
              role="group"
              aria-label="Action buttons"
            >
              {filteredActionButtons.map((button) => (
                <ActionButtonComponent
                  key={button.id}
                  button={button}
                  userPermissions={userPermissions}
                  className={clsx(
                    'inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    button.variant === 'secondary'
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-white text-gray-900 hover:bg-gray-100',
                    button.className
                  )}
                />
              ))}
            </div>
          )}
        </div>
        {/* Desktop Dock Navigation - Back inside the header container with REAL magnification */}
        {!isMobile && dockItems.length > 0 && (
          <nav 
            className="relative w-full px-3 sm:px-4 z-20"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Reserve space for magnified dock to prevent container resize */}
            <div
              className="flex justify-center"
              style={{
                height: `${(dockProps.panelHeight || 80) + (dockProps.magnification || 80)}px`,
                paddingBottom: '4px'
              }}
            >
              <div 
                className="relative w-full px-3 sm:px-4 z-20"
                style={{ marginTop: `${dockProps.offsetTop || -96}px` }}
              >
                <ErrorBoundary
                  fallback={
                    <div className="flex justify-center items-center h-full">
                      <div className="flex gap-2">
                        {tabs.map(tab => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => onTabChange(tab.id)}
                            className={clsx(
                              'px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500',
                              activeTab === tab.id
                                ? 'bg-white/20 text-white ring-2 ring-white/50'
                                : 'bg-white/10 text-white hover:bg-white/15'
                            )}
                          >
                            {tab.icon}
                            <span className="ml-2">{tab.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <Dock
                    items={dockItems}
                    className=""
                    distance={dockProps.distance || 250}
                    panelHeight={dockProps.panelHeight || 80}
                    baseItemSize={dockProps.baseItemSize || 48}
                    dockHeight={dockProps.dockHeight || 400}
                    magnification={dockProps.magnification || 80}
                    spring={dockProps.spring || { mass: 0.1, stiffness: 150, damping: 12 }}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </nav>
        )}

      </div>

      {/* Mobile Navigation */}
      {isMobile && showMobileNav && (
        <SimpleMobileNav
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      )}

      {/* Mobile Floating Action Buttons */}
      {filteredMobileButtons.length > 0 && (
        <div 
          className="block lg:hidden"
          role="group"
          aria-label="Mobile action buttons"
        >
          {filteredMobileButtons.map((button, index) => (
            <div
              key={button.id}
              className="fixed right-4 z-50"
              style={{ bottom: `${96 + (index * 48)}px` }}
            >
              <ActionButtonComponent
                button={button}
                userPermissions={userPermissions}
                className={clsx(
                  'flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700',
                  button.className
                )}
              />
            </div>
          ))}
        </div>
      )}

      {/* Mobile Action Menu (Alternative for multiple actions) */}
      {filteredActionButtons.length > 2 && isMobile && (
        <div className="block lg:hidden">
          <div className="fixed bottom-24 right-4 z-50">
            <button
              ref={fabRef}
              id="mobile-fab"
              type="button"
              onClick={toggleActionMenu}
              className={clsx(
                'flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2'
              )}
              aria-label="Actions Menu"
              aria-expanded={isActionMenuOpen}
              aria-controls="mobile-action-menu"
              aria-haspopup="menu"
              role="button"
            >
              {isActionMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              )}
            </button>

            {/* Action Menu Popup */}
            {isActionMenuOpen && (
              <div
                ref={menuRef}
                id="mobile-action-menu"
                className="absolute bottom-14 right-0 z-50 rounded-lg bg-white p-2 shadow-lg border"
                style={{ minWidth: '180px' }}
                role="menu"
                aria-labelledby="mobile-fab"
              >
                <div 
                  className="flex flex-col space-y-2"
                  role="group"
                  aria-label="Menu actions"
                >
                  {filteredActionButtons.map((button) => (
                    <ActionButtonComponent
                      key={button.id}
                      button={button}
                      userPermissions={userPermissions}
                      className={clsx(
                        'flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100'
                      )}
                      onClick={() => setIsActionMenuOpen(false)}
                      role="menuitem"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;