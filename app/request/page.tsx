import BloodRequestForm from "./BloodRequestForm";
import ClientLayout from "@/components/layout/clientLayout";
export default function RequestPage() {
  return (
    <ClientLayout>
      <main className="bg-gray-50">
        <BloodRequestForm />
      </main>
    </ClientLayout>
  );
}
