'use client';
import { Card } from "@/components/ui/card"
import { Wifi, AlertTriangle, CheckCircle, Activity } from "lucide-react"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Icpe } from "@/models/cpe";

export function Dashboard() {
  const [cpeList, setCpeList] = useState([])

  useEffect(() => {
    async function requestCpe() {
      const devices = await (await fetch('/api/devices')).json()
      setCpeList(devices.list)
    }
    requestCpe();
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">CPE Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total CPEs</p>
              <p className="text-2xl font-semibold">{cpeList.length}</p>
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
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atualização</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cpeList.map((cpe:Icpe,idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cpe.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cpe?.lastUpdated).toLocaleDateString("pt-BR")}</td>
                  <td>
                    <Link href={'/device/' +  cpe?._id}>
                    <Button>
                      <Wifi></Wifi>
                    </Button>
                  </Link>
                </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
    </div >
  )
}

