"use client";
import toast from "react-hot-toast";
import { FaEnvelopeOpenText } from "react-icons/fa";

export default function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to SebaHub updates.");
    e.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-box bg-primary px-6 py-12 text-center text-primary-content md:px-16">
        <FaEnvelopeOpenText size={36} className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold md:text-4xl">Never miss a community event</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-90">
          Get a short email when new events are announced in your area.
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            name="email"
            type="email"
            placeholder="Your email address"
            className="input w-full text-base-content"
          />
          <button type="submit" className="btn btn-neutral">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
