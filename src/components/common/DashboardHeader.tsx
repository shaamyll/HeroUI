import React, { useEffect, useState } from 'react';
// If you're using lucide-react (recommended)
import { HomeIcon } from "lucide-react";
//a
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

  moduleName: string; // e.g. "users", "projects"

  // Basic header info
  title: string;
  subtitle: string;
  
  // Tabs configuration
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
}
const defaultOverviewTab = (moduleName: string): Tab => ({
  id: "a",
  name: "a",
  icon: <HomeIcon />,
  path: `/${moduleName}`,
});

// Simple Tabs Component
const SimpleTabs: React.FC<{
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-white/10 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-white hover:bg-white/20'
          }`}
        >
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </div>
  );
};

// Simple Mobile Navigation
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
            className={`flex flex-col items-center px-2 py-1 text-xs transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
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
  moduleName,
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
  bgColor = 'bg-blue-600',
  bgImage,
  headerClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  additionalContent,
}) => {
  const allTabs = [defaultOverviewTab(moduleName), ...tabs];
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

  const headerStyle = bgImage 
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <div className="mb-8">
      {/* Main Header */}
      <div
        style={headerStyle}
        className={`relative mb-6 flex flex-col items-center justify-between overflow-hidden rounded-xl ${bgColor} text-white transition-all duration-300 ease-in-out p-4 sm:p-6 ${headerClassName}`}
      >
        {/* Header Content */}
        <div className="relative mb-4 flex w-full flex-col items-center justify-between sm:mb-6 sm:flex-row">
          {/* Title Section */}
          <div className="flex-1 text-center sm:text-left">
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
            <div className="hidden lg:flex gap-3">
              {filteredActionButtons.map((button) => (
                <PermissionWrapper
                  key={button.id}
                  userPermissions={userPermissions}
                  requiredPermissions={button.permissions || []}
                >
                  <button
                    onClick={button.onClick}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      button.variant === 'secondary'
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

        {/* Tabs */}
        <div className="w-full">
          <SimpleTabs
           tabs={allTabs}
            
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
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
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 ${button.className || ''}`}
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700"
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