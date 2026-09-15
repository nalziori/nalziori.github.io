import { Home, homeMetadata } from "@/components/home/Home";

export const metadata = homeMetadata("ko");

export default function Page() {
  return <Home lang="ko" />;
}
