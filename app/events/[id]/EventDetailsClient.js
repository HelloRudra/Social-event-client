"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { api, formatDate } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

// today's date in Bangladesh time (UTC+6) as YYYY-MM-DD
const todayBD = () =>
  new Date(Date.now() + 6 * 3600 * 1000).toISOString().slice(0, 10);

export default function EventDetailsClient() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    api(`/events/${id}`)
      .then(setEvent)
      .catch((err) => setError(err.message));
  }, [id]);

  // if logged in, check whether this user already joined this event
  useEffect(() => {
    if (!session) return;
    api("/joined-events", { auth: true })
      .then((list) => setJoined(list.some((j) => j.eventId === id)))
      .catch(() => {});
  }, [session, id]);

  async function handleJoin() {
    if (!session) {
      toast.error("Please log in first to join this event.");
      router.push(`/login?redirect=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }
    setJoining(true);
    try {
      await api(`/events/${id}/join`, { method: "POST", auth: true });
      setJoined(true);
      toast.success("You have joined this event. See you there!");
    } catch (err) {
      if (err.message.includes("already joined")) setJoined(true);
      toast.error(err.message);
    } finally {
      setJoining(false);
    }
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <p className="mt-3 text-base-content/70">{error}</p>
        <Link href="/events" className="btn btn-primary mt-6">
          Back to Upcoming Events
        </Link>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="skeleton h-80 w-full" />
        <div className="skeleton mt-6 h-10 w-2/3" />
        <div className="skeleton mt-4 h-5 w-1/3" />
        <div className="skeleton mt-6 h-32 w-full" />
      </section>
    );
  }

  const isPast = event.eventDate < todayBD();

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/events" className="mb-6 inline-flex items-center gap-2 text-primary hover:underline">
        <FaArrowLeft /> All upcoming events
      </Link>

      <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-64 w-full object-cover md:h-96"
          referrerPolicy="no-referrer"
        />

        <div className="p-6 md:p-10">
          <span className="badge badge-primary">{event.eventType}</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{event.title}</h1>

          <div className="mt-5 grid gap-3 text-base-content/80 sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" /> {formatDate(event.eventDate)}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" /> {event.location}
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-primary" /> Organised by {event.creatorName || "a community member"}
            </p>
          </div>

          <h2 className="mt-8 text-xl font-bold">About this event</h2>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-base-content/80">
            {event.description}
          </p>

          <div className="mt-8">
            {isPast ? (
              <button className="btn btn-disabled w-full sm:w-auto">This event has ended</button>
            ) : joined ? (
              <button className="btn btn-success w-full sm:w-auto" disabled>
                <FaCheckCircle /> You have joined this event
              </button>
            ) : (
              <button
                onClick={handleJoin}
                disabled={joining || isPending}
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {joining ? <span className="loading loading-spinner loading-sm" /> : "Join Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
