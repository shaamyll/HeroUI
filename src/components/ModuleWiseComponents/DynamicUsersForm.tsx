// components/ModuleWiseComponents/DynamicUsersForm.tsx
import type { ReactNode, CSSProperties, FormHTMLAttributes } from "react";
import { Form as UsersForm, Accordion, AccordionItem, Switch, Card, CardBody, CardHeader } from "@heroui/react";
import CustomChip from "../common/CustomChip";
import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import { useState, useEffect } from "react";
import SearchableSelect from "../Reusable/SearchableSelect";
import { ChevronDownIcon } from "lucide-react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "tel" | "select";
  placeholder?: string;
  required?: boolean;
  validationError?: string;
  disabled?: boolean;
  options?: Array<{ key: string; label: string }>;
}

export interface FormProps {
  children?: ReactNode;
  validationBehavior?: 'native' | 'aria';
  validationErrors?: Record<string, string | string[]>;
  action?: string | FormHTMLAttributes<HTMLFormElement>['action'];
  encType?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  method?: 'get' | 'post' | 'dialog';
  target?: '_blank' | '_self' | '_parent' | '_top';
  autoComplete?: 'off' | 'on';
  autoCapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  className?: string;
  style?: CSSProperties;
  formTitle?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  onSubmit?: (data: UsersFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  initialData?: Record<string, any>;
  fields?: FormField[];
  fullWidth?: boolean;
}

export interface UsersFormData {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  nationalityStatus: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

export interface Chip {
  id: string;
  label: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
}

export interface AccordionItemData {
  key: string;
  title: ReactNode;
  subtitle?: ReactNode;
  chips: Chip[];
  icon?: ReactNode;
  iconColor?: string;
  isDisabled?: boolean;
  classNames?: {
    subtitle?: string;
  };
}

// Default form fields configuration
const defaultFields: FormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
    validationError: "Full Name is required"
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
    required: true,
    validationError: "Address is required"
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    validationError: "Please enter a valid email address"
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter your phone number",
    required: true,
    validationError: "Please enter a valid phone number"
  },
  {
    name: "nationalityStatus",
    label: "Nationality Status",
    type: "select",
    required: true,
    validationError: "Please select any one option",
    options: [
      { key: "citizen", label: "Citizen" },
      { key: "permanent_resident", label: "Permanent Resident" },
      { key: "temporary_resident", label: "Temporary Resident" },
      { key: "foreign_national", label: "Foreign National" }
    ]
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    validationError: "Please select any one option",
    options: [
      { key: "male", label: "Male" },
      { key: "female", label: "Female" },
      { key: "other", label: "Other" },
      { key: "prefer_not_to_say", label: "Prefer not to say" }
    ]
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    validationError: "Password must be at least 8 characters long"
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    validationError: "Passwords do not match"
  }
];

// Internal Accordion Component for this form only
function FormAccordion({ items }: { items: AccordionItemData[] }) {
  const [appliedKeys, setAppliedKeys] = useState<Set<string>>(new Set());
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleButtonClick = (key: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion toggle when clicking apply button
    setAppliedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleSelectionChange = (keys: Set<string>) => {
    setOpenKey(Array.from(keys)[0] || null);
  };

  const renderChips = (chips: Chip[]) => {
    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <CustomChip
            key={chip.id}
            color={chip.color || "default"}
            variant={chip.variant || "flat"}
            size="sm"
            className="cursor-pointer transition-all duration-200 hover:scale-105"
          >
            {chip.label}
          </CustomChip>
        ))}
      </div>
    );
  };

  const itemClasses = {
    base: "bg-white rounded-lg border border-default-200",
    title: "font-normal text-sm flex-1",
    trigger: "px-4 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center justify-between gap-2",
    indicator: "text-sm order-first mr-1",
    content: "text-xs p-4 w-full bg-white",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto relative">
      {items.map((item) => (
        <div
          key={item.key}
          className={`relative ${item.key === openKey ? "z-50" : "z-0"}`}
        >
          <Accordion
            selectionMode="single"
            itemClasses={itemClasses}
            selectedKeys={openKey ? new Set([openKey]) : new Set()}
            onSelectionChange={(keys) => handleSelectionChange(keys as Set<string>)}
          >
            <AccordionItem
              key={item.key}
              aria-label={typeof item.title === "string" ? item.title : `Accordion item ${item.key}`}
              isDisabled={item.isDisabled}
              classNames={item.classNames}
              isCompact
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="truncate font-medium text-default-700">{item.title}</div>
                  <CustomButton
                    label={appliedKeys.has(item.key) ? "Applied" : "Apply"}
                    size="sm"
                    radius="full"
                    variant={appliedKeys.has(item.key) ? "solid" : "flat"}
                    color={appliedKeys.has(item.key) ? "success" : "primary"}
                    onPress={(e: any) => handleButtonClick(item.key, e)}
                    className="ml-2 flex-shrink-0"
                  />
                </div>
              }
            >
              {renderChips(item.chips)}
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

// New internal component for the card-based selection section
function CardSelectSection({ title }: { title: string }) {
  const [enabled, setEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const options = [
    { value: "admin_access", label: "Admin Access" },
    { value: "edit_permissions", label: "Edit Permissions" },
    { value: "view_reports", label: "View Reports" },
    { value: "export_data", label: "Export Data" },
    { value: "manage_users", label: "Manage Users" },
    { value: "system_config", label: "System Configuration" },
    { value: "audit_logs", label: "Audit Logs" },
    { value: "data_export", label: "Data Export" },
    { value: "user_management", label: "User Management" },
  ];

  const handleSelectionChange = (newValue: any) => {
    setSelectedOptions(Array.isArray(newValue) ? newValue : [newValue]);
  };

  return (
    <Card className="w-full bg-white rounded-lg border border-default-200 shadow-xs hover:shadow-md transition-shadow duration-200 mb-4">
      <CardHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            className="p-1 hover:bg-default-100 rounded-lg transition-colors"
            onClick={() => enabled && setExpanded((prev) => !prev)}
            disabled={!enabled}
            aria-label="Toggle dropdown"
          >
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              } ${!enabled ? "opacity-30" : "text-default-600"}`}
            />
          </button>
          <span className="font-semibold text-lg text-default-800">{title}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            isSelected={enabled}
            onValueChange={(val) => {
              setEnabled(val);
              if (!val) {
                setExpanded(false);
                setSelectedOptions([]);
              }
            }}
            size="md"
            color="success"
          />
        </div>
      </CardHeader>
      {expanded && enabled && (
        <CardBody className="p-4 border-t border-default-100">
          <div className="space-y-4">
            <SearchableSelect
              selectionMode="multiple"
              options={options}
              placeholder={`Select ${title} permissions...`}
              value={selectedOptions}
              onChange={handleSelectionChange}
              showSearch={true}
              searchPlaceholder="Search permissions..."
              label={`${title} Permissions`}
              width="100%"
              maxSelectedDisplay={3}
              closeOnSelect={false}
            />
            {selectedOptions.length > 0 && (
              <div className="p-3 bg-success-50 rounded-lg border border-success-200">
                <p className="text-sm text-success-700 font-medium">
                  {selectedOptions.length} permission(s) selected for {title}
                </p>
              </div>
            )}
          </div>
        </CardBody>
      )}
    </Card>
  );
}

// Main UsersForm component
function UsersFormComponent() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      label: field.label,
      isRequired: field.required,
      isInvalid: !!errors[field.name],
      errorMessage: errors[field.name],
      className: "w-full",
      fullWidth: true
    };

    if (field.type === "select") {
      return (
        <SearchableSelect
          {...commonProps}
          options={field.options?.map(opt => ({ value: opt.key, label: opt.label })) || []}
          placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
          value={formData[field.name] ? { value: formData[field.name], label: formData[field.name] } : null}
          onChange={(value) => handleInputChange(field.name, value?.value || "")}
          showSearch={true}
          width="100%"
        />
      );
    }

    return (
      <CustomInput
        {...commonProps}
        type={field.type}
        placeholder={field.placeholder}
        value={formData[field.name] || ""}
        onChange={(value) => handleInputChange(field.name, value)}
        variant="bordered"
      />
    );
  };

  const column1Fields = defaultFields.filter((_, index) => index % 2 === 0);
  const column2Fields = defaultFields.filter((_, index) => index % 2 === 1);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-6 text-default-900">User Information</h3>
      <UsersForm
        className="w-full"
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-6 mb-6">
          <div className="space-y-4">
            {column1Fields.map((field) => (
              <div key={field.name}>
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {column2Fields.map((field) => (
              <div key={field.name}>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      </UsersForm>
    </div>
  );
}

// Main exported component
export default function DynamicUsersForm() {
  // Sample accordion data with random values (not user form data)
  const accordionItems: AccordionItemData[] = [
    {
      key: "user-permissions-1",
      title: "User Permissions Summary",
      chips: [
        { id: "1", label: "Admin Access", color: "primary", variant: "solid" },
        { id: "2", label: "Edit Mode", color: "success", variant: "flat" },
        { id: "3", label: "View Reports", color: "secondary", variant: "bordered" },
        { id: "4", label: "Export Data", color: "warning", variant: "dot" },
      ],
    },
    {
      key: "system-roles-2",
      title: "System Roles",
      chips: [
        { id: "1", label: "Super Admin", color: "danger", variant: "solid" },
        { id: "2", label: "Content Manager", color: "primary", variant: "flat" },
        { id: "3", label: "Reviewer", color: "success", variant: "bordered" },
      ],
    },
    {
      key: "access-levels-3",
      title: "Access Levels",
      chips: [
        { id: "1", label: "Full Access", color: "success", variant: "solid" },
        { id: "2", label: "Limited Access", color: "warning", variant: "flat" },
        { id: "3", label: "Read Only", color: "default", variant: "bordered" },
        { id: "4", label: "No Access", color: "danger", variant: "dot" },
      ],
    },
  ];

  const cardTitles = [
    "Audit", "SOP", "User", "Project", "QR", "Greeting Card", 
    "Maintenance", "Batch", "Asset", "IT", "Scorecard", "Pulse"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section 1: UsersForm */}
        <div className="bg-white rounded-xl border border-default-200 shadow-xs p-6">
          <UsersFormComponent />
        </div>

        {/* Section 2: FormAccordion */}
        <div className="bg-white rounded-xl border border-default-200 shadow-xs p-6">
          <h3 className="text-xl font-bold mb-6 text-default-900">Quick Actions</h3>
          <FormAccordion items={accordionItems} />
        </div>

        {/* Section 3: Module Permissions (Full Width) */}
        <div className="bg-white rounded-xl border border-default-200 shadow-xs p-6">
          <h3 className="text-xl font-bold mb-6 text-default-900">Module Permissions</h3>
          <div className="space-y-4">
            {cardTitles.map((title, index) => (
              <CardSelectSection key={index} title={title} />
            ))}
          </div>
        </div>

        {/* Form Action Buttons at Bottom Right */}
        <div className="flex justify-end gap-3 pt-6 border-t border-default-200">
          <CustomButton
            label="Cancel"
            variant="bordered"
            color="default"
            size="lg"
            onPress={handleCancel}
            className="min-w-32"
          />
          <CustomButton
            label="Save User"
            color="primary"
            size="lg"
            onPress={handleSubmit}
            className="min-w-32"
          />
        </div>
      </div>
    </div>
  );
}