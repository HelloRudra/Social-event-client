"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";
import EventCard from "@/components/EventCard";
import EventSkeleton from "@/components/EventSkeleton";
import SectionHeading from "@/components/SectionHeading";

export default function EventsClient() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [type, setType] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");

  // wait 400ms after typing stops before searching
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchText.trim()), 400);
    return () => clearTimeout(t);
  }, [searchText]);

  useEffect(() => {
    setEvents(null);
    setError("");
    const params = new URLSearchParams();
    if (type !== "All") params.set("type", type);
    if (search) params.set("search", search);
    api(`/events?${params.toString()}`)
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, [type, search]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        title="Upcoming Events"
        subtitle="Every event from our community that is still to come. Past events are not shown."
      />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search events by title"
          className="input w-full sm:flex-1"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select w-full sm:w-60"
        >
          <option value="All">All event types</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

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
        <p className="py-10 text-center text-base-content/70">
          No upcoming events match your search. Try another type or keyword.
        </p>
      )}

      {events && events.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
