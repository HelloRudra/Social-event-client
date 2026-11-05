"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { validateEmail, validatePassword } from "@/lib/validators";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("redirect") || "/";
  // only allow redirects inside this site
  const redirectTo =
    requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    const newErrors = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    const firstError = Object.values(newErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Check your email and password.");
      return;
    }

    toast.success(`Welcome back, ${data?.user?.name || "friend"}!`);
    router.push(redirectTo);
    router.refresh();
  }

  async function handleGoogle() {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
    if (error) toast.error(error.message || "Google login failed. Please try again.");
  }

  return (
    <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-xl">
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-base-content/70">
        Log in to create, join and manage community events.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`input w-full ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className={`input w-full pr-12 ${errors.password ? "input-error" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password}</p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
        </button>
      </form>

      <div className="divider my-6">OR</div>

      <button onClick={handleGoogle} className="btn btn-outline w-full">
        <FaGoogle /> Continue with Google
      </button>

      <p className="mt-6 text-center text-sm">
        New to SebaHub?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
