import { Button } from '@heroui/button';
import { 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownTrigger, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  useDisclosure,
  ModalFooter
} from '@heroui/react';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import React, { useState } from 'react';
import DeleteModal from "./DeleteModal";
import DynamicForm from "./FormModal";

interface TableActionsProps {
  item: any;
  onDelete?: (id: number) => void;
  onEdit?: (data: any) => void;
  type: 'user' | 'project';
}

function TableActions({ item, onDelete, onEdit, type }: TableActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = () => {
    onEditModalOpen();
  };

  const handleConfirmDelete = () => {
    if (item?.id && onDelete) {
      onDelete(item.id);
    }
    setIsDeleteModalOpen(false);
  };

  const handleSubmitEdit = (data: any) => {
    if (onEdit) {
      onEdit({ ...data, id: item.id });
    }
    setIsEditModalOpen(false);
  };


  return (
    <div className="flex justify-end">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light" className="mx-auto">
            <MoreVertical className="text-default-500" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem 
            key="edit" 
            startContent={<Edit className="h-4 w-4" />}
            onPress={handleEditClick}
          >
            Edit
          </DropdownItem>
          <DropdownItem 
            key="delete" 
            className="text-danger" 
            color="danger"
            startContent={<Trash2 className="h-4 w-4" />}
            onPress={handleDeleteClick}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={item?.name || item?.projectName || 'this item'}
      />

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} size="3xl" backdrop='blur'>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 font-bold text-xl">
            Edit {type === 'user' ? 'User' : 'Project'}
          </ModalHeader>
          <ModalBody>
            <DynamicForm
              initialData={item}
              onSubmit={(data) => {
                handleSubmitEdit(data);
                onEditModalClose();
              }}
              editData={item}
              title={type === 'user' ? 'User' : 'Project'}
              submitText="Save Changes"
              className="p-0 shadow-none"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onEditModalClose}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={() => {
                // This will trigger the form submission
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
    </div>
  );
}

export default TableActions;