'use client';

import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IParametro {
  name: string;
  value: string;
}

interface IEnvelope {
  _id: string;
  name: string;
  content: string;
  parametros: IParametro[];
}

interface EnvelopeListProps {
  items: IEnvelope[];
}

export default function EnvelopeList({ items }: EnvelopeListProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item._id} className="border rounded-lg shadow-sm">
          <button
            className="w-full flex justify-between items-center p-4 transition"
            onClick={() => toggleItem(item._id)}
          >
            <span className="font-medium">{item.name}</span>
            <span className="text-gray-500">{openItem === item._id ? "▲" : "▼"}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openItem === item._id ? "p-4" : "max-h-0 p-0"
            }`}
          >
            {openItem === item._id && (
              <SyntaxHighlighter
                language="xml"
                style={androidstudio}
                wrapLongLines
                className="rounded-lg border border-gray-700"
              >
                {item.content}
              </SyntaxHighlighter>
            )}

            {item.parametros.length > 0 && (
              <div className="mt-2 p-2 border-t border-gray-300">
                <h3 className="text-sm font-semibold text-gray-700">Parâmetros:</h3>
                <ul className="text-sm text-gray-600">
                  {item.parametros.map((param, index) => (
                    <li key={index} className="flex justify-between border-b py-1">
                      <span className="font-medium">{param.name}:</span>
                      <span>{param.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
