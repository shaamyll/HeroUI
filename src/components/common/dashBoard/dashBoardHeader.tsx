import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { clsx } from 'clsx';
import {
  HeaderBackground,
  DesktopDockNavigation,
  SimpleMobileNav,
  MobileActionMenu,
  ActionButtonComponent
} from './components';

// Types
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
  title: string;
  subtitle: string;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  actionButtons?: ActionButton[];
  showMobileNav?: boolean;
  mobileBreakpoint?: number;
  mobileFloatingButtons?: ActionButton[];
  userPermissions?: string[];
  bgColor?: string;
  bgImage?: string;
  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  additionalContent?: React.ReactNode;
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
    offsetTop?: number;
  };
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

// Utilities
const isSSR = typeof window === 'undefined';
const safeWindow = isSSR ? null : window;
const safeDocument = typeof document !== 'undefined' ? document : null;
const safeNavigator = typeof navigator !== 'undefined' ? navigator : null;

const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'data:' || 
           urlObj.protocol === 'blob:' || 
           urlObj.protocol === 'https:' ||
           (urlObj.protocol === 'http:' && urlObj.hostname === 'localhost');
  } catch {
    return false;
  }
};

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
    if (isSSR || !safeWindow) return;

    const checkMobile = () => {
      setIsMobile(safeWindow!.innerWidth < mobileBreakpoint);
    };

    const checkDeviceCapabilities = () => {
      if (!safeWindow || !safeNavigator) return;
      
      const isLowPower = 
        safeWindow.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        (safeNavigator.hardwareConcurrency && safeNavigator.hardwareConcurrency <= 2) ||
        ('connection' in safeNavigator && (safeNavigator as any).connection?.effectiveType === 'slow-2g');
      
      setIsLowPowerDevice(isLowPower);
    };

    checkMobile();
    checkDeviceCapabilities();
    
    safeWindow.addEventListener('resize', checkMobile);
    return () => safeWindow.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const toggleActionMenu = useCallback(() => {
    setIsActionMenuOpen(!isActionMenuOpen);
  }, [isActionMenuOpen]);

  // Filter action buttons based on permissions
  const getFilteredButtons = useCallback((buttons: ActionButton[]) => {
    return buttons.filter(button => {
      if (!button.permissions || button.permissions.length === 0) return true;
      return button.permissions.some(permission => userPermissions.includes(permission));
    });
  }, [userPermissions]);

  const filteredActionButtons = useMemo(() => getFilteredButtons(actionButtons), [actionButtons, getFilteredButtons]);
  const filteredMobileButtons = useMemo(() => getFilteredButtons(mobileFloatingButtons), [mobileFloatingButtons, getFilteredButtons]);

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
      {/* Main Header */}
      <div
        style={headerStyle}
        className={`relative flex flex-col items-center justify-between overflow-hidden rounded-xl ${bgColor} text-white transition-all duration-300 ease-in-out ${headerClassName} py-2 h-[190px] max-w-7xl mx-auto`}
      >
        {/* Background Animation */}
        <HeaderBackground dotGridConfig={dotGridConfig} isLowPowerDevice={isLowPowerDevice} />

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

          {/* Additional Content */}
          {additionalContent && (
            <div className="relative z-30 flex w-full items-center justify-center md:w-auto">
              {additionalContent}
            </div>
          )}

          {/* Desktop Action Buttons */}
          {filteredActionButtons.length > 0 && (
            <div className="hidden lg:flex gap-3 relative z-20 px-4">
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

        {/* Desktop Dock Navigation */}
        <DesktopDockNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          dockProps={dockProps}
          isMobile={isMobile}
        />
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
        <div className="block lg:hidden">
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

      {/* Mobile Action Menu */}
      {filteredActionButtons.length > 2 && isMobile && (
        <MobileActionMenu
          buttons={filteredActionButtons}
          userPermissions={userPermissions}
          isOpen={isActionMenuOpen}
          onToggle={toggleActionMenu}
          onClose={() => setIsActionMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardHeader;