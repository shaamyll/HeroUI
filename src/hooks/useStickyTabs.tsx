// hooks/useStickyTabs.ts
import { useState, useEffect } from 'react';

export const useStickyTabs = (headerId: string = 'dashboard-header') => {
  const [showStickyTabs, setShowStickyTabs] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById(headerId);
      if (header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        setShowStickyTabs(headerBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerId]);

  return showStickyTabs;
};
