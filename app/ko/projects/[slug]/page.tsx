import { ProjectPage, projectMetadata, projectParams } from "@/components/project/ProjectPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectParams();
}

export async function generateMetadata({ params }: PageProps<"/ko/projects/[slug]">) {
  return projectMetadata("ko", (await params).slug);
}

export default async function Page({ params }: PageProps<"/ko/projects/[slug]">) {
  return <ProjectPage lang="ko" slug={(await params).slug} />;
}
