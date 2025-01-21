import { User } from "@/types/user"

export const Users = ({ users }: { users: User[] }) => {
  return (
    <div>
      <div className="max-h-80 overflow-y-auto px-4 py-2 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-white rounded-md shadow hover:bg-gray-100 transition"
            >
              <div className="text-gray-700">
                <span className="font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <br />
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
