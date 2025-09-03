import { Button } from '@heroui/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { MoreVertical, Trash2, Edit } from 'lucide-react'
import React, { useState } from 'react'
import DeleteModal from "./DeleteModal";

interface TableActionsProps {
  item: any;
  onDelete?: (id: number) => void;
}

function TableActions({ item, onDelete }: TableActionsProps) {
  console.log(item)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (item?.id && onDelete) {
      onDelete(item.id);
    }
    setIsDeleteModalOpen(false);
  };

  const handleAction = (action: 'edit' | 'delete') => {
    if (action === 'delete' && item?.id) {
      handleDeleteClick();
    } else if (action === 'edit') {
      // Handle edit if needed
      console.log('Edit item:', item);
    }
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
            onPress={() => handleAction('edit')} 
          >
            Edit
          </DropdownItem>
          <DropdownItem 
            key="delete" 
            className="text-danger" 
            color="danger"
            startContent={<Trash2 className="h-4 w-4" />}
            onPress={() => handleAction('delete')}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={item?.name || 'this item'}
      />
    </div>
  )
}

export default TableActions