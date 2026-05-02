import { Metadata } from "next";
import DebiteringsStod from "@/components/tools/DebiteringsStod";

export const metadata: Metadata = {
  title: "Debiteringsstöd | DentaGuide-Pro",
  description: "Debiteringsstödet enligt HSLF-FS 2025:68.",
};

export default function DebiteringPage() {
  return (
    <div className="min-h-screen pb-12" data-theme="stitch-pro">
      <div className="header-gradient flex items-center px-6">
        <div className="logo flex items-baseline">
          Tandguide
          <span className="font-mono text-[10px] bg-secondary/30 text-white px-2 py-0.5 rounded ml-3 not-italic">
            DEBITERING
          </span>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <DebiteringsStod />
      </main>
    </div>
  );
}
