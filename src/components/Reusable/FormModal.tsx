"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { cn } from '../lib/utils';
import { addToast } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { userData } from '../../Data/User';

type FieldType = 'text' | 'email' | 'number' | 'select' | 'date';

type FieldConfig = {
  type: FieldType;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
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
  title: string;
  submitText?: string;
  className?: string;
}

export function FormModal<T extends Record<string, any>>({
  type,
  initialData,
  onSubmit,
  title,
  isOpen,
  onClose,
  config
}: FormModalProps<T>) {
  // Helper function to find user ID by name
  const getUserIdByName = (name: string): number | null => {
    const user = userData.users.find(u => u.name === name);
    return user ? user.id : null;
  };

  // Initialize form data with values from initialData or empty strings from config
  const [formData, setFormData] = useState<T>(() => {
    const data = {} as T;
    
    // Always use config to determine which fields to include
    Object.entries(config).forEach(([key, fieldConfig]) => {
      let initialValue = initialData?.[key as keyof T];
      

      if (fieldConfig.type === 'select' && fieldConfig.options) {
        if (initialValue !== undefined) {
          // For select fields, ensure we're using the value, not the label
          const matchingOption = fieldConfig.options.find(opt => 
            opt.label === initialValue || opt.value === initialValue
          );
          data[key as keyof T] = (matchingOption?.value || initialValue) as any;
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
      
      // Ensure all config fields exist in form data
      Object.keys(config).forEach(key => {
        if (!(key in newData)) {
          newData[key as keyof T] = '' as any;
          hasChanges = true;
        }
      });
      
      // Update with initialData values if they exist
      if (initialData) {
        // Update all fields from initialData
        Object.entries(initialData).forEach(([key, value]) => {
          if (key in config) {
            // For assignedUser, convert to assignedUserName if needed
            if (key === 'assignedUser' && typeof value === 'string') {
              const userName = userData.users.find(u => u.id === parseInt(value))?.name;
              if (userName) {
                newData['assignedUserName' as keyof T] = userName as any;
                hasChanges = true;
              }
            } else {
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
          const userName = userData.users.find(u => u.id === parseInt(value))?.name;
          if (userName) {
            newData['assignedUserName' as keyof T] = userName as any;
          }
        } else {
          newData[field as keyof T] = value;
        }
        
        // Remove the old assignedUser field if it exists
        if (field === 'assignedUser' && 'assignedUser' in newData) {
          delete (newData as any).assignedUser;
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
        description: `Failed to ${initialData?.id ? 'update' : 'create'} ${title.toLowerCase()}`,
        color: 'danger',
      });
    }
  };

  function toLabel(key: string) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur" className="bg-gray-100">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 font-bold text-xl">
          {title} {initialData?.id ? 'Edit' : 'Add'} {type}
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
                    {fieldConfig.type === 'select' && fieldConfig.options ? (
                      <Select
                        variant="bordered"
                        className="w-full transition-all duration-200 ease-in-out"
                        classNames={{
                          trigger: "h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors duration-200",
                          value: "text-gray-900",
                          popoverContent: "p-0 rounded-md shadow-lg",
                        }}
                        placeholder={`Select ${fieldConfig.label || fieldName}`}
                        selectedKeys={formData[fieldName as keyof T] ? [String(formData[fieldName as keyof T])] : []}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0] as string;
                          handleChange(fieldName, selected);
                        }}
                      >
                        {fieldConfig.options.map((option) => (
                          <SelectItem 
                            key={option.value}
                            className="px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors duration-150"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        className="border-2"
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
          <Button className="shadow-md" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            className="shadow-md"
            color="primary"
            onPress={() => {
              const form = document.querySelector('form');
              if (form) {
                const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                if (submitButton) {
                  submitButton.click();
                }
              }
            }}
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