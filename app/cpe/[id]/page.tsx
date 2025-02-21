import { CPEManagement } from "@/components/cpe-management"

export default function CPEPage({ params }: { params: { id: string } }) {
  return <CPEManagement id={params.id} />
}

