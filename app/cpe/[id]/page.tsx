import { CPEManagement } from "@/components/cpe-management"

export default async function CPEPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return <CPEManagement id={id} />
}

