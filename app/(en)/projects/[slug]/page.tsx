import { ProjectPage, projectMetadata, projectParams } from "@/components/project/ProjectPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectParams();
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  return projectMetadata("en", (await params).slug);
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  return <ProjectPage lang="en" slug={(await params).slug} />;
}
