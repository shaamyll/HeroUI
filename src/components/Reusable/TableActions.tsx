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
import { projectFormConfig, userFormConfig } from '../FormConfigs/formConfigs';

interface TableActionsProps {
  item: any;
  onDelete?: (id: number) => void;
  onEdit?: (data: any) => void;
  type: 'user' | 'project';
}



function TableActions({ item, onDelete, onEdit, type }: TableActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  const [isEdit, setIsEdit] = useState(false);

  // When component mounts or item changes, update isEdit
  React.useEffect(() => {
    if (item && item.id) {
      setIsEdit(true);   // Edit mode
    } else {
      setIsEdit(false);  // Add mode
    }
  }, [item]);

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
            type={type}
            config={type === "user" ? userFormConfig : projectFormConfig}
            isOpen={isEditModalOpen}
            onClose={onEditModalClose}
            initialData={isEdit ? item : {}}   // if edit -> pass item, else empty object
            editData={isEdit ? item : undefined} // only pass editData when editing
            onSubmit={handleSubmitEdit}
          />

    </div>
  );
}

export default TableActions;
