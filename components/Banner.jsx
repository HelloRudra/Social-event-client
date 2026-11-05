import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const stats = [
  { value: "Winter drives", label: "Clothes and blankets" },
  { value: "Green days", label: "Tree plantations" },
  { value: "Clean streets", label: "Neighbourhood cleanups" },
];

export default function Banner() {
  return (
    <section className="bg-linear-to-br from-primary/20 via-base-100 to-secondary/20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <span className="badge badge-primary badge-outline mb-4 px-4 py-3">
            Serving Dhaka, one neighbourhood at a time
          </span>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Small acts, <span className="text-primary">big change</span> for our community
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-base-content/70">
            Find a winter clothes distribution in Mirpur, a blanket drive in
            Mohammadpur, or start your own event. Join neighbours who show up
            for each other.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg">
              Find an Event <FaArrowRight />
            </Link>
            <Link href="/create-event" className="btn btn-outline btn-lg">
              Start an Event
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-box border border-base-300 bg-base-100 p-6 shadow-md"
            >
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-base-content/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
