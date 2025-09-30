import React, { useState, type Key } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import CommonComponents, { AutocompleteData } from "../components/common/CommonComponents";
import CustomInput from "../components/common/CustomInput";
import SopCardView, { type SopCardViewProps } from "../components/ModuleWiseComponents/SopCardView";
import CardViewSopV2 from "@/components/ModuleWiseComponents/CardViewSopV2";
import { MdInfo, MdBuild, MdStar, MdCheckCircle, MdList, MdRadioButtonUnchecked } from "react-icons/md";
import type { Spring } from "framer-motion";
import type { FormConfig } from "@/components/ModuleWiseComponents/DynamicForm";
import type { DropdownOption } from "@/components/Reusable/CustomDropdown";
import DynamicForm from "@/components/ModuleWiseComponents/DynamicForm";
import { CustomCardDropdown } from "@/components/ModuleWiseComponents/CustomCardDropdown";
import CustomButton from "@/components/common/CustomButton";
import CustomSelect from "@/components/common/CustomSelect";
import { UseToast } from "@/hooks/UseToast";
import { CircleX, BadgeCheck, EyeClosed, Eye, Search, UserRound } from 'lucide-react';
import type { InputConfig } from "@/types/common";

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
      
      {/* Sidebar - update styling to match navbar */}
      <div
        ref={sidebarRef}
        className={`
          relative h-screen bg-content1 border-r border-default-200 z-30 
          transition-all duration-300 ease-out-expo
          ${isResizing ? "select-none" : ""}
        `}
        style={{ width: `${currentWidth}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sidebar content */}
        <div className={`h-full overflow-y-auto overflow-x-hidden ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}>
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
    <div className="p-4">
      {/* Enhanced header with gradient background */}
      <div className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
        <AcmeLogo />
        <div>
          <p className="font-bold text-inherit">HERO UI</p>
          <p className="text-xs text-default-500">Component Library</p>
        </div>
      </div>
      
      <nav className="space-y-1">
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
              className={`text-sm transition-colors ${
                selectedItem === item.name ? "text-blue-600" : item.color
              } group-hover:scale-110`} 
            />
            <span className={`font-sm ${
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
  <div className="border-b border-default-200 bg-gradient-to-r from-white to-gray-50/50">
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-wrap gap-4">
        <CustomButton label="Default Button" />
        <CustomButton label="Small" size="sm" />
        <CustomButton label="Medium" size="md" />
        <CustomButton label="Large" size="lg" />
        <CustomButton label="Full Radius" radius="full" />
        <CustomButton label="Primary" color="primary" />
        <CustomButton label="Success" color="success" />
        <CustomButton label="Warning" color="warning" />
        <CustomButton label="Danger" color="danger" />
        <CustomButton label="Solid" color="primary" variant="solid" />
        <CustomButton label="Faded" color="primary" variant="faded" />
        <CustomButton label="Bordered" color="primary" variant="bordered" />
        <CustomButton label="Light" color="primary" variant="light" />
        <CustomButton label="Flat" color="primary" variant="flat" />
        <CustomButton label="Ghost" color="primary" variant="ghost" />
        <CustomButton label="Shadow" color="primary" variant="shadow" />
        <CustomButton label="Disabled Button" isDisabled={true} />
        <CustomButton 
          label="Custom Styled" 
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
        />
      </div>
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col gap-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          {/* Add more input variations as needed */}
        </div>
      </div>
    </div>
  );
};

// Component to display select (dropdown) elements
const SelectSection = () => {
  const animals = [
    { key: "cat", label: "Cat", value: "cat" },
    { key: "dog", label: "Dog", value: "dog" },
    { key: "elephant", label: "Elephant", value: "elephant" },
  ];

  const [selectedAnimal, setSelectedAnimal] = useState<string>("");

  const handleAnimalSelectionChange = (keys: any) => {
    if (keys instanceof Set && keys.size > 0) {
      setSelectedAnimal(Array.from(keys)[0] as string);
    } else {
      setSelectedAnimal("");
    }
  };

  return (
    <div>
      <SectionHeader 
        title="Select (Dropdown) Components" 
        description="Custom dropdown select elements with various configurations and styles."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col gap-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              label="Select an animal"
              items={animals}
              className="max-w-xs"
              onSelectionChange={handleAnimalSelectionChange}
            />
            <CustomSelect
              label="Favorite Animal"
              placeholder="Choose your favorite"
              items={animals}
              className="max-w-xs"
              onSelectionChange={handleAnimalSelectionChange}
            />
          </div>
        </div>
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

  return (
    <div>
      <SectionHeader 
        title="SOP Card View" 
        description="Standard Operating Procedure cards with different layouts and information displays."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-wrap gap-6 justify-center">
          <SopCardView {...cardWithBodyConfig} />
          <SopCardView {...cardWithProgressConfig} />
        </div>
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="space-y-8">
          <DynamicForm config={form1Config} />
        </div>
      </div>
    </div>
  );
};

// Component to display chip
const ChipSection = () => {
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

  const cardTitle = "Status";
  const buttonTitles = ["Active", "Inactive"];
  const dropdownItems = ["Option 1", "Option 2", "Option 3"];

  return (
    <div>
      <SectionHeader 
        title="Chip Components" 
        description="Chip elements and card views with status indicators and interactive features."
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 items-center">
            <CardViewSopV2 {...taskTrackerConfig} />
          </div>
          <CustomCardDropdown
            cardTitle={cardTitle}
            buttonTitles={buttonTitles}
            dropdownItems={dropdownItems}
          />
        </div>
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
        <div className="flex flex-col items-center justify-center min-h-96 text-center p-8">
          <SectionHeader 
            title="Component Library" 
            description="Select a component from the sidebar to explore different UI elements and their implementations."
          />
          <div className="max-w-7xl mx-auto p-6">
            <div className="text-center py-12">
              <CommonComponents
                rotatingTextProps={{
                  texts: ['Project', 'Audit', 'Batch Control', 'Users', 'Users','Assets','Maintenance','IT Support','Pluse','QR','Greeting Card'],
                  mainClassName: "w-fit px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg",
                  staggerFrom: "last" as const,
                  initial: { y: "100%" },
                  animate: { y: 0 },
                  exit: { y: "-120%" },
                  staggerDuration: 0.025,
                  splitLevelClassName: "overflow-hidden pb-0.5 sm:pb-1 md:pb-1",
                  transition: { type: "spring", damping: 30, stiffness: 400 } as Spring,
                  rotationInterval: 2000,
                }}
                accordionProps={{
                  itemClasses: {
                    base: "py-0 w-full",
                    title: "font-normal text-medium",
                    trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                    indicator: "text-medium",
                    content: "text-small px-2",
                  },
                  defaultContent:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                }}
                autocompleteProps={{
                  defaultItems: AutocompleteData,
                }}
                alertProps={{}}
                badgeButtonProps={{}}
                badgeAvatarProps={{}}
                buttonIconProps={{}}
                dropdownProps={{}}
              />
            </div>
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
    <div className="min-h-screen flex">
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

      {/* ✅ Resizable Sidebar with Mobile Responsiveness */}
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

      {/* ✅ Main Content Area */}
      <div className="flex-1 overflow-auto lg:ml-0">
        <MainContent selectedItem={selectedMenuItem} />
      </div>
    </div>
  );
};

export default DisplayComponents;