// components/CustomForm.tsx
import type { ReactNode, CSSProperties, FormHTMLAttributes } from "react";
import { Form as UsersForm } from "@heroui/react";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import CustomButton from "@/components/common/CustomButton";
import { useState, useEffect } from "react";

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

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, []);

const handleInputChange = (name: string, value: string) => {
  console.log("Updating field:", name, "with value:", value); // 👈 debug log
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSelectChange = (name: string, keys: Set<string>) => {
    const value = Array.from(keys)[0] || "";
    handleInputChange(name, value);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
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
      // Create FormData object
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
          items={(field.options || []).map(opt => ({
            ...opt,
            value: opt.key
          }))}
          placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
          selectedKeys={formData[field.name] ? new Set([formData[field.name]]) : new Set()}
          onSelectionChange={(keys) => handleSelectChange(field.name, keys as Set<string>)}
          fullWidth={true}
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
        fullWidth={true}
      />
    );
  };

  // Split fields into two columns based on the specified order
  const column1Fields = fields.filter((_, index) => index % 2 === 0); // Even indices: 0, 2, 4, 6
  const column2Fields = fields.filter((_, index) => index % 2 === 1); // Odd indices: 1, 3, 5, 7

  return (
      <div className="min-h-screen flex items-center justify-center ">{/* Center the form container */}
        <UsersForm
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
        {/* 4 Rows x 2 Columns Layout - Full width inputs */}
          <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-8 mb-8 mx-auto">
            {/* Column 1 */}
            <div className="space-y-8">
              {column1Fields.map((field) => (
                <div key={field.name} className="w-full">
                  {renderField(field)}
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="space-y-8"> {/* Increased vertical spacing */}
              {column2Fields.map((field) => (
                <div key={field.name} className="w-full">
                  {renderField(field)}
                </div>
              ))}
            </div>

          {children}

        </div>
        <div className="flex-shrink-0 border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-6 justify-end space-x-4 mt-6">
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
      </div>
        </UsersForm>
      
      </div>
      
  );
}

