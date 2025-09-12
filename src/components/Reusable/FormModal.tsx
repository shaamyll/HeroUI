"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { cn } from '../lib/utils';
import { addToast, Input } from "@heroui/react";
import { userData } from '../../Data/User';
import CustomDropdown from "../Reusable/CustomDropdown"; // Import your SearchableDropdown

type FieldType = 'text' | 'email' | 'number' | 'searchable-select' | 'date';

type FieldConfig = {
  type: FieldType;
  label: string;
  required?: boolean;
  options?: { key: string; label: string; value?: string; description?: string }[];
  placeholder?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
};

type FormConfig = {
  [key: string]: FieldConfig;
};

interface FormModalProps<T> {
  type: 'user' | 'project';
  config: FormConfig;
  initialData?: T | null;
  editData?: T;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  submitText?: string;
  className?: string;
}

export function FormModal<T extends Record<string, any>>({
  type,
  initialData,
  onSubmit,
  isOpen,
  onClose,
  config
}: FormModalProps<T>) {

  // Initialize form data with values from initialData or empty strings from config
  const [formData, setFormData] = useState<T>(() => {
    const data = {} as T;

    // Always use config to determine which fields to include
    Object.entries(config).forEach(([key, fieldConfig]) => {
      let initialValue = initialData?.[key as keyof T];

      if (fieldConfig.type === 'searchable-select' && fieldConfig.options) {
        if (initialValue !== undefined) {
          // For searchable-select fields, ensure we're using the key
          const matchingOption = fieldConfig.options.find(opt =>
            opt.label === initialValue || opt.value === initialValue || opt.key === initialValue
          );
          data[key as keyof T] = (matchingOption?.key || initialValue) as any;
        } else {
          data[key as keyof T] = '' as any;
        }
      } else {
        // For other fields, use the value as is
        data[key as keyof T] = (initialValue !== undefined)
          ? initialValue
          : '' as any;
      }
    });
    return data;
  });

  // Update form data when config or initialData changes
  useEffect(() => {
    setFormData(prevData => {
      const newData = { ...prevData };
      let hasChanges = false;

      // Update with initialData values if they exist
      if (initialData) {
        // Update all fields from initialData
        Object.entries(initialData).forEach(([key, value]) => {
          if (key in config) {
            // Special handling for assignedUser field
            if (key === 'assignedUser') {
              // If value is a number or numeric string (ID), convert to user name
              if (typeof value === 'number' || (typeof value === 'string' && !isNaN(parseInt(value)))) {
                const userId = typeof value === 'string' ? parseInt(value) : value;
                const user = userData.users.find(u => u.id === userId);

                if (user) {
                  // Set assignedUser to the user name
                  newData[key as keyof T] = user.name as any;

                  // Also update assignedUserName if it exists in the form
                  if ('assignedUserName' in newData) {
                    (newData as any).assignedUserName = user.name;
                  }
                  hasChanges = true;
                }
              }
              // If value is already a string (name), use it directly
              else if (typeof value === 'string') {
                newData[key as keyof T] = value;

                // Also update assignedUserName if it exists in the form
                if ('assignedUserName' in newData) {
                  (newData as any).assignedUserName = value;
                }
                hasChanges = true;
              }
            }
            // Handle all other fields normally
            else {
              newData[key as keyof T] = value;
              hasChanges = true;
            }
          }
        });
      }

      return hasChanges ? newData : prevData;
    });
  }, [initialData, config]);

  const handleChange = (field: string, value: any) => {
    // Only update if the field exists in the config
    if (field in config) {
      setFormData(prev => {
        const newData = { ...prev };

        // If the field is assignedUser, convert it to assignedUserName
        if (field === 'assignedUser') {
          // For searchable dropdown, value will be the selected key
          if (config[field].type === 'searchable-select') {
            const selectedKey = Array.from(value)[0] as string;
            const fieldConfig = config[field];
            const selectedOption = fieldConfig.options?.find(opt => opt.key === selectedKey);
            
            if (selectedOption) {
              newData[field as keyof T] = selectedOption.label as any;
              
              // Also update the assignedUserName field if it exists
              if ('assignedUserName' in newData) {
                (newData as any).assignedUserName = selectedOption.label;
              }
            }
          } else {
            // Original logic for non-searchable dropdowns
            const userId = parseInt(value, 10);
            const selectedUser = userData.users.find(u => u.id === userId);

            if (selectedUser) {
              newData[field as keyof T] = selectedUser.name as any;

              if ('assignedUserName' in newData) {
                (newData as any).assignedUserName = selectedUser.name;
              }
            }
          }
        } else if (config[field].type === 'searchable-select') {
          // Handle other searchable-select fields
          const selectedKey = Array.from(value)[0] as string;
          const fieldConfig = config[field];
          const selectedOption = fieldConfig.options?.find(opt => opt.key === selectedKey);
          
          if (selectedOption) {
            // Store the value or label based on your needs
            newData[field as keyof T] = (selectedOption.value || selectedOption.label) as any;
          }
        } else {
          newData[field as keyof T] = value;
        }

        console.log(newData);
        return newData;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(formData);
    } catch (error) {
      addToast({
        title: 'Error',
        description: `Failed to ${initialData?.id ? 'update' : 'create'} ${type.toLowerCase()}`,
        color: 'danger',
      });
    }
  };

  function toLabel(key: string) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur" className="bg-white">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 font-bold text-xl">
          {initialData?.id ? 'Edit' : 'Add'} {type}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Object.entries(config).map(([fieldName, fieldConfig]) => (
                <div key={fieldName} className="col-span-full md:col-span-1">
                  <LabelInputContainer>
                    <Label htmlFor={fieldName}>
                      {fieldConfig.label || toLabel(fieldName)}
                      {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {fieldConfig.type === 'searchable-select' && fieldConfig.options ? (
                      <CustomDropdown
                        items={fieldConfig.options}
                        placeholder={fieldConfig.placeholder || `Select ${fieldConfig.label || fieldName}`}
                        searchPlaceholder={fieldConfig.searchPlaceholder || `Search ${fieldConfig.label || fieldName}...`}
                        defaultSelectedKeys={formData[fieldName as keyof T] ? 
                          new Set([String(formData[fieldName as keyof T])]) : 
                          new Set()
                        }
                        onSelectionChange={(keys) => handleChange(fieldName, keys)}
                        buttonVariant="bordered"
                        buttonClassName="w-full justify-start h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        disabled={fieldConfig.disabled}
                      />
                    ) : (
                      <Input
                      variant="bordered"
                        id={fieldName}
                        type={fieldConfig.type || 'text'}
                        value={(formData[fieldName as keyof T] as string) || ''}
                        onChange={(e) => handleChange(fieldName, e.target.value)}
                        placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label || toLabel(fieldName)}`}
                        required={fieldConfig.required}
                        disabled={fieldConfig.disabled}
                      />
                    )}
                  </LabelInputContainer>
                </div>
              ))}
            </div>
            <div className="hidden">
              <button type="submit" id="hidden-submit">Submit</button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="shadow-md bg-gradient-to-r from-gray-300 to-white" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            onPress={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { cancelable: true, bubbles: true });
                form.dispatchEvent(event);
              }
            }}
            color="primary"
            className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default FormModal;

// Example usage with SearchableDropdown:
/*
const formConfig = {
  name: {
    type: 'text',
    label: 'Name',
    required: true,
    placeholder: 'Enter name'
  },
  assignedUser: {
    type: 'searchable-select',
    label: 'Assigned User',
    required: true,
    placeholder: 'Select a user',
    searchPlaceholder: 'Search users...',
    options: userData.users.map(user => ({
      key: user.id.toString(),
      label: user.name,
      value: user.name,
      description: user.email
    }))
  },
  status: {
    type: 'searchable-select',
    label: 'Status',
    required: true,
    options: [
      { key: 'active', label: 'Active', description: 'Currently active' },
      { key: 'inactive', label: 'Inactive', description: 'Currently inactive' },
      { key: 'pending', label: 'Pending', description: 'Awaiting approval' }
    ]
  }
};
*/