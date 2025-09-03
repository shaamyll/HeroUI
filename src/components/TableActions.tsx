import { Button } from '@heroui/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { MoreVertical, Trash2, Edit } from 'lucide-react'
import React from 'react'

interface TableActionsProps {
  item: any;
  onDelete?: (id: number) => void;
}

function TableActions({ item, onDelete }: TableActionsProps) {

  const handleAction = (action: 'edit' | 'delete') => {
    if (action === 'delete' && item?.id) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        if (onDelete) {
          onDelete(item.id); // Let parent handle the deletion
        }
      }
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
            onPress={() => handleAction('edit')} // Fixed this line
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
    </div>
  )
}

export default TableActions