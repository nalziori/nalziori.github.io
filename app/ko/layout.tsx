import type { ReactNode } from "react";
import { Site } from "@/components/Site";

export default function KoreanLayout({ children }: { children: ReactNode }) {
  return <Site lang="ko">{children}</Site>;
}
