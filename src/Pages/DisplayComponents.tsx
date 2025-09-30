import React, { useState, type Key } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
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

// ✅ Acme Logo component from navbar
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

// Component to display buttons
const ButtonsSection = () => (
  <div className="flex flex-wrap gap-4 p-4">
    {/* Basic usage */}
    <CustomButton label="Default Button" />
    
    {/* Size variations */}
    <CustomButton label="Small" size="sm" />
    <CustomButton label="Medium" size="md" />
    <CustomButton label="Large" size="lg" />
    
    {/* Radius variations */}
    <CustomButton label="Full Radius" radius="full" />
    <CustomButton label="Large Radius" radius="lg" />
    <CustomButton label="Medium Radius" radius="md" />
    <CustomButton label="Small Radius" radius="sm" />
    <CustomButton label="No Radius" radius="none" />
    
    {/* Color variations */}
    <CustomButton label="Default" color="default" />
    <CustomButton label="Primary" color="primary" />
    <CustomButton label="Secondary" color="secondary" />
    <CustomButton label="Success" color="success" />
    <CustomButton label="Warning" color="warning" />
    <CustomButton label="Danger" color="danger" />
    
    {/* Variant variations */}
    <CustomButton label="Solid" color="primary" variant="solid" />
    <CustomButton label="Faded" color="primary" variant="faded" />
    <CustomButton label="Bordered" color="primary" variant="bordered" />
    <CustomButton label="Light" color="primary" variant="light" />
    <CustomButton label="Flat" color="primary" variant="flat" />
    <CustomButton label="Ghost" color="primary" variant="ghost" />
    <CustomButton label="Shadow" color="primary" variant="shadow" />
    
    {/* Disabled state */}
    <CustomButton label="Disabled Button" isDisabled={true} />
    
    {/* Custom className */}
    <CustomButton 
      label="Custom Styled" 
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
    />
  </div>
);

// Component to display toast
const ToastSection = () => {
  const { showToast } = UseToast();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* Basic Toast */}
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

      {/* With Promise */}
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

      {/* With Icons */}
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

      {/* Custom Content */}
      <CustomButton
        label="Custom Content Toast"
        color="warning"
        onPress={() => {
          showToast({
            title: "Custom Notification",
            description: "This has custom end content",
            endContent: (
              <button 
                className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                onClick={() => console.log("Custom action clicked")}
              >
                Action
              </button>
            ),
            color: "warning",
          });
        }}
      />

      {/* Different Variants */}
      <CustomButton
        label="Faded Variant"
        color="default"
        onPress={() => {
          showToast({
            title: "Faded Toast",
            description: "This is a faded variant toast",
            variant: "faded",
            color: "primary",
          });
        }}
      />

      <CustomButton
        label="Bordered Variant"
        color="default"
        onPress={() => {
          showToast({
            title: "Bordered Toast",
            description: "This is a bordered variant toast",
            variant: "bordered",
            color: "secondary",
          });
        }}
      />

      {/* Different Radius */}
      <CustomButton
        label="Full Radius Toast"
        color="primary"
        onPress={() => {
          showToast({
            title: "Rounded Toast",
            description: "This toast has full radius",
            radius: "full",
            color: "primary",
          });
        }}
      />

      {/* Long timeout */}
      <CustomButton
        label="Long Timeout Toast"
        color="success"
        onPress={() => {
          showToast({
            title: "Long Notification",
            description: "This toast will stay for 10 seconds",
            timeout: 10000,
            shouldShowTimeoutProgress: true,
            color: "success",
          });
        }}
      />

      {/* Without Icon */}
      <CustomButton
        label="No Icon Toast"
        color="default"
        onPress={() => {
          showToast({
            title: "No Icon",
            description: "This toast doesn't have an icon",
            hideIcon: true,
            color: "default",
          });
        }}
      />
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

  // Validation function
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return true;
  };

  return (
    <div className="flex flex-col gap-8 p-4 max-w-4xl mx-auto">
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

      {/* With Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Different Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Different Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomInput
          label="Small"
          size="sm"
          placeholder="Small input"
        />
        
        <CustomInput
          label="Medium"
          size="md"
          placeholder="Medium input"
        />
        
        <CustomInput
          label="Large"
          size="lg"
          placeholder="Large input"
        />
      </div>

      {/* Different Colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomInput
          label="Success"
          color="success"
          placeholder="Success color"
        />
        
        <CustomInput
          label="Warning"
          color="warning"
          placeholder="Warning color"
        />
        
        <CustomInput
          label="Danger"
          color="danger"
          placeholder="Danger color"
        />
      </div>

      {/* Validation Examples */}
      <div className="grid grid-cols-1 gap-4">
        <CustomInput
          label="Email with Validation"
          type="email"
          placeholder="Enter valid email"
          isRequired
          errorMessage="Please enter a valid email address"
          isInvalid={!!email && !validateEmail(email)}
        />
        
        <CustomInput
          label="Password with Validation"
          type="password"
          placeholder="Minimum 8 characters"
          isRequired
          errorMessage="Password must be at least 8 characters"
          isInvalid={!!password && !validatePassword(password)}
        />
      </div>

      {/* Advanced Features */}
      <div className="grid grid-cols-1 gap-4">
        <CustomInput
          label="With Description"
          placeholder="This input has a description"
          description="This is a helpful description for the input field"
        />
        
        <CustomInput
          label="Read Only"
          defaultValue="This value cannot be changed"
          isReadOnly
        />
        
        <CustomInput
          label="Disabled"
          placeholder="This input is disabled"
          isDisabled
        />
      </div>

      {/* Custom Radius */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Full Radius"
          radius="full"
          placeholder="Fully rounded"
        />
        
        <CustomInput
          label="Large Radius"
          radius="lg"
          placeholder="Large radius"
        />
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
    { key: "lion", label: "Lion", value: "lion" },
    { key: "tiger", label: "Tiger", value: "tiger" },
    { key: "giraffe", label: "Giraffe", value: "giraffe" },
    { key: "dolphin", label: "Dolphin", value: "dolphin" },
    { key: "penguin", label: "Penguin", value: "penguin" },
    { key: "zebra", label: "Zebra", value: "zebra" },
    { key: "shark", label: "Shark", value: "shark" },
    { key: "whale", label: "Whale", value: "whale" },
    { key: "otter", label: "Otter", value: "otter" },
    { key: "crocodile", label: "Crocodile", value: "crocodile", disabled: true },
  ];

  const countries = [
    { key: "us", label: "United States", value: "us" },
    { key: "ca", label: "Canada", value: "ca" },
    { key: "uk", label: "United Kingdom", value: "uk" },
    { key: "au", label: "Australia", value: "au" },
    { key: "de", label: "Germany", value: "de" },
    { key: "fr", label: "France", value: "fr" },
    { key: "jp", label: "Japan", value: "jp" },
  ];

  const fruits = [
    { key: "apple", label: "Apple", value: "apple" },
    { key: "banana", label: "Banana", value: "banana" },
    { key: "orange", label: "Orange", value: "orange" },
    { key: "grape", label: "Grape", value: "grape" },
    { key: "strawberry", label: "Strawberry", value: "strawberry" },
  ];

  // Select state variables for CustomSelect components
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(new Set());
  const [selectedFruit, setSelectedFruit] = useState<string>("");

  const handleAnimalSelectionChange = (keys: any) => {
    if (keys instanceof Set && keys.size > 0) {
      setSelectedAnimal(Array.from(keys)[0] as string);
    } else {
      setSelectedAnimal("");
    }
  };

  const handleCountriesSelectionChange = (keys: any) => {
    setSelectedCountries(keys as Set<string>);
  };

  const handleFruitSelectionChange = (keys: any) => {
    if (keys instanceof Set && keys.size > 0) {
      setSelectedFruit(Array.from(keys)[0] as string);
    } else {
      setSelectedFruit("");
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 max-w-4xl mx-auto">
      {/* Basic Selects */}
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

      {/* Different Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect
          label="Bordered Select"
          variant="bordered"
          items={countries}
          color="primary"
          className="max-w-xs"
        />
        
        <CustomSelect
          label="Underlined Select"
          variant="underlined"
          items={countries}
          color="secondary"
          className="max-w-xs"
        />
      </div>

      {/* Different Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomSelect
          label="Small Select"
          size="sm"
          items={fruits}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="Medium Select"
          size="md"
          items={fruits}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="Large Select"
          size="lg"
          items={fruits}
          className="max-w-xs"
        />
      </div>

      {/* Different Colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomSelect
          label="Success Color"
          color="success"
          items={fruits}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="Warning Color"
          color="warning"
          items={fruits}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="Danger Color"
          color="danger"
          items={fruits}
          className="max-w-xs"
        />
      </div>

      {/* Multiple Selection */}
      <div className="grid grid-cols-1 gap-6">
        <CustomSelect
          label="Select Countries (Multiple)"
          selectionMode="multiple"
          items={countries}
          placeholder="Choose countries"
          isClearable
          onSelectionChange={handleCountriesSelectionChange}
          className="max-w-md"
        />
        <p className="text-sm text-gray-600">
          Selected: {Array.from(selectedCountries).join(", ") || "None"}
        </p>
      </div>

      {/* With Validation */}
      <div className="grid grid-cols-1 gap-6">
        <CustomSelect
          label="Required Field"
          items={animals}
          isRequired
          errorMessage="Please select an animal"
          isInvalid={!selectedAnimal}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="With Description"
          items={countries}
          description="Please select your country of residence"
          className="max-w-xs"
        />
      </div>

      {/* Advanced Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect
          label="Disabled Select"
          items={animals}
          isDisabled
          defaultSelectedKeys={new Set(["cat"])}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="With Default Value"
          items={animals}
          defaultSelectedKeys={new Set(["dog"])}
          className="max-w-xs"
        />
      </div>

      {/* Custom Radius */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect
          label="Full Radius"
          radius="full"
          items={fruits}
          className="max-w-xs"
        />
        
        <CustomSelect
          label="Large Radius"
          radius="lg"
          items={fruits}
          className="max-w-xs"
        />
      </div>

      {/* With Icons */}
      <div className="grid grid-cols-1 gap-6">
        <CustomSelect
          label="Select with Custom Icon"
          items={animals}
          selectorIcon={
            <span className="text-lg">🔍</span>
          }
          className="max-w-xs"
        />
      </div>
    </div>
  );
};

// Component to display SOP card view
const SopCardSection = () => {
  // Card 1: Header, Body, and Footer
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

  // Card 2: Header, Progress Bar, and Footer
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

  // Card 3: Header and Footer only
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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">SOP Card Views</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        <SopCardView {...cardWithBodyConfig} />
        <SopCardView {...cardWithProgressConfig} />
        <SopCardView {...cardHeaderFooterOnlyConfig} />
      </div>
    </div>
  );
};

// Component to display finance header section
const FinanceHeaderSection = () => {
  // Sample dropdown options
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

  const contractorOptions: DropdownOption[] = [
    { value: "select", label: "Select Contractor" },
    { value: "contractor1", label: "Contractor A" },
    { value: "contractor2", label: "Contractor B" },
  ];

  // Search bar configuration
  const searchBarConfig: InputConfig = {
    id: "search",
    type: "search",
    label: "Search Records",
    placeholder: "Search finance records...",
  };

  // State for dropdown values
  const [project1, setProject1] = useState<DropdownOption | null>(projectOptions[0]);
  const [status1, setStatus1] = useState<DropdownOption | null>(statusOptions[0]);
  const [contractor1, setContractor1] = useState<DropdownOption | null>(contractorOptions[0]);
  
  const [project2, setProject2] = useState<DropdownOption | null>(projectOptions[0]);
  const [status2, setStatus2] = useState<DropdownOption | null>(statusOptions[0]);
  
  const [project3, setProject3] = useState<DropdownOption | null>(projectOptions[0]);
  const [contractor3, setContractor3] = useState<DropdownOption | null>(contractorOptions[0]);

  // Form configurations
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
      {
        options: contractorOptions,
        value: contractor1,
        onChange: setContractor1,
        label: "Contractor"
      }
    ]
  };

  const form2Config: FormConfig = {
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
        value: project2,
        onChange: setProject2,
        label: "Select Project"
      },
      {
        options: statusOptions,
        value: status2,
        onChange: setStatus2,
        label: "Status"
      }
    ]
  };

  const form3Config: FormConfig = {
    title: "Project Finance",
    searchBar: searchBarConfig,
    dropdowns: [
      {
        options: projectOptions,
        value: project3,
        onChange: setProject3,
        label: "Select Project"
      },
      {
        options: contractorOptions,
        value: contractor3,
        onChange: setContractor3,
        label: "Contractor"
      }
    ]
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Variation 1: Title, Button, Searchbar and 3 Dropdowns</h2>
        <DynamicForm config={form1Config} />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Variation 2: Title, Button, Searchbar and 2 Dropdowns</h2>
        <DynamicForm config={form2Config} />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Variation 3: Title, Dropdown, Searchbar, Dropdown</h2>
        <DynamicForm config={form3Config} />
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

  const taskTracker2Config = {
    header: {
      icon: <MdCheckCircle />,
      title: "Fruit Salad",
      badge: "starter",
    },
    stats: {
      items: [
        { icon: <MdList />, value: 5, label: "min" },
        { icon: <MdCheckCircle />, value: 80, label: "servings" },
        { icon: <MdRadioButtonUnchecked />, value: 4, label: "items" },
      ],
    },
    categories: {
      title: "Ingredients",
      items: ["Grapes", "Banana", "Apple"],
    },
    footer: {
      timestamp: "Updated 2h ago",
      actions: ["view", "edit", "delete"],
    },
  };

  const taskTracker3Config = {
    header: {
      icon: <MdCheckCircle />,
      title: "Kitchen Cleaning",
      badge: "Sweepers",
    },
    footer: {
      timestamp: "2025-09-18",
      actions: ["view", "edit", "delete"],
    },
  };

  const taskTracker4Config = {
    header: {
      icon: <MdCheckCircle />,
      title: "Inventory Check",
      badge: "Monthly",
    },
    progress: {
      value: 75,
      label: "75%",
    },
    categories: {
      items: ["Buy Ingredients", "Maintain Temperature"],
    },
    footer: { 
      timestamp: "2025-09-10",
      actions: ["view", "edit", "delete"] },
  };

  const cardTitle = "Status";
  const buttonTitles = ["Active", "Inactive"];
  const dropdownItems = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="space-y-8">
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8 flex flex-col gap-2">
        <CardViewSopV2 {...taskTrackerConfig} />
        <CardViewSopV2 {...taskTracker2Config} />
        <CardViewSopV2 {...taskTracker3Config} />
        <CardViewSopV2 {...taskTracker4Config} />
      </div>
      
      <CustomCardDropdown
        cardTitle={cardTitle}
        buttonTitles={buttonTitles}
        dropdownItems={dropdownItems}
      />
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
          <h2 className="text-3xl font-bold mb-4">Welcome to Component Showcase</h2>
          <p className="text-lg text-gray-600 mb-6">
            Select a component from the sidebar to explore different UI elements
          </p>
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
      );
  }
};

const DisplayComponents: React.FC = () => {
  // ✅ Navbar state
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // ✅ Track selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const menuItems = [
    "Button",
    "Toast",
    "Input Elements",
    "Select (Dropdown)",
    "SOP card view",
    "Finance Header Section",
    "Chip",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleMenuItemClick = (item: string) => {
    setSelectedMenuItem(item);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Navbar at the top */}
      <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="full"
        classNames={{
          base: "px-5",
          wrapper: "px-0",
        }}>
        {/* Left side: menu toggle + brand */}
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="ml-0"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        {/* ✅ Drawer styled as left sidebar */}
        <NavbarMenu className="w-64 max-w-xs bg-white shadow-lg p-4 py-15">
          {menuItems.map((item) => (
            <NavbarMenuItem key={item}>
              <Link
                className="w-full cursor-pointer"
                size="lg"
                onClick={() => handleMenuItemClick(item)}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* ✅ Main Content Area */}
      <div className="flex-1">
        <MainContent selectedItem={selectedMenuItem} />
      </div>
    </div>
  );
};

export default DisplayComponents;