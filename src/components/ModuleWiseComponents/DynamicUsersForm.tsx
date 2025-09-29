// components/ModuleWiseComponents/DynamicUsersForm.tsx
import type { ReactNode, CSSProperties, FormHTMLAttributes } from "react";
import { Form as UsersForm, Accordion, AccordionItem, Switch, Card, CardBody, Select, SelectItem, CardHeader } from "@heroui/react";
import CustomChip from "../common/CustomChip";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
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
function FormAccordion({ items, formData }: { items: AccordionItemData[], formData: any }) {

  const [appliedKeys, setAppliedKeys] = useState<Set<string>>(new Set());
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleButtonClick = (key: string) => {
    setAppliedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key); // toggle back if needed
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleSelectionChange = (keys: Set<string>) => {
    setOpenKey(Array.from(keys)[0] || null);
  };

  const renderChips = (chips: Chip[], itemKey: string) => {
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
        <CustomButton
          label={appliedKeys.has(itemKey) ? "Applied" : "Apply"}
          size="sm"
          radius="full"
          variant={appliedKeys.has(itemKey) ? "solid" : "flat"}
          color={appliedKeys.has(itemKey) ? "success" : "primary"}
          onPress={() => handleButtonClick(itemKey)}
          className="ml-auto"
        />
      </div>
    );
  };

  const itemClasses = {
    base: "bg-white rounded-lg",
    title: "font-normal text-sm flex-1", // flex grow for spacing
    trigger: "px-4 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center justify-between gap-2",
    indicator: "text-sm order-first mr-1", // force left position
    content: "text-xs p-2 w-full absolute top-full left-0 z-50 bg-white shadow-lg rounded-md mt-1 border border-gray-200",
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
            onSelectionChange={(keys) =>
              handleSelectionChange(keys as Set<string>)
            }
          >
            <AccordionItem
              key={item.key}
              aria-label={
                typeof item.title === "string"
                  ? item.title
                  : `Accordion item ${item.key}`
              }
              isDisabled={item.isDisabled}
              classNames={item.classNames}
              isCompact
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="truncate">{item.title}</div>
                </div>
              }
            >
              {renderChips(item.chips, item.key)}
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

// New internal component for the Audit section
function ModuleAccordion() {
  const [selectedRoles, setSelectedRoles] = useState<Record<string, any>>({});
  const [enabledKeys, setEnabledKeys] = useState(new Set<string>());

  const allSections = [
    { key: 'audit', title: 'Audit' },
    { key: 'sop', title: 'Sop' },
    { key: 'user', title: 'User' },
    { key: 'batch', title: 'Batch' },
    { key: 'project', title: 'Project' },
    { key: 'pulse', title: 'Pulse' },
    { key: 'qr', title: 'QR' },
    { key: 'scorecard', title: 'Scorecard' },
    { key: 'greeting-card', title: 'Greeting Card' },
    { key: 'asset', title: 'Asset' },
    { key: 'maintenance', title: 'Maintenance' },
    { key: 'it', title: 'IT' },
  ];

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
    { value: "contributor", label: "Contributor" },
  ];

  const handleSwitchChange = (key: string, isSelected: boolean) => {
    setEnabledKeys(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  };

  // Calculate the keys of accordions that should be disabled.
  const disabledAccordionKeys = allSections
    .map(section => section.key)
    .filter(key => !enabledKeys.has(key));


  const itemClasses = {
    base: "w-full",
    title: "font-semibold text-gray-800",
    trigger: "h-16 flex items-center p-4",
    indicator: "text-lg",
    content: "p-4 space-y-4",
  };

  return (
    <div className="w-full mb-8">
      <Accordion
        variant="splitted"
        selectionMode="single"
        itemClasses={itemClasses}
        className="w-full"
      >
        {allSections.map(item => {
          const isEnabled = enabledKeys.has(item.key);
          return (
            <AccordionItem
              key={item.key}
              aria-label={item.title}
              title={
                <div className="flex items-center justify-between w-full">
                  <span>{item.title}</span>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                      isSelected={isEnabled}
                      onValueChange={(isSelected) => handleSwitchChange(item.key, isSelected)}
                      aria-label={`Enable ${item.title}`}
                    />
                  </div>
                </div>
              }
            >
              <SearchableSelect
                selectionMode="multiple"
                options={roleOptions}
                placeholder={`Select ${item.title} Roles`}
                value={selectedRoles[item.key] || []}
                onChange={(newValue) =>
                  setSelectedRoles(prev => ({ ...prev, [item.key]: newValue }))
                }
                showSearch
                searchPlaceholder="Search for roles..."
                label={`Select ${item.title} Roles`}
              />
               <div className="mt-2">
                <CustomButton
                  variant="light"
                  color="danger"
                  size="sm"
                  label={`Add ${item.title} Section`}
                  endContent={<span className="text-lg">×</span>}
                />
              </div>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}

// New internal component for the card-based selection section
function CardSelectSection() {
  const [enabled, setEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const options = [
    { key: "option1", label: "Option 1" },
    { key: "option2", label: "Option 2" },
    { key: "option3", label: "Option 3" },
  ];

  const renderValue = (selectedItems: any[]) => (
    <div className="flex flex-wrap gap-1">
      {selectedItems.map((item) => (
        <Chip
          key={item.key}
          onClose={() => {
            const newKeys = new Set(selectedKeys);
            newKeys.delete(item.key);
            setSelectedKeys(newKeys);
          }}
        >
          {item.props.children}
        </Chip>
      ))}
    </div>
  );

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex items-center justify-between p-4">
        <button
          className="p-1"
          onClick={() => enabled && setExpanded((prev) => !prev)}
          disabled={!enabled}
          aria-label="Toggle dropdown"
        >
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""} ${!enabled ? "opacity-50" : ""}`}
          />
        </button>
        <span className="font-semibold text-lg flex-1 text-left ml-2">Additional Configuration</span>
        <div onClick={(e) => e.stopPropagation()}>
            <Switch
              isSelected={enabled}
              onValueChange={(val) => {
                setEnabled(val);
                if (!val) setExpanded(false);
              }}
              size="md"
            />
        </div>
      </CardHeader>
      {expanded && enabled && (
        <CardBody className="p-4">
          <Select
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            renderValue={renderValue}
            isMultiline
            label="Select Options"
            className="w-full"
          >
            {options.map((opt) => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>
        </CardBody>
      )}
    </Card>
  );
}

export default function CustomForm({
  fullWidth = true,
  children,
  validationBehavior = "aria",
  validationErrors = {},
  action,
  encType,
  method = "post",
  target,
  autoComplete = "on",
  autoCapitalize,
  className = "",
  style,
  formTitle = "User Form",
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialData = {},
  fields = defaultFields,
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sample accordion data for user form
  // Combine your items
const userAccordionItems: AccordionItemData[] = [
  {
    key: "user-details-1",
    title: "User Details Summary 1",
    iconColor: "text-primary",
    chips: [
      { id: "1", label: `Name: ${formData.fullName || "Not set"}`, color: "primary", variant: "flat" },
      { id: "2", label: `Email: ${formData.email || "Not set"}`, color: "secondary", variant: "flat" },
      { id: "3", label: `Phone: ${formData.phone || "Not set"}`, color: "success", variant: "flat" },
      { id: "4", label: `Status: ${formData.nationalityStatus || "Not set"}`, color: "warning", variant: "flat" },
    ],
  },
  {
    key: "user-details-2",
    title: "User Details Summary 2",
    iconColor: "text-primary",
    chips: [
      { id: "1", label: `Name: ${formData.fullName || "Not set"}`, color: "primary", variant: "flat" },
      { id: "2", label: `Email: ${formData.email || "Not set"}`, color: "secondary", variant: "flat" },
      { id: "3", label: `Phone: ${formData.phone || "Not set"}`, color: "success", variant: "flat" },
      { id: "4", label: `Status: ${formData.nationalityStatus || "Not set"}`, color: "warning", variant: "flat" },
    ],
  },
  {
    key: "user-details-3",
    title: "User Details Summary 3",
    iconColor: "text-primary",
    chips: [
      { id: "1", label: `Name: ${formData.fullName || "Not set"}`, color: "primary", variant: "flat" },
      { id: "2", label: `Email: ${formData.email || "Not set"}`, color: "secondary", variant: "flat" },
      { id: "3", label: `Phone: ${formData.phone || "Not set"}`, color: "success", variant: "flat" },
      { id: "4", label: `Status: ${formData.nationalityStatus || "Not set"}`, color: "warning", variant: "flat" },
    ],
  },
  {
    key: "user-details-4",
    title: "User Details Summary 4",
    iconColor: "text-primary",
    chips: [
      { id: "1", label: `Name: ${formData.fullName || "Not set"}`, color: "primary", variant: "flat" },
      { id: "2", label: `Email: ${formData.email || "Not set"}`, color: "secondary", variant: "flat" },
      { id: "3", label: `Phone: ${formData.phone || "Not set"}`, color: "success", variant: "flat" },
      { id: "4", label: `Status: ${formData.nationalityStatus || "Not set"}`, color: "warning", variant: "flat" },
    ],
  },
  {
    key: "user-details-5",
    title: "User Details Summary 5",
    iconColor: "text-primary",
    chips: [
      { id: "1", label: `Name: ${formData.fullName || "Not set"}`, color: "primary", variant: "flat" },
      { id: "2", label: `Email: ${formData.email || "Not set"}`, color: "secondary", variant: "flat" },
      { id: "3", label: `Phone: ${formData.phone || "Not set"}`, color: "success", variant: "flat" },
      { id: "4", label: `Status: ${formData.nationalityStatus || "Not set"}`, color: "warning", variant: "flat" },
    ],
  },
];



  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, []);

  const handleInputChange = (name: string, value: string) => {
    console.log("Updating field:", name, "with value:", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSelectChange = (name: string, keys: Set<string>) => {
    const value = Array.from(keys)[0] || "";
    handleInputChange(name, value);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = field.validationError || `${field.label} is required`;
      }

      // Email validation
      if (field.name === "email" && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = "Please enter a valid email address";
        }
      }

      // Phone validation
      if (field.name === "phone" && formData[field.name]) {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        if (!phoneRegex.test(formData[field.name])) {
          newErrors[field.name] = "Please enter a valid phone number";
        }
      }

      // Password confirmation validation
      if (field.name === "confirmPassword" && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      // Password strength validation
      if (field.name === "password" && formData[field.name] && formData[field.name].length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const userFormData: UsersFormData = {
        fullName: formData.fullName || "",
        address: formData.address || "",
        email: formData.email || "",
        phone: formData.phone || "",
        nationalityStatus: formData.nationalityStatus || "",
        gender: formData.gender || "",
        password: formData.password || "",
        confirmPassword: formData.confirmPassword || ""
      };

      if (onSubmit) {
        onSubmit(userFormData);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      label: field.label,
      isRequired: field.required,
      isDisabled: field.disabled || isSubmitting,
      isInvalid: !!errors[field.name] || !!validationErrors[field.name],
      errorMessage: errors[field.name] || validationErrors[field.name],
      validationBehavior,
      className: "w-full",
      fullWidth: true
    };

    if (field.type === "select") {
      return (
        <CustomSelect
          {...commonProps}
          items={field.options || []}
          placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
          selectedKeys={formData[field.name] ? new Set([formData[field.name]]) : new Set()}
          onSelectionChange={(keys) => handleSelectChange(field.name, keys as Set<string>)}
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
      />
    );
  };

  // Split fields into two columns based on the specified order
  const column1Fields = fields.filter((_, index) => index % 2 === 0);
  const column2Fields = fields.filter((_, index) => index % 2 === 1);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <UsersForm
        fullWidth={fullWidth}
        validationBehavior={validationBehavior}
        action={action}
        encType={encType}
        method={method}
        target={target}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        className={`w-full max-w-6xl mx-auto px-8 py-6 bg-white rounded-lg border-3 shadow-md ${className}`}
        style={style}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">{formTitle}</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-8 mb-8 mx-auto">
          <div className="space-y-8">
            {column1Fields.map((field) => (
              <div key={field.name} className="w-full">
                {renderField(field)}
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {column2Fields.map((field) => (
              <div key={field.name} className="w-full">
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        {/* Use the internal FormAccordion component */}
        <FormAccordion items={userAccordionItems} formData={formData} />

        {/* Add the new Module Accordion section */}
        <ModuleAccordion />

        {/* Add the new Card Select section */}
        <CardSelectSection />

        {children}

        <div className="flex-shrink-0 border-t border-gray-200 py-6">
          <div className="flex gap-6 justify-end space-x-4">
            <CustomButton
              label={cancelButtonText}
              variant="bordered"
              color="default"
              size="lg"
              onPress={handleCancel}
              isDisabled={isSubmitting}
              className="min-w-32"
            />
            <CustomButton
              label={submitButtonText}
              color="primary"
              size="lg"
              type="submit"
              isDisabled={isSubmitting}
              className="min-w-32"
            />
          </div>
        </div>
      </UsersForm>
    </div>
  );
}