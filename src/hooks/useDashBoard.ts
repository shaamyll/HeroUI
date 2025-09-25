import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  checkIsMobile, 
  checkDeviceCapabilities, 
  createDebouncedResizeHandler, 
  safeWindow,
  filterButtonsByPermissions 
} from '../components/common/dashBoard/utils';
import type { ActionButton } from '../types/dashBoardTypes';

export const useIsMobile = (mobileBreakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(() => checkIsMobile(mobileBreakpoint));

  useEffect(() => {
    if (!safeWindow) return;

    const updateMobileState = () => {
      setIsMobile(checkIsMobile(mobileBreakpoint));
    };

    const { handler, cleanup } = createDebouncedResizeHandler(updateMobileState);
    
    safeWindow.addEventListener('resize', handler);
    return cleanup;
  }, [mobileBreakpoint]);

  return isMobile;
};

export const useDashboardState = (
  actionButtons: ActionButton[],
  mobileFloatingButtons: ActionButton[],
  userPermissions: string[],
  mobileBreakpoint: number
) => {
  const isMobile = useIsMobile(mobileBreakpoint);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isLowPowerDevice] = useState(() => checkDeviceCapabilities());

  const toggleActionMenu = useCallback(() => {
    setIsActionMenuOpen(prev => !prev);
  }, []);

  const closeActionMenu = useCallback(() => {
    setIsActionMenuOpen(false);
  }, []);

  const filteredActionButtons = useMemo(() => 
    filterButtonsByPermissions(actionButtons, userPermissions),
    [actionButtons, userPermissions]
  );

  const filteredMobileButtons = useMemo(() => 
    filterButtonsByPermissions(mobileFloatingButtons, userPermissions),
    [mobileFloatingButtons, userPermissions]
  );

  return {
    isMobile,
    isActionMenuOpen,
    isLowPowerDevice,
    toggleActionMenu,
    closeActionMenu,
    filteredActionButtons,
    filteredMobileButtons
  };
};