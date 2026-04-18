"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const isInLectures =
    segments.includes("lectures") && segments.length > 4;

  return (
    <>
      {!isInLectures && <Header />}
      <div className="w-full">{children}</div>
      {!isInLectures && <Footer />}
    </>
  );
}
