import { Card } from "@/components/ui/card"
import { Wifi, AlertTriangle, CheckCircle, Activity } from "lucide-react"

export function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">CPE Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total CPEs</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
            <Wifi className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active CPEs</p>
              <p className="text-2xl font-semibold">1,180</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive CPEs</p>
              <p className="text-2xl font-semibold">54</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bandwidth Usage</p>
              <p className="text-2xl font-semibold">789 GB</p>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Alerts</h3>
        <Card>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPE ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: "CPE001", type: "Connectivity Loss", status: "Critical", time: "2 mins ago" },
                { id: "CPE002", type: "High CPU Usage", status: "Warning", time: "15 mins ago" },
                { id: "CPE003", type: "Firmware Update", status: "Info", time: "1 hour ago" },
              ].map((alert) => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        alert.status === "Critical"
                          ? "bg-red-100 text-red-800"
                          : alert.status === "Warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

