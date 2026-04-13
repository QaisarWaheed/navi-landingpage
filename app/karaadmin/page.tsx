import type { Metadata } from "next";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = {
  title: "CMS | NAVI",
  description: "Edit NAVI marketing site content.",
  robots: { index: false, follow: false },
};

export default function KaraAdminPage() {
  return (
    <div className="min-h-[70vh] bg-canvas py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <AdminPanel />
      </div>
    </div>
  );
}
