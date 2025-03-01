'use client';

import SyntaxHighlighter from "react-syntax-highlighter";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Button } from "./ui/button";

export default function EnvelopeForm() {

  const [text, setText] = useState("")
  return (
    <div className="bg-white space-y-4 p-4 border rounded-lg shadow-lg">
      <form className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name" />
          <Button>Adicionar Parametro</Button>
        </div>
        <div className="flex-col flex">
          <Label htmlFor="content">Content</Label>
          <textarea id="content" defaultValue={""} className="border text-xs h-52 my-2 p-3" onChange={e => setText(e.target.value)} />
        </div>
      </form>
    </div>
  )
}