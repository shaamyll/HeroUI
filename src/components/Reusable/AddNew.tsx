import { Button } from '@heroui/button'
import React from 'react'
import FormModal from './FormModal'
import { useDisclosure } from '@heroui/react';
import { projectFormConfig, userFormConfig } from '../FormConfigs/formConfigs';
import { Plus } from 'lucide-react';

function AddNew({type,onSubmit}) {


      const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
      
      const handleAddClick = () => {
        onAddModalOpen();
      };
    
      const handleSubmit = (formData: any) => {
        try {
          onAddModalClose();
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      
    return (
        <div>
            <Button color="primary" variant="solid" onPress={handleAddClick} endContent={<Plus className="w-4 h-4" />}>
                Add New
            </Button>

            
            {/* 👇 Add FormModal here */}
            <FormModal
              type={type}
              config={type === "user" ? userFormConfig : projectFormConfig}
              isOpen={isAddModalOpen}
              onClose={onAddModalClose}
              initialData={{}}
              onSubmit={handleSubmit}
            />
        </div>
    )
}

export default AddNew