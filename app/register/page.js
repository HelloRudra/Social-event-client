"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import {
  validateEmail,
  validatePassword,
  validateUrl,
} from "@/lib/validators";

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const photoURL = form.get("photoURL").trim();
    const password = form.get("password");

    const newErrors = {};
    if (name.length < 2) newErrors.name = "Name must be at least 2 characters.";
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    const photoError = validateUrl(photoURL);
    if (photoError) newErrors.photoURL = photoError;
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    const firstError = Object.values(newErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success(`Welcome to SebaHub, ${name}! Your account is ready.`);
    router.push("/");
    router.refresh();
  }

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-base-content/70">
          Join SebaHub and start serving your community.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              className={`input w-full ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>

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
            <label className="mb-1 block text-sm font-semibold" htmlFor="photoURL">
              Photo URL
            </label>
            <input
              id="photoURL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/your-photo.jpg"
              className={`input w-full ${errors.photoURL ? "input-error" : ""}`}
            />
            {errors.photoURL && (
              <p className="mt-1 text-sm text-error">{errors.photoURL}</p>
            )}
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
                placeholder="Uppercase, lowercase, 6+ characters"
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
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
