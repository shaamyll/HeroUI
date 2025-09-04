"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { cn } from '../lib/utils';
import { addToast } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

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
  Data,
  isOpen,
  onClose,
  config
}: FormModalProps<T>) {
  console.log(config)
  console.log(initialData)
  // Initialize form data with values from initialData or empty strings from config
  const [formData, setFormData] = useState<T>(() => {
    const data = {} as T;
    // Always use config to determine which fields to include
    Object.entries(config).forEach(([key, fieldConfig]) => {
      // Use initialData value if it exists and is not empty, otherwise use empty string
      data[key as keyof T] = (initialData && initialData[key as keyof T] !== undefined)
        ? initialData[key as keyof T]
        : '' as any;
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
        Object.entries(initialData).forEach(([key, value]) => {
          if (key in config) {
            newData[key as keyof T] = value;
            hasChanges = true;
          }
        });
      }

      return hasChanges ? newData : prevData;
    });
  }, [initialData, config]);

  const handleChange = (field: string, value: any) => {
    // Only update if the field exists in the config
    if (field in config) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
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
                        className="w-full  bg-white"
                        placeholder={`Select ${fieldConfig.label || fieldName}`}
                        selectedKeys={[formData[fieldName as keyof T] as string]}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0] as string;
                          handleChange(fieldName, selected);
                        }}
                      >
                        {fieldConfig.options.map((option) => (
                          <SelectItem key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Input
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
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
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
