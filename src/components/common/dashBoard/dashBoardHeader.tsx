// UPDATE: dashboardheader.tsx - Use utils properly
import React, { useEffect, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import {
  HeaderBackground,
  DesktopDockNavigation,
  SimpleMobileNav,
  MobileActionMenu,
  ActionButtonComponent
} from './components';
import {
  isValidImageUrl,
  filterButtonsByPermissions,
  checkDeviceCapabilities,
  checkIsMobile,
  createDebouncedResizeHandler,
  safeWindow
} from './utils';
import type { DashboardHeaderProps } from '../../../types/dashBoardTypes';

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
  const [isMobile, setIsMobile] = useState(() => checkIsMobile(mobileBreakpoint));
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(() => checkDeviceCapabilities());

  // Handle responsive breakpoint changes
  useEffect(() => {
    if (!safeWindow) return;

    const updateMobileState = () => {
      setIsMobile(checkIsMobile(mobileBreakpoint));
    };

    const { handler, cleanup } = createDebouncedResizeHandler(updateMobileState);
    
    safeWindow.addEventListener('resize', handler);
    return cleanup;
  }, [mobileBreakpoint]);

  const toggleActionMenu = useCallback(() => {
    setIsActionMenuOpen(prev => !prev);
  }, []);

  const closeActionMenu = useCallback(() => {
    setIsActionMenuOpen(false);
  }, []);

  // Filter buttons using utility function
  const filteredActionButtons = filterButtonsByPermissions(actionButtons, userPermissions);
  const filteredMobileButtons = filterButtonsByPermissions(mobileFloatingButtons, userPermissions);

  // Header style with safe image validation
  const headerStyle = bgImage && isValidImageUrl(bgImage) ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

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
          onClose={closeActionMenu}
        />
      )}
    </div>
  );
};

export default DashboardHeader;