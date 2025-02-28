import { Home, BarChart2, Settings, HelpCircle, LogOut, Wifi } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/analytics" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link href="/help" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <div className="absolute bottom-4 left-4">
        <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div> */}
    </aside>
  )
}

