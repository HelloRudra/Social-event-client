"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import EventForm from "@/components/EventForm";
import PrivateRoute from "@/components/PrivateRoute";

export default function CreateEventClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCreate(data) {
    setLoading(true);
    try {
      await api("/events", { method: "POST", body: data, auth: true });
      toast.success("Your event has been created successfully.");
      router.push("/events");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PrivateRoute>
      <section className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-box border border-base-300 bg-base-100 p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-primary">Create an Event</h1>
          <p className="mt-2 mb-6 text-base-content/70">
            Fill in the details so neighbours can find and join your event.
          </p>
          <EventForm onSubmit={handleCreate} submitLabel="Create Event" loading={loading} />
        </div>
      </section>
    </PrivateRoute>
  );
}
