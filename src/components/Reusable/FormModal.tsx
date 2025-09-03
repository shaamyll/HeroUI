"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
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
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  title: string;
  submitText?: string;
  className?: string;
}

export function FormModal<T extends Record<string, any>>({
  initialData = {} as T,
  onSubmit,
  title,
  editData,
  isOpen,
  onClose,
  submitText = 'Submit',
}: FormModalProps<T>) {
  console.log(initialData)
  const [formData, setFormData] = useState<T>(editData || initialData);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData(initialData);
    }
  }, [editData, initialData]);


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

  function toLabel(key: string) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 font-bold text-xl">
          {title} {initialData?.id ? 'Edit' : 'Add'}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Object.entries(formData)
                .filter(([fieldName]) => fieldName !== "id") // exclude ID if you don’t want it editable
                .map(([fieldName, value]) => (
                  <div key={fieldName} className="col-span-full md:col-span-1">
                    <LabelInputContainer>
                      <Label htmlFor={fieldName}>{toLabel(fieldName)}</Label>
                      <Input
                        id={fieldName}
                        type="text"
                        value={value as string}
                        onChange={(e) => handleChange(fieldName, e.target.value)}
                        placeholder={`Enter ${toLabel(fieldName)}`}
                      />
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
            {submitText}
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
