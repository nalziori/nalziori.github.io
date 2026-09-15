import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="kicker">404</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-1 text-lg text-muted" lang="ko">페이지를 찾을 수 없습니다</p>
        <p className="mt-8 flex justify-center gap-6 text-sm">
          <Link href="/" className="underline underline-offset-4">English home</Link>
          <Link href="/ko/" className="underline underline-offset-4" lang="ko">한국어 홈</Link>
        </p>
      </div>
    </main>
  );
}
