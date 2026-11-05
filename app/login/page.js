import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = { title: "Login | SebaHub" };

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 py-12">
      <Suspense fallback={<span className="loading loading-spinner loading-lg" />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
