import { Bell, Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">CPE Management Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="text-gray-600 hover:text-gray-800">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

