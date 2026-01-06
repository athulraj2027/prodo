
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
    
      <main className="flex-1">{children}</main>
    </div>
  );
}
