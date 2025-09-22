import { Card, CardHeader, CardBody, CardFooter, Divider, Chip, Tooltip } from "@heroui/react"
import { Eye, SquarePen, Trash2 } from "lucide-react"

// 🎨 Gradient colors
const gradients = [
  "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-cyan-500 to-blue-500",
  "bg-gradient-to-r from-orange-400 to-pink-500",
]

// Hash name → pick gradient
function getGradientFromName(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % gradients.length
  return gradients[index]
}

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
} as const

type UserCardProps = {
  item: {
    id: number
    name: string
    role: string
    team: string
    status: "active" | "paused" | "vacation"
    email: string
  }
  onView?: (user: any) => void
  onEdit?: (user: any) => void
  onDelete?: (user: any) => void
}

const UserCard = ({ item, onView, onEdit, onDelete }: UserCardProps) => {
  const firstLetter = item.name.charAt(0).toUpperCase()
  const gradient = getGradientFromName(item.name)

  return (
    <Card className="max-w-[400px] w-full shadow-md rounded-2xl bg-gray-50 border p-1 
             transition-transform duration-200 ease-in-out hover:scale-[1.03]"
    >
      {/* Header with Avatar + Name */}
      <CardHeader className="flex gap-3 items-center">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md ${gradient}`}
        >
          {firstLetter}
        </div>
        <div className="flex flex-col">
          <p className="text-md font-semibold">{item.name}</p>
          <p className="text-small text-default-500">{item.role} • {item.team}</p>
        </div>
      </CardHeader>

      {/* <Divider /> */}

      {/* Body with Details */}
      <CardBody className="space-y-2 text-sm">
        <p>
          <Chip
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {item.status}
          </Chip>
        </p>
        <p>
          <span className="text-gray-600">{item.email}</span>
        </p>
      </CardBody>

      {/* <Divider /> */}

      {/* Footer with Action Buttons */}
      <CardFooter className="flex justify-end gap-3">
        <Tooltip content="View Details">
          <button
            onClick={() => onView?.(item)}
            className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 active:opacity-70"
          >
            <Eye className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip content="Edit User">
          <button
            onClick={() => onEdit?.(item)}
            className="flex items-center justify-center w-6 h-6 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 active:opacity-70"
          >
            <SquarePen className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip color="danger" content="Delete User">
          <button
            onClick={() => onDelete?.(item)}
            className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 active:opacity-70"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}

export default UserCard
