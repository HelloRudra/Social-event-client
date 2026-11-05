"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { api, formatDate } from "@/lib/api";
import EventForm from "@/components/EventForm";
import PrivateRoute from "@/components/PrivateRoute";
import SectionHeading from "@/components/SectionHeading";

const todayBD = () =>
  new Date(Date.now() + 6 * 3600 * 1000).toISOString().slice(0, 10);

export default function ManageEventsClient() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api("/my-events", { auth: true })
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpdate(data) {
    setBusy(true);
    try {
      await api(`/events/${editing._id}`, { method: "PUT", body: data, auth: true });
      toast.success("Your event has been updated.");
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setBusy(true);
    try {
      await api(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("The event has been deleted.");
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PrivateRoute>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading
          title="Manage Events"
          subtitle="Update or remove the events you created."
        />

        {error && <p className="text-center text-error">{error}</p>}

        {!events && !error && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="skeleton h-16 w-full" />
            ))}
          </div>
        )}

        {events && events.length === 0 && (
          <div className="text-center">
            <p className="text-base-content/70">You have not created any events yet.</p>
            <Link href="/create-event" className="btn btn-primary mt-4">
              Create Your First Event
            </Link>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-md">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const past = event.eventDate < todayBD();
                  return (
                    <tr key={event._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="h-12 w-16 shrink-0 rounded object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="min-w-40 font-semibold">{event.title}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-primary badge-outline whitespace-nowrap">
                          {event.eventType}
                        </span>
                      </td>
                      <td className="whitespace-nowrap">
                        {formatDate(event.eventDate)}
                        {past && <span className="badge badge-ghost ml-2">Ended</span>}
                      </td>
                      <td className="min-w-40">{event.location}</td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/events/${event._id}`}
                            className="btn btn-sm btn-ghost btn-square"
                            aria-label="View event"
                          >
                            <FaEye />
                          </Link>
                          <button
                            onClick={() => setEditing(event)}
                            className="btn btn-sm btn-outline btn-primary"
                          >
                            <FaEdit /> Update
                          </button>
                          <button
                            onClick={() => setDeleting(event)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Update modal */}
        <dialog className={`modal ${editing ? "modal-open" : ""}`}>
          <div className="modal-box max-w-2xl">
            <h3 className="mb-4 text-2xl font-bold text-primary">Update Event</h3>
            {editing && (
              <EventForm
                key={editing._id}
                initial={editing}
                onSubmit={handleUpdate}
                submitLabel="Save Changes"
                loading={busy}
              />
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setEditing(null)} disabled={busy}>
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !busy && setEditing(null)} />
        </dialog>

        {/* Delete confirmation modal */}
        <dialog className={`modal ${deleting ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="text-xl font-bold">Delete this event?</h3>
            <p className="py-4 text-base-content/70">
              {deleting
                ? `"${deleting.title}" and everyone's sign-ups for it will be removed. This cannot be undone.`
                : ""}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setDeleting(null)} disabled={busy}>
                Keep Event
              </button>
              <button className="btn btn-error" onClick={handleDelete} disabled={busy}>
                {busy ? <span className="loading loading-spinner loading-sm" /> : "Yes, Delete"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !busy && setDeleting(null)} />
        </dialog>
      </section>
    </PrivateRoute>
  );
}
