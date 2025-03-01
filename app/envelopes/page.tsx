import EnvelopeForm from "@/components/envelope-form";
import EnvelopeList from "@/components/envelope-list";
import { envelopeContinue } from "@/envelop/soap";

export default function EnvelopesPage() {
  const items = [
    { _id: "1", name: "Item 1", content: envelopeContinue('a'), parametros: [{ name: 'A', value: 'qasdasdasd' }] },
    { _id: "2", name: "Item 2", content: "Conteúdo do Item 2", parametros: [] },
    { _id: "3", name: "Item 3", content: "Conteúdo do Item 3", parametros: [] },
  ];

  return (
    <main className="flex-1 overflow-x-hidden space-y-5 overflow-y-auto p-5">
      <div className="bg-white space-y-4 p-4 border rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Envelopes</h1>
        <div>
          <EnvelopeList items={items} />
        </div>
      </div>
      <EnvelopeForm />
    </main>
  )
}