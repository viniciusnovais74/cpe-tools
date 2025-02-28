'use client';
import { CPEManagement } from "@/components/cpe-management";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ParameterType {
  chave: string;
  valor: string;
}

interface DeviceType {
  serialNumber: string;
  parametros: ParameterType[];
}

interface HostType {
  HostName: string;
  IPAddress: string;
  MACAddress: string;
}

export default function Device({ params }: { params: Promise<{ id: string }> }) {
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [hosts, setHosts] = useState<HostType[]>([]);

  function filterParam(paramName: string) {
    if (!device?.parametros) return [];
    return device.parametros.filter((param) =>
      param.chave.toLowerCase().includes(paramName.toLowerCase())
    );
  }

  function extractHosts() {
    const filteredParams = filterParam("host");
    const groupedHosts = filteredParams.reduce((acc: Record<string, any>, item) => {
      const match = item.chave.match(/Hosts\.Host\.(\d+)\.(\w+)$/);
      if (match) {
        const [, hostIndex, property] = match;
        acc[hostIndex] = acc[hostIndex] || {};
        acc[hostIndex][property] = item.valor;
      }
      return acc;
    }, {});
    setHosts(Object.values(groupedHosts));
  }

  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };


  useEffect(() => {
    async function fetchDevice() {
      const id = (await params).id;
      const dev = await (await fetch("/api/devices/" + id)).json();
      setDevice(dev);
    }
    fetchDevice();
  }, [params]);

  const items = [
    { id: 1, title: "Item 1", content: "Conteúdo do Item 1" },
    { id: 2, title: "Item 2", content: "Conteúdo do Item 2" },
    { id: 3, title: "Item 3", content: "Conteúdo do Item 3" },
  ];

  useEffect(() => {
    if (device) extractHosts();
  }, [device]);

  function searchText(parameterName: string) {
    const result = filterParam(parameterName)?.find((param) =>
      param.chave.toLowerCase().includes(parameterName.toLowerCase())
    );
    return result ? result.valor : "";
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="font-bold uppercase text-lg">Serial Number</label>
            <p>{device?.serialNumber}</p>
            <label className="font-bold uppercase text-lg">Fabricante</label>
            <p>{searchText("Manufacturer")}</p>
            <label className="font-bold uppercase text-lg">Nome do Modelo</label>
            <p>{searchText("ModelName")}</p>
            <label className="font-bold text-lg">Wi-Fi 2.4Ghz🛜</label>
            <p>{searchText("WLANConfiguration.1.SSID")}</p>
            <label className="font-bold text-lg">Wi-Fi 5Ghz🛜</label>
            <p>{searchText("WLANConfiguration.2.SSID")}</p>
          </CardContent>
        </Card>
      </div>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Dispositivos Conectados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 p-5">
              {hosts.map((host, idx) => (
                <Card key={idx}>
                  <CardHeader><CardTitle>{host.HostName}</CardTitle></CardHeader>
                  <CardContent>
                    <p>{host.IPAddress}</p>
                    <p>{host.MACAddress}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-6">
        <Card>
          <CardHeader className="!flex-row items-center justify-between">
            <CardTitle>Events Envelope</CardTitle>
            <Button>Adicionar Evento</Button>
          </CardHeader>
          <CardContent>
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-sm">
                <button
                  className="w-full flex justify-between items-center p-4 transition"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.title}</span>
                  <span>{openItem === item.id ? "▲" : "▼"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openItem === item.id ? "max-h-40 p-4" : "max-h-0 p-0"
                    }`}
                >
                  <code className="block whitespace-pre-wrap bg-gray-100 p-4 rounded-lg text-sm text-gray-800 border border-gray-300 overflow-x-auto">
                    {openItem === item.id && <p className="text-gray-600">{item.content}</p>}
                  </code>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
