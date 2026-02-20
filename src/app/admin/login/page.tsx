import Link from "next/link";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/login-form";

export default function AdminLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="self-center">
          <Link href="/">
            <Logo size="xl"/>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
