import { Button } from '@heroui/button';
import { 
  Dropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownTrigger,
  useDisclosure
} from '@heroui/react';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import React, { useState } from 'react';
import DeleteModal from "./DeleteModal";
import FormModal from "./FormModal";

interface TableActionsProps {
  item: any;
  onDelete?: (id: number) => void;
  onEdit?: (data: any) => void;
  type: 'user' | 'project';
}

function TableActions({ item, onDelete, onEdit, type }: TableActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  const formConfig = {
    name: {
      type: 'text',
      label: 'Name',
      required: true,
      placeholder: 'Enter name'
    },
    email: {
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'Enter email'
    },
    role: {
      type: 'text',
      label: 'Role',
      required: true,
      placeholder: 'Enter role'
    },
    team: {
      type: 'text',
      label: 'Team',
      required: true,
      placeholder: 'Enter team'
    },
    status: {
      type: 'select',
      label: 'Status',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Vacation', value: 'vacation' }
      ]
    }
  };

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

  const handleSubmitEdit = (formData: any) => {
    if (onEdit) {
      onEdit({ ...formData, id: item.id });
    }
    onEditModalClose();
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={item?.name || item?.projectName || 'this item'}
      />

<FormModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        config={formConfig}
        initialData={item}
        onSubmit={handleSubmitEdit}
        title={`Edit ${type === 'user' ? 'User' : 'Project'}`}
        submitText="Save Changes"
      />
    </div>
  );
}

export default TableActions;