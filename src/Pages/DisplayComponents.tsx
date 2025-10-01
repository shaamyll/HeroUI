import React, { useState, type Key } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import CustomInput from "../components/common/CustomInput";
import SopCardView, { type SopCardViewProps } from "../components/ModuleWiseComponents/SopCardView";
import CardViewSopV2 from "@/components/ModuleWiseComponents/CardViewSopV2";
import { MdInfo, MdBuild, MdStar, MdCheckCircle, MdList, MdRadioButtonUnchecked } from "react-icons/md";
import type { FormConfig } from "@/components/ModuleWiseComponents/DynamicForm";
import type { DropdownOption } from "@/components/Reusable/CustomDropdown";
import DynamicForm from "@/components/ModuleWiseComponents/DynamicForm";
import { CustomCardDropdown } from "@/components/ModuleWiseComponents/CustomCardDropdown";
import CustomButton from "@/components/common/CustomButton";
import { UseToast } from "@/hooks/UseToast";
import { CircleX, BadgeCheck, EyeClosed, Eye, Search, UserRound } from 'lucide-react';
import type { InputConfig } from "@/types/common";
import SearchableSelect from "@/components/Reusable/SearchableSelect";
import CustomChip from "@/components/common/CustomChip";

// ✅ Resizable Sidebar Component
interface ResizableSidebarProps {
  children: React.ReactNode;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultCollapsed?: boolean;
}

export const ResizableSidebar: React.FC<ResizableSidebarProps> = ({
  children,
  defaultWidth = 280,
  minWidth = 60,
  maxWidth = 400,
  defaultCollapsed = false,
}) => {
  const [width, setWidth] = React.useState(defaultWidth);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const previousWidth = React.useRef(width);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  
  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };
  
  // Handle resize
  const handleResize = React.useCallback((e: MouseEvent) => {
    if (!sidebarRef.current) return;
    
    const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
      previousWidth.current = newWidth;
    }
  }, [minWidth, maxWidth]);
  
  // Handle resize end
  const handleResizeEnd = React.useCallback(() => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
  }, [handleResize]);
  
  // Clean up event listeners
  React.useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [handleResize, handleResizeEnd]);
  
  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Calculate current width based on collapsed state
  const currentWidth = isCollapsed ? minWidth : width;
  
  return (
    <>
      {/* Overlay when resizing */}
      {isResizing && (
        <div className="fixed inset-0 z-40 cursor-ew-resize" />
      )}
      
      {/* Sidebar - FIXED POSITION WITH NO SCROLL */}
      <div
        ref={sidebarRef}
        className={`
          fixed lg:static h-screen bg-content1 border-r border-default-200 z-30 
          transition-all duration-300 ease-out-expo
          ${isResizing ? "select-none" : ""}
        `}
        style={{ width: `${currentWidth}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sidebar content - REMOVED overflow-y-auto */}
        <div className={`h-full ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}>
          {children}
        </div>
        
        {/* Resize handle - make more subtle */}
        <div
          className={`
            absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-primary/30
            ${isResizing ? "bg-primary/50" : isHovered ? "bg-primary/20" : ""}
            transition-colors duration-200
          `}
          onMouseDown={handleResizeStart}
        />
        
        {/* Collapse toggle button - improve styling */}
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className={`
            absolute -right-3 top-4 z-50 shadow-xs bg-content1 border border-default-200
            transition-transform duration-300 ease-out-expo
            ${isCollapsed ? "rotate-180" : ""}
          `}
          onPress={toggleCollapse}
        >
          <Icon icon="lucide:chevron-left" className="text-default-500" />
        </Button>
      </div>
    </>
  );
};

// ✅ Acme Logo component
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

// ✅ White Card Container Component
const WhiteCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-default-200 shadow-xs p-6 ${className}`}>
    {children}
  </div>
);

// ✅ Enhanced Sidebar Menu Component
const SidebarMenu: React.FC<{ 
  onMenuItemClick: (item: string) => void; 
  selectedItem: string | null 
}> = ({ onMenuItemClick, selectedItem }) => {
  
  const menuItems = [
    { name: "Button", icon: "lucide:square", color: "text-blue-500" },
    { name: "Toast", icon: "lucide:bell", color: "text-green-500" },
    { name: "Input Elements", icon: "lucide:edit", color: "text-purple-500" },
    { name: "Select (Dropdown)", icon: "lucide:chevron-down", color: "text-orange-500" },
    { name: "SOP card view", icon: "lucide:layout", color: "text-pink-500" },
    { name: "Finance Header Section", icon: "lucide:bar-chart", color: "text-cyan-500" },
    { name: "Chip", icon: "lucide:tag", color: "text-yellow-500" },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Enhanced header with gradient background */}
      <div className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
        <AcmeLogo />
        <div>
          <p className="font-bold text-inherit">HERO UI</p>
          <p className="text-xs text-default-500">Component Library</p>
        </div>
      </div>
      
      {/* Navigation with flex-1 to take remaining space */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-all duration-200 group ${
              selectedItem === item.name 
                ? "bg-blue-50 border border-blue-200 shadow-xs" 
                : "hover:bg-default-100 border border-transparent"
            }`}
            onClick={() => onMenuItemClick(item.name)}
          >
            <Icon 
              icon={item.icon} 
              className={`text-lg transition-colors ${
                selectedItem === item.name ? "text-blue-600" : item.color
              } group-hover:scale-110`} 
            />
            <span className={`font-medium ${
              selectedItem === item.name ? "text-blue-700" : "text-default-700"
            }`}>
              {item.name}
            </span>
            {selectedItem === item.name && (
              <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// ✅ Improved Main Content Header
const SectionHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="border-b border-default-200 rounded-lg shadow-lg mx-4 mt-4 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-2 text-sm text-default-500 mb-2">
        <span className="flex items-center gap-1">
          <Icon icon="lucide:component" className="w-4 h-4" />
          Components
        </span>
        <span>›</span>
        <span className="text-default-700 font-medium">{title}</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-default-900 mb-2">{title}</h1>
      {description && (
        <p className="text-default-600 max-w-2xl text-sm sm:text-base">{description}</p>
      )}
    </div>
  </div>
);

// Component to display buttons
const ButtonsSection = () => (
  <div>
    <SectionHeader 
      title="Button Components" 
      description="Explore different button styles, sizes, and variants for your application."
    />
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <WhiteCard>
        <h3 className="text-lg font-semibold mb-4 text-default-800">Basic Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton label="Default Button" />
          <CustomButton label="Small" size="sm" />
          <CustomButton label="Medium" size="md" />
          <CustomButton label="Large" size="lg" />
        </div>
      </WhiteCard>

      <WhiteCard>
        <h3 className="text-lg font-semibold mb-4 text-default-800">Radius Variations</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton label="Full Radius" radius="full" />
          <CustomButton label="Large Radius" radius="lg" />
          <CustomButton label="Medium Radius" radius="md" />
          <CustomButton label="Small Radius" radius="sm" />
          <CustomButton label="No Radius" radius="none" />
        </div>
      </WhiteCard>

      <WhiteCard>
        <h3 className="text-lg font-semibold mb-4 text-default-800">Color Variations</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton label="Default" color="default" />
          <CustomButton label="Primary" color="primary" />
          <CustomButton label="Secondary" color="secondary" />
          <CustomButton label="Success" color="success" />
          <CustomButton label="Warning" color="warning" />
          <CustomButton label="Danger" color="danger" />
        </div>
      </WhiteCard>

      <WhiteCard>
        <h3 className="text-lg font-semibold mb-4 text-default-800">Variant Variations</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton label="Solid" color="primary" variant="solid" />
          <CustomButton label="Faded" color="primary" variant="faded" />
          <CustomButton label="Bordered" color="primary" variant="bordered" />
          <CustomButton label="Light" color="primary" variant="light" />
          <CustomButton label="Flat" color="primary" variant="flat" />
          <CustomButton label="Ghost" color="primary" variant="ghost" />
          <CustomButton label="Shadow" color="primary" variant="shadow" />
        </div>
      </WhiteCard>

      <WhiteCard>
        <h3 className="text-lg font-semibold mb-4 text-default-800">Special States</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton label="Disabled Button" isDisabled={true} />
          <CustomButton 
            label="Custom Styled" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
          />
        </div>
      </WhiteCard>
    </div>
  </div>
);

// Component to display toast
const ToastSection = () => {
  const { showToast } = UseToast();

  return (
    <div>
      <SectionHeader 
        title="Toast Components" 
        description="Interactive toast notifications with different styles and behaviors."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Basic Toast Examples</h3>
          <div className="flex flex-wrap gap-4">
            <CustomButton
              label="Show Basic Toast"
              color="primary"
              onPress={() => {
                showToast({
                  title: "Success!",
                  description: "Your action was completed successfully.",
                  color: "success",
                });
              }}
            />
            <CustomButton
              label="Show Promise Toast"
              color="secondary"
              onPress={() => {
                showToast({
                  title: "Processing...",
                  description: "Please wait while we process your request.",
                  promise: new Promise((resolve) => setTimeout(resolve, 3000)),
                  shouldShowTimeoutProgress: true,
                  color: "primary",
                });
              }}
            />
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Toast with Icons</h3>
          <div className="flex flex-wrap gap-4">
            <CustomButton
              label="Success with Icon"
              color="success"
              onPress={() => {
                showToast({
                  title: "Success!",
                  description: "Operation completed successfully",
                  icon: <CircleX />,
                  color: "success",
                  variant: "solid",
                });
              }}
            />
            <CustomButton
              label="Error Toast"
              color="danger"
              onPress={() => {
                showToast({
                  title: "Error!",
                  description: "Something went wrong. Please try again.",
                  icon: <BadgeCheck />,
                  color: "danger",
                  variant: "solid",
                });
              }}
            />
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

// Component to display input elements
const InputElementsSection = () => {
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <SectionHeader 
        title="Input Elements" 
        description="Various input field types with validation, icons, and different styles."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Basic Input Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
            />
            <CustomInput
              label="Password"
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeClosed /> : <Eye />}
                </button>
              }
            />
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Input with Icons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Search"
              type="search"
              placeholder="Search..."
              value={search}
              onChange={setSearch}
              startContent={<Search />}
              isClearable
            />
            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={setName}
              startContent={<UserRound />}
            />
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Input Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Bordered Input"
              variant="bordered"
              placeholder="Bordered style"
              color="primary"
            />
            <CustomInput
              label="Underlined Input"
              variant="underlined"
              placeholder="Underlined style"
              color="secondary"
            />
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

// Component to display select (dropdown) elements
const SelectSection = () => {
  const animals = [
    { value: "cat", label: "Cat" },
    { value: "dog", label: "Dog" },
    { value: "elephant", label: "Elephant" },
    { value: "lion", label: "Lion" },
    { value: "tiger", label: "Tiger" },
    { value: "giraffe", label: "Giraffe" },
    { value: "dolphin", label: "Dolphin" },
    { value: "penguin", label: "Penguin" },
    { value: "zebra", label: "Zebra" },
    { value: "shark", label: "Shark" },
    { value: "whale", label: "Whale" },
    { value: "otter", label: "Otter" },
  ];

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
    { value: "cn", label: "China" },
  ];

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" },
    { value: "mango", label: "Mango" },
    { value: "pineapple", label: "Pineapple" },
    { value: "watermelon", label: "Watermelon" },
  ];

  // Create unique state variables for each SearchableSelect component
  const [basicAnimal, setBasicAnimal] = useState<{ value: string; label: string } | null>(null);
  const [favoriteAnimal, setFavoriteAnimal] = useState<{ value: string; label: string } | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<{ value: string; label: string }[]>([]);
  const [selectedMultipleAnimals, setSelectedMultipleAnimals] = useState<{ value: string; label: string }[]>([]);
  const [fruitWithoutSearch, setFruitWithoutSearch] = useState<{ value: string; label: string } | null>(null);
  const [requiredFruit, setRequiredFruit] = useState<{ value: string; label: string } | null>(null);
  const [smallWidthFruit, setSmallWidthFruit] = useState<{ value: string; label: string } | null>(null);
  const [fullWidthFruit, setFullWidthFruit] = useState<{ value: string; label: string } | null>(null);
  const [disabledFruit, setDisabledFruit] = useState<{ value: string; label: string } | null>(null);
  const [customPlaceholderFruit, setCustomPlaceholderFruit] = useState<{ value: string; label: string } | null>(null);
  const [closeOnSelectAnimal, setCloseOnSelectAnimal] = useState<{ value: string; label: string } | null>(null);
  const [stayOpenCountries, setStayOpenCountries] = useState<{ value: string; label: string }[]>([]);
  const [largeDatasetCountries, setLargeDatasetCountries] = useState<{ value: string; label: string }[]>([]);

  // Wrapper functions to handle the type conversion
  const handleSingleChange = (setter: React.Dispatch<React.SetStateAction<{ value: string; label: string } | null>>) => {
    return (option: { value: string; label: string } | { value: string; label: string }[] | null) => {
      if (Array.isArray(option)) {
        setter(option[0] || null);
      } else {
        setter(option);
      }
    };
  };

  const handleMultipleChange = (setter: React.Dispatch<React.SetStateAction<{ value: string; label: string }[]>>) => {
    return (option: { value: string; label: string } | { value: string; label: string }[] | null) => {
      if (Array.isArray(option)) {
        setter(option);
      } else if (option) {
        setter([option]);
      } else {
        setter([]);
      }
    };
  };

  return (
    <div>
      <SectionHeader 
        title="Select (Dropdown) Components" 
        description="Searchable dropdown select elements with various configurations and styles."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Basic Searchable Selects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SearchableSelect
                label="Select an animal"
                options={animals}
                placeholder="Choose an animal..."
                value={basicAnimal}
                onChange={handleSingleChange(setBasicAnimal)}
                showSearch={true}
                searchPlaceholder="Search animals..."
                width="100%"
              />
              {basicAnimal && (
                <p className="text-sm text-default-600 mt-2">
                  Selected: {basicAnimal.label}
                </p>
              )}
            </div>
            
            <div>
              <SearchableSelect
                label="Favorite Animal"
                options={animals}
                placeholder="Select your favorite"
                value={favoriteAnimal}
                onChange={handleSingleChange(setFavoriteAnimal)}
                showSearch={true}
                searchPlaceholder="Type to search..."
                width="100%"
              />
              {favoriteAnimal && (
                <p className="text-sm text-default-600 mt-2">
                  Favorite: {favoriteAnimal.label}
                </p>
              )}
            </div>
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Multiple Selection with Chips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SearchableSelect
                label="Select Countries"
                options={countries}
                placeholder="Choose countries..."
                value={selectedCountries}
                onChange={handleMultipleChange(setSelectedCountries)}
                selectionMode="multiple"
                showSearch={true}
                searchPlaceholder="Search countries..."
                width="100%"
                maxSelectedDisplay={3}
              />
              {selectedCountries.length > 0 && (
                <p className="text-sm text-default-600 mt-2">
                  Selected {selectedCountries.length} countries: {selectedCountries.map(c => c.label).join(', ')}
                </p>
              )}
            </div>
            
            <div>
              <SearchableSelect
                label="Select Animals (Multiple)"
                options={animals}
                placeholder="Choose animals..."
                value={selectedMultipleAnimals}
                onChange={handleMultipleChange(setSelectedMultipleAnimals)}
                selectionMode="multiple"
                showSearch={true}
                searchPlaceholder="Search animals..."
                width="100%"
                maxSelectedDisplay={2}
              />
              {selectedMultipleAnimals.length > 0 && (
                <p className="text-sm text-default-600 mt-2">
                  Selected {selectedMultipleAnimals.length} animals: {selectedMultipleAnimals.map(a => a.label).join(', ')}
                </p>
              )}
            </div>
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Without Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SearchableSelect
                label="Select Fruit"
                options={fruits}
                placeholder="Choose a fruit..."
                value={fruitWithoutSearch}
                onChange={handleSingleChange(setFruitWithoutSearch)}
                showSearch={false}
                width="100%"
              />
              {fruitWithoutSearch && (
                <p className="text-sm text-default-600 mt-2">
                  Selected: {fruitWithoutSearch.label}
                </p>
              )}
            </div>
            
            <div>
              <SearchableSelect
                label="Required Field"
                options={fruits}
                placeholder="Please select a fruit"
                value={requiredFruit}
                onChange={handleSingleChange(setRequiredFruit)}
                showSearch={true}
                isRequired={true}
                width="100%"
              />
              {requiredFruit && (
                <p className="text-sm text-default-600 mt-2">
                  Selected: {requiredFruit.label}
                </p>
              )}
            </div>
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Different Sizes and States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <SearchableSelect
                label="Small Width"
                options={fruits}
                placeholder="Small select..."
                value={smallWidthFruit}
                onChange={handleSingleChange(setSmallWidthFruit)}
                showSearch={true}
                width={200}
              />
              {smallWidthFruit && (
                <p className="text-sm text-default-600">
                  Selected: {smallWidthFruit.label}
                </p>
              )}
              
              <SearchableSelect
                label="Full Width"
                options={fruits}
                placeholder="Full width select..."
                value={fullWidthFruit}
                onChange={handleSingleChange(setFullWidthFruit)}
                showSearch={true}
                width="100%"
              />
              {fullWidthFruit && (
                <p className="text-sm text-default-600">
                  Selected: {fullWidthFruit.label}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <SearchableSelect
                label="Disabled Select"
                options={fruits}
                placeholder="This is disabled"
                value={disabledFruit}
                onChange={handleSingleChange(setDisabledFruit)}
                showSearch={true}
                disabled={true}
                width="100%"
              />
              {disabledFruit && (
                <p className="text-sm text-default-600">
                  Selected: {disabledFruit.label}
                </p>
              )}
              
              <SearchableSelect
                label="With Custom Placeholder"
                options={fruits}
                placeholder="🍎 Choose your favorite fruit..."
                value={customPlaceholderFruit}
                onChange={handleSingleChange(setCustomPlaceholderFruit)}
                showSearch={true}
                searchPlaceholder="🔍 Search fruits..."
                width="100%"
              />
              {customPlaceholderFruit && (
                <p className="text-sm text-default-600">
                  Selected: {customPlaceholderFruit.label}
                </p>
              )}
            </div>
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Advanced Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SearchableSelect
                label="Close on Select (Single)"
                options={animals}
                placeholder="Select and close..."
                value={closeOnSelectAnimal}
                onChange={handleSingleChange(setCloseOnSelectAnimal)}
                showSearch={true}
                closeOnSelect={true}
                width="100%"
              />
              {closeOnSelectAnimal && (
                <p className="text-sm text-default-600 mt-2">
                  Selected: {closeOnSelectAnimal.label}
                </p>
              )}
              <p className="text-xs text-default-500 mt-1">
                Dropdown closes immediately after selection
              </p>
            </div>
            
            <div>
              <SearchableSelect
                label="Stay Open (Multiple)"
                options={countries}
                placeholder="Select multiple..."
                value={stayOpenCountries}
                onChange={handleMultipleChange(setStayOpenCountries)}
                selectionMode="multiple"
                showSearch={true}
                closeOnSelect={false}
                width="100%"
                maxSelectedDisplay={2}
              />
              {stayOpenCountries.length > 0 && (
                <p className="text-sm text-default-600 mt-2">
                  Selected {stayOpenCountries.length} countries
                </p>
              )}
              <p className="text-xs text-default-500 mt-1">
                Dropdown stays open for multiple selections
              </p>
            </div>
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Large Dataset Example</h3>
          <div className="max-w-md">
            <SearchableSelect
              label="All Countries"
              options={countries}
              placeholder="Search from many countries..."
              value={largeDatasetCountries}
              onChange={handleMultipleChange(setLargeDatasetCountries)}
              selectionMode="multiple"
              showSearch={true}
              searchPlaceholder="Type to filter countries..."
              width="100%"
              maxSelectedDisplay={3}
            />
            {largeDatasetCountries.length > 0 && (
              <p className="text-sm text-default-600 mt-2">
                Selected {largeDatasetCountries.length} countries
              </p>
            )}
            <p className="text-xs text-default-500 mt-2">
              Demonstrates search functionality with a larger dataset
            </p>
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

// Component to display SOP card view
const SopCardSection = () => {
  const cardWithBodyConfig: SopCardViewProps = {
    header: {
      icon: <MdInfo />,
      title: "Project Phoenix",
      description: "Detailed task breakdown and milestone status.",
      badge: { content: "Active", color: "danger" },
    },
    body: {
      title: "Key Tasks",
      items: [
        { text: "User Authentication", color: "success" },
        { text: "Database Schema Design", color: "danger" },
        { text: "API Endpoint Development", color: "warning" },
      ],
    },
    footer: {
      timestamp: "Updated 2 hours ago",
      actions: ["view", "edit", "delete"],
    },
  };

  const cardWithProgressConfig: SopCardViewProps = {
    header: {
      icon: <MdBuild />,
      title: "System Deployment",
      description: "CI/CD Pipeline progress for production release.",
    },
    progress: {
      title: "Deployment Progress",
      value: 45,
      label: "45%",
    },
    footer: {
      timestamp: "Last commit: 15 mins ago",
      actions: ["view", "edit", "delete"],
    },
  };

  const cardHeaderFooterOnlyConfig: SopCardViewProps = {
    header: {
      icon: <MdStar />, 
      title: "Archived Initiative",
      description: "This project has been completed and is now archived.",
    },
    footer: {
      timestamp: "Completed on 08/15/2024",
      actions: ["view", "edit", "delete"] as Array<"view" | "edit" | "delete">,
    },
  };

  const taskTrackerConfig = {
    header: {
      icon: <MdCheckCircle />,
      title: "Task Tracker",
      badge: "Active",
    },
    progress: {
      value: 50,
      label: "50%",
    },
    stats: {
      items: [
        { icon: <MdList />, value: 10, label: "Tasks" },
        { icon: <MdCheckCircle />, value: 4, label: "Completed" },
        { icon: <MdRadioButtonUnchecked />, value: 2, label: "Pending" },
      ],
    },
    categories: {
      title: "Categories",
      items: ["Work", "Personal", "Other"],
    },
    footer: {
      timestamp: "Updated 2h ago",
      actions: ["view", "edit", "delete"],
    },
  };

  return (
    <div>
      <SectionHeader 
        title="SOP Card View" 
        description="Standard Operating Procedure cards with different layouts and information displays."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Card with Body Content</h3>
          <div className="flex justify-center">
            <SopCardView {...cardWithBodyConfig} />
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Card with Progress Bar</h3>
          <div className="flex justify-center">
            <SopCardView {...cardWithProgressConfig} />
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Minimal Card</h3>
          <div className="flex justify-center">
            <SopCardView {...cardHeaderFooterOnlyConfig} />
          </div>
        </WhiteCard>

        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Card with Chips and Stats</h3>
          <div className="flex justify-center">
            <CardViewSopV2 {...taskTrackerConfig} />
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

// Component to display finance header section
const FinanceHeaderSection = () => {
  const projectOptions: DropdownOption[] = [
    { value: "all", label: "All Projects" },
    { value: "project1", label: "Project Alpha" },
    { value: "project2", label: "Project Beta" },
  ];

  const statusOptions: DropdownOption[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const searchBarConfig: InputConfig = {
    id: "search",
    type: "search",
    label: "Search Records",
    placeholder: "Search finance records...",
  };

  const [project1, setProject1] = useState<DropdownOption | null>(projectOptions[0]);
  const [status1, setStatus1] = useState<DropdownOption | null>(statusOptions[0]);

  const form1Config: FormConfig = {
    title: "Project Finance",
    searchBar: searchBarConfig,
    button: {
      label: "+ Add Finance Record",
      onClick: () => console.log("Add Finance Record clicked"),
      variant: "solid",
      color: "primary"
    },
    dropdowns: [
      {
        options: projectOptions,
        value: project1,
        onChange: setProject1,
        label: "Select Project"
      },
      {
        options: statusOptions,
        value: status1,
        onChange: setStatus1,
        label: "Status"
      },
    ]
  };

  return (
    <div>
      <SectionHeader 
        title="Finance Header Section" 
        description="Financial data headers with search, filters, and action buttons."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Finance Form with Search and Filters</h3>
          <DynamicForm config={form1Config} />
        </WhiteCard>
      </div>
    </div>
  );
};

// Component to display chip
const ChipSection = () => {
  const [chips, setChips] = useState([
    { id: 1, label: "Removable Chip" },
    { id: 2, label: "Another Chip" },
    { id: 3, label: "One More" },
  ]);

  const handleRemoveChip = (id: number) => {
    setChips(chips.filter(chip => chip.id !== id));
  };

  const handleAddChip = () => {
    const newId = chips.length > 0 ? Math.max(...chips.map(c => c.id)) + 1 : 1;
    setChips([...chips, { id: newId, label: `New Chip ${newId}` }]);
  };

  return (
    <div>
      <SectionHeader 
        title="Chip Components" 
        description="Various chip styles, colors, sizes, and interactive features."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
        {/* Basic Chip Variations */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Basic Chip Variants</h3>
          <div className="flex flex-wrap gap-3">
            <CustomChip variant="solid" color="default">Solid Default</CustomChip>
            <CustomChip variant="solid" color="primary">Solid Primary</CustomChip>
            <CustomChip variant="solid" color="secondary">Solid Secondary</CustomChip>
            <CustomChip variant="solid" color="success">Solid Success</CustomChip>
            <CustomChip variant="solid" color="warning">Solid Warning</CustomChip>
            <CustomChip variant="solid" color="danger">Solid Danger</CustomChip>
          </div>
        </WhiteCard>

        {/* Variant Styles */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Chip Variants</h3>
          <div className="flex flex-wrap gap-3">
            <CustomChip variant="solid" color="primary">Solid</CustomChip>
            <CustomChip variant="bordered" color="primary">Bordered</CustomChip>
            <CustomChip variant="light" color="primary">Light</CustomChip>
            <CustomChip variant="flat" color="primary">Flat</CustomChip>
            <CustomChip variant="faded" color="primary">Faded</CustomChip>
            <CustomChip variant="shadow" color="primary">Shadow</CustomChip>
            <CustomChip variant="dot" color="primary">Dot</CustomChip>
          </div>
        </WhiteCard>

        {/* Sizes */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Chip Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <CustomChip size="sm" color="primary">Small Chip</CustomChip>
            <CustomChip size="md" color="primary">Medium Chip</CustomChip>
            <CustomChip size="lg" color="primary">Large Chip</CustomChip>
          </div>
        </WhiteCard>

        {/* Radius Variations */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Border Radius</h3>
          <div className="flex flex-wrap gap-3">
            <CustomChip radius="none" color="primary">No Radius</CustomChip>
            <CustomChip radius="sm" color="primary">Small Radius</CustomChip>
            <CustomChip radius="md" color="primary">Medium Radius</CustomChip>
            <CustomChip radius="lg" color="primary">Large Radius</CustomChip>
            <CustomChip radius="full" color="primary">Full Radius</CustomChip>
          </div>
        </WhiteCard>

        {/* With Icons and Avatars */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">With Icons & Avatars</h3>
          <div className="flex flex-wrap gap-3">
            <CustomChip 
              color="primary" 
              startContent={<Icon icon="lucide:user" className="text-lg" />}
            >
              With Start Icon
            </CustomChip>
            <CustomChip 
              color="success" 
              endContent={<Icon icon="lucide:check" className="text-lg" />}
            >
              With End Icon
            </CustomChip>
            <CustomChip 
              color="warning" 
              startContent={<Icon icon="lucide:star" className="text-lg" />}
              endContent={<Icon icon="lucide:star" className="text-lg" />}
            >
              Both Icons
            </CustomChip>
            <CustomChip
              color="secondary"
              avatar={
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
              }
            >
              With Avatar
            </CustomChip>
          </div>
        </WhiteCard>

        {/* Interactive Chips */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Interactive Chips</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <CustomChip 
                isCloseable 
                onClose={() => console.log("Chip closed")}
                color="primary"
              >
                Closeable Chip
              </CustomChip>
              <CustomChip 
                onClick={() => console.log("Chip clicked")}
                color="success"
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                Clickable Chip
              </CustomChip>
              <CustomChip isDisabled color="default">
                Disabled Chip
              </CustomChip>
            </div>
            
            {/* Dynamic Chips */}
            <div className="border-t border-default-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-default-700">Dynamic Removable Chips</h4>
                <CustomButton
                  label="Add Chip"
                  size="sm"
                  onPress={handleAddChip}
                  color="primary"
                  variant="flat"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {chips.map(chip => (
                  <CustomChip
                    key={chip.id}
                    isCloseable
                    onClose={() => handleRemoveChip(chip.id)}
                    color="secondary"
                    variant="flat"
                  >
                    {chip.label}
                  </CustomChip>
                ))}
              </div>
              {chips.length === 0 && (
                <p className="text-sm text-default-500 italic">No chips left. Click "Add Chip" to add some.</p>
              )}
            </div>
          </div>
        </WhiteCard>

        {/* Custom Styled Chips */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Custom Styled Chips</h3>
          <div className="flex flex-wrap gap-3">
            <CustomChip
              color="primary"
              classNames={{
                base: "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0",
                content: "font-bold"
              }}
            >
              Gradient Chip
            </CustomChip>
            <CustomChip
              variant="bordered"
              color="success"
              classNames={{
                base: "border-2",
                content: "text-green-700 font-semibold"
              }}
            >
              Custom Border
            </CustomChip>
            <CustomChip
              color="warning"
              className="shadow-lg animate-pulse"
            >
              Animated Chip
            </CustomChip>
            <CustomChip
              variant="dot"
              color="danger"
              classNames={{
                dot: "bg-red-500 w-3 h-3"
              }}
            >
              Custom Dot
            </CustomChip>
          </div>
        </WhiteCard>

        {/* Usage Examples */}
        <WhiteCard>
          <h3 className="text-lg font-semibold mb-4 text-default-800">Practical Examples</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-default-700 mb-2">Status Indicators</h4>
              <div className="flex flex-wrap gap-2">
                <CustomChip color="success" startContent={<Icon icon="lucide:check-circle" />}>
                  Active
                </CustomChip>
                <CustomChip color="warning" startContent={<Icon icon="lucide:clock" />}>
                  Pending
                </CustomChip>
                <CustomChip color="danger" startContent={<Icon icon="lucide:x-circle" />}>
                  Inactive
                </CustomChip>
                <CustomChip color="default" startContent={<Icon icon="lucide:pause" />}>
                  On Hold
                </CustomChip>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-default-700 mb-2">Categories & Tags</h4>
              <div className="flex flex-wrap gap-2">
                <CustomChip variant="flat" color="primary">Technology</CustomChip>
                <CustomChip variant="flat" color="secondary">Design</CustomChip>
                <CustomChip variant="flat" color="success">Marketing</CustomChip>
                <CustomChip variant="flat" color="warning">Finance</CustomChip>
                <CustomChip variant="flat" color="danger">Urgent</CustomChip>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-default-700 mb-2">User Roles</h4>
              <div className="flex flex-wrap gap-2">
                <CustomChip 
                  variant="bordered" 
                  color="primary"
                  avatar={<div className="w-4 h-4 bg-blue-500 rounded-full"></div>}
                >
                  Admin
                </CustomChip>
                <CustomChip 
                  variant="bordered" 
                  color="success"
                  avatar={<div className="w-4 h-4 bg-green-500 rounded-full"></div>}
                >
                  Editor
                </CustomChip>
                <CustomChip 
                  variant="bordered" 
                  color="default"
                  avatar={<div className="w-4 h-4 bg-gray-500 rounded-full"></div>}
                >
                  Viewer
                </CustomChip>
              </div>
            </div>
          </div>
        </WhiteCard>
      </div>
    </div>
  );
};

// Main component that renders based on selected item
const MainContent = ({ selectedItem }: { selectedItem: string | null }) => {
  switch (selectedItem) {
    case "Button":
      return <ButtonsSection />;
    case "Toast":
      return <ToastSection />;
    case "Input Elements":
      return <InputElementsSection />;
    case "Select (Dropdown)":
      return <SelectSection />;
    case "SOP card view":
      return <SopCardSection />;
    case "Finance Header Section":
      return <FinanceHeaderSection />;
    case "Chip":
      return <ChipSection />;
    default:
      return (
        <div>
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <WhiteCard className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4 text-default-900">Welcome to Component Showcase</h2>
              <p className="text-lg text-default-600 mb-6 max-w-2xl mx-auto">
                Select a component from the sidebar to explore different UI elements and their implementations.</p>
            </WhiteCard>
          </div>
        </div>
      );
  }
};

// ✅ Mobile Sidebar Toggle Component
const MobileSidebarToggle: React.FC<{ 
  onToggle: () => void;
  isMobileOpen: boolean;
}> = ({ onToggle, isMobileOpen }) => {
  return (
    <button
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-default-200 rounded-lg shadow-lg"
      onClick={onToggle}
    >
      <Icon icon={isMobileOpen ? "lucide:x" : "lucide:menu"} className="w-5 h-5" />
    </button>
  );
};

const DisplayComponents: React.FC = () => {
  // ✅ Track selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  // ✅ Mobile sidebar state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMenuItemClick = (item: string) => {
    setSelectedMenuItem(item);
    // Close mobile sidebar when item is selected
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ✅ Mobile Sidebar Toggle */}
      <MobileSidebarToggle 
        onToggle={() => setIsMobileOpen(!isMobileOpen)} 
        isMobileOpen={isMobileOpen}
      />

      {/* ✅ Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ✅ Resizable Sidebar with Mobile Responsiveness - FIXED POSITION */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <ResizableSidebar>
          <SidebarMenu 
            onMenuItemClick={handleMenuItemClick} 
            selectedItem={selectedMenuItem}
          />
        </ResizableSidebar>
      </div>

      {/* ✅ Main Content Area - SCROLLABLE ONLY THIS AREA */}
      <div className="flex-1 overflow-auto lg:ml-0 h-screen">
        <MainContent selectedItem={selectedMenuItem} />
      </div>
    </div>
  );
};

export default DisplayComponents;