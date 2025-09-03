"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from '../lib/utils';
import { addToast } from "@heroui/react";

type FieldType = 'text' | 'email' | 'number' | 'select' | 'date' | 'checkbox';

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
  config: FormConfig;
  initialData?: T;
  editData?: T;
  onSubmit: (data: T) => void;
  title: string;
  submitText?: string;
  className?: string;
}

export function FormModal<T extends Record<string, any>>({
  config,
  initialData = {} as T,
  onSubmit,
  title,
  editData,
  submitText = 'Submit',
  className,
}: FormModalProps<T>) {
  console.log(editData)
  const [formData, setFormData] = useState<T>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(formData);
      addToast({
        title: 'Success',
        description: `${title} ${initialData?.id ? 'updated' : 'created'} successfully`,
        color: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Error',
        description: `Failed to ${initialData?.id ? 'update' : 'create'} ${title.toLowerCase()}`,
        color: 'danger',
      });
    }
  };

  const renderField = (fieldName: string, fieldConfig: FieldConfig) => {
    const { type, label, required, options, placeholder, disabled } = fieldConfig;
    const value = formData[fieldName] || '';

    switch (type) {
      case 'select':
        return (
          <LabelInputContainer>
            <Label htmlFor={fieldName}>
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
            
          </LabelInputContainer>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={fieldName}
              checked={!!value}
              onChange={(e) => handleChange(fieldName, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              disabled={disabled}
            />
            <Label htmlFor={fieldName}>
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        );
      
      default:
        return (
          <LabelInputContainer>
            <Label htmlFor={fieldName}>
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={fieldName}
              type={type}
              value={value as string}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              required={required}
              disabled={disabled}
            />
          </LabelInputContainer>
        );
    }
  };

  return (
    <div className={cn("mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800", className)}>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(config).map(([fieldName, fieldConfig]) => (
            <div key={fieldName} className="col-span-full md:col-span-1">
              {renderField(fieldName, fieldConfig)}
            </div>
          ))}
        </div>
        
      </form>
    </div>
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
