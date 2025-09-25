import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";

// Types for the accordion component
interface AccordionItem {
  key: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

// Reusable Accordion Component
export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <div className="flex w-full bg-white">
      {/* Left side - Accordion items */}
      <div className="p-3 flex flex-col gap-2 min-w-[300px] flex-shrink-0 bg-white shadow-xl rounded-xl border border-gray-200">
        {items.map((item) => (
          <div
            key={item.key}
            className={`px-3 py-2 rounded-lg h-14 flex items-center cursor-pointer transition-all duration-200 ${
              selectedKey === item.key
                ? 'bg-gray-100 shadow-md'
                : 'hover:bg-gray-50'
            }`}
            onClick={() =>
              setSelectedKey(selectedKey === item.key ? null : item.key)
            }
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-base text-gray-900 truncate">
                  {item.title}
                </div>
                <div className="truncate text-sm text-gray-600">{item.subtitle}</div>
              </div>
            </div>
            <ChevronRight
              size={16}
              className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                selectedKey === item.key ? 'rotate-90' : ''
              }`}
            />
          </div>
        ))}
      </div>

      {/* Right side - Flexible content */}
      <div
        className={`transition-all duration-300 overflow-hidden flex-1 ml-4 ${
          selectedKey ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {selectedKey && (
          <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
            {items.find((item) => item.key === selectedKey)?.content}
          </div>
        )}
      </div>
    </div>
  );
}