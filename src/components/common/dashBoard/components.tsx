// components.tsx
import React, { memo, useCallback, useRef, useEffect, useMemo } from 'react';
import { HomeIcon } from "lucide-react";
import { clsx } from 'clsx';
import Dock from '../../ui/Dock';
import DotGrid from "../../DotGrid";
import ErrorBoundary from '../ErrorBoundary';

// Import types from your types file
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

interface DockItemData {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
}

interface DotGridConfiguration {
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
}

// SSR-safe utilities
const isSSR = typeof window === 'undefined';
const safeDocument = typeof document !== 'undefined' ? document : null;

// Permission Wrapper
export const PermissionWrapper: React.FC<{
  userPermissions: string[];
  requiredPermissions: string[];
  children: React.ReactNode;
}> = ({ userPermissions, requiredPermissions, children }) => {
  const hasPermission = !requiredPermissions.length || 
    requiredPermissions.some(p => userPermissions.includes(p));
  return hasPermission ? <>{children}</> : null;
};

// Action Button Component
export const ActionButtonComponent = memo<{
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
    <PermissionWrapper userPermissions={userPermissions} requiredPermissions={button.permissions || []}>
      <button type="button" onClick={handleClick} className={className} aria-label={button.label} role={role}>
        {button.icon}{button.label}
      </button>
    </PermissionWrapper>
  );
});

// Mobile Navigation
export const SimpleMobileNav: React.FC<{
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-40">
    <div className="flex justify-around">
      {tabs.slice(0, 5).map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
            activeTab === tab.id ? 'text-violet-600 bg-violet-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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

// Header Background Component
export const HeaderBackground: React.FC<{
  dotGridConfig: DotGridConfiguration;
  isLowPowerDevice: boolean;
}> = ({ dotGridConfig, isLowPowerDevice }) => {
  if (!dotGridConfig.enabled || isLowPowerDevice) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none -m-4" style={{ opacity: dotGridConfig.opacity }}>
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-200 opacity-20" />}>
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
  );
};

// Desktop Dock Navigation Component  
export const DesktopDockNavigation: React.FC<{
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  dockProps: any;
  isMobile: boolean;
}> = ({ tabs, activeTab, onTabChange, dockProps, isMobile }) => {
  // Convert tabs to dock items
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

  if (isMobile || !dockItems.length) return null;

  return (
    <nav 
      className="relative w-full px-3 sm:px-4 z-20"
      role="navigation"
      aria-label="Main navigation"
    >
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
  );
};

// Mobile Action Menu
export const MobileActionMenu: React.FC<{
  buttons: ActionButton[];
  userPermissions: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ buttons, userPermissions, isOpen, onToggle, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSSR || !safeDocument) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target?.closest('#mobile-action-menu') && !target?.closest('#mobile-fab')) {
        onClose();
      }
    };
    safeDocument.addEventListener('mousedown', handleClickOutside);
    return () => safeDocument.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="block lg:hidden">
      <div className="fixed bottom-24 right-4 z-50">
        <button 
          ref={fabRef} 
          id="mobile-fab" 
          type="button" 
          onClick={onToggle} 
          className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2" 
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          )}
        </button>
        {isOpen && (
          <div ref={menuRef} id="mobile-action-menu" className="absolute bottom-14 right-0 z-50 rounded-lg bg-white p-2 shadow-lg border" style={{ minWidth: '180px' }}>
            <div className="flex flex-col space-y-2">
              {buttons.map((button) => (
                <ActionButtonComponent 
                  key={button.id} 
                  button={button} 
                  userPermissions={userPermissions} 
                  className="flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100" 
                  onClick={onClose} 
                  role="menuitem" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};