import CustomForm from "@/components/ModuleWiseComponents/DynamicUsersForm";

interface CreateUserFormProps {
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function EditUserForm({ onSubmit, onCancel, isSubmitting }: CreateUserFormProps) {
  const createFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text" as const,
      placeholder: "Enter user's full name",
      required: true
    },
    {
      name: "address",
      label: "Address",
      type: "text" as const,
      placeholder: "Enter user's address",
      required: true
    },
    {
      name: "email",
      label: "Email Address",
      type: "email" as const,
      placeholder: "Enter user's email address",
      required: true
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel" as const,
      placeholder: "Enter user's phone number",
      required: true
    },
    {
      name: "nationalityStatus",
      label: "Nationality Status",
      type: "select" as const,
      required: true,
      options: [
        { key: "citizen", label: "Citizen" },
        { key: "permanent_resident", label: "Permanent Resident" },
        { key: "temporary_resident", label: "Temporary Resident" },
        { key: "foreign_national", label: "Foreign National" },
        { key: "refugee", label: "Refugee" }
      ]
    },
    {
      name: "gender",
      label: "Gender",
      type: "select" as const,
      required: true,
      options: [
        { key: "male", label: "Male" },
        { key: "female", label: "Female" },
        { key: "non_binary", label: "Non-binary" },
        { key: "other", label: "Other" },
        { key: "prefer_not_to_say", label: "Prefer not to say" }
      ]
    },
    {
      name: "password",
      label: "Password",
      type: "password" as const,
      placeholder: "Create a strong password",
      required: true
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password" as const,
      placeholder: "Re-enter the password",
      required: true
    }
  ];

  return (
    <CustomForm
      formTitle="Edit User"
      submitButtonText="Update User"
      cancelButtonText="Cancel"
      onSubmit={onSubmit}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
      fields={createFields}
      validationBehavior="aria"
      className="bg-gradient-to-br from-blue-50 to-indigo-50"
      fullWidth={true}
    />
  );
}