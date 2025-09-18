import React, { useEffect, useState } from 'react';
import { HomeIcon } from "lucide-react";
import Dock from '../ui/Dock'; // Import your Dock component
import type { DockItemData } from '../ui/Dock';
import DotGrid from "../DotGrid";

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
  bgImage?: string;
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
    spring?: any;
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
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === tab.id
                ? 'text-violet-600 bg-violet-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
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

  // Check mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  // Handle mobile action menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isActionMenuOpen &&
        !target.closest('#mobile-action-menu') &&
        !target.closest('#mobile-fab')
      ) {
        setIsActionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionMenuOpen]);

  const toggleActionMenu = () => {
    setIsActionMenuOpen(!isActionMenuOpen);
  };

  // Filter action buttons based on permissions
  const getFilteredButtons = (buttons: ActionButton[]) => {
    return buttons.filter(button => {
      if (!button.permissions || button.permissions.length === 0) return true;
      return button.permissions.some(permission => userPermissions.includes(permission));
    });
  };

  const filteredActionButtons = getFilteredButtons(actionButtons);
  const filteredMobileButtons = getFilteredButtons(mobileFloatingButtons);

  // Convert tabs to dock items with text labels
  const dockItems: DockItemData[] = tabs.map(tab => ({
    icon: (
      <div className="flex items-center">
        {tab.icon || <HomeIcon size={20} />}
        <span className="ml-2 text-sm font-medium">{tab.name}</span>
      </div>
    ),
    label: tab.name,
    onClick: () => onTabChange(tab.id),
    className: activeTab === tab.id ? 'bg-white/20 ring-2 ring-white/50' : 'hover:bg-white/15'
  }));

  const headerStyle = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <div className="mb-8 pt-8">
      {/* Main Header without dock */}
      <div
        style={headerStyle}
        className={`relative flex flex-col items-center justify-between overflow-hidden rounded-xl ${bgColor} text-white transition-all duration-300 ease-in-out ${headerClassName}`}
      >
        {/* DotGrid Background Animation */}
        {dotGridConfig.enabled && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: dotGridConfig.opacity }}
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
            />
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
            <div className="hidden lg:flex gap-3 relative z-20 px-4">
              {filteredActionButtons.map((button) => (
                <PermissionWrapper
                  key={button.id}
                  userPermissions={userPermissions}
                  requiredPermissions={button.permissions || []}
                >
                  <button
                    onClick={button.onClick}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${button.variant === 'secondary'
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                      } ${button.className || ''}`}
                  >
                    {button.icon}
                    {button.label}
                  </button>
                </PermissionWrapper>
              ))}
            </div>
          )}
        </div>
        {/* Desktop Dock Navigation - Back inside the header container with REAL magnification */}
        {!isMobile && dockItems.length > 0 && (
          <div className="relative w-full px-3 sm:px-4 z-20">
            {/* Reserve space for magnified dock to prevent container resize */}
            <div
              className="flex justify-center"
              style={{
                height: `${(dockProps.panelHeight || 80) + (dockProps.magnification || 300)}px`,
                paddingBottom: '4px'
              }}
            >
              <div className="flex items-end h-full">
                <Dock
                  items={dockItems}
                  className="backdrop-blur-md bg-white/10 border border-white/20"
                  distance={dockProps.distance || 250}
                  panelHeight={dockProps.panelHeight || 80}
                  baseItemSize={dockProps.baseItemSize || 48}
                  dockHeight={dockProps.dockHeight || 400}
                  magnification={dockProps.magnification || 80}
                  spring={dockProps.spring || { mass: 0.1, stiffness: 150, damping: 12 }}
                />
              </div>
            </div>
          </div>
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
        <div className="block lg:hidden">
          {filteredMobileButtons.map((button, index) => (
            <div
              key={button.id}
              className="fixed right-4 z-50"
              style={{ bottom: `${96 + (index * 48)}px` }}
            >
              <PermissionWrapper
                userPermissions={userPermissions}
                requiredPermissions={button.permissions || []}
              >
                <button
                  id={button.id}
                  onClick={button.onClick}
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700 ${button.className || ''}`}
                  aria-label={button.label}
                >
                  {button.icon}
                </button>
              </PermissionWrapper>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Action Menu (Alternative for multiple actions) */}
      {filteredActionButtons.length > 2 && isMobile && (
        <div className="block lg:hidden">
          <div className="fixed bottom-24 right-4 z-50">
            <button
              id="mobile-fab"
              onClick={toggleActionMenu}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700"
              aria-label="Actions Menu"
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
                id="mobile-action-menu"
                className="absolute bottom-14 right-0 z-50 rounded-lg bg-white p-2 shadow-lg border"
                style={{ minWidth: '180px' }}
              >
                <div className="flex flex-col space-y-2">
                  {filteredActionButtons.map((button) => (
                    <PermissionWrapper
                      key={button.id}
                      userPermissions={userPermissions}
                      requiredPermissions={button.permissions || []}
                    >
                      <button
                        onClick={() => {
                          button.onClick();
                          setIsActionMenuOpen(false);
                        }}
                        className="flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        {button.icon}
                        {button.label}
                      </button>
                    </PermissionWrapper>
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