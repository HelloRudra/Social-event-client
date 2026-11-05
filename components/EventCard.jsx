import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { formatDate } from "@/lib/api";

export default function EventCard({ event }) {
  return (
    <div className="card h-full border border-base-300 bg-base-100 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative h-52 w-full shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="badge badge-primary absolute left-3 top-3">
          {event.eventType}
        </span>
      </figure>
      <div className="card-body grow p-5">
        <h3 className="card-title line-clamp-2 min-h-14 text-xl">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm text-base-content/70">
          <FaMapMarkerAlt className="shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-base-content/70">
          <FaCalendarAlt className="shrink-0 text-primary" />
          {formatDate(event.eventDate)}
        </p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}
