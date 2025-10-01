// dashboard/components.tsx - Simplified and shortened
import React, { memo, useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { HomeIcon } from "lucide-react";
import { clsx } from 'clsx';
import Dock from '../../ui/Dock';
import DotGrid from "../../DotGrid";
import ErrorBoundary from '../ErrorBoundary';
import type { Tab, ActionButton, DotGridConfiguration } from'../../../types/dashBoardTypes';
import { useDashboardState } from '../../../hooks/useDashBoard';
import { createPortal } from 'react-dom';

const isSSR = typeof window === 'undefined';
const safeDocument = typeof document !== 'undefined' ? document : null;

// Permission Wrapper - Simplified
export const PermissionWrapper: React.FC<{
  userPermissions: string[];
  requiredPermissions: string[];
  children: React.ReactNode;
}> = ({ userPermissions, requiredPermissions, children }) => {
  const hasPermission = !requiredPermissions.length || 
    requiredPermissions.some(p => userPermissions.includes(p));
  return hasPermission ? <>{children}</> : null;
};

// Action Button Component - Simplified
export const ActionButtonComponent = memo<{
  button: ActionButton;
  userPermissions: string[];
  className?: string;
  onClick?: () => void;
}>(({ button, userPermissions, className, onClick }) => {
  const handleClick = useCallback(() => {
    button.onClick();
    onClick?.();
  }, [button.onClick, onClick]);

  return (
    <PermissionWrapper userPermissions={userPermissions} requiredPermissions={button.permissions || []}>
      <button onClick={handleClick} className={className} aria-label={button.label}>
        {button.icon}{button.label}
      </button>
    </PermissionWrapper>
  );
});

// Mobile Navigation - Simplified
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
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors',
            activeTab === tab.id ? 'text-violet-600 bg-violet-50' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {tab.icon}
          <span className="mt-1 truncate max-w-12">{tab.name}</span>
        </button>
      ))}
    </div>
  </div>
);

// Header Background with optimized DotGrid
export const HeaderBackground: React.FC<{
  dotGridConfig: DotGridConfiguration;
  isLowPowerDevice: boolean;
}> = ({ dotGridConfig }) => {
  // Use the provided configuration directly without power limitations
  const optimizedConfig = useMemo(() => ({
    ...dotGridConfig,
    enabled: dotGridConfig.enabled !== false, // Ensure enabled by default
    // Remove all low-power device limitations
    opacity: dotGridConfig.opacity || 0.6, // Use configured opacity or default to 0.6
  }), [dotGridConfig]);

  if (!optimizedConfig.enabled) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none -m-4" style={{ opacity: optimizedConfig.opacity }}>
      <ErrorBoundary 
        fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-200 opacity-20" />
        }
        onError={(error) => console.error('DotGrid Error:', error)}
      >
        <DotGrid {...optimizedConfig} className="absolute inset-0" />
      </ErrorBoundary>
    </div>
  );
};

// Dock Component
// More Tabs Dropdown Portal Component
const MoreTabsDropdown: React.FC<{
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  buttonRef: HTMLDivElement | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ tabs, activeTab, onTabChange, buttonRef, isOpen, onClose }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef || !isOpen) return;

    const updatePosition = () => {
      const rect = buttonRef.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left + (rect.width / 2)
      });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [buttonRef, isOpen]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef &&
        !buttonRef.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, buttonRef, onClose]);

  if (!isOpen || !safeDocument) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[100]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              onClose();
            }}
            className={clsx(
              'w-full flex items-center px-4 py-2.5 text-sm font-medium transition-colors text-left',
              activeTab === tab.id
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            <div className="flex-shrink-0 w-5 h-5 mr-3">
              {tab.icon}
            </div>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>,
    safeDocument.body
  );
};
// Dock Component with More Menu
export const DockComponent: React.FC<{
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  dockProps: any;
  isMobile: boolean;
}> = ({ tabs, activeTab, onTabChange, dockProps, isMobile }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const MAX_VISIBLE_TABS = 6;
  
  const visibleTabs = tabs.slice(0, MAX_VISIBLE_TABS);
  const moreTabs = tabs.slice(MAX_VISIBLE_TABS);
  const hasMoreTabs = moreTabs.length > 0;

  const createDockItem = useCallback((tab: Tab) => {
    const iconSize = tab.icon?.props?.size || 20;
    const textSize = Math.min(14, Math.max(10, 14 - (tab.name.length / 10)));
    
    return {
      icon: (
        <div className="flex items-center px-3 py-2">
          <div className="flex-shrink-0" style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
            {tab.icon || <HomeIcon size={iconSize} />}
          </div>
          <span 
            className="ml-2 font-medium whitespace-nowrap transition-all duration-200"
            style={{ fontSize: `${textSize}px` }}
          >
            {tab.name}
          </span>
        </div>
      ),
      label: tab.name,
      onClick: () => onTabChange(tab.id),
      className: clsx(
        'transition-all duration-200 rounded-lg',
        activeTab === tab.id 
          ? 'bg-white/20 ring-2 ring-white/50' 
          : 'hover:bg-white/15 hover:scale-105'
      ),
      style: {
        minWidth: 'fit-content',
        padding: '0.5rem 0.75rem',
      }
    };
  }, [activeTab, onTabChange]);

  const dockItems = useMemo(() => {
    const items = visibleTabs.map(createDockItem);
    
    if (hasMoreTabs) {
      items.push({
        icon: (
          <div 
            ref={moreButtonRef}
            className="flex items-center px-3 py-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowMoreMenu(!showMoreMenu);
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span className="ml-2 font-medium whitespace-nowrap transition-all duration-200" style={{ fontSize: '14px' }}>
              More
            </span>
          </div>
        ),
        label: 'More',
        onClick: (e: any) => {
          e?.stopPropagation?.();
          setShowMoreMenu(!showMoreMenu);
        },
        className: clsx(
          'transition-all duration-200 rounded-lg hover:bg-white/15',
          showMoreMenu && 'bg-white/20 ring-2 ring-white/50'
        ),
        style: {
          minWidth: 'fit-content',
          padding: '0.5rem 0.75rem',
        }
      });
    }
    
    return items;
  }, [visibleTabs, hasMoreTabs, createDockItem, showMoreMenu]);

  if (isMobile || !dockItems.length) return null;

  return (
    <>
      <nav className="relative w-full z-20">
        <div 
          className="flex justify-center overflow-x-auto no-scrollbar"
          style={{ 
            height: `${(dockProps.panelHeight || 80) + (dockProps.magnification || 80)}px`,
            padding: '0 1rem 4px'
          }}
        >
          <div 
            className="relative z-20 w-full max-w-4xl mx-auto"
            style={{ marginTop: `${dockProps.offsetTop || -96}px` }}
          >
            <ErrorBoundary fallback={
              <SimpleFallback tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
            }>
              <Dock
                items={dockItems}
                distance={dockProps.distance || 300}
                panelHeight={dockProps.panelHeight || 80}
                baseItemSize={dockProps.baseItemSize || 'auto'}
                magnification={dockProps.magnification || 80}
                spring={dockProps.spring || { 
                  mass: 0.1, 
                  stiffness: 150, 
                  damping: 12,
                  restDelta: 0.001
                }}
                className="px-2 py-1"
              />
            </ErrorBoundary>
          </div>
        </div>
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </nav>
      
      {hasMoreTabs && (
        <MoreTabsDropdown
          tabs={moreTabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          buttonRef={moreButtonRef.current}
          isOpen={showMoreMenu}
          onClose={() => setShowMoreMenu(false)}
        />
      )}
    </>
  );
};
// Simple fallback for dock
const SimpleFallback: React.FC<{ tabs: Tab[]; activeTab: string; onTabChange: (id: string) => void }> = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex justify-center items-center h-full">
    <div className="flex gap-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeTab === tab.id ? 'bg-white/20 text-white ring-2 ring-white/50' : 'bg-white/10 text-white hover:bg-white/15'
          )}
        >
          {tab.icon}<span className="ml-2">{tab.name}</span>
        </button>
      ))}
    </div>
  </div>
);

// Mobile Action Menu - Simplified
export const MobileActionMenu: React.FC<{
  buttons: ActionButton[];
  userPermissions: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ buttons, userPermissions, isOpen, onToggle, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSSR || !safeDocument || !isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target?.closest('#mobile-action-menu') && !target?.closest('#mobile-fab')) {
        onClose();
      }
    };
    
    safeDocument.addEventListener('mousedown', handleClickOutside);
    return () => safeDocument.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="block lg:hidden">
      <div className="fixed bottom-24 right-4 z-50">
        {/* FAB Button */}
        <button
          id="mobile-fab"
          onClick={onToggle}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:bg-violet-700"
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

        {/* Menu */}
        {isOpen && (
          <div ref={menuRef} id="mobile-action-menu" className="absolute bottom-14 right-0 z-50 rounded-lg bg-white p-2 shadow-lg border min-w-[180px]">
            <div className="flex flex-col space-y-2">
              {buttons.map((button) => (
                <ActionButtonComponent
                  key={button.id}
                  button={button}
                  userPermissions={userPermissions}
                  className="flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};