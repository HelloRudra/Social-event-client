"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import EventCard from "./EventCard";
import EventSkeleton from "./EventSkeleton";
import SectionHeading from "./SectionHeading";

export default function UpcomingEvents() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/events?limit=6")
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        title="Recent Upcoming Events"
        subtitle="The next community events happening soonest. Pick one and join in."
      />

      {error && (
        <p className="text-center text-error">
          We could not load events right now. Please try again in a moment.
        </p>
      )}

      {!events && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <EventSkeleton key={n} />
          ))}
        </div>
      )}

      {events && events.length === 0 && (
        <div className="text-center">
          <p className="text-base-content/70">
            No upcoming events yet. Be the first to start one.
          </p>
          <Link href="/create-event" className="btn btn-primary mt-4">
            Create an Event
          </Link>
        </div>
      )}

      {events && events.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/events" className="btn btn-primary btn-outline">
              See All Events
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
