"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EVENT_TYPES } from "@/lib/constants";
import { validateUrl } from "@/lib/validators";

// tomorrow's date (Bangladesh time, UTC+6) as YYYY-MM-DD
function getTomorrow() {
  return new Date(Date.now() + 30 * 3600 * 1000).toISOString().slice(0, 10);
}

export default function EventForm({ initial = {}, onSubmit, submitLabel, loading }) {
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(getTomorrow());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get("title").trim(),
      description: form.get("description").trim(),
      eventType: form.get("eventType"),
      thumbnail: form.get("thumbnail").trim(),
      location: form.get("location").trim(),
      eventDate: form.get("eventDate"),
    };

    const newErrors = {};
    if (data.title.length < 5) newErrors.title = "Title must be at least 5 characters.";
    if (data.description.length < 20)
      newErrors.description = "Description must be at least 20 characters.";
    if (!EVENT_TYPES.includes(data.eventType))
      newErrors.eventType = "Please choose an event type.";
    const urlError = validateUrl(data.thumbnail);
    if (urlError) newErrors.thumbnail = urlError;
    if (data.location.length < 3) newErrors.location = "Please enter the event location.";
    if (!data.eventDate) newErrors.eventDate = "Please choose an event date.";
    else if (data.eventDate < getTomorrow())
      newErrors.eventDate = "Event date must be in the future.";

    setErrors(newErrors);
    const firstError = Object.values(newErrors)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }
    await onSubmit(data);
  }

  const fieldClass = (name) => `w-full ${errors[name] ? "input-error" : ""}`;
  const Error = ({ name }) =>
    errors[name] ? <p className="mt-1 text-sm text-error">{errors[name]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="title">
          Event title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={initial.title}
          placeholder="Winter Clothes Distribution"
          className={`input ${fieldClass("title")}`}
        />
        <Error name="title" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={initial.description}
          placeholder="Tell volunteers what the event is about and what to bring."
          className={`textarea ${fieldClass("description")}`}
        />
        <Error name="description" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="eventType">
            Event type
          </label>
          <select
            id="eventType"
            name="eventType"
            defaultValue={initial.eventType || ""}
            className={`select ${fieldClass("eventType")}`}
          >
            <option value="" disabled>
              Choose a type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <Error name="eventType" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="eventDate">
            Event date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            min={minDate}
            defaultValue={initial.eventDate}
            className={`input ${fieldClass("eventDate")}`}
          />
          <Error name="eventDate" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="location">
          Location
        </label>
        <input
          id="location"
          name="location"
          defaultValue={initial.location}
          placeholder="Mirpur 10, Dhaka"
          className={`input ${fieldClass("location")}`}
        />
        <Error name="location" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="thumbnail">
          Thumbnail image URL
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          defaultValue={initial.thumbnail}
          placeholder="https://example.com/event-photo.jpg"
          className={`input ${fieldClass("thumbnail")}`}
        />
        <Error name="thumbnail" />
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
      </button>
    </form>
  );
}
