import type { ReactNode } from "react";
import { Site } from "@/components/Site";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Site lang="en">{children}</Site>;
}
