// DashboardHeader.tsx - Clean and simple with only essential props
import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  HeaderBackground,
  DesktopDockNavigation,
  SimpleMobileNav,
  MobileActionMenu,
  ActionButtonComponent
} from './components';
import { useDashboardState } from '../../../hooks/useDashBoard';
import { filterButtonsByPermissions } from './utils';
import type { ActionButton, Tab } from '../../../types/dashBoardTypes';

// Simple props interface - ONLY essential props
export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  tabs: Tab[];
  actionButtons?: ActionButton[];
  bgColor?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

// Default configurations for dashboard header no need to modify it
const DEFAULTS = {
  userPermissions: [] as string[],
  mobileBreakpoint: 768,
  dotGridConfig: {
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
  },
  dockProps: {
    distance: 250,
    panelHeight: 90,
    baseItemSize: 50,
    magnification: 80,
    spring: { mass: 0.1, stiffness: 150, damping: 12 },
    offsetTop: -96,
     
  }
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  tabs,
  actionButtons = [],
  bgColor = "bg-violet-950"
}) => {
  // Internal state management
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  // Use dashboard state hook with defaults
  const {
    isMobile,
    isActionMenuOpen,
    isLowPowerDevice,
    toggleActionMenu,
    closeActionMenu
  } = useDashboardState(
    actionButtons,
    [], // No mobile floating buttons
    DEFAULTS.userPermissions,
    DEFAULTS.mobileBreakpoint
  );

  // Filter action buttons by permissions (using default empty permissions)
  const filteredActionButtons = filterButtonsByPermissions(actionButtons, DEFAULTS.userPermissions);

  return (
    <div className="mb-8 pt-8">
      {/* Main Header */}
      <div className={clsx(
        'relative flex flex-col items-center justify-between overflow-hidden rounded-xl text-white transition-all duration-300 ease-in-out py-2 h-[190px] max-w-7xl mx-auto',
        bgColor
      )}>

        {/* Background */}
        <HeaderBackground
          dotGridConfig={DEFAULTS.dotGridConfig}
          isLowPowerDevice={isLowPowerDevice}
        />

        {/* Header Content */}
        <div className="relative flex w-full flex-col items-center justify-between p-2 sm:p-1 sm:flex-row z-10">
          {/* Title Section */}
          <div className="flex-1 text-center sm:text-left px-4">
            <h1
              className="mb-0 font-bold"
              style={{
                fontFamily: "Helvetica, sans-serif",
                fontSize: "30px",
                color: "#FFFFFF",
              }}
            >
              {title}
            </h1>

            <p
              className="mt-0 font-normal"
              style={{
                fontFamily: "Helvetica, sans-serif",
                fontSize: "16px",
                color: "#FFFFFF",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Desktop Action Buttons */}
          {filteredActionButtons.length > 0 && (
            <div className="hidden lg:flex gap-3 relative z-20 px-4">
              {filteredActionButtons.map((button) => (
                <ActionButtonComponent
                  key={button.id}
                  button={button}
                  userPermissions={DEFAULTS.userPermissions}
                  className={clsx(
                    'inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50',
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
          onTabChange={setActiveTab}
          dockProps={DEFAULTS.dockProps}
          isMobile={isMobile}
        />
      </div>

      {/* Mobile Navigation */}
      {
        isMobile && (
          <SimpleMobileNav
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )
      }

      {/* Mobile Action Menu */}
      {
        filteredActionButtons.length > 2 && isMobile && (
          <MobileActionMenu
            buttons={filteredActionButtons}
            userPermissions={DEFAULTS.userPermissions}
            isOpen={isActionMenuOpen}
            onToggle={toggleActionMenu}
            onClose={closeActionMenu}
          />
        )
      }
    </div >
  );
};

export default DashboardHeader;