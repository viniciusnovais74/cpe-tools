"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Signal, Cpu, HardDrive, Thermometer, Activity } from "lucide-react"

type CPEData = {
  id: string
  name: string
  model: string
  ipAddress: string
  macAddress: string
  wifiName: string
  wifiPassword: string
  signalStrength: number
  cpuUsage: number
  memoryUsage: number
  temperature: number
  uptime: string
}

export function CPEManagement({ id }: { id: string }) {
  // In a real application, you would fetch this data from an API
  const [cpeData, setCpeData] = useState<CPEData>({
    id,
    name: "Living Room CPE",
    model: "SuperFast 2000",
    ipAddress: "192.168.1.100",
    macAddress: "00:11:22:33:44:55",
    wifiName: "MyHomeNetwork",
    wifiPassword: "securepassword123",
    signalStrength: 85,
    cpuUsage: 32,
    memoryUsage: 45,
    temperature: 42,
    uptime: "10 days 4 hours",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCpeData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real application, you would send this data to your backend
    console.log("Saving CPE data:", cpeData)
    // Implement your save logic here
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">CPE Management - {cpeData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Device Name</Label>
                <Input id="name" name="name" value={cpeData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input id="model" value={cpeData.model} readOnly />
              </div>
              <div>
                <Label htmlFor="ipAddress">IP Address</Label>
                <Input id="ipAddress" value={cpeData.ipAddress} readOnly />
              </div>
              <div>
                <Label htmlFor="macAddress">MAC Address</Label>
                <Input id="macAddress" value={cpeData.macAddress} readOnly />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wi-Fi Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="wifiName">Wi-Fi Name (SSID)</Label>
                <Input id="wifiName" name="wifiName" value={cpeData.wifiName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="wifiPassword">Wi-Fi Password</Label>
                <Input
                  id="wifiPassword"
                  name="wifiPassword"
                  type="password"
                  value={cpeData.wifiPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Signal className="mr-2 h-4 w-4" />
                  <span>Signal Strength</span>
                </div>
                <span>{cpeData.signalStrength}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="mr-2 h-4 w-4" />
                  <span>CPU Usage</span>
                </div>
                <span>{cpeData.cpuUsage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HardDrive className="mr-2 h-4 w-4" />
                  <span>Memory Usage</span>
                </div>
                <span>{cpeData.memoryUsage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-4 w-4" />
                  <span>Temperature</span>
                </div>
                <span>{cpeData.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  <span>Uptime</span>
                </div>
                <span>{cpeData.uptime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

