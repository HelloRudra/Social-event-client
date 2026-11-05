"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import EventCard from "@/components/EventCard";
import EventSkeleton from "@/components/EventSkeleton";
import PrivateRoute from "@/components/PrivateRoute";
import SectionHeading from "@/components/SectionHeading";

export default function JoinedEventsClient() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/joined-events", { auth: true })
      .then((list) =>
        // the card links to /events/<_id>, so use the original event id
        setEvents(list.map((j) => ({ ...j, key: j._id, _id: j.eventId })))
      )
      .catch((err) => setError(err.message));
  }, []);

  return (
    <PrivateRoute>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading
          title="Joined Events"
          subtitle="Events you signed up for, with the nearest date first."
        />

        {error && <p className="text-center text-error">{error}</p>}

        {!events && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <EventSkeleton key={n} />
            ))}
          </div>
        )}

        {events && events.length === 0 && (
          <div className="text-center">
            <p className="text-base-content/70">You have not joined any events yet.</p>
            <Link href="/events" className="btn btn-primary mt-4">
              Browse Upcoming Events
            </Link>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.key} event={event} />
            ))}
          </div>
        )}
      </section>
    </PrivateRoute>
  );
}
