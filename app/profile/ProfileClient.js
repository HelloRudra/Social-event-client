"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { validateUrl } from "@/lib/validators";
import PrivateRoute from "@/components/PrivateRoute";
import SectionHeading from "@/components/SectionHeading";

function ProfileContent() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // fill the form once the session is available
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhoto(user.image || "");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhoto = photo.trim();

    const newErrors = {};
    if (cleanName.length < 2) newErrors.name = "Name must be at least 2 characters.";
    const photoError = validateUrl(cleanPhoto);
    if (photoError) newErrors.photo = photoError;

    setErrors(newErrors);
    const firstError = Object.values(newErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: cleanName,
      image: cleanPhoto,
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile. Please try again.");
      return;
    }
    toast.success("Your profile has been updated.");
  }

  const initial = (user?.name || "?").charAt(0).toUpperCase();
  const previewOk = photo && !validateUrl(photo.trim());

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeading
        title="My Profile"
        subtitle="See your account details and update your name or photo."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {/* Summary card */}
        <div className="h-fit rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-md">
          <div className="avatar">
            <div className="h-28 w-28 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100">
              {previewOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.trim()} alt="Profile preview" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
                  {initial}
                </div>
              )}
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold">{user?.name}</h2>
          <p className="mt-1 flex items-center justify-center gap-2 break-all text-sm text-base-content/70">
            <FaEnvelope className="shrink-0 text-primary" /> {user?.email}
          </p>
          <p className="mt-3 text-xs text-base-content/60">
            The preview above updates as you type a new photo link.
          </p>
        </div>

        {/* Edit form */}
        <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-md md:col-span-2 md:p-8">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
            <FaUserCircle className="text-primary" /> Edit your details
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={`input w-full ${errors.name ? "input-error" : ""}`}
              />
              {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="photo">
                Photo URL
              </label>
              <input
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className={`input w-full ${errors.photo ? "input-error" : ""}`}
              />
              {errors.photo && <p className="mt-1 text-sm text-error">{errors.photo}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                value={user?.email || ""}
                readOnly
                className="input w-full cursor-not-allowed opacity-70"
              />
              <p className="mt-1 text-xs text-base-content/60">
                Your email cannot be changed because your events are linked to it.
              </p>
            </div>

            <button type="submit" disabled={saving} className="btn btn-primary w-full sm:w-auto">
              {saving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function ProfileClient() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}
