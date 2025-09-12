import { Button } from '@heroui/button'
import FormModal from './FormModal'
import { useDisclosure, addToast } from '@heroui/react';
import { projectFormConfig, userFormConfig } from '../FormConfigs/formConfigs';
import { Plus } from 'lucide-react';
//a
interface AddNewProps {
  type: 'user' | 'project';
  onSubmit: (formData: any) => void;
}

function AddNew({ type, onSubmit }: AddNewProps) {
  console.log(type)
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
  
  const handleAddClick = () => {
    onAddModalOpen();
  };

  const handleSubmit = (formData: any) => {
    try {
      console.log('Form submitted with data:', formData);
      console.log("Type",type)
      // Check if onSubmit is a function before calling it
        onSubmit(formData);
      onAddModalClose();
      
      // Show success toast
      addToast({
        title: 'Success',
        description: `New ${type} added successfully`,
        color: 'success',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error toast
      addToast({
        title: 'Error',
        description: `Failed to add new ${type}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        color: 'danger',
      });
    }
  };
  
  return (
    <div>
<Button
  onPress={handleAddClick}
  endContent={<Plus className="w-4 h-4" />}
  className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-medium shadow-md hover:opacity-90 transition"
>
  Add New
</Button>


      
      <FormModal
        type={type}
        config={type === "user" ? userFormConfig : projectFormConfig}
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        initialData={null}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default AddNew;