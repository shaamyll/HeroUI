'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  bottomOffset?: number; // New prop to control bottom positioning
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  // Calculate width to accommodate text + icon
  const baseWidth = baseItemSize * 2.5; // Wider base to fit text
  const targetWidth = useTransform(mouseDistance, [-distance, 0, distance], [baseWidth, magnification * 1.8, baseWidth]);
  const width = useSpring(targetWidth, spring);

  // Check if this item is active (clicked/selected)
  const isActive = className.includes('bg-white/20 ring-2 ring-white/50');

  return (
    <motion.div
      ref={ref}
      style={{
        width: width,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-lg px-3 py-2 whitespace-nowrap transition-colors duration-200 ${isActive
        ? 'bg-white/90 text-gray-900'
        : 'bg-transparent hover:bg-white/10 text-white/70 hover:text-white/90'
        }`}


      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <div className={`flex items-center gap-2 transition-colors duration-200 ${isActive ? 'text-gray-900' : 'text-white/70 hover:text-white/90'}`}>
        {Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === DockIcon) {
            return cloneElement(child as React.ReactElement<any>, { isHovered, isActive, key: index });
          }
          if (React.isValidElement(child) && child.type === DockText) {
            return cloneElement(child as React.ReactElement<any>, { isHovered, isActive, key: index });
          }
          if (React.isValidElement(child) && child.type !== DockLabel) {
            return cloneElement(child as React.ReactElement<any>, { isHovered, isActive, key: index });
          }
          return child;
        })}
      </div>
      {Children.map(children, child => {
        if (React.isValidElement(child) && child.type === DockLabel) {
          return cloneElement(child as React.ReactElement<any>, { isHovered });
        }
        return null;
      })}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

function DockLabel({ children, className = '', ...rest }: DockLabelProps) {
  const { isHovered } = rest as { isHovered?: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return; // avoid crash
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md bg-gray-900 border border-gray-700 px-2 py-1 text-xs text-white shadow-lg`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
};

function DockIcon({ children, className = '', isActive }: DockIconProps) {
  return (
    <div className={`flex items-center justify-center ${isActive ? 'text-gray-900' : 'text-white/70'} ${className}`}>
      {children}
    </div>
  );
}

function DockText({ children, className = '', isActive }: { children: React.ReactNode; className?: string; isActive?: boolean }) {
  return (
    <span className={`text-sm font-black ml-2 ${isActive ? 'text-gray-900' : 'text-white/60'} ${className}`}>
      {children}
    </span>
  );
}
export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
  bottomOffset = 16 // New prop to control vertical position
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} absolute left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-3 pb-2 px-4`}
        style={{ 
          height: panelHeight,
          bottom: `${bottomOffset * 4}px` // Convert Tailwind units to pixels
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon index={index}>{item.icon}</DockIcon>
           
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}