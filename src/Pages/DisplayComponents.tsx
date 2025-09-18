import React from "react";
import CommonComponents, { animals } from "../components/common/CommonComponents";
import InputTypeComponents, { type InputConfig } from "../components/common/InputTypeComponents";
import SopCardView, { type SopCardViewProps } from "../components/ModuleWiseComponents/SopCardView";
import CardViewSopV2 from "@/components/ModuleWiseComponents/CardViewSopV2";
import { MdInfo, MdBuild, MdStar, MdCheckCircle, MdList, MdRadioButtonUnchecked } from "react-icons/md";
import type { Spring } from "framer-motion";

const DisplayComponents: React.FC = () => {
  const rotatingTextProps = {
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
  };

  // Props for the Accordion
  const accordionProps = {
    itemClasses: {
      base: "py-0 w-full",
      title: "font-normal text-medium",
      trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
      indicator: "text-medium",
      content: "text-small px-2",
    },
    defaultContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  // Props for the Autocomplete
  const autocompleteProps = {
    defaultItems: animals,
  };

  // No specific props needed for Alerts, Badge with Button, Badge with Avatar, Buttons with Icons, or Dropdowns as their data is self-contained in this example.
const inputConfigs: InputConfig[] = [
    {
      id: 'email-field',
      type: 'email',
      label: 'Email', // The label is set here
      placeholder: 'Enter your email'
    },
    {
      id: 'password-field',
      type: 'password', // Setting type to 'password' tells the parent to add icons
      label: 'Password', // The label is set here
      placeholder: 'Enter your password'
    },
    {
      id: 'disabled-field',
      type: 'email',
      label: 'Disabled Email', // The label is set here
      defaultValue: 'contact@example.com',
      isDisabled: true
    },
    {
      id: 'readonly-field',
      type: 'text',
      label: 'Read-Only Field', // The label is set here
      defaultValue: 'This value cannot be changed',
      isReadOnly: true
    },
    {
      // NEW: Configuration for the search bar
      id: 'search-bar',
      type: 'search', // This type tells the parent component to add the icon
      label: "Search", // The label is optional if you have a placeholder
      placeholder: 'Type to search...'
    }
  ];
  
// Card 1: Header, Body, and Footer
const cardWithBodyConfig: import("../components/ModuleWiseComponents/SopCardView").SopCardViewProps = {
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
    actions: ["view", "edit", "delete"], // Specify which actions to show
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

  return (
    <div>
      <CommonComponents
        rotatingTextProps={rotatingTextProps}
        accordionProps={accordionProps}
        autocompleteProps={autocompleteProps}
        alertProps={{}} // Empty props, can be expanded
        badgeButtonProps={{}} // Empty props
        badgeAvatarProps={{}} // Empty props
        buttonIconProps={{}} // Empty props
        dropdownProps={{}} // Empty props
      />
    {/* --- RENDER NEW INPUT COMPONENTS --- */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Dynamic Input Fields</h2>
        <InputTypeComponents inputConfigs={inputConfigs} />
      </div>
      {/* --- Render the new SOP Card Components --- */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">SOP Card Views</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Render each card by passing its specific configuration */}
          <SopCardView {...cardWithBodyConfig} />
          <SopCardView {...cardWithProgressConfig} />
          <SopCardView {...cardHeaderFooterOnlyConfig} />
        </div>
      </div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8 flex flex-col gap-2">
        {/* Render the card by passing its configuration object */}
        <CardViewSopV2 {...taskTrackerConfig} />
        <CardViewSopV2 {...taskTracker2Config} />
        <CardViewSopV2 {...taskTracker3Config} />
        <CardViewSopV2 {...taskTracker4Config} />
    </div>
    </div>
  );
};

export default DisplayComponents;